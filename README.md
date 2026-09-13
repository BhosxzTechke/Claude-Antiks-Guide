# Claude Code Starter

A reusable starting system for working with Claude Code on **any software project**.

This repository provides a consistent way to:

- start a project
- give Claude the right context
- discover requirements
- plan before implementation
- identify useful capabilities
- work incrementally
- review changes
- verify results
- maintain project context
- avoid unnecessary complexity

The goal is to use Claude as a **senior technical partner and pair programmer**, not simply as a code generator.

---

# 1. Core Workflow

Use this workflow as the default:

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
Clarify Requirements
     ↓
Identify Capabilities
     ↓
High-Level Roadmap
     ↓
Review
     ↓
Create / Update plan.md
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

The important principle is:

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

The exact setup depends on the project.

Then enter the project:

```bash
cd my-project
```

Start Claude Code:

```bash
claude
```

Do not immediately ask Claude to build the entire project.

Start with discovery.

---

# 3. `CLAUDE.md`

Every project can have a `CLAUDE.md`.

It defines the rules Claude should follow while working inside the project.

A good starting template:

```md
# Project Instructions

## Role

Act as my senior software engineer, technical architect, and pair programmer.

Help me understand important technical decisions instead of simply generating code.

## Development Approach

Work incrementally.

Before making significant changes:

1. Inspect the relevant code.
2. Understand the existing implementation.
3. Explain what you found.
4. Propose the simplest reasonable approach.
5. Identify risks or trade-offs.
6. Wait for approval when the change is significant.
7. Implement only the approved scope.
8. Verify the result.

## Architecture

Prefer the simplest architecture that satisfies the current requirements.

Do not create abstractions because they might be useful in the future.

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

Create abstractions when they provide a clear current benefit.

If introducing a significant abstraction, explain why first.

## Scope

Do not modify unrelated files.

Do not refactor unrelated code while implementing a feature.

Do not silently change the technology stack.

Do not introduce dependencies without explaining why they are necessary.

## Learning

When an important technical decision is involved:

- explain the reasoning
- explain alternatives when relevant
- explain important concepts
- do not hide significant implementation decisions

Do not over-explain trivial code.

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

This is a starting point.

Project-specific rules can be added later.

---

# 4. Project Context

Depending on the project, additional context files may be useful.

A simple structure could be:

```text
project/
├── CLAUDE.md
├── PRODUCT.md
├── plan.md
├── docs/
└── source-code/
```

These files have different purposes.

| File | Purpose |
|---|---|
| `CLAUDE.md` | Rules for Claude |
| `PRODUCT.md` | Product/business context |
| `plan.md` | Persistent implementation roadmap |
| `docs/` | Detailed project documentation |

Do not create these files automatically if they provide no value.

---

# 5. `PRODUCT.md`

For projects where product context matters, use a separate file.

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

- [Thing we are explicitly not building]

## Constraints

- [Constraint]
- [Constraint]
```

This keeps product decisions separate from Claude-specific instructions.

---

# 6. Plan Mode

For substantial projects and major features, begin with Plan Mode.

The purpose is to **understand before implementing**.

The workflow should be:

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

Do not skip discovery simply because you already have an idea of what you want to build.

---

# 7. Universal Plan Mode Prompt

Use this as the default discovery prompt:

