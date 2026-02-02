import fs from "node:fs";
import path from "node:path";

const galleryDir = path.join(process.cwd(), "public", "assets", "gallery");
const outFile = path.join(galleryDir, "gallery.json");

if (!fs.existsSync(galleryDir)) {
  console.error("Gallery directory not found:", galleryDir);
  process.exit(1);
}

const files = fs.readdirSync(galleryDir)
  .filter(f => f.toLowerCase().endsWith(".webp"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const urls = files.map(f => `/assets/gallery/${f}`);

fs.writeFileSync(outFile, JSON.stringify({ images: urls }, null, 2));
console.log(`Wrote ${urls.length} images -> ${path.relative(process.cwd(), outFile)}`);
