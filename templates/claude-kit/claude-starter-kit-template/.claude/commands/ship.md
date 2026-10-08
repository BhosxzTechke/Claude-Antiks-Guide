---
description: Prepare branch, commit and PR, show you everything, and only push after you say Yes.
argument-hint: [optional prompt file, e.g. prompts/03-memory-crud.md]
---

Prompt file: $ARGUMENTS (if empty, use the most recent file in `prompts/` that matches the changes; if none matches, ask).

## Prepare (no side effects yet)

1. **Checks.** If the last `/check` in this session was not all green, run the `/check` steps now. If anything fails, stop and report.
2. **Branch name.** If on `main`, plan a branch `feat/NN-short-name` (`fix/…` for bug fixes, `chore/…` for setup). Never commit to `main`.
3. **Files.** From `git status`, choose only the files that belong to this task. Never include `.env` files, credentials, build output, or unrelated changes.
4. **Commit message.** Conventional, e.g. `feat(api): memory CRUD endpoints`, with a body line `Prompt: prompts/NN-name.md`.
5. **PR body:**
   - **Prompt:** link to the prompt file
   - **What I did:** short bullets
   - **Test:** numbered manual steps from the prompt
   - **Checks:** the `/check` table
   - **Needs your attention:** bullets or "None"

## Ask

Show the user, in one short message: branch name, file list (with anything you left out and why), commit message, PR title.

Then AskUserQuestion:
- Question: `Ship this? It will commit, push the branch, and open a PR.`
- Options: **Ship it** · **Commit only (no push)** · **Change something** · **Cancel**

## Do (only after the answer)

- **Ship it:** create the branch, stage the chosen files, commit, push with `git push -u origin <branch>`, open the PR with `gh pr create` (title = commit subject, body from step 5). If `docs/roadmap.md` has a matching item, tick it `- [x]` in the same commit.
- **Commit only:** create the branch, stage, commit. Stop. Tell the user `/ship` again will push.
- **Change something:** ask what, update, show again, ask again.
- **Cancel:** do nothing.

Never merge, never force-push. Reply with one line: the PR link and "Waiting for review + CI." Then suggest `/clear` before the next task.
