declare module "svgson" {
  export interface IParsed {
    name: string,
    type: string,
    value: string,
    attributes: Record<string, string>,
    children: IParsed[]
  }

  function parse(content: string): Promise<IParsed>;
}
