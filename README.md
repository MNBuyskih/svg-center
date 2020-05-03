# SVG Icon Center

| Before        | After |
| ------------- |:-------------:|
| <img src=".github/Attachments.svg" width=96 /> | <img src=".github/AttachmentsFixed.svg" width=96 /> |

![Publish to NPM](https://github.com/MNBuyskih/svg-center/workflows/Publish%20to%20NPM/badge.svg)

This is a helpful tool for preparing your SVG icons to use in font generators.
For generating custom fonts your icons should be placed in the center of square SVG. 
This tool tries to solve this issue of custom icons: wrong sizes and places.

## Usage

Add this package to your project

```bash
yarn add svg-icon-center # or npm install svg-icon-center
```

You can use it in both: JS and TS languages

```typescript
import {svgCenter} from "svg-icon-center";

svgCenter("<svg>...</svg>", 36, 36).then(newSvg => console.log(newSvg))
```

## API

There is only one available function: `svgCenter`. Params:

- `sorceSvg` svg as string
- `width` - new svg file width
- `height` - new svg file height

## CLI

Usage: `svg-icon-center [options]`

Options:

- `-s, --source [pattern]`  glob pattern for svg dir/file/files
- `-o, --output [path]`     output directory
- `-w, --width [number]`    output svg width (default: "36")
- `-h, --height [number]`   output svg height (default: "36")

Example: `svg-icon-center -s src/test/svg/*.svg -o src/test/svg/dist -w 24 -h 24`

## Limitation

This is a beta version and currently supports only SVG files,
that contains only one `path` element.

Please contribute/[let_us_to_know](https://github.com/MNBuyskih/svg-icon-center/issues) 
if you find any broken image.

## License

MIT
