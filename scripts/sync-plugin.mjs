import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const targetDir = path.join(os.homedir(), '.gemini', 'config', 'plugins', 'ui-vault');

function copyRecursive(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dst, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

// If targetDir is a symlink/junction, unlink/rmdir only the link itself safely
if (fs.existsSync(targetDir)) {
  const lstat = fs.lstatSync(targetDir);
  if (lstat.isSymbolicLink()) {
    fs.unlinkSync(targetDir);
  }
}

fs.mkdirSync(targetDir, { recursive: true });

for (const item of ['plugin.json', 'README.md', 'assets', 'skills']) {
  const src = path.join(repoRoot, item);
  const dst = path.join(targetDir, item);
  if (fs.existsSync(dst)) {
    fs.rmSync(dst, { recursive: true, force: true });
  }
  if (fs.existsSync(src)) {
    copyRecursive(src, dst);
  }
}

console.log(`[sync-plugin] Synced ui-vault plugin metadata & skills -> ${targetDir}`);
