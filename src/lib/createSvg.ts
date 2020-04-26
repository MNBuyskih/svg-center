export function createSvg(d: string, width: number, height: number, viewBoxWidth: number, viewBoxHeight: number): string {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" xmlns="http://www.w3.org/2000/svg">
  <path d="${d}"/>
</svg>`;
}
