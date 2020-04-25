declare module "svgson" {
  export interface IPathParsed {
    name: string,
    type: string,
    value: string,
    attributes: Record<string, string>,
    children: IPathParsed[]
  }

  function parse(content: string): Promise<IPathParsed>;
}
