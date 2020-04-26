#!/usr/bin/env node

import {program} from "commander";
import {promises as fs} from "fs";
import glob from "glob";
import path from "path";
import util from "util";
import {svgCenter} from "..";

const globAsync = util.promisify(glob);

program
  .requiredOption("-s, --source [pattern]", "glob pattern for svg dir/file/files")
  .requiredOption("-o, --output [path]", "output directory")
  .option("-w, --width [number]", "output svg width", "36")
  .option("-h, --height [number]", "output svg height", "36")
;

program.parse(process.argv);

main({
  source: program.source,
  output: program.output,
  width: program.width,
  height: program.height,
})
  .then(({files, output}) => console.log(`${files.length} svg files were found and fixed and placed in ${output}`));

interface IOptions {
  source: string;
  output: string;
  width?: number;
  height?: number;
}

async function main(options: IOptions): Promise<{ files: string[], output: string }> {
  const {source, output, width, height} = options;
  const files = await globAsync(source);

  await Promise.all(files.map(async file => {
    const fileContent = await fs.readFile(path.resolve(file));
    const newSvg = await svgCenter(fileContent.toString(), width, height);
    const newFileName = path.resolve(output, path.basename(file));
    await fs.writeFile(newFileName, newSvg);
  }));

  return {files, output};
}
