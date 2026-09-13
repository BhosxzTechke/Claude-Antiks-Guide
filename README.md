# Claude Code Starter

My reusable Claude Code setup for software development.

This repository contains the templates, Skills references, workflow, and
setup scripts I use when starting and working on projects with Claude Code.

The goal is to use Claude Code as a development partner rather than simply
as a code generator.

---

# 🚀 Starting a New Project

When starting a new Claude Code project, use this repository as the reference
for the initial setup.

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

Example:

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

## 3. Add Visual References

If the project has visual references, create:

```text
references/
└── visual/
```

Add screenshots, Figma exports, website references, or other visual material
that Claude should use as design context.

Example:

```text
my-project/
│
├── references/
│   └── visual/
│       ├── homepage-reference.png
│       └── hero-reference.png
│
├── CLAUDE.md
├── app/
├── public/
└── package.json
```

Visual references are specific to the project and are not copied from this
repository.

If no visual references are needed, this directory is optional.

---

# 🧩 Adding Skills

Skills provide Claude Code with specialized knowledge or workflows.

Only add Skills when they provide real value for the project.

Available Skill references are documented inside:

```text
skills/
├── frontend-design/
│   └── README.md
├── impeccable/
│   └── README.md
└── playwright/
    └── README.md
```

Each Skill README explains:

- What the Skill does
- Official source
- Installation method
- How to verify it
- How to use it
- Important notes

---

# How Skills Are Installed

Not every Skill is installed in the same way.

A Skill may be provided through:

```text
Official Plugin
     OR
Project Skill
     OR
Another supported installation method
```

Always follow the installation instructions in the Skill's README.

Do not assume that every Skill must appear inside:

```text
.claude/skills/
```

Some official Claude Code plugins are managed by Claude Code and may be
stored outside the project.

Others may create project-level files under `.claude/`.

The Skill's own README is the source of truth for its installation.

---

# 🎨 Example: Adding `frontend-design`

If I want to use the `frontend-design` Skill:

```text
1. Open:

   skills/frontend-design/README.md

2. Follow the official installation instructions.

3. Install it through Claude Code's plugin system when available.

4. Reload plugins if required.

5. Verify that Claude detects the Skill.

6. Start using it during frontend development.
```

The official plugin may be managed by Claude Code separately from the project.

See:

```text
skills/frontend-design/README.md
```

for the complete setup.

---

# ✨ Example: Adding `impeccable`

If I want to use Impeccable for frontend design review and refinement:

```text
1. Open:

   skills/impeccable/README.md

2. Follow its installation instructions.

3. Run the official installer from the project root.

4. Select Claude Code.

5. Select Project installation.

6. Enable the Design Hook when prompted.

7. Reload Claude Code.

8. Run /impeccable init.

9. Verify the installation.
```

The recommended installation command is:

```powershell
npx impeccable install
```

See:

```text
skills/impeccable/README.md
```

for the complete setup.

---

# 🧪 Example: Adding `playwright`

If I need browser testing:

```text
1. Open:

   skills/playwright/README.md

2. Follow its installation instructions.

3. Verify the installation.

4. Use it when browser testing is required.
```

---

# ⚙️ Scripts

The `scripts/` directory contains reusable scripts that help automate
Claude Code project setup.

Example:

```text
scripts/
└── setup-project.ps1
```

A setup script may eventually allow a new project to be configured with:

```powershell
.\scripts\setup-project.ps1
```

Scripts should automate repetitive setup while keeping the process
understandable and transparent.

---

# 🧠 Project Setup

A typical project may eventually look like:

```text
my-project/
│
├── CLAUDE.md
├── PRODUCT.md
│
├── references/
│   └── visual/
│
├── .claude/
│   └── ...
│
├── app/
├── components/
├── public/
├── package.json
└── ...
```

The exact `.claude/` structure depends on the Claude Code features and Skills
enabled for the project.

Some Skills may be managed by Claude Code outside the project.

Others may use a project-level structure such as:

```text
.claude/
└── skills/
    └── skill-name/
        └── SKILL.md
```

