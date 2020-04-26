import {ISvgObject, parse} from "svgson";

export async function getSvgObject(svg: string): Promise<ISvgObject> {
  return parse(svg);
}
