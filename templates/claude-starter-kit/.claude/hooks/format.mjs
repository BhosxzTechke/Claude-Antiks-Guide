// Formats the file Claude just edited. Never blocks: any failure exits 0.
// Works for any workspace layout: finds the nearest folder with a formatter installed.
//   .php                     → Laravel Pint (vendor/bin/pint)
//   .ts .tsx .js .jsx .json  → Prettier (node_modules/prettier)
//   .md .css .yml .yaml      → Prettier too, if installed in that workspace
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const PRETTIER = "node_modules/prettier/bin/prettier.cjs";
const PINT = "vendor/bin/pint";

// Walk up from the file to the project root, returning the first dir containing `marker`.
function findUp(startDir, root, marker) {
  let dir = startDir;
  while (dir.startsWith(root)) {
    if (existsSync(path.join(dir, marker))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

try {
  const input = JSON.parse(readFileSync(0, "utf8") || "{}");
  const file = input?.tool_input?.file_path;
  if (!file || !existsSync(file)) process.exit(0);

  const root = path.resolve(process.env.CLAUDE_PROJECT_DIR || process.cwd());
  const abs = path.resolve(file);
  if (!abs.startsWith(root) || abs.includes(`${path.sep}node_modules${path.sep}`) || abs.includes(`${path.sep}vendor${path.sep}`)) {
    process.exit(0);
  }
  const run = (cwd, cmd, args) => execFileSync(cmd, args, { cwd, stdio: "ignore", timeout: 25000 });
  const ext = path.extname(abs).toLowerCase();

  if (ext === ".php") {
    const ws = findUp(path.dirname(abs), root, PINT);
    if (ws) run(ws, "php", [PINT, abs]);
  } else if ([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md", ".css", ".yml", ".yaml"].includes(ext)) {
    const ws = findUp(path.dirname(abs), root, PRETTIER);
    if (ws) run(ws, "node", [PRETTIER, "--write", "--ignore-unknown", abs]);
  }
} catch {
  // Formatting is a convenience, never a blocker.
}
process.exit(0);
