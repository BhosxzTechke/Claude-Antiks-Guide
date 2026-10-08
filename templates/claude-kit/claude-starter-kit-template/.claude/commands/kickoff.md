---
description: Turn this starter kit into a project-specific setup from your brief. Asks before writing.
argument-hint: <paragraph about the app | "read docs/brief.md" | "add workspace <name> <stack>">
---

Input: $ARGUMENTS

You are setting up this repo's AI workflow. Do not write application code in this command.

## 0. Which mode?

- Run `grep -rl "KICKOFF:" --include=*.md --include=*.yml --include=*.yaml . | grep -v "^./.claude/"` (excluding `.claude/kit/`).
- **Markers found** → full setup (steps 1–7).
- **No markers and input starts with "add workspace"** → add one workspace (step 8 only).
- **No markers otherwise** → tell the user the project is already set up, and offer `/kickoff add workspace …` or `/plan`. Stop.

## 1. Gather context (read, don't assume)

- The input above, `docs/brief.md`, and every file the user attached or referenced (MVP docs, diagrams, screenshots, design references).
- If the repo already has code: list top-level folders and read each manifest (`package.json`, `composer.json`, `app.json`, `pyproject.toml`, …) to learn the real stack and versions.
- Read `.claude/kit/stacks/*.md`. Each is a recipe for one stack.

## 2. Fill the gaps with ONE AskUserQuestion call (max 4 questions)

Only ask what the context doesn't answer. Typical gaps, in priority order:

1. Workspaces / stack (offer the recipes that match, plus "Other")
2. Where it runs during development (physical phone / emulator / browser; laptop constraints like low RAM)
3. Code review and CI (GitHub Actions + CodeRabbit / GitHub Actions only / none yet)
4. Analytics and AI provider, if the brief mentions them but doesn't name a tool

If everything is clear, skip the questions.

## 3. Write `docs/brief.md`

Rewrite it as a clean, complete brief (keep the template's headings). This becomes the reference for everything else. If the user gave a long MVP doc, put it in `docs/` unchanged and link it from the brief — don't duplicate its content.

## 4. Show the plan and ask

Reply with a short summary (bullets, under 15 lines): project name, workspaces + stacks, MVP features, roadmap phases, decisions you'll record, files you'll create or rewrite. Flag any conflicts you found in the user's docs (e.g. two different event lists, an endpoint in one doc but not another) and say which version you'll use.

Then AskUserQuestion, options Yes / No: `Set up the project with this plan?`
On No: ask what to change, update, ask again.

## 5. Generate (on Yes)

For each file below, replace every `KICKOFF:` marker with real content and delete the marker comments.

| File | What to write |
|---|---|
| `AGENTS.md` | Fill every KICKOFF block. Keep generic sections unchanged. Be specific and short. One source of truth: don't repeat what's in `docs/decisions.md`. |
| `<workspace>/CLAUDE.md` | One per workspace, from the stack recipe's "Workspace CLAUDE.md" section, adapted to this project's rules. Create the folder if missing (just the CLAUDE.md, no app code). |
| `docs/decisions.md` | One line per settled decision from the brief and the answers, dated today. |
| `docs/roadmap.md` | Phases from the brief, each a list of `- [ ] NN — task` items small enough for one `/plan` (one PR each). |
| `prompts/_TEMPLATE.md` | Adapt "Manual test steps" to the real device; adapt "Security considerations" bullets to the project. |
| `.github/workflows/ci.yml` | Add a `changes` filter + one job per workspace from each recipe's "CI job". If the user chose no CI, delete the file. |
| `.coderabbit.yaml` | Add `path_instructions` per workspace from each recipe, made specific to this project's models and rules. If no CodeRabbit, delete the file. |
| `.claude/settings.json` | Add each recipe's "Allowed commands" to `allow` and "Ask commands" to `ask`. Keep all existing deny rules. |
| `.github/pull_request_template.md` | Leave as is unless the project needs extra sections. |
| `.gitignore` | Add each recipe's ignore lines. |

Project skills: create a skill in `.claude/skills/<name>/SKILL.md` only for a procedure that will repeat across many tasks and isn't already covered by AGENTS.md (e.g. "add an API endpoint the house way"). Zero is a fine number. Max 3.

Stack with no recipe: write `.claude/kit/stacks/<stack>.md` in the same format, based on the official docs for the version the user named. Mention it in the step 4 summary.

## 6. Verify

- `grep -rn "KICKOFF:" . --include=*.md --include=*.yml --include=*.yaml --include=*.json | grep -v "^./.claude/"` → must be empty (ignore `.claude/kit/` and this command file).
- `.claude/settings.json` parses as JSON; YAML files parse.
- Every workspace listed in AGENTS.md has a `CLAUDE.md`, a CI job (if CI), and a CodeRabbit entry (if CodeRabbit).
- Every command in workspace `CLAUDE.md` "Checks" is allowed or asked in settings.

## 7. Report

Short bullets under **What I set up**, **Next step** (usually `/plan` for roadmap item 01), **Needs your attention** (secrets to create, accounts to sign up for, anything you assumed). Do not commit. Suggest the user review the diff, then `/ship` it as `chore: project setup`.

## 8. Add workspace (mode from step 0)

Read the matching recipe (write one if missing, as in step 5), then: create `<name>/CLAUDE.md`, add the CI job, CodeRabbit entry, settings commands, gitignore lines, and update AGENTS.md sections 6–8 and `docs/roadmap.md`. Show the list of changes and ask Yes / No before writing.
