---
description: Write an implementation prompt in prompts/ and ask for approval. No code.
argument-hint: <what to build, e.g. "memory CRUD endpoints">
---

Task: $ARGUMENTS

Follow AGENTS.md section 2, steps 1–5. Do not write or edit any application code.

1. Read AGENTS.md (already loaded), `docs/decisions.md`, and the `CLAUDE.md` of every workspace this task touches.
2. List `.claude/skills/` and read any skill that matches the task.
3. Inspect the existing code and config the task depends on. Note what you actually read.
4. If the task is genuinely ambiguous, ask ONE focused question with AskUserQuestion, then continue.
5. Pick the next number: highest `NN` in `prompts/` + 1 (start at `01`). Name the file `prompts/NN-short-kebab-name.md`.
6. Fill it using `prompts/_TEMPLATE.md`. Every section is required. Keep scope to exactly this task; list anything tempting but out of scope under "Not doing".
7. Ask with AskUserQuestion, options Yes / No: `I prepared the implementation prompt at prompts/NN-name.md. Is this good to execute?`

If Yes: implement strictly to the prompt, then run `/check`. If No: ask what to change, update the prompt, and ask again.