```text
PLAN MODE PROMPT

You are my senior technical co-founder, software architect, and pair programmer.

I'm about to build a new software project and I want us to be in complete alignment BEFORE any code or final implementation plan is written.

Your job right now is NOT to write code, scaffold the project, or immediately produce the implementation plan.

Your job is to INTERVIEW me.

## How to run this interview

1. Ask 3–6 questions at a time.
2. Group questions by topic.
3. Do not dump every question at once.
4. Ask the highest-leverage and most ambiguous questions first.
5. After each batch, summarize what you understood in 1–2 sentences.
6. Then continue with the next batch.
7. If something is vague, push back.
8. When useful, give me 2–3 concrete options with trade-offs and recommend a default.
9. Flag conflicts with decisions I made earlier.
10. Track open questions throughout the interview.
11. If I say "I don't know", propose a sensible default and clearly label it ASSUMPTION.
12. Prefer the technology stack and constraints I explicitly provide.
13. Do not silently replace technologies.
14. Do not introduce major dependencies without explaining why.
15. Inspect the existing codebase and relevant files before making architectural assumptions.
16. Do not implement anything during the interview.

## Topics to explore when relevant

### Project
- What are we building?
- What problem does it solve?
- Who is it for?
- What is the primary goal?
- What is explicitly out of scope?

### Requirements
- What are the core features?
- What are the important user journeys?
- What are the important edge cases?
- What is required for the first version?

### Data
- What data exists?
- What entities are required?
- What relationships exist?
- What needs to persist?
- Where should data live?

### Authentication
- Is authentication required?
- Who can access what?
- What roles or permissions exist?

### Architecture
- Frontend
- Backend
- Database
- APIs
- Server/client boundaries
- State management
- Data flow
- Caching
- Background jobs

### Integrations
- APIs
- Payments
- Email
- Storage
- Analytics
- AI services
- Third-party platforms

### Platform
- Web
- Mobile
- Desktop
- Browser requirements
- Responsive requirements
- Deployment environment

### Non-functional requirements
- Performance
- Accessibility
- Security
- SEO when relevant
- Reliability
- Scalability
- Maintainability
- Cost

### Delivery
- Development environment
- Production environment
- CI/CD
- Testing
- Monitoring
- Error handling
- Deployment

### Future-proofing

Only consider future requirements when they affect a current architectural decision.

Do not over-engineer for hypothetical features.

## Capability discovery

During discovery, determine whether the project would benefit from:

- Skills
- MCP integrations
- Agents
- browser automation
- testing tools
- design tools
- external documentation
- specialized development tooling

Do NOT assume everything needs to be installed.

If an additional capability is genuinely useful, explain:

1. What capability is needed.
2. Why it is useful.
3. Whether it is required or optional.
4. The simplest way to add it.

If the capability is unavailable, tell me instead of pretending you can use it.

## When the interview is complete

Produce:

1. Concise project specification
2. Confirmed decisions
3. Assumptions
4. Open questions
5. Risks
6. Technical architecture summary
7. High-level implementation roadmap

Then ask:

"Ready for me to turn this into an implementation plan?"

Do not begin implementation until I approve.

After approval, create or update `plan.md` with the implementation roadmap.

Begin with the first batch of questions.
```

---

# 8. Capability Discovery

Do not install Skills, MCP servers, or agents just because they exist.

Instead:

```text
Requirement
    ↓
Does Claude need additional capability?
    ↓
No → Continue
    ↓
Yes
    ↓
Identify capability
    ↓
Check availability
    ↓
Use existing capability
    ↓
If unavailable → Recommend installation
```

This keeps projects clean.

---

# 9. Skills

Skills provide specialized knowledge or workflows.

Examples include:

```text
frontend-design
impeccable
playwright
document skills
deployment skills
```

These are examples, not mandatory project dependencies.

A project should not start by installing dozens of Skills.

Instead, let the requirements determine whether one is useful.

Ask Claude:

```text
Before implementing this task, determine whether any available Skills would materially improve the result.

Do not install anything automatically.

Tell me:

1. Which Skill would help.
2. Why it would help.
3. Whether it is required or optional.
4. Whether an already-installed capability covers the need.

If nothing is needed, continue without adding anything.
```

---

# 10. Skills vs MCP vs Agents

These capabilities solve different problems.

| Capability | Purpose |
|---|---|
| `CLAUDE.md` | Project rules |
| Skill | Specialized knowledge/workflow |
| MCP | External system/tool connection |
| Agent | Specialized workflow/execution |
| Plan Mode | Discovery and planning |
| `plan.md` | Persistent implementation roadmap |

