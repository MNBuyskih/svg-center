import {IPathParsed} from "svgson";

export function getD(svgObject: IPathParsed): string {
  const path = svgObject.children.find((c: any) => c.name === "path");
  if (!path) {
    throw new Error("Unable to find path");
  }

  return path.attributes.d;
}
