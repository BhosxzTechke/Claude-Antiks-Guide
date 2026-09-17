# Claude Code Starter

A simple reusable workflow for working with Claude Code on any software project.

The goal is to use Claude as a **senior technical partner and pair programmer**, not just a code generator.

---

# Workflow

```text
Start Project
     ↓
CLAUDE.md
     ↓
Start Claude Code
     ↓
PLAN MODE
     ↓
Interview
     ↓
Inspect
     ↓
Understand
     ↓
Requirements
     ↓
Capability Discovery
     ↓
High-Level Roadmap
     ↓
Approve
     ↓
plan.md
     ↓
Choose ONE Task
     ↓
Detailed Plan
     ↓
Approve
     ↓
Implement
     ↓
Verify
     ↓
Review
     ↓
Update plan.md
     ↓
Next Task
```

**Understand → Plan → Approve → Implement → Verify → Repeat**

---

# 1. `CLAUDE.md`

Use `CLAUDE.md` for project rules.

```md
# Project Instructions

## Role

Act as my senior software engineer, technical architect, and pair programmer.

Help me understand important technical decisions instead of simply generating code.

## Development

Work incrementally.

Before significant changes:

1. Inspect the relevant code.
2. Explain what you found.
3. Propose the simplest reasonable approach.
4. Identify risks and trade-offs.
5. Wait for approval when appropriate.
6. Implement only the approved scope.
7. Verify the result.

## Architecture

Prefer the simplest architecture that satisfies the current requirements.

Do not create unnecessary:

- components
- hooks
- services
- repositories
- providers
- utilities
- wrappers
- folders
- dependencies

If significant abstraction is needed, explain why first.

## Scope

Do not modify unrelated files.

Do not silently change the technology stack.

Do not add dependencies without explaining why.

## Verification

Run appropriate checks after implementation.

Never claim something was tested if it was not actually tested.

## Safety

Never expose or commit:

- passwords
- API keys
- access tokens
- private credentials
- confidential information

Do not perform destructive operations without approval.
```

---

# 2. Plan Mode

For a new project or major feature, start with Plan Mode.

The purpose is:

**Understand before implementing.**

```text
Plan Mode
    ↓
Interview
    ↓
Inspect
    ↓
Understand
    ↓
Requirements
    ↓
Assumptions
    ↓
Risks
    ↓
Capability Discovery
    ↓
High-Level Roadmap
    ↓
Approve
    ↓
plan.md
```

Do not implement during the interview.

---

# 3. Plan Mode Prompt

```text
You are my senior technical co-founder, software architect, and pair programmer.

I'm about to build a new software project and I want us to be in complete alignment BEFORE any code or final implementation plan is written.

Your job right now is NOT to write code or scaffold the project.

Your job is to INTERVIEW me.

## Rules

1. Ask 3–6 questions at a time.
2. Group questions by topic.
3. Ask the highest-leverage questions first.
4. After each batch, summarize what you understood.
5. Push back when requirements are vague.
6. Give options and trade-offs when useful.
7. Track open questions.
8. If I don't know, propose a sensible ASSUMPTION.
9. Do not silently change my technology choices.
10. Inspect the existing project before making architectural assumptions.
11. Do not implement anything during the interview.

## Explore When Relevant

- Product and users
- Core features
- User journeys
- Data model
- Authentication
- Architecture
- APIs and integrations
- State and data flow
- Edge cases
- Performance
- Accessibility
- Security
- SEO
- Cost
- Testing
- Deployment
- Monitoring
- Future requirements

## Capability Discovery

Determine whether this project actually needs:

- Skills
- MCP
- Agents
- Browser automation
- Testing tools
- Design tools
- External documentation
- Other specialized tools

Do not install anything automatically.

If something would materially help, explain:

1. What it is
2. Why it is useful
3. Whether it is required or optional
4. How to add it

If nothing is needed, continue without adding anything.

## When Discovery Is Complete

Provide:

1. Project specification
2. Confirmed decisions
3. Assumptions
4. Open questions
5. Risks
6. Architecture summary
7. High-level roadmap

Then ask:

"Ready for me to turn this into an implementation plan?"

Do not implement until I approve.

After approval, create or update `plan.md`.
```

---

# 4. `plan.md`

Use `plan.md` as the persistent project roadmap.

```md
# Implementation Plan

## Status

In Progress

## Completed

- [x] Project setup

## Current

- [ ] Current task

## Next

- [ ] Next task
- [ ] Testing
- [ ] Deployment

## Decisions

- Decision made during planning

## Risks

- Known risk
```

Keep it updated as the project progresses.

---

# 5. One Task at a Time

Do not ask Claude to build the entire roadmap at once.

Use:

```text
Choose ONE Task
      ↓
Inspect
      ↓
Detailed Plan
      ↓
Approve
      ↓
Implement
      ↓
Verify
      ↓
Review
      ↓
Update plan.md
      ↓
Next Task
```

Prompt:

```text
Focus only on this task:

[TASK]

Before writing code:

1. Inspect the relevant files.
2. Explain the current implementation.
3. Identify the files that need to change.
4. Propose the simplest approach.
5. Identify risks and trade-offs.
6. Identify whether any available capability would help.

Create the detailed implementation plan.

Do not implement yet.
```

---

# 6. Implementation

After approval:

```text
Approved.

Implement only the approved plan.

- Do not modify unrelated files.
- Do not add unnecessary dependencies.
- Do not refactor unrelated code.
- Do not start the next task.

After implementation:

1. Verify the result.
2. Run appropriate checks.
3. Report what changed.
4. Report what was verified.
5. Report remaining issues.
```

