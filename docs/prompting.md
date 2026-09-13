# Prompting Claude Code

Good prompts give Claude clear context, boundaries, and a specific goal.

## Core Pattern

Use:

```text
Context
→ Goal
→ Constraints
→ Expected output
→ Verification
```

## Example

Instead of:

```text
Make the navbar better.
```

Use:

```text
Inspect the current navbar first.

Goal:
Improve the navbar visual hierarchy and spacing.

Constraints:
- Keep the existing architecture.
- Don't change unrelated components.
- Keep it responsive.
- Don't add unnecessary dependencies.

Before coding:
Explain what you would change and why.

Then implement the smallest appropriate change.

Finally:
- Run the relevant checks.
- Summarize what changed.
- Mention any remaining issues.
```

## Useful Prompt Patterns

### Inspect First

```text
Inspect the relevant files first.
Do not modify anything yet.
Explain what you found.
```

### Plan First

```text
Create a short implementation plan.
Wait for approval before making changes.
```

### Learn While Building

```text
Explain the important decisions before implementing them.
Don't hide architectural changes from me.
```

### Bounded Changes

```text
Only modify files necessary for this task.
Do not refactor unrelated code.
```

### Debugging

```text
Investigate the root cause first.
Don't immediately apply a workaround.
Explain the cause, then propose the smallest fix.
```

### Review

```text
Review the current implementation.
Look for bugs, unnecessary complexity, accessibility issues,
and maintainability problems.
Don't modify anything yet.
```

## Avoid

Avoid vague prompts such as:

```text
Make it better.
Fix everything.
Build the whole thing.
Do whatever you think is best.
```

These give Claude too much freedom and make it harder to learn
what is actually happening.

## Principle

Don't use Claude only as a code generator.

Use it as:

```text
Researcher
→ Planner
→ Pair Programmer
→ Reviewer
→ Debugger
```

The goal is to understand the system while Claude helps build it.