A useful mental model:

```text
CLAUDE.md
"What rules should Claude follow?"

Skill
"How should Claude approach this specialized type of work?"

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

# 11. MCP

MCP allows Claude to interact with external tools and systems.

Depending on the environment, this could include:

- databases
- GitHub
- browser tools
- documentation
- design tools
- project management tools
- APIs
- external services

Do not install MCP servers automatically.

Ask:

```text
Would an MCP integration materially improve this project?

If yes, explain:

- what it provides
- why we need it
- what permissions it requires
- whether there is a simpler alternative

Do not configure it automatically.
```

Use the minimum permissions necessary.

---

# 12. Agents

Agents can be useful for specialized workflows.

Examples:

```text
Architecture reviewer
Frontend reviewer
Security reviewer
Testing specialist
Performance reviewer
SEO reviewer
```

Do not create an agent when a normal Claude Code conversation is sufficient.

Complexity should have a reason.

---

# 13. One Task at a Time

A high-level roadmap might contain:

```text
1. Setup
2. Authentication
3. Database
4. API
5. Frontend
6. Testing
7. Deployment
```

But implementation should happen one task at a time.

For example:

```text
Current task:

Implement authentication.
```

Then:

```text
Detailed plan
     ↓
Approval
     ↓
Implementation
     ↓
Verification
```

Do not implement the entire roadmap in one request.

---

# 14. Detailed Task Planning

When selecting a task:

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
7. Identify any new dependency or abstraction.
8. Explain why it is necessary if one is proposed.

Then provide the implementation plan.

Do not implement yet.
```

---

# 15. Approval

Once Claude presents the task plan, review it.

If correct:

```text
Approved. Implement the plan.
```

If something needs changing:

```text
Change [specific part].

Keep everything else the same.

Do not implement yet.
```

This creates a clear boundary between:

```text
Planning
```

and:

```text
Implementation
```

---

# 16. Implementation Prompt

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
2. run the appropriate checks
3. report what changed
4. report what was verified
5. report any remaining issues

Do not claim verification for anything you did not actually test.
```

---

# 17. Verification

Implementation is not complete when Claude finishes writing code.

Use:

```text
Implement
   ↓
Build
   ↓
Test
   ↓
Inspect
   ↓
Verify
```

Depending on the project:

```text
Lint
Typecheck
Build
Unit Tests
Integration Tests
Browser Tests
API Tests
Database Tests
Visual Review
Performance Checks
Security Checks
```

Ask Claude:

```text
The implementation is complete.

Verify the work.

Run the appropriate checks for this project.

Report:

- what passed
- what failed
- what was not checked
- remaining risks

Do not modify unrelated code.
Do not claim checks were performed if they were not.
```

---

# 18. Debugging

When something breaks:

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

Use:

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

# 19. Learning From Claude

If you want to understand the code instead of simply accepting it:

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

# 20. Architecture

Use the simplest architecture that satisfies the current requirements.

Avoid creating abstractions just because they might be useful later.

For example, do not automatically create:

```text
services/
repositories/
factories/
providers/
hooks/
utilities/
adapters/
```

if the current project does not need them.

Ask:

```text
Does this abstraction solve a current problem?

If yes, explain why.

If no, keep the implementation simpler.
```

---

# 21. Dependencies

Every dependency introduces additional:

- maintenance
- security considerations
- bundle size
- upgrade requirements
- complexity

Before installing one:

```text
Do we actually need this dependency?

Can the framework, existing project dependencies, or standard platform APIs solve the problem?

If the dependency is justified, explain why before installing it.
```

---

# 22. Scope Control

A task should not silently become another project.

Use:

```text
If you encounter an unrelated issue, tell me about it.

Do not fix unrelated issues automatically.

