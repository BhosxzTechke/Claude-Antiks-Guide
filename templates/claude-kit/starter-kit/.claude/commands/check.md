---
description: Run the checks for every workspace that changed and report real results.
---

1. Find changed files: `git diff --name-only main...HEAD` plus `git status --porcelain` (staged, unstaged, untracked).
2. Map them to workspaces: `mobile/`, `api/`, `jobs/`. Ignore `docs/` and `prompts/`.
3. For each changed workspace, run the checks listed in that workspace's `CLAUDE.md` from inside that folder.
4. Report a table: workspace · check · pass / fail. For every failure, show the relevant lines of real output.
5. Never claim a check passed without running it. If a check cannot run (missing dependency, no DB connection), say so as "not run" with the reason.
6. Do not fix failures unless the user asks. End with one line: "Ready to /ship" or "Fix these first".
