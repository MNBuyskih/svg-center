import fs from "fs";
import path from "path";
import {svgCenter} from "../src/lib";

const svg = fs.readFileSync(path.resolve(__dirname, "svg/Attachments.svg"));
svgCenter(svg.toString()).then(s => {
  fs.writeFileSync(path.resolve(__dirname, "svg/dist/Attachments.svg"), s);
});
