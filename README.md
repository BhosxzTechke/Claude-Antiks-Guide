# Claude Code Starter

My reusable Claude Code setup for software development.

This repository contains the templates, Skills references, workflow, and
setup scripts I use when starting and working on projects with Claude Code.

The goal is to use Claude Code as a development partner rather than
simply as a code generator.

---

# 🚀 Starting a New Project

When starting a new Claude Code project, use this repository as the
reference for the initial setup.

## 1. Create Your Project

Create your project using the appropriate framework.

Example:

```powershell
npx create-next-app@latest my-project
```

Then enter the project:

```powershell
cd my-project
```

---

## 2. Add `CLAUDE.md`

Copy the reusable template from this repository:

```powershell
Copy-Item `
  "..\Claude-Code-Starter\templates\CLAUDE.md" `
  ".\CLAUDE.md"
```

Then customize `CLAUDE.md` for the project.

For example:

```text
my-project/
│
├── CLAUDE.md
├── app/
├── public/
├── package.json
└── ...
```

See:

```text
docs/claude-md.md
```

for more information.

---

# 🧩 Adding Skills

Skills are added only when a project needs them.

If I want to use a specific Skill, go to its folder inside:

```text
skills/
```

For example:

```text
skills/
└── frontend-design/
    └── README.md
```

The Skill's README contains:

- What the Skill does
- Official source
- Installation instructions
- How it should appear in the project
- Any important notes

---

## Example: Adding `frontend-design`

If I want the `frontend-design` Skill:

```text
1. Open:
   skills/frontend-design/README.md

2. Follow the installation instructions.

3. Verify that the Skill was added to the project.
```

The final project should look approximately like:

```text
my-project/
│
├── CLAUDE.md
│
├── .claude/
│   └── skills/
│       └── frontend-design/
│           └── SKILL.md
│
├── app/
├── public/
└── package.json
```

---

## Example: Adding `impeccable`

If I want Impeccable:

```text
1. Open:
   skills/impeccable/README.md

2. Follow the installation instructions.

3. Verify the installation.

4. Continue working inside the project.
```

---

## Example: Adding `playwright`

If I need browser testing:

```text
1. Open:
   skills/playwright/README.md

2. Follow the installation instructions.

3. Verify the installation.

4. Use it when browser testing is required.
```

---

# ⚙️ Scripts

The `scripts/` directory contains reusable scripts that help automate
Claude Code project setup.

The goal is to avoid repeating the same setup steps manually for every
new project.

Current and future scripts may help with:

- Creating project configuration
- Adding `CLAUDE.md`
- Installing selected Skills
- Setting up `.claude/`
- Verifying project setup
- Other repetitive Claude Code configuration

For example:

```text
scripts/
└── setup-project.ps1
```

A setup script may eventually allow a new project to be configured with:

```powershell
.\scripts\setup-project.ps1
```

The script should automate repetitive setup while keeping the process
understandable and transparent.

If a script is not available yet, follow the manual instructions in this
README and the relevant documentation.

---

# 🧠 Project Setup

A typical project may eventually look like:

```text
my-project/
│
├── CLAUDE.md
│
├── .claude/
│   └── skills/
│       ├── frontend-design/
│       │   └── SKILL.md
│       │
│       ├── impeccable/
│       │   └── SKILL.md
│       │
│       └── playwright/
│           └── SKILL.md
│
├── app/
├── public/
├── package.json
└── ...
```

Not every project needs every Skill.

Only add the Skills that are relevant to the project.

---

# 🔄 Basic Workflow

After the project is configured:

```text
Create Project
      ↓
Add CLAUDE.md
      ↓
Choose Required Skills
      ↓
Install Skills
      ↓
Configure MCP if needed
      ↓
Start Claude Code
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

Start Claude Code from inside the project:

```powershell
claude
```

---

# 📚 Repository Structure

```text
Claude-Code-Starter/
│
├── README.md
│
├── docs/
│   ├── workflow.md
│   ├── claude-md.md
│   ├── skills.md
│   ├── prompting.md
│   ├── mcp.md
│   ├── agents.md
│   └── context-management.md
│
├── templates/
│   └── CLAUDE.md
│
├── skills/
│   ├── frontend-design/
│   │   └── README.md
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

---

# 🗺️ Where to Go

If I need:

```text
CLAUDE.md
→ templates/CLAUDE.md

How CLAUDE.md works
→ docs/claude-md.md

Frontend design Skill
→ skills/frontend-design/README.md

Impeccable
→ skills/impeccable/README.md

Playwright
→ skills/playwright/README.md

Claude Code workflow
→ docs/workflow.md

Prompting
→ docs/prompting.md

MCP
→ docs/mcp.md

Agents
→ docs/agents.md

Project setup automation
→ scripts/setup-project.ps1
```

---

# 🎯 Principle

This repository is my personal Claude Code starting point.

I don't need to memorize every installation command or workflow.

When starting a new project:

```text
Come here
   ↓
Find what I need
   ↓
Follow the instructions
   ↓
Set up the project
   ↓
Start building
```

The objective is to become a better developer with Claude Code, not to
blindly generate code.
