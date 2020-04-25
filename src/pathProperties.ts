import {svgPathProperties} from "svg-path-properties";

export interface Properties {
  getParts(): PartProperties[];

  getTotalLength(): number;

  getPointAtLength(pos: number): Point;

  getTangentAtLength(pos: number): Point;

  getPropertiesAtLength(pos: number): PointProperties;
}

interface PartProperties {
  start: Point;
  end: Point;
  length: number;

  getPointAtLength(pos: number): Point;

  getTangentAtLength(pos: number): Point;

  getPropertiesAtLength(pos: number): PointProperties;
}

interface Point {
  x: number;
  y: number;
}

interface PointProperties {
  x: number;
  y: number;
  tangentX: number;
  tangentY: number;
}

export function pathProperties(d: string): Properties {
  // @ts-ignore
  return new svgPathProperties(d) as Properties;
}
