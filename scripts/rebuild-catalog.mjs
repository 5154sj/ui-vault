import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const itemsDir = path.join(repoRoot, 'items');
const catalogPath = path.join(repoRoot, 'catalog.json');

fs.mkdirSync(itemsDir, { recursive: true });

const entries = fs
  .readdirSync(itemsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
  .sort((a, b) => b.name.localeCompare(a.name));

const items = [];
for (const dir of entries) {
  const itemRoot = path.join(itemsDir, dir.name);
  const metaFile = path.join(itemRoot, 'meta.json');
  if (!fs.existsSync(metaFile)) continue;
  try {
    const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
    const hasFile = (rel) => fs.existsSync(path.join(itemRoot, rel));
    items.push({
      id: meta.id || dir.name,
      dir: `items/${dir.name}`,
      title: meta.title || dir.name,
      kind: meta.kind || 'component', // theme | layout | component | motion
      theme: meta.theme || 'dark',    // dark | light | both
      summary: meta.summary || '',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      source: meta.source || '',
      stack: Array.isArray(meta.stack) ? meta.stack : ['html-css'],
      createdAt: meta.createdAt || new Date().toISOString().slice(0, 10),
      files: {
        spec: hasFile('spec.md') ? `items/${dir.name}/spec.md` : null,
        tokens: hasFile('tokens.json') ? `items/${dir.name}/tokens.json` : null,
        preview: hasFile('preview.html') ? `items/${dir.name}/preview.html` : null,
        snippet: hasFile('snippet.tsx') ? `items/${dir.name}/snippet.tsx` : null,
        previewImage: hasFile('assets/preview.png')
          ? `items/${dir.name}/assets/preview.png`
          : hasFile('assets/preview.jpg')
            ? `items/${dir.name}/assets/preview.jpg`
            : null,
      },
    });
  } catch (err) {
    console.error(`[rebuild-catalog] Skipped invalid meta.json in ${dir.name}:`, err.message);
  }
}

const catalog = {
  version: 1,
  updatedAt: new Date().toISOString(),
  repoPath: repoRoot,
  count: items.length,
  items,
};

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
console.log(`[rebuild-catalog] Indexed ${items.length} UI items -> ${catalogPath}`);
