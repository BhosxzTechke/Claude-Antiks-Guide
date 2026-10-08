@AGENTS.md

## Claude Code notes

- Each workspace has its own `CLAUDE.md` with run commands, checks, and rules. Read the one for the workspace you touch.
- Settled decisions: `docs/decisions.md`. Do not reopen them unless the user asks.
- Commands: `/kickoff` (set up the kit for this project) · `/plan <task>` (write the prompt) · `/check` (run checks) · `/ship` (branch, commit, PR — asks first).
- Ask through the AskUserQuestion panel with clickable options, not plain-text questions.
- One task per session. When a task is shipped, suggest `/clear`.
