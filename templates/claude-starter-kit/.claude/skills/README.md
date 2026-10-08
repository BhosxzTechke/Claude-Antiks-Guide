# Project skills

Each skill is a folder with a `SKILL.md`:

```
.claude/skills/add-api-endpoint/SKILL.md
```

```markdown
---
name: add-api-endpoint
description: Use when adding or changing an API endpoint in api/. Covers route, Form Request, Policy, Resource, and the ownership test.
---

1. …
```

Add a skill only for a procedure that repeats across many tasks and isn't already covered by `AGENTS.md` or a workspace `CLAUDE.md`. `/kickoff` creates 0–3 of these. When the same correction comes up in two different tasks, that's a sign it belongs in a skill.
