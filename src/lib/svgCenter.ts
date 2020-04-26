import {createSvg} from "./createSvg";
import {getD} from "./getD";
import {getOptimizedPath} from "./getOptimizedPath";
import {getPathDimensions} from "./getPathDimensions";
import {getPathProperties} from "./getPathProperties";
import {getSvgObject} from "./getSvgObject";

export async function svgCenter(svgContent: string, newSvgWidth: number = 36, newSvgHeight: number = 36): Promise<string> {
  const svgObject = await getSvgObject(svgContent);
  const d = getD(svgObject);
  const pathData = getPathProperties(d);
  const {x, y, width: pathWidth, height: pathHeight} = getPathDimensions(pathData);
  const newPath = getOptimizedPath(d, -x, -y);

  return createSvg(newPath, newSvgWidth, newSvgHeight, pathWidth, pathHeight);
}
