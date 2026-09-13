# Impeccable

Impeccable is a design guidance system for AI coding agents.

It helps AI coding tools create, review, and refine frontend interfaces with
better visual hierarchy, spacing, typography, accessibility, responsive
behavior, animation, and overall design quality.

Official repository:

https://github.com/pbakaus/impeccable

Official website:

https://impeccable.style/

---

# Installation

## Requirements

Impeccable is installed through its official CLI installer.

Node.js is required when using the `npx impeccable` installer.

Always run the installer from the **project root**.

Example:

```text
my-project/
├── app/
├── public/
├── references/
├── .claude/
├── CLAUDE.md
├── package.json
└── ...
```

Check your current directory:

```powershell
Get-Location
```

---

# Claude Code Installation

## Important: Choose the Correct Provider

Impeccable supports multiple AI coding environments.

For example:

```text
Claude Code
Codex
Cursor
Grok
Hermes
Veto
```

If you simply run:

```bash
npx impeccable install
```

the installer may detect multiple environments and ask which providers should
receive the installation.

For a Claude Code project, make sure **Claude Code** is selected.

If you only want Claude Code, use:

```bash
npx impeccable install --providers=claude --scope=project
```

This means:

```text
Provider → Claude Code
Scope    → Current project
```

Using the explicit provider and project scope is recommended when this project
is intended to use Impeccable with Claude Code only.

---

## Step 1 — Open Your Project

Open the project folder in Claude Code.

Example:

```text
Portfolio/
```

Make sure your terminal is running from the project root.

You can verify this with:

```powershell
Get-Location
```

---

## Step 2 — Install Impeccable

Recommended for Claude Code:

```bash
npx impeccable install --providers=claude --scope=project
```

Alternatively, you can use the interactive installer:

```bash
npx impeccable install
```

If npm asks to install the package, allow it.

Example:

```text
Need to install the following packages:
impeccable@...

Ok to proceed? (y)
```

Enter:

```text
y
```

If the interactive installer detects multiple providers, select:

```text
Claude Code
```

For installation scope, select:

```text
Project
```

---

## Step 3 — Enable the Design Hook

When the installer asks whether to install the Design Hook, choose:

```text
Yes
```

The Design Hook allows Impeccable's design detector to run during relevant
frontend development.

It can detect deterministic UI problems such as:

- Contrast issues
- Overflow
- Broken images
- Clipped content
- Typography problems
- Gradient text
- Excessive visual effects
- Design inconsistencies
- Other frontend quality issues

The Design Hook is an additional quality check.

It does not replace manual design review, browser testing, or accessibility
testing.

---

## Step 4 — Finish the Installation

Allow the official installer to complete.

Do not manually create Impeccable files or folders if the installer has already
created them.

Let the official installer configure the project.

---

# Claude Code Installation Structure

For Claude Code, the project-level Impeccable installation uses Claude Code's
project configuration.

You may see:

```text
.claude/
├── settings.local.json
└── skills/
    └── impeccable/
```

The exact structure can change between Impeccable versions.

Do not assume that every Impeccable installation will look exactly the same.

---

# Claude Code vs Codex

Be careful when multiple AI coding tools are installed on the same machine.

Claude Code and Codex use different project locations.

## Claude Code

```text
.claude/
├── settings.local.json
└── skills/
    └── impeccable/
```

## Codex

```text
.agents/
└── skills/
    └── impeccable/
```

Codex may also use:

```text
.codex/
```

If you see:

```text
.agents/
└── skills/
    └── impeccable/
```

that indicates the Codex/Agents installation.

It does not automatically mean that Impeccable is installed correctly for
Claude Code.

If you are using Claude Code and only want the Claude Code integration, use:

```bash
npx impeccable install --providers=claude --scope=project
```

---

# If Multiple Providers Were Installed

If the installer created:

```text
.agents/
.codex/
```

because multiple providers were selected, do not immediately delete them.

