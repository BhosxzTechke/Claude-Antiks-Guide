# Claude Code Starter

A reusable workflow for working with Claude Code on any software project — static site, business website, CMS, web app, mobile app, or API.

Use Claude as a **senior technical partner and pair programmer** — not a code generator.

---

## The Loop

> Understand → Review → Approve → Document → Plan → Implement → Verify → Repeat

```
PLAN MODE
  ├─ 1. Interview        what type of project? what are we building?
  ├─ 2. Recommend        Claude proposes Skills/MCP → I pick
  ├─ 3. Requirements     what is actually confirmed?
  └─ 4. Architecture     simplest design that works
              ↓ approve
        AGENTS.md    → HOW this project must be built
        plan.md      → WHAT to build, in what order
              ↓ approve
   ┌───→ Pick ONE task
   │         ↓
   │     Inspect → prompts/<task>.md
   │         ↓ approve
   │     Implement → Verify → Review
   │         ↓
   └─── Update plan.md
```

Nothing gets implemented until the step above it is approved.

---

## Ground Rules

| Rule | Why |
|---|---|
| No code during discovery | Understanding is the deliverable |
| One task at a time | Scope creep is the main failure mode |
| Inspect before modifying | Reuse existing patterns |
| Approve before implementing | You stay in control |
| Verify after implementing | "Done" means checked, not written |
| Skills/MCP are optional | You pick them, Claude never installs blindly |
| Rules live in AGENTS.md | Write a rule once, not in every prompt |

---

## 1. Plan Mode

Start here for a new project or a major feature.

### Step 1 — Product Interview

```
You are my senior technical co-founder, software architect, and pair programmer.

We are starting a new project. Do NOT write code. Enter PLAN MODE.

Your first job is to INTERVIEW me until you understand the product.

START WITH ONE QUESTION: what are we actually building? Have me pick or
describe one of:

  - static website (landing page, portfolio, docs)
  - business / marketing website
  - CMS-backed site (blog, content site, multi-editor)
  - web app (dashboard, SaaS, internal tool)
  - e-commerce store
  - mobile app
  - API / backend service
  - CLI, script, or automation
  - something else — I'll describe it

Then ADAPT the whole interview to that answer. Do not ask questions that
don't apply. A static site has no auth, roles, or database schema — don't
ask about them.

Ask for every project type:
  problem being solved, users, scope boundaries (what we are NOT building),
  content or data, hosting and deployment, who maintains it afterwards.

Then go deeper based on type:
  static / business site → pages, content source, SEO, forms, analytics, domain
  CMS                    → who edits, content models, roles, preview, media
  web app / SaaS         → auth, permissions, data model, state, integrations, billing
  e-commerce             → catalog, cart, checkout, payments, inventory, shipping, tax
  mobile                 → platforms, offline, notifications, store requirements
  API / service          → consumers, endpoints, auth, rate limits, versioning

Cover when relevant to any of them: user journeys, edge cases, performance,
accessibility, security, testing, future requirements.

Ask 3–6 high-leverage questions at a time, grouped by topic. After each batch:
1. Summarize what you understand.
2. Name what is still unclear.
3. Ask the next highest-value questions.

STOP interviewing once you understand: what we're building, who it's for, the
problem it solves, the main features, the key user flows, and the major
technical requirements. Don't pad the interview.

Then go straight to the CAPABILITY RECOMMENDATION below — do not write code,
AGENTS.md, or plan.md.
```

### Step 2 — Capability Recommendation (Claude proposes, you pick)

Append this to the interview prompt, or send it when the interview stops:

```
The interview is done. Before we plan anything, recommend the capabilities
this SPECIFIC project would benefit from — Skills, MCP servers, agents,
browser automation, testing tools, design tools, external docs.

Present them as a numbered list I can pick from:

  #  |  Name  |  What it does  |  Required / Recommended / Optional  |  Why it helps here

Rules:
- Only list what this project actually justifies. A static site probably
  needs nothing — say so.
- Flag anything an existing capability already covers.
- Install nothing. I'll tell you which numbers I want.

After I pick, move on to the Requirements & Architecture Review.
```

### Step 3 — Requirements & Architecture Review

```
Review everything we established in the interview, including the capabilities
I picked. Do NOT write code.

Summarize: confirmed requirements, project type, core features and user flows,
technical requirements, architecture, content/data and integrations, security,
testing, deployment, project boundaries.

Then identify:
- Missing         — information we still need
- Incorrect       — anything inconsistent or technically problematic
- Assumptions     — anything you had to assume
- Risks           — meaningful technical or product risks
- Recommendations — improvements, and why

Do not invent requirements. Ask only the questions you actually need.

Then propose the simplest reasonable architecture for the confirmed
requirements and project type. Avoid over-engineering — don't reach for a
framework, database, or service this project doesn't need.

Deliver: project specification, architecture summary, confirmed decisions,
missing information, recommendations, risks, high-level roadmap.

Do NOT create AGENTS.md, plan.md, or code. End by asking whether the review
is correct, so it can become the source of truth for AGENTS.md.
```

### Step 4 — Generate AGENTS.md

