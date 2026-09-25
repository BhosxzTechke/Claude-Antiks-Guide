// Formats the file Claude just edited. Never blocks: any failure exits 0.
// PHP in api/ → Pint. TS/JS/JSON in mobile/ or jobs/ → Prettier (only if installed locally).
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

try {
  const input = JSON.parse(readFileSync(0, "utf8") || "{}");
  const file = input?.tool_input?.file_path;
  if (!file || !existsSync(file)) process.exit(0);

  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const rel = path.relative(root, file).split(path.sep).join("/");
  const [workspace] = rel.split("/");
  const wsDir = path.join(root, workspace);
  const run = (cmd, args) => execFileSync(cmd, args, { cwd: wsDir, stdio: "ignore", timeout: 25000 });

  if (workspace === "api" && rel.endsWith(".php")) {
    if (existsSync(path.join(wsDir, "vendor/bin/pint"))) run("php", ["vendor/bin/pint", file]);
  } else if (["mobile", "jobs", "web"].includes(workspace) && /\.(tsx?|jsx?|json)$/.test(rel)) {
    const bin = path.join(wsDir, "node_modules/prettier/bin/prettier.cjs");
    if (existsSync(bin)) run("node", [bin, "--write", file]);
  }
} catch {
  // Formatting is a convenience, never a blocker.
}
process.exit(0);
