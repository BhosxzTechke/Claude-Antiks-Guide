@AGENTS.md
# CLAUDE.md

<!-- TEMPLATE: run /init first, then shape the result like this. Delete these comments. Keep it under ~50 lines. -->

<Project name> — <one line: what the app does>.

## Commands

- `npm run dev` — dev server
- `npm run lint` — lint
- `npx tsc --noEmit` — typecheck
- <test command, or "No test runner yet">

## Gotchas

<!-- Only things Claude can't learn by reading the code: non-default config, version quirks, environment limits. -->
- <e.g. Tailwind v4 is wired through Turbopack, not PostCSS>

## Spec Kit

Features follow the `speckit-*` skills in `.claude/skills` (specify → clarify → plan → tasks → analyze → implement). Specs live in `specs/NNN-name/`.

## Working with me

Explain your reasoning in simple English. Product and engineering rules live in `.specify/memory/constitution.md` — don't repeat them here.