Always follow the Skill's own installation instructions.

---

# 🔄 Basic Workflow

After the project is configured:

```text
Create Project
      ↓
Add CLAUDE.md
      ↓
Add Visual References
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

# 🧭 Development Workflow

Use Claude Code as a development partner.

The preferred workflow is:

```text
Understand
    ↓
Inspect
    ↓
Plan
    ↓
Review
    ↓
Implement
    ↓
Test
    ↓
Review
    ↓
Refine
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

The `docs/` directory is a reference and learning library.

It is not automatically copied into every new project.

The `templates/` directory contains reusable files.

The `skills/` directory contains documentation and references for Skills.

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

Skills
→ docs/skills.md

Prompting
→ docs/prompting.md

MCP
→ docs/mcp.md

Agents
→ docs/agents.md

Context management
→ docs/context-management.md

Project setup automation
→ scripts/setup-project.ps1
```

---

# 🎨 Frontend Design Workflow

For a frontend-heavy project:

```text
Visual References
       ↓
frontend-design
       ↓
Visual Direction
       ↓
Implementation
       ↓
Impeccable
       ↓
Critique + Refinement
       ↓
Browser Verification
```

Use:

```text
skills/frontend-design/README.md
```

for frontend design guidance.

Use:

```text
skills/impeccable/README.md
```

for design review and refinement.

---

# 🧩 Choosing Skills

Do not install every available Skill into every project.

Choose Skills based on the actual project requirements.

For example:

```text
Portfolio
    ↓
frontend-design
    ↓
impeccable

Browser testing
    ↓
playwright
```

A project does not need every Skill.

Fewer relevant Skills can make the project easier to understand and manage.

---

# 🔌 MCP

MCP provides Claude Code with access to external tools and services.

Configure MCP only when the project actually needs it.

See:

```text
docs/mcp.md
```

for more information.

---

# 🤖 Agents

Agents can be used for specialized development workflows.

Use them when the task benefits from a specialized role or independent
workflow.

Do not create or use agents simply because they are available.

Start with the simplest approach that solves the problem.

See:

```text
docs/agents.md
```

for more information.

---

# ✍️ Prompting

Good prompts should provide:

```text
Context
   ↓
Goal
   ↓
Constraints
   ↓
Workflow
   ↓
Expected result
```

Instead of:

```text
Build this.
```

Prefer:

```text
Inspect the existing implementation first.

Explain what you found.

Create a concise plan.

Do not modify files yet.

Wait for my approval.
```

See:

```text
docs/prompting.md
```

for more information.

---

# 🧠 Context Management

Keep important project rules in:

```text
CLAUDE.md
```

Keep product context in:

```text
PRODUCT.md
```

Keep project-specific visual references in:

```text
references/visual/
```

Use Skills for specialized knowledge.

Use MCP when external tools or services are required.

See:

```text
docs/context-management.md
```

for more information.

---

# 🔐 Project Safety

Never place sensitive information into:

```text
CLAUDE.md
README.md
Skills
GitHub
references/
Screenshots
Prompts
```

Do not commit:

- API keys
- Passwords
- Authentication tokens
- Private credentials
- Secrets
- Private client information

Use appropriate environment variables and secret management instead.

---

# 🎯 Principle

This repository is my personal Claude Code starting point.

I do not need to memorize every installation command or workflow.

When starting a new project:

```text
Come here
   ↓
Find what I need
   ↓
Read the relevant documentation
   ↓
Install what is required
   ↓
Configure the project
   ↓
Start building
```

The objective is to become a better developer with Claude Code, not to
blindly generate code.

---

# Final Rule

Use the simplest setup that supports the project.

Do not add:

- Skills
- MCP servers
- Agents
- Abstractions
- Scripts
- Dependencies

unless they provide a clear benefit.

The goal is not to create the biggest Claude Code setup.

The goal is to create a development environment that makes me a better
developer.

```text
Simple
   +
Intentional
   +
Understandable
   +
Powerful
   =
Better Claude Code Workflow
```