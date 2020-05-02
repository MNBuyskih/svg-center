import svgpath from "svgpath";
import {INode, parse} from "svgson";
import {getPathProperties, Properties} from "./getPathProperties";

function createSvg(d: string, width: number, height: number, viewBoxWidth: number, viewBoxHeight: number): string {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" xmlns="http://www.w3.org/2000/svg">
  <path d="${d}"/>
</svg>`;
}

function getOptimizedPath(d: string, translateX: number, translateY: number): string {
  return svgpath(d)
    .abs()
    .translate(translateX, translateY)
    .round(1)
    .toString();
}

function getD(svgObject: INode): string {
  const path = svgObject.children.find((c: any) => c.name === "path");
  if (!path) {
    throw new Error("Unable to find path");
  }

  return path.attributes.d;
}

function getPathDimensions(path: Properties): { x: number, y: number, width: number, height: number } {
  const parts = path.getParts().filter(part => part.length !== 0);
  const xy = parts
    .reduce<{ x: number[], y: number[] }>((memo, part) => {
      memo.x.push(part.start.x);
      memo.y.push(part.start.y);

      return memo;
    }, {x: [], y: []});

  const x = Math.min(...xy.x);
  const y = Math.min(...xy.y);
  const width = Math.max(...xy.x) - x;
  const height = Math.max(...xy.y) - y;

  return {x, y, width, height};
}

async function getSvgObject(svg: string): Promise<INode> {
  return parse(svg);
}

export async function svgCenter(svgContent: string, newSvgWidth: number = 36, newSvgHeight: number = 36): Promise<string> {
  const svgObject = await getSvgObject(svgContent);
  const d = getD(svgObject);
  const pathData = getPathProperties(d);
  const {x, y, width: pathWidth, height: pathHeight} = getPathDimensions(pathData);
  const newPath = getOptimizedPath(d, -x, -y);

  return createSvg(newPath, newSvgWidth, newSvgHeight, pathWidth, pathHeight);
}
