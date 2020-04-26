import {Properties} from "./getPathProperties";

export function getPathDimensions(path: Properties): { x: number, y: number, width: number, height: number } {
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
