# Claude Code Starter

A reusable starting system for working with Claude Code on **any software project**.

The goal is to use Claude as a **senior technical partner and pair programmer**, not simply as a code generator.

---

# 1. Core Workflow

Use this as the default workflow:

```text
Start Project
     ↓
CLAUDE.md
     ↓
Project Context
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
Review
     ↓
plan.md
     ↓
Choose ONE Task
     ↓
Detailed Task Plan
     ↓
Review
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

> **Understand → Plan → Approve → Implement → Verify → Repeat**

---

# 2. Start a Project

Create or open the project using the appropriate technology.

Examples:

```bash
npx create-next-app@latest my-project
```

```bash
composer create-project laravel/laravel my-project
```

```bash
npm create vite@latest my-project
```

Then:

```bash
cd my-project
claude
```

Do not immediately ask Claude to build the entire project.

Start with discovery.

---

# 3. `CLAUDE.md`

`CLAUDE.md` contains the rules Claude should follow while working on the project.

Use this as a starting template:

```md
# Project Instructions

## Role

Act as my senior software engineer, technical architect, and pair programmer.

Help me understand important technical decisions instead of simply generating code.

## Development

Work incrementally.

Before significant changes:

1. Inspect the relevant code.
2. Understand the existing implementation.
3. Explain what you found.
4. Propose the simplest reasonable approach.
5. Identify risks and trade-offs.
6. Wait for approval when appropriate.
7. Implement only the approved scope.
8. Verify the result.

## Architecture

Prefer the simplest architecture that satisfies the current requirements.

Do not create abstractions because they might be useful later.

Avoid unnecessary:

- components
- hooks
- services
- repositories
- providers
- utilities
- wrappers
- folders
- dependencies

If introducing significant abstraction, explain why first.

## Scope

Do not modify unrelated files.

Do not silently change the technology stack.

Do not introduce dependencies without explaining why they are necessary.

## Learning

Explain important technical decisions and concepts when relevant.

Do not hide significant implementation decisions.

## Verification

After implementation:

- run appropriate checks
- inspect the result
- identify failures
- fix relevant problems
- explain what was verified

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

# 4. Project Context

Use additional context files when they provide real value.

```text
project/
├── CLAUDE.md
├── PRODUCT.md
├── plan.md
├── docs/
└── source-code/
```

| File | Purpose |
|---|---|
| `CLAUDE.md` | Rules for Claude |
| `PRODUCT.md` | Product/business context |
| `plan.md` | Persistent implementation roadmap |
| `docs/` | Detailed documentation |

Do not create files just for the sake of creating them.

---

# 5. `PRODUCT.md`

Use `PRODUCT.md` for product requirements and business context.

Example:

```md
# Product

## Overview

[What are we building?]

## Problem

[What problem does it solve?]

## Users

[Who will use it?]

## Goals

- [Goal 1]
- [Goal 2]

## Core Features

- [Feature 1]
- [Feature 2]

## Out of Scope

- [Thing we are not building]

## Constraints

- [Constraint]
```

Keep product decisions separate from Claude-specific instructions.

---

# 6. Plan Mode

For substantial projects or major features, start with Plan Mode.

The purpose is:

> **Understand before implementing.**

```text
Plan Mode
    ↓
Interview
    ↓
Inspect Project
    ↓
Clarify
    ↓
Assumptions
    ↓
Risks
    ↓
Capability Discovery
    ↓
High-Level Roadmap
    ↓
Review
    ↓
plan.md
```

Do not start implementation during the interview.

---

# 7. Universal Plan Mode Prompt

