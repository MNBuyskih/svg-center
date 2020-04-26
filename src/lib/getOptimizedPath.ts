import svgpath from "svgpath";

export function getOptimizedPath(d: string, translateX: number, translateY: number): string {
  return svgpath(d)
    .abs()
    .translate(translateX, translateY)
    .round(1)
    .toString();
}
