import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const TARGET_DIRS = [
  "public/images/menu",
  "public/images/services",
  "public/images/caftans",
  "public/images/vaisselle",
  "public/realisations",
];

const MAX_WIDTH = {
  ".jpg": 1600,
  ".jpeg": 1600,
  ".png": 1400,
  ".webp": 1600,
};

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return null;

  const before = fs.statSync(filePath).size;
  const maxWidth = MAX_WIDTH[ext] ?? 1600;
  const tmpPath = `${filePath}.opt`;

  let pipeline = sharp(filePath).rotate();
  const meta = await pipeline.metadata();

  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (ext === ".png") {
    await pipeline.png({ quality: 82, compressionLevel: 9, palette: true }).toFile(tmpPath);
  } else if (ext === ".webp") {
    await pipeline.webp({ quality: 82 }).toFile(tmpPath);
  } else {
    await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(tmpPath);
  }

  const after = fs.statSync(tmpPath).size;
  if (after < before) {
    fs.copyFileSync(tmpPath, filePath);
    fs.unlinkSync(tmpPath);
    return { filePath, before, after };
  }

  fs.unlinkSync(tmpPath);
  return null;
}

async function main() {
  const results = [];

  for (const dir of TARGET_DIRS) {
    const absDir = path.join(ROOT, dir);
    if (!fs.existsSync(absDir)) continue;

    for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      const filePath = path.join(absDir, entry.name);
      const result = await optimizeFile(filePath);
      if (result) results.push(result);
    }
  }

  if (results.length === 0) {
    console.log("Aucune image à optimiser.");
    return;
  }

  let saved = 0;
  for (const { filePath, before, after } of results) {
    saved += before - after;
    console.log(
      `${path.relative(ROOT, filePath)}: ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB`
    );
  }
  console.log(`Total économisé: ${(saved / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
