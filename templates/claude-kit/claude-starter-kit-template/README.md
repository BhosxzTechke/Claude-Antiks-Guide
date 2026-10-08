# Claude Starter Kit

A drop-in folder that turns Claude Code into a careful teammate: it plans first, asks before anything leaves your machine, runs real checks, and never merges.

## Use it on a new project

1. Copy **everything inside this folder** (including the hidden `.claude/`, `.github/`, `.coderabbit.yaml`, `.gitignore`) into your new project root.
2. Open Claude Code in that folder and run:

   ```
   /kickoff <one paragraph about your app, or "read docs/brief.md">
   ```

3. Claude interviews you (a few multiple-choice questions), shows you a summary, and **asks before writing anything**.
4. On "Yes" it rewrites the whole kit for your project: `AGENTS.md`, every workspace `CLAUDE.md`, `docs/`, CI, CodeRabbit rules, permissions, and the roadmap.
5. Then the daily loop starts.

You can also fill in `docs/brief.md` yourself first (attach your MVP doc, diagrams, designs) and run `/kickoff read docs/brief.md`.

## Daily loop

| Command | What happens | Where Claude stops and asks you |
|---|---|---|
| `/plan <task>` | Writes `prompts/NN-name.md`. No code. | "Is this good to execute?" |
| `/plan` (no task) | Picks the next unchecked item in `docs/roadmap.md` | Same |
| `/check` | Runs the real checks for changed workspaces, reports a table | Never fixes unless you say so |
| `/ship` | Shows branch, files and commit message | "Commit, push and open the PR?" — nothing is pushed without a Yes |

Claude **never** merges, force-pushes, commits to `main`, reads `.env` files, or runs destructive DB commands. Those are blocked in `.claude/settings.json`, not just written in instructions.

## What's inside

```
AGENTS.md                  Rules for any AI agent (Claude, Codex, Cursor…). Kickoff fills it.
CLAUDE.md                  Claude Code entry point; imports AGENTS.md
.claude/
  settings.json            Permissions: allow / ask / deny + format hook
  commands/                /kickoff /plan /check /ship
  hooks/format.mjs         Auto-formats edited files (never blocks)
  kit/stacks/              Recipes per stack: checks, CI job, review rules, gotchas
  skills/                  Project skills Kickoff creates (only if useful)
docs/
  brief.md                 What you're building (input for /kickoff)
  decisions.md             Settled decisions, newest first
  roadmap.md               Checkbox list /plan and /ship work through
prompts/_TEMPLATE.md       Implementation prompt template
.github/                   CI workflow + PR template
.coderabbit.yaml           Review rules
examples/                  A filled brief (Don't Forget) for reference
```

## Adding a stack later

Run `/kickoff add workspace <name> <stack>` after the project is set up. If there's no recipe in `.claude/kit/stacks/`, Claude writes one from the official docs and asks you to approve it first.

## Keeping the kit itself up to date

Keep a clean copy of this folder (or a Git repo of it). When you improve a command in one project, copy the change back to the kit.
