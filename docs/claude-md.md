# CLAUDE.md

`CLAUDE.md` is a project instruction file that gives Claude Code
context and rules for working on a project.

## Purpose

Use it for things Claude should consistently know about the project.

Examples:

- Tech stack
- Project architecture
- Coding conventions
- Development rules
- Testing requirements
- Important commands
- Things Claude should avoid

## Example

```markdown
# Project Instructions

## Stack

- Next.js
- TypeScript
- Tailwind CSS

## Rules

- Use the existing architecture.
- Keep solutions simple.
- Don't modify unrelated files.
- Explain major architectural decisions.
- Verify changes after implementation.

## Development

- Run the appropriate tests after meaningful changes.
- Review the Git diff before committing.
```

## CLAUDE.md vs Skills

```text
CLAUDE.md
→ Project-specific rules and context

Skill
→ Specialized knowledge or workflow
```

They can be used together.

## Reusable Template

A reusable `CLAUDE.md` should live in:

```text
templates/CLAUDE.md
```

Individual projects can then customize it for their own stack and
requirements.

## Principle

Keep `CLAUDE.md` focused.

Don't put every possible instruction into it. Use Skills for
specialized expertise and keep project-specific information in
`CLAUDE.md`.