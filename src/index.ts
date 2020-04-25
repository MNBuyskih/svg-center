/// <reference types="../types/svgson/index" />

import {promises as fs} from "fs";
import * as path from "path";
import svgpath from "svgpath";
import {IPathParsed, parse} from "svgson";
import {pathProperties, Properties} from "./pathProperties";

main();

async function main(): Promise<void> {
  const dest = path.resolve(__dirname, "..", "dest", "svg");

  const files = await getFiles();

  await Promise.all(files.map(async svg => {
    if (!svg.pathParsed || !svg.d) {
      throw new Error(`Can't retrieve path for svg "${svg.fileName}"`);
    }
    if (!svg.viewBox) {
      throw new Error(`Can't retrieve viewBox for svg "${svg.fileName}"`);
    }

    const parts = svg.pathParsed.getParts()
      .filter(part => part.length !== 0);

    const xy = parts
      .reduce<{ x: number[], y: number[] }>((memo, part) => {
        memo.x.push(part.start.x);
        memo.y.push(part.start.y);

        return memo;
      }, {x: [], y: []});

    const pathWidth = Math.max(...xy.x) - Math.min(...xy.x);
    const pathHeight = Math.max(...xy.y) - Math.min(...xy.y);

    const translateX = Math.min(...xy.x) * -1;
    const translateY = Math.min(...xy.y) * -1;
    const newViewBox: IViewBox = {
      x: 0,
      y: 0,
      width: Math.ceil(pathWidth),
      height: Math.ceil(pathHeight),
    };

    const transform = svgpath(svg.d)
      .abs()
      .translate(translateX, translateY)
      .scale(newViewBox.width / pathWidth, newViewBox.height / pathHeight)
      .round(1);

    const newSvg = `<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
  <svg 
    width="36" 
    height="36" 
    viewBox="0 0 ${newViewBox.width} ${newViewBox.height}"
    preserveAspectRatio="xMidYMid meet" 
    xmlns="http://www.w3.org/2000/svg">
      <path d="${transform.toString()}"/>
  </svg>
</svg>`;

    await fs.writeFile(path.resolve(dest, svg.fileName), newSvg);
  }));
}

async function toObject(svg: string): Promise<IPathParsed> {
  return await parse(svg);
}

function getViewport(svgObject: IPathParsed): IViewBox | undefined {
  const viewBox = svgObject.attributes.viewBox;
  if (!svgObject.attributes.viewBox) {
    console.log(svgObject.attributes);
  }
  if (viewBox) {
    const [x, y, width, height] = viewBox.split(" ").map(parseFloat);

    return {x, y, width, height};
  }
}

interface IViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IFileInfo {
  filePath: string;
  fileName: string;
  fileContent: string;
  svgObject: IPathParsed;
  d?: string;
  pathParsed?: Properties;
  viewBox?: IViewBox;
}

async function getFiles(): Promise<IFileInfo[]> {
  const src = path.resolve(__dirname, "svg");
  const files = await fs.readdir(src);

  return Promise.all(files.map(async fileName => {
    const filePath = path.resolve(src, fileName);
    const fileContent = (await fs.readFile(filePath)).toString();
    const svgObject = await toObject(fileContent);
    const d = svgObject.children.find((c: any) => c.name === "path")?.attributes.d;
    const pathParsed: Properties | undefined = d ? pathProperties(d) as Properties : undefined;
    const viewBox = getViewport(svgObject);

    return {filePath, fileName, fileContent, svgObject, pathParsed, viewBox, d};
  }));
}
