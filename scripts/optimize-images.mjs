// Generates .webp versions of every .jpg/.jpeg/.png under public/,
// resized to sensible maximum widths. Originals are kept untouched;
// the app serves the .webp via resolveAsset().
//
// Run: node scripts/optimize-images.mjs
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'public');

// Thumbnails stay small; everything else caps at 1600px wide.
function maxWidthFor(filePath) {
  if (filePath.includes(`${path.sep}thumbnails${path.sep}`)) return 480;
  return 1600;
}

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let converted = 0;
let skipped = 0;
let savedBytes = 0;

for await (const file of walk(ROOT)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    await fs.access(out);
    skipped++;
    continue;
  } catch {}

  try {
    const input = sharp(file, { failOn: 'none' }).rotate();
    const meta = await input.metadata();
    const width = Math.min(meta.width || 1600, maxWidthFor(file));
    await input.resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    // Small variant for gallery grids and card tiles.
    const thumbOut = file.replace(/\.(jpe?g|png)$/i, '.thumb.webp');
    await sharp(file, { failOn: 'none' })
      .rotate()
      .resize({ width: 520, withoutEnlargement: true })
      .webp({ quality: 74 })
      .toFile(thumbOut);
    const [inStat, outStat] = await Promise.all([fs.stat(file), fs.stat(out)]);
    savedBytes += Math.max(0, inStat.size - outStat.size);
    converted++;
  } catch (err) {
    console.error(`FAILED ${file}: ${err.message}`);
  }
}

console.log(`Converted ${converted} images (${skipped} already existed).`);
console.log(`Estimated savings vs originals: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`);

// Regenerate the Health Day manifest: every full-size .webp in
// public/images/health-day/ appears automatically in the site's carousel.
const healthDayDir = path.join(ROOT, 'images', 'health-day');
const healthDay = { images: [], videos: [] };
try {
  const names = await fs.readdir(healthDayDir);
  healthDay.images = names
    .filter((name) => /\.webp$/i.test(name) && !/\.(thumb|poster)\.webp$/i.test(name))
    .sort()
    .map((name) => `/images/health-day/${name}`);
  healthDay.videos = names
    .filter((name) => /\.mp4$/i.test(name))
    .sort()
    .map((name) => {
      const poster = name.replace(/\.mp4$/i, '.poster.webp');
      return {
        src: `/images/health-day/${name}`,
        poster: names.includes(poster.replace(/\.webp$/i, '.jpg')) || names.includes(poster)
          ? `/images/health-day/${poster}`
          : undefined,
      };
    });
} catch {}
await fs.writeFile(
  path.resolve(process.cwd(), 'src', 'healthDayImages.json'),
  `${JSON.stringify(healthDay, null, 2)}\n`
);
console.log(`Health Day manifest: ${healthDay.images.length} images, ${healthDay.videos.length} videos.`);