First determine whether those installations are actually needed.

If this project only uses Claude Code, future installations should use:

```bash
npx impeccable install --providers=claude --scope=project
```

This keeps the setup focused on the intended coding environment.

---

# Reload Claude Code

After installation, reload Claude Code.

Use:

```text
/reload-plugins
```

If necessary, also reload Skills:

```text
/reload-skills
```

If Impeccable does not appear immediately, restart Claude Code.

---

# Verify Installation

Inside Claude Code, run:

```text
/impeccable
```

A working installation should expose the Impeccable command list.

You can also check the Design Hook:

```text
/impeccable hooks status
```

If the hook is enabled, Impeccable should show its current status.

---

# Initialize Impeccable

After the installation is loaded, run:

```text
/impeccable init
```

This initializes Impeccable for the current project.

It allows Impeccable to inspect the project and establish durable product
context.

Depending on the current version and project state, this may create:

```text
PRODUCT.md
```

Do not manually create a fake `PRODUCT.md` simply to satisfy Impeccable.

Let the initialization process establish the appropriate project context.

---

# PRODUCT.md

`PRODUCT.md` should contain durable product/project truth.

Example:

```text
Product:
Personal developer portfolio

Primary users:
Hiring managers
Recruiters
Potential clients

Primary goal:
Communicate skills, experience, and shipped work quickly.

Positioning:
Breadth across real-world projects rather than one narrow specialty.
```

A useful mental model:

```text
CLAUDE.md
    ↓
How Claude should work

PRODUCT.md
    ↓
What the product/project is

DESIGN.md
    ↓
Established design system and visual direction

references/visual/
    ↓
External visual references

Impeccable
    ↓
Design planning + critique + refinement
```

---

# Visual References

Project-specific visual references can be stored in:

```text
references/
└── visual/
```

Example:

```text
my-project/
├── references/
│   └── visual/
│       ├── shafi-portfolio-reference.png
│       ├── hero-reference.png
│       └── project-grid-reference.png
│
├── CLAUDE.md
├── PRODUCT.md
├── app/
└── package.json
```

Visual references are **design context**, not production website assets.

Do not put them inside:

```text
public/
```

unless they are actual assets that will be displayed on the website.

---

# Visual References + CLAUDE.md

`CLAUDE.md` can tell Claude where project-specific visual references are
stored.

Example:

```md
# Visual References

Project-specific visual references may be stored in:

references/
└── visual/

If visual references exist, inspect relevant references before major frontend
design decisions.

Treat visual references as design context, not production assets.

Use references for:

- Visual direction
- Layout
- Typography
- Spacing
- Color
- Composition
- Hierarchy
- Interaction
- Motion

Do not copy branding, logos, text, private information, or proprietary assets.
```

This gives Claude explicit project instructions.

However, for important design work, explicitly mention the reference in the
prompt as well.

This is especially useful when using:

```text
/impeccable shape homepage
```

---

# Working With Screenshots

You can provide screenshots or visual references when asking Impeccable to
review or shape an interface.

Example:

```text
Use Impeccable to critique this homepage.

Also inspect:

references/visual/shafi-portfolio-reference.png

Compare the current implementation with the reference at the
design-language level.

Focus on:

- Typography
- Spacing
- Visual hierarchy
- Alignment
- Color usage
- Component proportions
- Responsive behavior
- Interaction quality

Do not copy the reference literally.

Do not change anything yet.

First explain the five highest-impact issues.
```

This keeps analysis separate from implementation.

---

# `/impeccable shape`

Use:

```text
/impeccable shape
```

for general design planning.

For a specific page, prefer:

```text
/impeccable shape homepage
```

This makes the target explicit.

`shape` should be used before implementation when you want Impeccable to help
plan the UX/UI and visual direction.

---

# Recommended Shape Prompt

For a portfolio project:

