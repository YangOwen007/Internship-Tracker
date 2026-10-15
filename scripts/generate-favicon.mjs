import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";

// Next.js already supplies Sharp for image processing; no extra dependency is
// installed just to render the project's own SVG into its legacy favicon.
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const sharp = nextRequire("sharp");
const root = new URL("../", import.meta.url);
const svg = await readFile(new URL("src/app/icon.svg", root));
const png = await sharp(svg).resize(32, 32).png().toBuffer();

// ICO permits PNG image payloads. The directory points to the single 32px icon.
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(new URL("src/app/favicon.ico", root), Buffer.concat([header, png]));
console.log("Generated favicon.ico from the original checklist icon.");
