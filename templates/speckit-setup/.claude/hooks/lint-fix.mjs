// PostToolUse hook: auto-fix lint problems in a file after Claude edits it.
// Never fails the edit: always exits 0.
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

try {
  const input = JSON.parse(readFileSync(0, "utf8"));
  const file = input.tool_input?.file_path;

  if (typeof file === "string" && /\.(ts|tsx|js|jsx|mjs)$/i.test(file)) {
    // shell: true lets Windows find npx.cmd; the path is quoted for spaces.
    spawnSync(`npx eslint --fix "${file}"`, {
      shell: true,
      cwd: process.env.CLAUDE_PROJECT_DIR || process.cwd(),
      stdio: "ignore",
    });
  }
} catch {
  // Ignore every error on purpose.
}

process.exit(0);
