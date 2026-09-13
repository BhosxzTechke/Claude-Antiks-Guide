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

Make sure Node.js is installed, then open your project in Claude Code.

For example:

```text
Portfolio/
├── app/
├── public/
├── .claude/
├── package.json
└── ...
```

Make sure your terminal is running from the project root.

---

# Claude Code Installation

## Step 1 — Open Your Project

Open your project folder in Claude Code.

For this repository, the terminal should be inside:

```text
Portfolio/
```

You can verify your current directory with:

```powershell
Get-Location
```

---

## Step 2 — Run the Official Installer

From the project root:

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

---

## Step 3 — Select Claude Code

The installer will detect supported coding tools.

If Claude Code is detected automatically, select:

```text
1
```

Your target should be:

```text
Install target → Claude Code
```

If the installer provides a customization option, select Claude Code.

---

## Step 4 — Select Project Installation

When the installer asks for the installation location, choose:

```text
Project
```

Recommended:

```text
Install location → Project
```

Project installation keeps the Impeccable setup specific to the current
repository.

Do not choose Global unless you intentionally want Impeccable installed
across your other projects.

---

## Step 5 — Enable the Design Hook

When the installer asks whether to install the Design Hook, choose:

```text
Yes
```

The Design Hook allows Impeccable's design detector to run during relevant
frontend development.

It can help detect deterministic UI problems such as:

- Contrast issues
- Overflow
- Broken images
- Clipped content
- Typography problems
- Gradient text
- Excessive visual effects
- Design inconsistencies

The Design Hook is an additional quality check. It does not replace manual
design review.

---

## Step 6 — Finish the Installation

Allow the installer to complete.

Do not manually create Impeccable files or folders.

Let the official installer configure the project.

---

# Reload Claude Code

After installation, reload Claude Code:

```text
/reload-plugins
```

If Impeccable does not appear immediately, restart Claude Code.

---

# Initialize Impeccable

After the installation is loaded, run:

```text
/impeccable init
```

This initializes Impeccable for the current project.

It allows Impeccable to inspect the project and establish durable product
context.

Depending on the current version, this may create project context such as:

```text
PRODUCT.md
```

Do not manually create this file before running initialization.

---

# Verify Installation

Run:

```text
/impeccable
```

This should display the available Impeccable commands.

You can also check the Design Hook:

```text
/impeccable hooks status
```

If the hook is enabled, Impeccable should show its current status.

---

# Basic Usage

Impeccable commands use this format:

```text
/impeccable <command>
```

Examples:

```text
/impeccable audit
```

```text
/impeccable critique
```

```text
/impeccable polish
```

You can also specify a target:

```text
/impeccable audit the homepage
```

```text
/impeccable polish the project cards
```

---

# Important Commands

## Initialize

```text
/impeccable init
```

Initialize Impeccable for the project.

---

## Audit

```text
/impeccable audit
```

Use this for a broad design and UX review.

Example:

```text
/impeccable audit the homepage
```

---

## Critique

```text
/impeccable critique
```

Use this when you want to understand what is working and what could be
improved before making changes.

Example:

```text
/impeccable critique the hero section
```

---

## Polish

```text
/impeccable polish
```

Use this when an interface already works but needs visual refinement.

Example:

```text
/impeccable polish the project cards
```

---

## Distill

```text
/impeccable distill
```

Use this when the interface contains unnecessary complexity or visual noise.

---

## Animate

```text
/impeccable animate
```

Use this when improving motion and interaction design.

---

## Bolder

```text
/impeccable bolder
```

Use this when a design feels too generic, safe, or visually weak.

---

## Quieter

```text
/impeccable quieter
```

Use this when an interface contains too much visual noise.

---

# Design Hook

The Design Hook provides automatic design detection for relevant frontend
file changes.

For Claude Code, the project integration uses:

```text
.claude/settings.local.json
```

The exact configuration may change between Impeccable versions.

Do not manually recreate the hook configuration.

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

Prefer the Impeccable commands above instead of manually editing hook
configuration.

---

# Recommended Workflow

Use Impeccable as part of an iterative development process.

Recommended workflow:

```text
Understand
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
1. Build the homepage
2. Review the implementation
3. Run /impeccable critique
4. Understand the issues
5. Apply approved changes
6. Run /impeccable polish
7. Check the Design Hook
8. Test responsive behavior
9. Review the final result
```

---

# Working With Screenshots

You can provide screenshots or visual references when asking Impeccable to
review an interface.

Example:

```text
Use Impeccable to critique this homepage.

Compare the screenshot with the current implementation.

Focus on:

- Typography
- Spacing
- Visual hierarchy
- Alignment
- Color usage
- Component proportions
- Responsive behavior
- Interaction quality

Do not change anything yet.

First explain the five highest-impact issues.
```

