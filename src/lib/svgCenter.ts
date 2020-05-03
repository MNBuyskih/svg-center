import svgpath from "svgpath";
import {INode, parse} from "svgson";
import {getPathProperties, Properties} from "./getPathProperties";

function createSvg(d: string, width: number, height: number): string {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <path d="${d}"/>
</svg>`;
}

interface IBoundaries {
  x: number;
  y: number;
  width: number;
  height: number;
}

function getOptimizedPath(d: string, pathBoundaries: IBoundaries, svgBoundaries: IBoundaries): string {
  const sx = svgBoundaries.width / pathBoundaries.width;
  const sy = svgBoundaries.height / pathBoundaries.height;
  const scale = Math.min(sx, sy);

  const newWidth = pathBoundaries.width * scale;
  const newHeight = pathBoundaries.height * scale;
  const offsetX = (svgBoundaries.width - newWidth) / 2;
  const offsetY = (svgBoundaries.height - newHeight) / 2;

  return svgpath(d)
    .abs()
    .translate(-pathBoundaries.x, -pathBoundaries.y)
    .scale(scale)
    .translate(offsetX, offsetY)
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

export async function svgCenter(svgContent: string, newSvgWidth: number = 36, newSvgHeight: number = 36): Promise<string> {
  const svgObject = await parse(svgContent);
  const d = getD(svgObject);
  const pathData = getPathProperties(d);
  const {x, y, width, height} = getPathDimensions(pathData);
  const newPath = getOptimizedPath(d, {x, y, width, height}, {x: 0, y: 0, width: newSvgWidth, height: newSvgHeight});

  return createSvg(newPath, newSvgWidth, newSvgHeight);
}