```text
PLAN MODE PROMPT

You are my senior technical co-founder, software architect, and pair programmer.

I'm about to build a new software project and I want us to be in complete alignment BEFORE any code or final implementation plan is written.

Your job right now is NOT to write code, scaffold the project, or immediately produce the implementation plan.

Your job is to INTERVIEW me.

## Interview Rules

1. Ask 3–6 questions at a time.
2. Group questions by topic.
3. Ask the highest-leverage and most ambiguous questions first.
4. After each batch, summarize what you understood in 1–2 sentences.
5. Then continue with the next batch.
6. If something is vague, push back.
7. When useful, give 2–3 options with trade-offs and recommend a default.
8. Flag conflicts with earlier decisions.
9. Track open questions.
10. If I say "I don't know", propose a sensible default labeled ASSUMPTION.
11. Prefer the technology stack and constraints I explicitly provide.
12. Do not silently replace technologies.
13. Do not introduce major dependencies without explaining why.
14. Inspect the existing project before making architectural assumptions.
15. Do not implement anything during the interview.

## Explore When Relevant

### Product
- What are we building?
- Who is it for?
- What problem does it solve?
- What is the primary goal?
- What is out of scope?

### Requirements
- Core features
- User journeys
- Edge cases
- First-version requirements

### Data
- Entities
- Relationships
- Persistence
- Storage
- Data flow

### Authentication
- Authentication
- Authorization
- Roles
- Permissions

### Architecture
- Frontend
- Backend
- Database
- APIs
- State management
- Server/client boundaries
- Caching
- Background jobs

### Integrations
- APIs
- Payments
- Email
- Storage
- Analytics
- AI
- Third-party services

### Non-functional
- Performance
- Accessibility
- Security
- SEO when relevant
- Reliability
- Scalability
- Cost
- Maintainability

### Delivery
- Development environment
- Production
- CI/CD
- Testing
- Monitoring
- Deployment

## Capability Discovery

Determine whether the project would benefit from:

- Skills
- MCP integrations
- Agents
- browser automation
- testing tools
- design tools
- external documentation
- specialized tooling

Do NOT assume everything needs to be installed.

If a capability is genuinely useful, explain:

1. What is needed.
2. Why it is useful.
3. Required or optional.
4. Simplest way to add it.

If unavailable, tell me instead of pretending you can use it.

## When Discovery Is Complete

Produce:

1. Concise project specification
2. Confirmed decisions
3. Assumptions
4. Open questions
5. Risks
6. Architecture summary
7. High-level implementation roadmap

Then ask:

"Ready for me to turn this into an implementation plan?"

Do not implement until I approve.

After approval, create or update `plan.md`.

Begin with the first batch of questions.
```

---

# 8. Capability Discovery

Do not install Skills, MCP servers, or agents before knowing whether they are needed.

Use:

```text
Requirement
    ↓
Capability needed?
    ↓
No → Continue
    ↓
Yes
    ↓
Check available capabilities
    ↓
Use existing capability
    ↓
Unavailable → Recommend installation
```

The goal is a **clean environment with only useful capabilities**.

---

# 9. Skills

Skills provide specialized knowledge or workflows.

Examples:

```text
frontend-design
impeccable
playwright
document skills
deployment skills
```

These are optional.

Do not install dozens of Skills just because they are available.

Ask Claude:

```text
Before implementing this task, determine whether any available Skills would materially improve the result.

Do not install anything automatically.

Tell me:

1. Which Skill would help.
2. Why it would help.
3. Whether it is required or optional.
4. Whether an existing capability already covers it.

If nothing is needed, continue without adding anything.
```

---

# 10. Skills vs MCP vs Agents

| Capability | Purpose |
|---|---|
| `CLAUDE.md` | Project rules |
| Skill | Specialized knowledge/workflow |
| MCP | External system/tool connection |
| Agent | Specialized workflow |
| Plan Mode | Discovery and planning |
| `plan.md` | Persistent roadmap |

Mental model:

```text
CLAUDE.md
"What rules should Claude follow?"

Skill
"How should Claude approach this specialized work?"

MCP
"What external system can Claude interact with?"

Agent
"Who should handle this specialized workflow?"

Plan Mode
"What exactly are we building?"

plan.md
"What is our implementation roadmap?"
```

---

# 11. One Task at a Time

A roadmap may contain:

```text
1. Setup
2. Authentication
3. Database
4. API
5. Frontend
6. Testing
7. Deployment
```

Implementation should still happen one task at a time.

```text
Choose ONE task
      ↓
Detailed plan
      ↓
Approve
      ↓
Implement
      ↓
Verify
```

Do not implement the entire roadmap in one request.

---

# 12. Detailed Task Planning

Use:

```text
Focus only on this task:

[TASK]

Before writing code:

1. Inspect the relevant files.
2. Explain how the current implementation works.
3. Identify the files that need to change.
4. Propose the simplest implementation.
5. Identify risks and trade-offs.
6. Identify whether any available capability would materially help.
7. Identify new dependencies or abstractions.
8. Explain why they are necessary.

Then provide the implementation plan.

Do not implement yet.
```

---

# 13. Approval

If the plan is correct:

```text
Approved. Implement the plan.
```

If something needs changing:

```text
Change [specific part].

Keep everything else the same.

Do not implement yet.
```

Keep planning and implementation separate.

