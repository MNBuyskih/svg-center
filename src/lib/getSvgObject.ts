import {INode, parse} from "svgson";

export async function getSvgObject(svg: string): Promise<INode> {
  return parse(svg);
}
