# Project Instructions

This file contains project-specific instructions for Claude Code.

---

# Project Context

Before making changes, inspect the existing project and understand the current
implementation.

Do not invent:

- Requirements
- Features
- Content
- Project information
- Metrics
- Testimonials
- URLs
- Technical decisions

If important information is missing, use `TBD` or ask before implementing.

---

# Project Goal

## What We Are Building

```text
TBD
```

## Primary Users

```text
TBD
```

## Primary Goal

```text
TBD
```

---

# Visual References

Project-specific visual references are stored in:

```text
references/
└── visual/
```

Use these references when making frontend decisions.

Treat them as design references, not production assets.

Do not copy branding, text, private information, or proprietary assets from
the references.

For detailed frontend design guidance, use the project's installed
`frontend-design` and `impeccable` Skills.

---

# Architecture

Use the simplest architecture that supports the current project.

Do not create unnecessary:

- Components
- Hooks
- Contexts
- Services
- Utilities
- Abstractions
- Dependencies

Extract or abstract something only when there is a clear reason.

If a significant architectural change is needed, explain it before
implementing it.

---

# Development Workflow

Use Claude Code as a development partner.

Follow:

```text
Understand
    ↓
Inspect
    ↓
Plan
    ↓
Implement
    ↓
Verify
    ↓
Review
```

For larger tasks:

```text
Inspect
    ↓
Explain
    ↓
Plan
    ↓
Approve
    ↓
Implement
    ↓
Verify
```

Do not modify unrelated files.

---

# Implementation Rules

- Keep changes focused.
- Follow existing project conventions.
- Reuse existing solutions when appropriate.
- Preserve working functionality.
- Avoid unnecessary dependencies.
- Keep code readable.
- Do not silently change unrelated behavior.

---

# Content Accuracy

Never fabricate project information.

Do not invent:

- Results
- Technologies
- Responsibilities
- Metrics
- Testimonials
- Dates
- Client information
- Links

If information is unknown:

```text
TBD
```

---

# Verification

After implementation, verify the change when possible.

Depending on the project:

```text
TypeScript
Lint
Build
Tests
Browser
Responsive behavior
Accessibility
```

Do not claim something works without verifying it.

---

# Git Safety

Do not reset, revert, delete, or overwrite unrelated work.

Before completing significant work:

```text
Review changes
    ↓
Test
    ↓
Review diff
```

Only commit when requested or approved.

---

# Security

Never expose or commit:

- API keys
- Passwords
- Tokens
- Secrets
- Private credentials
- Private client information

Use environment variables and appropriate secret management.

---

# Communication

When working with me:

- Explain important decisions.
- Point out risks.
- Tell me when information is missing.
- Do not silently fix unrelated problems.
- Ask before making consequential assumptions.

The goal is to help me understand the project and become a better developer,
not simply generate code.

---

# Final Principle

Use the simplest setup that supports the project.

```text
Simple
   +
Intentional
   +
Understandable
   =
Better Development Workflow
```