---

# 7. UI Visual Fidelity Loop

When a UI has a reference image, screenshot, Figma design, or other visual reference, treat it as the **source of truth**.

![Build & Verify Loop](assets/diagrams/build-and-verify-loop.png)

```text
Reference
    ↓
Analyze
    ↓
Implement
    ↓
Take a Screenshot
    ↓
Compare to Design
    ↓
Identical?
 ├── Yes → Move On
 └── No  → Keep Going
             ↓
           Iterate
             ↓
            Build
```

Use this prompt:

```text
I have attached a visual reference for this UI.

Build the UI to match the reference as closely as possible.

After implementing it, put yourself into a visual verification loop.

Take a screenshot of the running application and compare it against the reference.

If there are differences, fix them.

Then take another screenshot and compare again.

Keep repeating:

Implement → Screenshot → Compare → Fix → Screenshot → Compare → Fix

Do not stop after the first implementation if there are still noticeable differences.

Pay attention to:

- layout
- spacing
- positioning
- sizing
- typography
- colors
- cards
- buttons
- icons
- images
- borders
- shadows
- animations
- responsive behavior
- overall composition

The reference is the source of truth.

Do not redesign or add your own interpretation unless something cannot technically be reproduced.

If something cannot be matched exactly, explain the limitation instead of silently replacing it.

Only work on the current UI task.

Do not move to the next section until the current UI has been visually verified.
```

---

# 8. Skills

Skills are **optional**.

Do not install Skills before every project.

Ask Claude to determine whether one is actually useful.

```text
Before implementing this task, determine whether any available Skills would materially improve the result.

Do not install anything automatically.

Tell me:

1. Which Skill would help.
2. Why it would help.
3. Required or optional.
4. Whether an existing capability already covers it.

If nothing is needed, continue without adding anything.
```

---

# 9. Skills vs MCP vs Agents

| Tool | Purpose |
|---|---|
| `CLAUDE.md` | Project rules |
| Skill | Specialized knowledge/workflow |
| MCP | External tools/services |
| Agent | Specialized workflow |
| Plan Mode | Discovery and planning |
| `plan.md` | Persistent roadmap |

```text
CLAUDE.md → How Claude should work
Skill     → Specialized knowledge
MCP       → External capabilities
Agent     → Specialized workflow
Plan Mode → What are we building?
plan.md   → What are we doing next?
```

---

# 10. Debugging

```text
Problem
   ↓
Reproduce
   ↓
Inspect
   ↓
Root Cause
   ↓
Explain
   ↓
Smallest Fix
   ↓
Approve
   ↓
Implement
   ↓
Verify
```

Prompt:

```text
Investigate this problem.

Do not change anything yet.

First:

1. Reproduce or inspect the issue.
2. Identify the root cause.
3. Explain why it happens.
4. Identify the smallest reasonable fix.
5. Identify which files would change.
6. Identify any risks.

Wait for approval before implementing.
```

---

# 11. Code Review

```text
Review the current implementation as a senior engineer.

Do not modify anything.

Check:

- correctness
- architecture
- simplicity
- maintainability
- performance
- accessibility
- security
- edge cases
- unnecessary complexity
- unnecessary dependencies

Classify findings as:

CRITICAL
IMPORTANT
OPTIONAL

Only recommend changes that provide meaningful value.
```

---

# 12. Context Management

Keep important information inside the project:

```text
CLAUDE.md
PRODUCT.md
plan.md
docs/
source code
tests
```

When a conversation becomes very large, start a new conversation and tell Claude:

```text
Read CLAUDE.md, PRODUCT.md, and plan.md.

Inspect the current project.

Summarize:

1. what has been completed
2. what is currently in progress
3. what remains

Do not modify anything yet.
```

The project files remain the source of truth.

---

# 13. Learning Mode

When you want to understand the code:

```text
Explain this implementation like a senior developer mentoring me.

Explain:

1. what the code does
2. why it is structured this way
3. the important concepts
4. alternatives we could use
5. why this approach was chosen

Do not modify the code.
```

---

# 14. Golden Rules

1. **Understand before building.**
2. **Interview before assuming.**
3. **Plan before significant changes.**
4. **One task at a time.**
5. **Inspect before modifying.**
6. **Prefer simple architecture.**
7. **Skills are optional.**
8. **Do not install tools blindly.**
9. **Verify the implementation.**
10. **For UI, compare against the reference.**
11. **Use screenshots for visual verification.**
12. **Keep scope controlled.**
13. **Explain important decisions.**
14. **Keep `plan.md` updated.**
15. **You remain in control.**

---

# Final Workflow

```text
NEW PROJECT
     ↓
CLAUDE.md
     ↓
CLAUDE CODE
     ↓
PLAN MODE
     ↓
INTERVIEW
     ↓
INSPECT
     ↓
UNDERSTAND
     ↓
CAPABILITY DISCOVERY
     ↓
ROADMAP
     ↓
APPROVE
     ↓
plan.md
     ↓
ONE TASK
     ↓
PLAN
     ↓
APPROVE
     ↓
IMPLEMENT
     ↓
VERIFY
     ↓
REVIEW
     ↓
UPDATE plan.md
     ↓
NEXT TASK
```

For UI:

```text
REFERENCE
     ↓
ANALYZE
     ↓
IMPLEMENT
     ↓
SCREENSHOT
     ↓
COMPARE
     ↓
FIX
     ↓
SCREENSHOT
     ↓
COMPARE
     ↓
VERIFY
```

**Use Claude to think with you, not simply code for you.**