# Claude Starter Kit

A drop-in folder that sets up Claude Code for a new project: it plans first, teaches you as it builds (VibeWise learning mode), runs real checks, and never merges.

## Use it on a new project

1. Copy **everything inside this folder** (including the hidden `.claude/`, `.github/`, `.coderabbit.yaml`, `.gitignore`) into your new project root.
2. Open Claude Code in that folder. Trust the folder when asked — Claude Code then offers to install **VibeWise** (it's declared in `.claude/settings.json`).
3. Run:

   ```
   /kickoff <one paragraph about your app, or "read docs/brief.md">
   ```

4. Claude interviews you (a few multiple-choice questions), shows you a summary, and asks before writing.
5. On "Yes" it rewrites the whole kit for your project: `AGENTS.md`, every workspace `CLAUDE.md`, `docs/`, CI, CodeRabbit rules, permissions, and the roadmap.
6. Run `/vibe-wise:learn` once to start learning mode for this project.

You can also fill in `docs/brief.md` yourself first (attach your MVP doc, diagrams, designs) and run `/kickoff read docs/brief.md`.

## VibeWise

[VibeWise](https://github.com/nykooi1/vibe-wise) (community plugin, not Anthropic-reviewed) is a learning mode: Claude asks for your approach first, explains concepts, and writes only the code you agree on.

- The kit's `.claude/settings.json` registers its marketplace and enables it, so Claude Code prompts you to install it when you trust the folder.
- If that prompt doesn't appear (e.g. in the VS Code extension), install it once per computer from a terminal — full Windows steps, including Python 3, are in `docs/vibewise-install.md`:

  ```
  claude plugin marketplace add nykooi1/vibe-wise
  claude plugin install vibe-wise@vibe-wise
  ```

- Notes are saved in `.vibe-wise/`, which the kit already gitignores.
- Pause it by telling Claude "pause learning mode"; the normal `/plan` loop still works.

## Daily loop

| Command | What happens |
|---|---|
| `/plan <task>` | Writes `prompts/NN-name.md`, asks "Is this good to execute?". No code until Yes. With VibeWise on, its checkpoints run during the build. |
| `/plan` (no task) | Picks the next unchecked item in `docs/roadmap.md` |
| `/check` | Runs the real checks for changed workspaces, reports a table. Doesn't fix unless you ask. |
| `/ship` | Branch, commit, push, open the PR, tick the roadmap item. Never merges. |

Claude **never** merges, force-pushes, pushes to `main`, reads `.env` files, or runs destructive DB commands. Those are blocked in `.claude/settings.json`, not just written in instructions.

## What's inside

```
AGENTS.md                  Rules for any AI agent (Claude, Codex, Cursor…). Kickoff fills it.
CLAUDE.md                  Claude Code entry point; imports AGENTS.md
.claude/
  settings.json            VibeWise plugin + permissions (allow / deny) + format hook
  commands/                /kickoff /plan /check /ship
  hooks/format.mjs         Auto-formats edited files (never blocks)
  kit/stacks/              Recipes per stack: checks, CI job, review rules, gotchas
  skills/                  Project skills Kickoff creates (only if useful)
docs/
  brief.md                 What you're building (input for /kickoff)
  decisions.md             Settled decisions, newest first
  roadmap.md               Checkbox list /plan and /ship work through
  vibewise-install.md      VibeWise install guide (Windows)
prompts/_TEMPLATE.md       Implementation prompt template
.github/                   CI workflow + PR template
.coderabbit.yaml           Review rules
examples/                  A filled brief (Don't Forget) for reference
```

## Adding a stack later

Run `/kickoff add workspace <name> <stack>` after the project is set up. If there's no recipe in `.claude/kit/stacks/`, Claude writes one from the official docs and asks you to approve it first.

## Keeping the kit itself up to date

Keep a clean copy of this folder (or a Git repo of it). When you improve a command in one project, copy the change back to the kit.
