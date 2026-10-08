---
description: Write an implementation prompt in prompts/ and ask for approval. No code until Yes.
argument-hint: [what to build, e.g. "memory CRUD endpoints"] — empty = next roadmap item
---

Task: $ARGUMENTS

Follow AGENTS.md section 2. Do not write or edit application code until the user says Yes.

1. **Pick the task.** If the task above is empty, take the first unchecked `- [ ]` item in `docs/roadmap.md` and say which one you picked.
2. **Read** AGENTS.md (already loaded), `docs/decisions.md`, and the `CLAUDE.md` of every workspace this task touches. List `.claude/skills/` and read any skill that matches.
3. **Inspect** the code and config the task depends on. Note exactly which files you read.
4. **Check the size.** If the task needs more than ~15 files or spans unrelated features, propose splitting it (AskUserQuestion: the split vs. keep as one) before writing.
5. **Ask** ONE focused question with AskUserQuestion only if the task is genuinely ambiguous.
6. **Number it:** highest `NN` in `prompts/` + 1 (start at `01`). If it came from the roadmap, reuse the roadmap's number. File: `prompts/NN-short-kebab-name.md`.
7. **Fill** it from `prompts/_TEMPLATE.md`. Every section is required. Keep scope to exactly this task; tempting extras go under "Not doing".
8. **Ask** with AskUserQuestion:
   - Question: `I prepared the implementation prompt at prompts/NN-name.md. Is this good to execute?`
   - Options: **Yes** · **No, change something**

On **Yes**: implement strictly to the prompt. If you discover the prompt is wrong or incomplete, stop, update the prompt, and ask again. When done, run the `/check` steps and report (What I did / Test / Needs your attention). Do not commit — the user runs `/ship` when ready.

On **No**: ask what to change, update the prompt, and ask again.