Do not expand the scope without approval.
```

For example:

```text
Task:
Fix the login form.
```

Should not automatically become:

```text
Fix login
+
Refactor authentication
+
Redesign dashboard
+
Upgrade dependencies
+
Rewrite database layer
```

unless explicitly approved.

---

# 23. Refactoring

Refactoring is useful when it solves a real problem.

Use:

```text
Only refactor code when it:

1. directly affects the current task
2. contains a clear defect
3. significantly reduces complexity
4. is required for the approved architecture

Explain the reason before making significant refactors.
```

---

# 24. Frontend Workflow

For frontend work:

```text
Requirement
   ↓
Reference
   ↓
Inspect Existing UI
   ↓
Design Direction
   ↓
Component Plan
   ↓
Implementation
   ↓
Responsive Verification
   ↓
Accessibility Verification
   ↓
Performance Verification
   ↓
Visual Review
```

Useful references include:

- screenshots
- Figma
- existing websites
- design systems
- brand guidelines
- videos
- interaction references
- typography references

---

# 25. Design References

When a reference exists, give it to Claude.

Example:

```text
Use this as the visual reference.

Analyze:

- layout
- typography
- spacing
- visual hierarchy
- proportions
- interactions
- responsive behavior

Do not copy the implementation.

First explain how you would translate the visual direction into this project.

Do not implement yet.
```

---

# 26. Accessibility

Accessibility should be considered during implementation.

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
- screen reader behavior when relevant

Review prompt:

```text
Review this implementation for accessibility.

Do not modify anything.

Identify the highest-priority issues and explain how they should be fixed.
```

---

# 27. Performance

Consider performance during development.

Depending on the project, review:

- images
- JavaScript
- CSS
- fonts
- third-party scripts
- network requests
- rendering
- caching
- server/client boundaries
- database queries
- unnecessary dependencies

Prompt:

```text
Review this implementation for performance issues.

Do not modify anything.

Identify the highest-impact problems and explain why they matter.
```

---

# 28. SEO

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

Do not invent SEO information.

Use actual project content.

---

# 29. Content Accuracy

Claude should never invent important project facts.

Do not fabricate:

- statistics
- testimonials
- customer results
- awards
- certifications
- analytics
- performance measurements
- user numbers
- business claims

If something is unknown:

```text
Do not invent the value.

Mark it as unknown or ask me for the real value.
```

---

# 30. Security

For security-sensitive projects, review:

- authentication
- authorization
- permissions
- input validation
- API security
- secrets
- environment variables
- file uploads
- database queries
- XSS
- CSRF
- exposed endpoints
- dependency vulnerabilities

Never commit secrets.

Use environment configuration such as:

```text
.env.local
```

when appropriate.

Never place credentials inside:

```text
CLAUDE.md
README.md
source code
screenshots
documentation
Git commits
```

---

# 31. Git

Claude can assist with Git, but destructive operations should require caution.

Before destructive commands:

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

Then:

```text
Approved. Commit the changes.
```

---

# 32. Code Review

After completing a meaningful task:

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

# 33. `plan.md`

Use `plan.md` as the persistent roadmap for projects where the work spans multiple tasks.

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

Keep it updated as the project changes.

---

# 34. Context Management

Long projects can accumulate a large amount of context.

Keep important information in project files rather than relying entirely on conversation history.

Useful sources of context:

```text
CLAUDE.md
PRODUCT.md
plan.md
docs/
source code
tests
```

When a task is complete, starting a fresh conversation can sometimes produce a cleaner working context.

The project files remain the source of truth.

---

# 35. Documentation

Document important decisions.

Good documentation answers:

```text
Why?
```

not only:

```text
What?
```

Example:

```md
## Authentication Decision

We use the existing authentication system because the project already provides
the required session handling and permissions.

