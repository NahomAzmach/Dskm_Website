// After `vite build`, removes original .jpg/.png files from dist/ when a
// .webp twin exists — the site only ever serves the .webp versions.
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'dist');

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let removed = 0;
let freed = 0;
for await (const file of walk(ROOT)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const twin = file.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    await fs.access(twin);
  } catch {
    continue;
  }
  freed += (await fs.stat(file)).size;
  await fs.unlink(file);
  removed++;
}
console.log(`Pruned ${removed} original images from dist (${(freed / 1024 / 1024).toFixed(1)} MB).`);