```
The review is approved. I've attached a reference AGENTS.md.

Use the attached file only as a reference for structure, organization,
writing style, level of detail, and engineering workflow. Do NOT copy its
project-specific content.

Our approved requirements and architecture review is the source of truth.

Generate a project-specific AGENTS.md covering: what we're building, how it
should be built, architecture, tech stack, project structure, key technical
decisions, content/data and integrations, UI rules, security, testing,
project-specific constraints, and pitfalls to avoid.

Include the UI Implementation Rules block I'm giving you verbatim.

Match the reference's specificity. Drop sections that don't apply, add ones
this project needs, invent nothing that wasn't confirmed.

Do NOT write code or plan.md. Afterwards, tell me what's still missing or
needs clarifying.
```

### Step 5 — Generate plan.md

```
Now create plan.md, using the approved review and AGENTS.md as source of truth.

AGENTS.md defines HOW the project is built. plan.md defines WHAT gets built,
in what order.

Keep it concise. Break the work into meaningful phases and tasks. Don't invent
features or duplicate rules from AGENTS.md.

Include: project status, phases, current task, next tasks, completed tasks,
key decisions, risks/blockers, deferred work.

Implement nothing. Show me the roadmap and wait for approval.
```

---

## 2. UI Visual Fidelity Loop

Put the loop in **AGENTS.md once**, then your day-to-day prompt stays one line.

![Build & Verify Loop](assets/diagrams/build-and-verify-loop.png)

### Paste this into AGENTS.md

```markdown
## UI Implementation Rules

When a task includes a visual reference (image, screenshot, Figma export),
the reference is the source of truth. Do not redesign or reinterpret it.

After implementing, run the visual verification loop:

    screenshot → compare to reference → fix → screenshot → compare

Keep looping until there are no noticeable differences. Compare layout,
spacing, sizing, positioning, typography, colors, borders, shadows, icons,
images, states, animations, and responsive behavior.

If something cannot be reproduced exactly, explain the limitation instead of
silently substituting something else.

Do not move to the next screen until the current one has passed the loop.
```

### Then the prompt is just

```
Implement the home page. @"c:/dev/full-stack-cms/design/vertex-home.png"
```

To attach the reference: drag the image into the prompt while holding **Shift** to insert it as a path, then type the task.

If Claude ever skips the loop, one nudge is enough: `Run the visual loop from AGENTS.md.`

---

## 3. One Task at a Time

```
Focus only on this task:

[TASK]

Before writing code:
1. Read AGENTS.md.
2. Read the relevant part of plan.md.
3. Inspect the relevant files.
4. Explain the current implementation.
5. Identify which files need to change.
6. Identify existing patterns to reuse.
7. Propose the simplest approach.
8. Identify risks and trade-offs.

Write the detailed implementation prompt to prompts/<descriptive-task-name>.md

Do not implement. Wait for approval.
```

### Implementation

```
Approved. Implement only the approved plan.

- Do not modify unrelated files.
- Do not add unnecessary dependencies.
- Do not refactor unrelated code.
- Do not start the next task.

Then: verify the result, run the appropriate checks, and report what changed,
what you verified, and what's still outstanding. Update plan.md.
```

---

## 4. Debugging

```
Problem → Reproduce → Inspect → Root Cause → Explain → Smallest Fix
        → Approve → Implement → Verify
```

```
Investigate this problem. Change nothing yet.

1. Reproduce or inspect the issue.
2. Identify the root cause.
3. Explain why it happens.
4. Identify the smallest reasonable fix.
5. Identify which files would change.
6. Identify any risks.

Wait for approval before implementing.
```

---

## 5. Code Review

```
Review the current implementation as a senior engineer. Modify nothing.

Check: correctness, architecture, simplicity, maintainability, performance,
accessibility, security, edge cases, unnecessary complexity, unnecessary
dependencies.

Classify findings as CRITICAL / IMPORTANT / OPTIONAL.
Only recommend changes that provide meaningful value.
```

---

## 6. What Goes Where

| Tool | Purpose | Answers |
|---|---|---|
| **AGENTS.md** | Project-specific engineering rules | How must this project be built? |
| **plan.md** | Persistent roadmap | What are we doing next? |
| **prompts/*.md** | Task implementation prompt | What are we implementing now? |
| **Plan Mode** | Discovery and planning | What are we building? |
| **Skill** | Specialized knowledge or workflow | How is this kind of thing done well? |
| **MCP** | External tools and services | What can we reach outside the repo? |
| **Agent** | Delegated specialized workflow | Who else can run this in parallel? |

Rule of thumb: if you'd have to say it in more than two prompts, it belongs in AGENTS.md.

---

## 7. Context Management

Keep the important state in the project, not the conversation:

```
AGENTS.md    plan.md    prompts/    docs/    source code    tests
```

When a conversation gets too large, start a fresh one:

```
Read AGENTS.md and plan.md, then inspect the current project.

Summarize:
1. what's completed
2. what's in progress
3. what remains

Change nothing. The project files are the source of truth.
```

---

## 8. Learning Mode

```
Explain this implementation like a senior developer mentoring me:
1. what the code does
2. why it's structured this way
3. the important concepts
4. alternatives we could have used
5. why this approach was chosen

Do not modify the code.
```

---

## Golden Rules

1. Understand before building.
2. Ask what kind of project it is before asking anything else.
3. Interview before assuming.
4. Plan before significant changes.
5. One task at a time.
6. Inspect before modifying.
7. Prefer the simplest architecture that works.
8. Claude recommends capabilities — you pick them.
9. Verify every implementation.
10. For UI, the loop lives in AGENTS.md; the prompt stays short.
11. Keep scope controlled and plan.md current.
12. You remain in control.

> Use Claude to think *with* you, not simply code *for* you.