---
description: Run the checks for every workspace that changed and report real results. Never fixes on its own.
---

1. **Find changed files:** `git diff --name-only main...HEAD` plus `git status --porcelain` (staged, unstaged, untracked).
2. **Map to workspaces:** each top-level folder that has its own `CLAUDE.md`. Ignore `docs/`, `prompts/`, and `.claude/`. If only root files changed (CI, settings), validate them instead (JSON/YAML parse).
3. **Run** the checks listed under "Checks" in each changed workspace's `CLAUDE.md`, from inside that folder. Conditional checks ("when migrations change") run only if their condition is true; otherwise mark them "skipped" with the reason.
4. **Also scan the diff** (no command needed) for:
   - a real `.env` file, key, token, or password being added
   - `console.log` / `dd(` / `dump(` / `var_dump(` left in
   - new dependencies not mentioned in the current prompt file
5. **Report a table:** workspace · check · ✅ pass / ❌ fail / ⏭ skipped / ⚠️ not run. For each failure, show the relevant lines of real output (not the whole log).
6. **Never** claim a check passed without running it. If one can't run (missing dependency, no DB connection), mark it "not run" with the reason.
7. **Do not fix** anything. End with exactly one line:
   - `✅ Ready to /ship` — or —
   - `❌ Fix these first` and then AskUserQuestion: **Fix them now** · **I'll fix them myself**