```text
/impeccable shape homepage

Before making design decisions, inspect:

- CLAUDE.md
- PRODUCT.md
- references/visual/

The visual references are design references, not assets to copy.

Use them to understand the intended:

- Composition
- Typography
- Spacing
- Visual hierarchy
- Color relationships
- Interaction patterns
- Motion direction
- Overall visual personality

The portfolio positioning is breadth across real shipped projects.

The audience should be able to understand who I am, what I build,
and what I have worked on quickly.

Do not fabricate project information, metrics, testimonials, clients,
technologies, or achievements.

Do not modify files yet.

First explain the proposed homepage structure and design direction.
```

The preferred workflow is:

```text
Inspect
    ↓
Understand
    ↓
Plan
    ↓
Review
    ↓
Approve
    ↓
Implement
```

---

# Important Commands

## Initialize

```text
/impeccable init
```

Initialize Impeccable for the project.

---

## Shape

```text
/impeccable shape homepage
```

Plan the UX/UI and design direction before implementation.

---

## Critique

```text
/impeccable critique homepage
```

Review the interface's hierarchy, clarity, and emotional resonance.

Use this before making major visual changes.

---

## Audit

```text
/impeccable audit homepage
```

Perform a broader design and frontend quality review.

Useful for:

- Accessibility
- Responsive behavior
- Performance
- Design consistency
- Implementation quality

---

## Polish

```text
/impeccable polish homepage
```

Refine an existing interface toward a more polished, production-ready result.

---

## Distill

```text
/impeccable distill homepage
```

Reduce unnecessary complexity and visual noise.

---

## Bolder

```text
/impeccable bolder homepage
```

Use when the design feels too generic, safe, or visually weak.

---

## Quieter

```text
/impeccable quieter homepage
```

Use when the interface contains too much visual intensity or noise.

---

## Animate

```text
/impeccable animate homepage
```

Improve motion and interaction design.

Animation should have a purpose.

Do not add animation simply because it is available.

---

## Colorize

```text
/impeccable colorize homepage
```

Improve strategic use of color.

---

## Typeset

```text
/impeccable typeset homepage
```

Improve typography.

---

## Layout

```text
/impeccable layout homepage
```

Improve layout, spacing, alignment, and visual rhythm.

---

## Optimize

```text
/impeccable optimize homepage
```

Improve frontend performance.

---

# Design Hook

The Design Hook provides automatic design detection for relevant frontend
file changes.

For Claude Code, the project integration uses:

```text
.claude/settings.local.json
```

The exact configuration may change between Impeccable versions.

Do not manually recreate the hook configuration unless the official
documentation specifically requires it.

The Design Hook is designed to surface deterministic design problems during
frontend development.

It is a quality-control layer, not a replacement for:

- Human design review
- Browser testing
- Responsive testing
- Accessibility testing
- Functional testing

---

# Managing the Design Hook

Check the current status:

```text
/impeccable hooks status
```

Enable the hook:

```text
/impeccable hooks on
```

Disable the hook:

```text
/impeccable hooks off
```

Reset the hook:

```text
/impeccable hooks reset
```

Prefer these commands instead of manually editing the hook configuration.

---

# Recommended Workflow

Use Impeccable as part of an iterative development process.

```text
Understand
    ↓
Inspect
    ↓
Plan
    ↓
Design
    ↓
Build
    ↓
Critique
    ↓
Polish
    ↓
Detect
    ↓
Verify
```

For example:

```text
1. Inspect the project
2. Read CLAUDE.md
3. Read PRODUCT.md
4. Inspect visual references
5. Shape the interface
6. Review the proposed direction
7. Approve the direction
8. Build the interface
9. Run /impeccable critique
10. Fix important issues
11. Run /impeccable audit
12. Run /impeccable polish
13. Check the Design Hook
14. Test responsive behavior
15. Test accessibility
16. Review the final result
```

---

# Recommended Workflow for a New Frontend Project