---

# 14. Implementation

After approval:

```text
Approved.

Implement only the approved plan.

Constraints:

- do not modify unrelated files
- do not add unnecessary dependencies
- do not refactor unrelated code
- preserve the existing architecture unless the approved plan requires a change
- do not start the next task

After implementation:

1. verify the result
2. run appropriate checks
3. report what changed
4. report what was verified
5. report remaining issues

Do not claim verification for anything you did not test.
```

---

# 15. Reference-Based UI

When a project includes screenshots, Figma designs, websites, or other visual references, treat them differently from general inspiration.

If exact visual reproduction matters:

```text
Reference
    ↓
Analyze
    ↓
Inspect current implementation
    ↓
Plan
    ↓
Approve
    ↓
Implement
    ↓
Browser screenshot
    ↓
Visual comparison
    ↓
Correct
    ↓
Verify
```

The reference should be treated as the **visual specification**.

Do not simply ask:

> "Make it look like this."

Instead:

```text
The provided reference is the visual source of truth.

Do not redesign or loosely reinterpret it.

Reproduce the visual composition as closely as technically possible.

Compare:

- layout
- dimensions
- proportions
- spacing
- alignment
- typography
- font weight
- colors
- borders
- radius
- shadows
- rotations
- imagery
- icons
- responsive behavior
- animation and interaction

If something cannot be matched exactly, identify the limitation instead of silently substituting something else.
```

---

# 16. Visual Analysis Before Implementation

For reference-driven UI, first ask Claude to analyze.

```text
Before modifying anything:

1. Inspect the reference.
2. Inspect the current implementation.
3. Compare them element by element.
4. Identify the important visual measurements and relationships.
5. Identify assets, fonts, icons, or graphics that may be required.
6. Identify anything that cannot be reproduced exactly.

Classify each element:

MATCH
CLOSE
NOTICEABLY DIFFERENT

Do not implement yet.
```

This prevents Claude from immediately guessing.

---

# 17. Browser Verification for UI

When browser tooling is available, use it to validate the actual rendered page.

For example, Playwright can:

```text
Open the local application
        ↓
Set viewport
        ↓
Find elements
        ↓
Measure bounding boxes
        ↓
Inspect computed styles
        ↓
Take screenshots
        ↓
Compare against reference
```

Useful measurements include:

- `x`
- `y`
- width
- height
- spacing
- computed styles
- viewport dimensions

Browser verification should complement visual comparison, not replace it.

---

# 18. Visual Correction Loop

After implementation:

```text
Implementation
      ↓
Screenshot
      ↓
Compare
      ↓
Identify biggest differences
      ↓
Targeted correction
      ↓
Screenshot again
      ↓
Verify
```

Use a bounded loop:

```text
Maximum 2 visual correction iterations
```

unless more iterations are explicitly requested.

Do not randomly tweak values.

Fix the most noticeable differences first.

---

# 19. Assets and Fonts

If the reference contains:

- custom typography
- logos
- illustrations
- icons
- textures
- custom graphics

do not automatically replace them with a random font or icon library.

First determine whether the exact asset exists.

If not, present the options:

```text
1. Find the correct asset/font
2. Recreate it with SVG/CSS
3. Use the closest available alternative
```

Let the user decide when the difference is significant.

---

# 20. Accessibility

Consider accessibility during implementation.

Check:

- semantic HTML
- keyboard navigation
- focus states
- color contrast
- labels
- button names
- image alternatives
- heading hierarchy
- reduced motion

Review with:

```text
Review this implementation for accessibility.

Do not modify anything.

Identify the highest-priority issues and explain how they should be fixed.
```

---

# 21. Performance

Depending on the project, review:

- images
- JavaScript
- CSS
- fonts
- third-party scripts
- network requests
- rendering
- caching
- database queries
- unnecessary dependencies

Use:

```text
Review this implementation for performance issues.

Do not modify anything.

Identify the highest-impact problems and explain why they matter.
```

---

# 22. SEO

For projects where SEO matters, consider:

- titles
- descriptions
- canonical URLs
- headings
- semantic HTML
- structured data
- Open Graph
- sitemap
- robots
- internal linking
- image metadata
- crawlability
- performance

Use real content and real information.

---

# 23. Content Accuracy

Never fabricate:

- statistics
- testimonials
- customer results
- awards
- certifications
- analytics
- performance measurements
- user numbers
- business claims

If information is unknown:

```text
Do not invent the value.

Mark it as unknown or ask for the real value.
```

