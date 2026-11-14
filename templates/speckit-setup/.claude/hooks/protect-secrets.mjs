// PreToolUse hook: block any Bash/Read/Edit/Write/Grep call that mentions ".env".
import { readFileSync } from "node:fs";

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  // Unreadable input: nothing to check, let the tool run.
  process.exit(0);
}

const tool = input.tool_name;
const args = input.tool_input ?? {};
const targets =
  tool === "Bash" ? [args.command]
  : tool === "Grep" ? [args.path, args.glob]
  : [args.file_path];

if (targets.some((t) => typeof t === "string" && t.toLowerCase().includes(".env"))) {
  console.error(`Blocked: ${tool} call mentions ".env" (protected secrets file).`);
  process.exit(2); // exit code 2 = block the tool call
}

process.exit(0);