```text
Project Context
       ↓
Visual References
       ↓
PRODUCT.md
       ↓
frontend-design
       ↓
/impeccable shape
       ↓
Review
       ↓
Approve
       ↓
Implementation
       ↓
/impeccable critique
       ↓
Refinement
       ↓
/impeccable audit
       ↓
/impeccable polish
       ↓
Browser Verification
```

The important sequence is:

```text
Shape first
Build second
Critique third
Polish last
```

---

# Working With Figma

When implementing a Figma design, use Impeccable after the initial
implementation.

Example:

```text
Implement the approved Figma design.

Preserve the intended visual hierarchy.

Do not add unnecessary UI patterns.

After the implementation is complete, use Impeccable to review:

- Typography
- Spacing
- Layout
- Responsive behavior
- Visual hierarchy
- Accessibility

Do not redesign the original concept without approval.
```

---

# Design Review Before Implementation

When you are unsure about a design decision, ask Impeccable to analyze it
before writing code.

Example:

```text
Use Impeccable to evaluate the current hero section.

Do not modify the code.

Tell me:

1. What is working?
2. What feels generic?
3. What creates visual hierarchy?
4. What weakens the hierarchy?
5. What should be changed first?

Wait for my approval before implementing anything.
```

This is useful when learning frontend design instead of allowing AI to make
every design decision automatically.

---

# Example: Existing Homepage Review

Avoid:

```text
Make my homepage better.
```

Use:

```text
Use Impeccable to review the current homepage.

Do not rebuild the page from scratch.

First analyze:

- Visual hierarchy
- Typography
- Spacing
- Color usage
- Responsive behavior
- Accessibility
- Interaction quality

Explain the highest-impact problems first.

Then propose the smallest set of changes that would make
the interface feel more polished and intentional.

Do not modify unrelated components.
```

---

# Impeccable + frontend-design

Impeccable and Anthropic's `frontend-design` Skill have different roles.

## frontend-design

Best for:

- Creating new interfaces
- Establishing visual direction
- Typography
- Color palettes
- Composition
- Distinctive frontend design
- Meaningful animation
- Avoiding generic AI aesthetics

## Impeccable

Best for:

- Planning
- Reviewing existing interfaces
- Design critique
- Visual refinement
- Design detection
- Consistency
- Reducing unnecessary complexity
- Polishing existing UI

Recommended workflow:

```text
frontend-design
        ↓
Visual direction
        ↓
Impeccable shape
        ↓
Implementation
        ↓
Impeccable critique
        ↓
Impeccable audit
        ↓
Impeccable polish
        ↓
Design detector
        ↓
Responsive + accessibility testing
```

---

# Impeccable + CLAUDE.md

These serve different purposes.

## CLAUDE.md

Use `CLAUDE.md` for project-specific development rules.

Examples:

```text
- Use Next.js App Router
- Use TypeScript
- Keep components simple
- Do not over-engineer
- Inspect before modifying
- Explain important changes
- Do not modify unrelated files
- Run validation after changes
- Do not fabricate project information
```

## Impeccable

Use Impeccable for frontend design expertise and quality.

Examples:

```text
- Improve visual hierarchy
- Refine typography
- Review spacing
- Improve interaction design
- Detect design problems
- Polish existing UI
- Review responsive behavior
```

Think of it as:

```text
CLAUDE.md
    ↓
How this project should be developed

Impeccable
    ↓
How the interface should be evaluated and refined
```

Do not copy Impeccable's entire Skill instructions into `CLAUDE.md`.

---

# Impeccable + PRODUCT.md

`PRODUCT.md` contains durable product truth.

Example:

```text
Product:
Personal developer portfolio

Primary users:
Hiring managers
Recruiters
Potential clients

Primary goal:
Communicate skills, experience, and shipped work quickly.

Positioning:
Breadth across real-world projects rather than one narrow specialty.
```

This gives Impeccable useful context when making design decisions.

---

# Impeccable + Visual References

Visual references answer a different question.