---

# 24. Debugging

Use:

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

# 25. Architecture

Prefer the simplest architecture that satisfies current requirements.

Do not automatically create:

```text
services/
repositories/
factories/
providers/
hooks/
utilities/
adapters/
```

unless the project actually needs them.

Ask:

```text
Does this abstraction solve a current problem?

If yes, explain why.

If no, keep the implementation simpler.
```

---

# 26. Dependencies

Before installing a dependency:

```text
Do we actually need this dependency?

Can the framework, existing dependencies, or standard platform APIs solve the problem?

If the dependency is justified, explain why before installing it.
```

---

# 27. Scope Control

Use:

```text
If you encounter an unrelated issue, tell me about it.

Do not fix unrelated issues automatically.

Do not expand the scope without approval.
```

One task should not silently become multiple unrelated tasks.

---

# 28. Git Safety

Before destructive Git operations:

```text
Do not execute destructive Git operations.

Explain what the command would do first and wait for approval.
```

Be especially careful with:

```bash
git reset --hard
git clean
git push --force
git rebase
```

Before committing:

```text
Review the current Git changes.

Show me:

- modified files
- new files
- deleted files
- important implementation changes
- potential problems

Do not commit yet.
```

---

# 29. Code Review

After a meaningful task:

```text
Review the current implementation as a senior engineer.

Do not modify anything.

Evaluate:

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

# 30. `plan.md`

Use `plan.md` as the persistent roadmap.

Example:

```md
# Implementation Plan

## Status

In Progress

## Completed

- [x] Project setup
- [x] Database setup
- [x] Authentication

## Current

- [ ] API implementation

## Next

- [ ] Frontend integration
- [ ] Testing
- [ ] Deployment

## Decisions

- Use the existing authentication system.
- Avoid adding a state-management library unless requirements require it.

## Risks

- Third-party API rate limits need confirmation.
```

Update it after meaningful changes.

---

# 31. Context Management

Keep important project information in files instead of relying entirely on conversation history.

Useful sources:

```text
CLAUDE.md
PRODUCT.md
plan.md
docs/
source code
tests
```

When a task is complete, a fresh conversation can provide a cleaner working context.

The project files remain the source of truth.

---

# 32. Learning From Claude

When you want to understand an implementation:

```text
Explain this implementation like a senior developer mentoring me.

Explain:

1. what the code does
2. why it is structured this way
3. the important concepts involved
4. alternatives we could have used
5. why this approach was chosen

Do not modify the code.
```

For unfamiliar technologies:

```text
I am learning this technology.

Do not jump directly to the final implementation.

First explain the concept and approach.

Then show the smallest necessary implementation.

Explain the important parts afterward.
```

---

# 33. When Requirements Change

Do not silently rewrite the architecture.

Use:

```text
This requirement has changed:

[NEW REQUIREMENT]

Before modifying anything:

1. Explain what existing decisions are affected.
2. Identify which parts of the current plan need to change.
3. Identify potential side effects.
4. Recommend the smallest reasonable adjustment.

Do not implement yet.
```

Then update:

```text
PRODUCT.md
plan.md
```

when appropriate.

---

# 34. When You Are Unsure

Ask Claude to compare options based on the actual project.

```text
I am unsure between:

Option A
Option B
Option C

Analyze them based on the actual project requirements.

Compare:

- complexity
- maintainability
- performance
- development speed
- scalability
- cost
- ecosystem
- migration risk

Recommend one and explain why.

Do not implement anything yet.
```

---

# 35. Final Project Review

Before considering a project complete:

```text
Implementation Complete
        ↓
Functional Verification
        ↓
Testing
        ↓
Visual Review
        ↓
Responsive Review
        ↓
Accessibility Review
        ↓
Performance Review
        ↓
Security Review
        ↓
SEO Review if Relevant
        ↓
Code Review
        ↓
Documentation
        ↓
Git Review
        ↓
Deployment
        ↓
Post-Deployment Verification
```

Only perform reviews relevant to the project.

---

# 36. Repository Structure

This Starter repository can contain reusable knowledge, templates, and references.

```text
Claude-Code-Starter/
│
├── README.md
│
├── docs/
│   ├── workflow.md
│   ├── claude-md.md
│   ├── prompting.md
│   ├── skills.md
│   ├── mcp.md
│   ├── agents.md
│   └── context-management.md
│
├── templates/
│   └── CLAUDE.md
│
├── skills/
│   ├── frontend-design/
│   │   ├── README.md
│   │   └── images/
│   │
│   ├── impeccable/
│   │   └── README.md
│   │
│   └── playwright/
│       └── README.md
│
└── scripts/
    └── setup-project.ps1
