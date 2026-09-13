# Claude Code Skills

Skills give Claude specialized instructions, knowledge, or workflows
for specific types of tasks.

## Purpose

Use Skills when a task requires specialized expertise that should be
separate from the project's general `CLAUDE.md` instructions.

Examples:

- Frontend design
- Testing
- Documentation
- Data analysis
- Security
- Deployment

## Where Skills Live

Project-level Skills are commonly stored as:

```text
.claude/
└── skills/
    └── skill-name/
        └── SKILL.md
```

## CLAUDE.md vs Skills

```text
CLAUDE.md
→ Project rules and context

Skill
→ Specialized expertise or workflow
```

They can be used together.

## Official Skills

Prefer official Skills from trusted sources when they already exist.

For Anthropic's official Claude Code Skills:

https://github.com/anthropics/claude-code

Specific Skills should be documented separately in:

```text
skills/<skill-name>/README.md
```

## Before Installing a Skill

Check:

1. What problem does it solve?
2. Who maintains it?
3. Is there an official source?
4. What does it actually do?
5. Is it relevant to my project?
6. Does it overlap with another Skill?

Don't install Skills just because they are available.

## Reusable Workflow

```text
Need
→ Find
→ Evaluate
→ Install
→ Verify
→ Use
```

## Principle

Use the right Skill for the right task.

Prefer a small collection of useful Skills over installing everything.