```text
PRODUCT.md
→ What is this?

CLAUDE.md
→ How should Claude work?

references/visual/
→ What visual direction are we considering?

DESIGN.md
→ What design system/direction does this project use?

Impeccable
→ How should the interface be shaped, reviewed, and refined?
```

Example:

```text
references/
└── visual/
    └── shafi-portfolio-reference.png
```

Use the reference to understand:

- Visual language
- Composition
- Hierarchy
- Typography
- Spacing
- Color relationships
- Interaction patterns
- Motion direction

Do not automatically copy:

- Branding
- Logos
- Text
- Private information
- Proprietary assets
- The website pixel-for-pixel

---

# `DESIGN.md`

`DESIGN.md` is different from `PRODUCT.md`.

Conceptually:

```text
PRODUCT.md
→ Product truth

DESIGN.md
→ Existing/established design system and visual direction
```

When appropriate, use:

```text
/impeccable document
```

to document an existing design system from the current implementation.

Do not create a fake design system simply to fill the file.

---

# Existing Projects

If the project already exists, do not immediately run:

```text
/impeccable polish
```

First understand the current implementation.

Use:

```text
/impeccable critique homepage
```

or:

```text
/impeccable audit homepage
```

This helps prevent unnecessary redesign.

---

# Do Not Let Impeccable Do Everything Automatically

If the goal is to become a better developer, keep the workflow interactive.

Instead of blindly running:

```text
/impeccable polish
```

use:

```text
/impeccable critique homepage
```

Then ask:

```text
Explain the highest-impact issues.

Do not modify files yet.
```

Then:

```text
Which issue would you fix first and why?
```

Then:

```text
Implement only the first approved improvement.
```

This creates a learning loop:

```text
Problem
   ↓
Reason
   ↓
Design principle
   ↓
Implementation
   ↓
Result
```

---

# Project Structure

After a project-level Claude Code installation, you may see:

```text
Portfolio/
├── .claude/
│   ├── settings.local.json
│   └── skills/
│       └── impeccable/
│
├── references/
│   └── visual/
│
├── app/
├── components/
├── public/
├── CLAUDE.md
├── PRODUCT.md
├── package.json
└── ...
```

If Codex was also intentionally configured, you may additionally see:

```text
.agents/
└── skills/
    └── impeccable/
```

and:

```text
.codex/
```

The exact structure can change between Impeccable versions and installation
methods.

Do not manually create installation-managed files unless required.

---

# Updating Impeccable

Update an existing installation with:

```bash
npx impeccable update
```

Then reload Claude Code:

```text
/reload-plugins
```

If necessary:

```text
/reload-skills
```

Verify:

```text
/impeccable
```

---

# Alternative Claude Code Plugin Installation

Claude Code can also install Impeccable through its plugin marketplace.

Add the marketplace:

```text
/plugin marketplace add pbakaus/impeccable
```

Then open the plugin manager:

```text
/plugin
```

Find Impeccable and install it.

For a normal project-specific installation with the Design Hook, prefer:

```bash
npx impeccable install --providers=claude --scope=project
```

---

# Troubleshooting

## `/impeccable` Says `Unknown command`

If you see:

```text
Unknown command: /impeccable
```

do not assume the installation worked.

First check the provider directory.

For Claude Code:

```text
.claude/
└── skills/
    └── impeccable/
```

If you only see:

```text
.agents/
└── skills/
    └── impeccable/
```

you likely installed the Codex/Agents distribution.

Reinstall specifically for Claude Code:

```bash
npx impeccable install --providers=claude --scope=project
```

Then reload Claude Code.

---

## `/reload-skills` Shows Impeccable but `/impeccable` Does Not

Check which provider directory contains the Skill.

Claude Code:

```text
.claude/skills/impeccable/
```

Codex:

```text
.agents/skills/impeccable/
```

A Skill being available to another harness does not automatically mean that
Claude Code has the correct integration.