This keeps analysis separate from implementation.

---

# Working With Figma

When implementing a Figma design, use Impeccable after the initial
implementation.

Example:

```text
Implement this Figma design faithfully.

Do not add unnecessary UI patterns.

After the implementation is complete, use Impeccable to review:

- Typography
- Spacing
- Layout
- Responsive behavior
- Visual hierarchy
- Accessibility

Do not redesign the original concept.

Only improve implementation quality where appropriate.
```

---

# Example Prompt

Avoid vague prompts such as:

```text
Make my homepage better.
```

Use a bounded request:

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

This is especially useful when learning frontend design instead of allowing
AI to make every design decision automatically.

---

# Impeccable + frontend-design

Impeccable and Anthropic's `frontend-design` Skill can work together.

They have different roles.

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
- Explain changes before implementing them
- Do not modify unrelated files
- Run validation after changes
```

## Impeccable

Use Impeccable for design expertise and frontend quality.

Examples:

```text
- Improve visual hierarchy
- Refine typography
- Review spacing
- Improve interaction design
- Detect design problems
- Polish existing UI
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

---

# Project Structure

After a project-level installation, you may see Impeccable-related files such
as:

```text
Portfolio/
├── .claude/
│   ├── settings.local.json
│   └── skills/
│       └── impeccable/
│
├── app/
├── components/
├── public/
├── PRODUCT.md
├── package.json
└── ...
```

The exact structure can change between Impeccable versions and installation
methods.

Do not manually create these files.

Let the official installer manage the integration.

---

# Updating Impeccable

To update an existing installation:

```bash
npx impeccable update
```

Then reload Claude Code:

```text
/reload-plugins
```

Verify the installation:

```text
/impeccable
```

---

# Troubleshooting

## Impeccable Command Is Not Available

Try:

```text
/reload-plugins
```

Then:

```text
/impeccable
```

If it still does not appear, restart Claude Code.

---

## Claude Code Was Not Detected

Run the installer again:

```bash
npx impeccable install
```

If multiple tools are detected, select Claude Code manually.

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
PRODUCT.md
```

These may contain project configuration, product context, or integration
files created by Impeccable.

Check the official documentation before manually removing installation-managed
files.

---

# Do Not Manually Recreate Impeccable

Use the official installer:

```bash
npx impeccable install
```

Do not manually copy an old version of the Skill from another project.

The installer is responsible for setting up the appropriate integration,
commands, and Design Hook.

---

# Alternative Claude Code Plugin Installation

Claude Code also supports installing Impeccable through its official
marketplace.

Add the marketplace:

```text
/plugin marketplace add pbakaus/impeccable
```

Then open the plugin manager:

```text
/plugin
```

Find Impeccable in the marketplace and install it.

For a normal project setup, the CLI installer is recommended:

```bash
npx impeccable install
```

because it handles the project integration and Design Hook together.

---

# Quick Reference

| Task | Command |
|---|---|
| Install | `npx impeccable install` |
| Update | `npx impeccable update` |
| Initialize | `/impeccable init` |
| Show commands | `/impeccable` |
| Audit | `/impeccable audit` |
| Critique | `/impeccable critique` |
| Polish | `/impeccable polish` |
| Distill | `/impeccable distill` |
| Animate | `/impeccable animate` |
| Bolder | `/impeccable bolder` |
| Quieter | `/impeccable quieter` |
| Hook status | `/impeccable hooks status` |
| Enable hook | `/impeccable hooks on` |
| Disable hook | `/impeccable hooks off` |
| Reset hook | `/impeccable hooks reset` |

---

# Recommended Setup

For projects using this `Claude-Code-Starter` repository:

```text
1. Create the project
2. Add CLAUDE.md
3. Install frontend-design when needed
4. Install Impeccable when frontend quality matters
5. Run /impeccable init
6. Build incrementally
7. Use critique before major visual changes
8. Use polish for refinement
9. Let the Design Hook catch deterministic problems
10. Verify manually in the browser
```

The goal is not to let AI blindly design the entire application.

The goal is to create a workflow where AI helps you:

```text
Understand
    ↓
Design
    ↓
Build
    ↓
Review
    ↓
Improve
    ↓
Verify
```

---

# Official References

- Impeccable GitHub:
  https://github.com/pbakaus/impeccable

- Impeccable Website:
  https://impeccable.style/

---

# Final Principle

Use Impeccable as a **design expert and quality-control layer**, not as a
replacement for understanding frontend development.

The best workflow is:

```text
You
 ↓
Understand the design
 ↓
Claude Code
 ↓
Implement
 ↓
Impeccable
 ↓
Critique + detect + refine
 ↓
You
 ↓
Review and approve
```

AI should help you become a better frontend developer — not remove the need
to understand why the interface works.