A new authentication dependency would add unnecessary complexity.
```

Avoid documenting trivial code that is already obvious.

---

# 36. Project Structure

Do not force every project into one architecture.

The structure should evolve from actual requirements.

A simple project might look like:

```text
project/
├── src/
├── public/
├── tests/
├── docs/
├── CLAUDE.md
├── PRODUCT.md
├── plan.md
├── package.json
└── README.md
```

Another technology may have a completely different structure.

The principle is:

> **Architecture should follow requirements, not a template.**

---

# 37. Starter Repository Structure

This repository can contain reusable knowledge, templates, and references.

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

These directories have different purposes.

### `docs/`

Reference material.

### `templates/`

Reusable project files.

### `skills/`

Reference information for useful specialized capabilities.

### `scripts/`

Automation for repetitive setup.

This repository should not be copied wholesale into every project.

---

# 38. Setup Scripts

Scripts can automate repetitive project initialization.

For example:

```powershell
.\scripts\setup-project.ps1
```

A setup script may eventually:

- create `CLAUDE.md`
- create `plan.md`
- create standard project files
- initialize Git
- configure project conventions

It should **not automatically install every Skill, MCP server, or dependency**.

Keep automation minimal and intentional.

---

# 39. When Claude Makes a Mistake

Do not immediately say:

```text
Fix it.
```

Instead:

```text
Explain why the previous implementation caused this problem.

Do not modify the code yet.

Identify:

1. root cause
2. incorrect assumption
3. smallest reasonable fix
4. how we can prevent the issue in the future
```

This helps turn mistakes into learning.

---

# 40. When Requirements Change

Requirements will change.

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
plan.md
```

after the decision is approved.

---

# 41. When You Are Unsure

You can ask Claude to help make the decision.

Example:

```text
I am unsure between these options:

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
- future migration risk

Recommend one and explain why.

Do not implement anything yet.
```

This is more useful than asking:

```text
Which one is better?
```

without context.

---

# 42. Final Project Review

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

Only perform the reviews relevant to the project.

---

# 43. The Ideal Working Relationship

Claude should help with:

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

You should remain responsible for:

```text
Goals
Requirements
Trade-offs
Approvals
Business decisions
Final architecture decisions
Final review
```

The objective is not to remove yourself from development.

It is to make you more effective.

---

# 44. Default Prompting Pattern

When in doubt, use:

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

# 45. The Default Operating System

For future projects, the default process is:

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
                 ASSUMPTIONS
                         │
                         ▼
                      RISKS
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
                      REVIEW
                         │
                         ▼
                  UPDATE plan.md
                         │
                         ▼
                    NEXT TASK
                         │
                         └──────────────► REPEAT
```

---

# 46. Golden Rules

### 1. Understand before building.

Do not rush into implementation.

### 2. Interview before assuming.

Surface ambiguity early.

### 3. Plan before significant changes.

Use Plan Mode.

### 4. Keep a persistent roadmap.

Use `plan.md` when useful.

### 5. One task at a time.

Keep implementation bounded.

### 6. Inspect before modifying.

Understand the existing system first.

### 7. Prefer simple architecture.

Do not over-engineer.

### 8. Skills are optional.

Use specialized capabilities when they provide real value.

### 9. Do not install tools blindly.

Every Skill, MCP server, agent, and dependency should have a reason.

### 10. Verify the implementation.

Generated code is not automatically correct.

### 11. Keep scope controlled.

Do not let one task silently become five.

### 12. Explain important decisions.

Use Claude as a mentor and pair programmer.

### 13. Protect private information.

Never expose credentials or confidential information.

### 14. Learn from mistakes.

Understand root causes instead of repeatedly patching symptoms.

### 15. You remain in control.

Claude accelerates the work.

You make the decisions.

---

# Final Principle

The purpose of this Starter is to create a **repeatable way of working with Claude Code across different projects and technologies**.

Not:

```text
Install everything
↓
Give Claude one giant prompt
↓
Hope the result works
```

Instead:

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

**Use Claude to think with you, not simply code for you.**