```

### `docs/`

Reference and learning material.

### `templates/`

Reusable project files.

### `skills/`

Reference information for specialized capabilities.

### `scripts/`

Automation for repetitive setup.

Do not copy the entire Starter repository into every project.

---

# 37. Setup Scripts

A setup script may eventually automate:

- creating `CLAUDE.md`
- creating `plan.md`
- initializing Git
- creating standard files
- configuring project conventions

Example:

```powershell
.\scripts\setup-project.ps1
```

Do not automatically install every Skill, MCP server, or dependency.

---

# 38. The Ideal Working Relationship

Claude helps with:

```text
Research
Inspection
Reasoning
Planning
Implementation
Testing
Debugging
Review
Documentation
```

You remain responsible for:

```text
Goals
Requirements
Trade-offs
Approvals
Business decisions
Final architecture decisions
Final review
```

The goal is not to remove yourself from development.

It is to make you more effective.

---

# 39. Default Prompting Pattern

When in doubt:

```text
CONTEXT
What are we working on?

GOAL
What should be achieved?

CONSTRAINTS
What must or must not happen?

PROCESS
What should Claude do before implementation?

SCOPE
What is included and excluded?

VERIFICATION
How should the result be checked?
```

Example:

```text
Context:
We are implementing the authentication flow.

Goal:
Allow users to sign in securely.

Constraints:
- use the existing backend
- do not add unnecessary dependencies
- do not modify unrelated features

Process:
Inspect the existing authentication code first.
Explain the current flow.
Identify the smallest required changes.
Create a detailed implementation plan.

Scope:
Only authentication.

Verification:
Run the relevant tests and verify the login flow.

Do not implement yet.
```

---

# 40. Default Operating System

```text
                    NEW PROJECT
                         │
                         ▼
                    CLAUDE.md
                         │
                         ▼
                 PROJECT CONTEXT
                         │
                         ▼
                   CLAUDE CODE
                         │
                         ▼
                    PLAN MODE
                         │
                         ▼
                    INTERVIEW
                         │
                         ▼
                     INSPECT
                         │
                         ▼
                   UNDERSTAND
                         │
                         ▼
                  REQUIREMENTS
                         │
                         ▼
             CAPABILITY DISCOVERY
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
           Skill        MCP        Agent
             │           │           │
             └───────────┼───────────┘
                         │
                         ▼
                 HIGH-LEVEL ROADMAP
                         │
                         ▼
                      REVIEW
                         │
                         ▼
                    plan.md
                         │
                         ▼
                  CHOOSE ONE TASK
                         │
                         ▼
                 DETAILED PLAN
                         │
                         ▼
                      REVIEW
                         │
                         ▼
                    IMPLEMENT
                         │
                         ▼
                     VERIFY
                         │
                         ▼
                  VISUAL QA*
                         │
                         ▼
                      REVIEW
                         │
                         ▼
                  UPDATE plan.md
                         │
                         ▼
                    NEXT TASK
                         │
                         └──────────────► REPEAT

* When the task involves visual UI.
```

---

# 41. Golden Rules

### 1. Understand before building.

### 2. Interview before assuming.

### 3. Plan before significant changes.

### 4. Keep a persistent roadmap when useful.

### 5. One task at a time.

### 6. Inspect before modifying.

### 7. Prefer simple architecture.

### 8. Skills are optional.

### 9. Do not install tools blindly.

### 10. Verify the implementation.

### 11. For visual work, compare against the reference.

### 12. Treat visual references as specifications when exact matching is required.

### 13. Keep scope controlled.

### 14. Explain important decisions.

### 15. Protect private information.

### 16. Learn from mistakes.

### 17. You remain in control.

---

# Final Principle

Do not use Claude like this:

```text
Install everything
↓
Give Claude one giant prompt
↓
Hope the result works
```

Use Claude like this:

```text
Understand
↓
Interview
↓
Inspect
↓
Plan
↓
Identify what is actually needed
↓
Approve
↓
Implement
↓
Verify
↓
Review
↓
Repeat
```

For visual work:

```text
Reference
↓
Analyze
↓
Implement
↓
Screenshot
↓
Compare
↓
Correct
↓
Verify
```

**Use Claude to think with you, not simply code for you.**