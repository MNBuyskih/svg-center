import {IPathParsed, parse} from "svgson";

export async function getSvgObject(svg: string): Promise<IPathParsed> {
  return parse(svg);
}
