import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const INPUT_SIZES = ["1080x1920"]; // add "1080x2340" later if you make a 2nd bar
const OUT_HEIGHT = 320;            // matches ~3x of 110px display height
const OUT_WIDTH  = Math.round(OUT_HEIGHT * 0.75); // 240

const TEAM_CODES = [
  "ANA","BOS","BUF","CAR","CBJ","CGY","CHI","COL","DAL","DET",
  "EDM","FLA","LAK","MIN","MTL","NJD","NSH","NYI","NYR","OTT",
  "PHI","PIT","SEA","SJS","STL","TBL","TOR","UTA","VAN","VGK",
  "WPG","WSH",
];

const ROOT_IN  = path.resolve("public/backgrounds");         // adjust if needed
const ROOT_OUT = path.resolve("public/backgrounds/thumbs");

const optsWebp = { quality: 72, effort: 6 }; // good balance

async function ensureDir(p) { await mkdir(p, { recursive: true }); }

async function main() {
  for (const sz of INPUT_SIZES) {
    const inDir = path.join(ROOT_IN, sz);
    const outDir = path.join(ROOT_OUT, sz);
    await ensureDir(outDir);

    for (const code of TEAM_CODES) {
      const inPathPng = path.join(inDir, `${code.toLowerCase()}.png`);
      const inPathWebp = path.join(inDir, `${code.toLowerCase()}.webp`);
      const inPath = inPathWebp; // prefer webp if you have them
      const fallback = inPathPng;

      try {
        await sharp(inPath)
          .resize(OUT_WIDTH, OUT_HEIGHT, { fit: "cover", position: "centre" })
          .webp(optsWebp)
          .toFile(path.join(outDir, `${code.toLowerCase()}.webp`));
        console.log(`✅ ${sz}/${code}.webp`);
      } catch (e) {
        try {
          await sharp(fallback)
            .resize(OUT_WIDTH, OUT_HEIGHT, { fit: "cover", position: "centre" })
            .webp(optsWebp)
            .toFile(path.join(outDir, `${code.toLowerCase()}.webp`));
          console.log(`✅ (fallback) ${sz}/${code}.webp`);
        } catch (err) {
          console.warn(`⚠️  Missing source for ${sz}/${code} (${err.message})`);
        }
      }
    }
  }
  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
