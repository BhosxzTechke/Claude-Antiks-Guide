---
description: Branch, commit, push and open a PR for the current task.
argument-hint: [optional prompt file, e.g. prompts/03-memory-crud.md]
---

Prompt file: $ARGUMENTS (if empty, use the most recent file in `prompts/` that matches the changes).

1. If the last `/check` in this session was not all green, run the `/check` steps first. Stop if anything fails.
2. If on `main`, create a branch named after the prompt: `feat/NN-short-name` (`fix/…` for bug fixes, `chore/…` for setup). Never commit to `main`.
3. Show `git status` and stage only files that belong to this task. Never stage `.env` files, credentials, build output, or `.vibe-wise/`.
4. If `docs/roadmap.md` has a matching item, tick it `- [x]`.
5. Commit with a conventional message, e.g. `feat(api): memory CRUD endpoints`, and a body line `Prompt: prompts/NN-name.md`.
6. Push the branch (`git push -u origin <branch>`) and open a PR with `gh pr create`. Title = commit subject. Body (follows `.github/pull_request_template.md`):
   - Prompt: link to the prompt file
   - What I did (short bullets)
   - Test (numbered manual steps from the prompt)
   - Checks (the `/check` table)
   - Needs your attention (or "None")
7. Do not merge. Reply with one line: the PR link and "Waiting for review + CI." Then suggest `/clear` before the next task.
