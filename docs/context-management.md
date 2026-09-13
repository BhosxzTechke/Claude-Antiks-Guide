# Context Management

Claude works better when it has the right context and clear boundaries.

## Give Claude the Right Context

Before asking Claude to make changes, provide or let it inspect:

- Relevant files
- Existing architecture
- Requirements
- Constraints
- Errors or expected behavior

Don't dump unrelated information into the conversation.

## Keep Tasks Focused

Prefer small, connected tasks:

```text
Inspect
→ Plan
→ Implement
→ Verify
→ Review
```

Instead of asking Claude to build an entire system in one prompt.

## When Context Gets Too Large

If the conversation becomes long or confusing:

1. Finish the current logical task.
2. Summarize important decisions.
3. Start a fresh conversation if necessary.
4. Give Claude the relevant files and context again.

## Persistent Context

Use project files for information Claude should repeatedly know:

```text
CLAUDE.md
→ Project rules and context

Skills
→ Specialized knowledge and workflows

Documentation
→ Project-specific knowledge
```

Don't rely on the conversation history for permanent project information.

## Principle

Good context is:

```text
Relevant
Specific
Current
Minimal
```

More context does not automatically mean better results.