---

## Multiple AI Coding Tools Were Detected

If the installer detects multiple providers and you only want Claude Code:

```bash
npx impeccable install --providers=claude --scope=project
```

This prevents unnecessary provider installations.

---

## Claude Code Was Not Detected

Run:

```bash
npx impeccable install
```

If multiple providers are detected, select:

```text
Claude Code
```

For a project-specific installation, select:

```text
Project
```

---

## Design Hook Is Not Running

Check:

```text
/impeccable hooks status
```

If disabled:

```text
/impeccable hooks on
```

Then make a relevant frontend change and check whether design findings are
reported.

---

## Installation Created Unexpected Files

Do not immediately delete them.

Inspect:

```text
.claude/
.agents/
.codex/
.impeccable/
PRODUCT.md
```

These may contain project configuration, product context, or integration
files created by Impeccable or another coding environment.

Determine which provider created the files before removing anything.

---

# Do Not Manually Recreate Impeccable

Prefer:

```bash
npx impeccable install --providers=claude --scope=project
```

or:

```bash
npx impeccable update
```

Do not manually copy an old Impeccable Skill from another project unless you
are intentionally following the official manual installation method.

The official installer should manage the integration.

---

# Quick Reference

| Task | Command |
|---|---|
| Install for Claude Code | `npx impeccable install --providers=claude --scope=project` |
| Interactive install | `npx impeccable install` |
| Update | `npx impeccable update` |
| Initialize | `/impeccable init` |
| Show commands | `/impeccable` |
| Shape | `/impeccable shape homepage` |
| Critique | `/impeccable critique homepage` |
| Audit | `/impeccable audit homepage` |
| Polish | `/impeccable polish homepage` |
| Distill | `/impeccable distill homepage` |
| Bolder | `/impeccable bolder homepage` |
| Quieter | `/impeccable quieter homepage` |
| Animate | `/impeccable animate homepage` |
| Typeset | `/impeccable typeset homepage` |
| Layout | `/impeccable layout homepage` |
| Optimize | `/impeccable optimize homepage` |
| Hook status | `/impeccable hooks status` |
| Enable hook | `/impeccable hooks on` |
| Disable hook | `/impeccable hooks off` |
| Reset hook | `/impeccable hooks reset` |

---

# Minimal Setup

You do not need every Impeccable command.

For a normal frontend project:

```text
1. Install

npx impeccable install --providers=claude --scope=project

2. Reload Claude Code

/reload-plugins

3. Initialize

/impeccable init

4. Add or inspect visual references

references/
└── visual/

5. Shape

/impeccable shape homepage

6. Review the proposed direction

7. Implement the approved direction

8. Critique

/impeccable critique homepage

9. Audit

/impeccable audit homepage

10. Polish

/impeccable polish homepage

11. Verify

Test the actual browser implementation.
```

---

# Recommended Mental Model

Do not think:

```text
Impeccable = Build my entire website
```

Think:

```text
Impeccable = Design expert + reviewer + quality layer
```

The workflow:

```text
You
 ↓
Define the goal
 ↓
Visual references
 ↓
PRODUCT.md
 ↓
frontend-design
 ↓
Impeccable shape
 ↓
You review
 ↓
Claude implements
 ↓
Impeccable critique
 ↓
Impeccable audit
 ↓
Impeccable polish
 ↓
Browser verification
```

---

# Final Principle

Use Impeccable to make Claude better at frontend design without giving up your
own understanding of the implementation.

The goal is not:

```text
AI does everything.
```

The goal is:

```text
You understand
      ↓
AI helps design
      ↓
AI helps implement
      ↓
AI helps critique
      ↓
AI helps refine
      ↓
You verify
```

AI should make you a better frontend developer, not remove the need to
understand why the interface works.

---

# Official References

- Impeccable GitHub:
  https://github.com/pbakaus/impeccable

- Impeccable Website:
  https://impeccable.style/