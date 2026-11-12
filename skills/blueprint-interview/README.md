# Blueprint Interview

A custom Claude Skill that interviews you **before any code is written**, from
product discovery to an approved architecture and implementation plan.

It works for any project type, AI or not:

| Project type | Examples |
|---|---|
| Marketing / brochure website | Clinic, restaurant, portfolio, WordPress + Elementor |
| E-commerce | Online shop, catalog with checkout |
| Web app / internal system | POS, inventory, booking, CRM, Laravel or Next.js app |
| Mobile app | Expo / React Native |
| AI-powered product | Assistant, chatbot, smart search |
| API / backend service | Integrations, webhooks |

The AI questions only appear when the project actually uses AI.

Output: one `PROJECT_BLUEPRINT.md`, the single source of truth for the project.

---

# What It Does

- Asks **one question at a time**, usually with lettered options (a, b, c).
- For every major decision gives: your proposal → its recommendation → why →
  pros and cons → cost and complexity → a better alternative.
- **Challenges** decisions that conflict with earlier ones.
- **Verifies current facts** (pricing, SDKs, store policies, OS permissions,
  name availability) with web search instead of guessing.
- Prefers the **simplest stack** with the fewest moving parts.
- Matches your language (English or Taglish) and explains technical terms
  with examples from your own project.
- Does **not** write code until you approve the scope, architecture and plan.

---

# Phases

```text
0. Kickoff            → understanding, decision areas, files to inspect, first question
1. Product            → problem (real stories), users, scope, daily return / conversion
2. Brand & content    → feel, name research, copy, voice
3. UX                 → first-time experience, accounts, permissions, platform realities
4. Scope checkpoint   → MVP scope, scenario walkthrough, wireframes, page inventory  ← approve
5. Technical          → previous code, stack, architecture, data model, security, (AI)
6. Roadmap            → spikes first, then small tasks                             ← approve
7. Implementation     → small tasks, one at a time
```

---

# The Blueprint File

`PROJECT_BLUEPRINT.md` has 13 sections:

1. Vision and problem / business goal
2. Users, journeys / scenario walkthrough, screens or sitemap
3. Requirements and MVP / launch scope
4. Brand, content and design direction
5. Technical stack and reasons
6. System architecture and diagrams
7. Database / content model and API design
8. Authentication, roles and security
9. AI and retrieval architecture (or N/A)
10. Notifications, emails and background workflows
11. Testing, evaluations, analytics and observability
12. Implementation roadmap and tasks
13. Decisions and open questions

Section 13 always has a numbered **decision log** and a current
**open questions** list, for example:

```text
Open Questions
- Mkeni: hallway test + availability/trademark check
- Spike: Google Sign-In on dev build + link to anonymous account
- Stack, backend, scheduling, model provider
- Previous repo/files to inspect
```

---

# Installation

## Claude Code (personal, all projects)

Copy the folder into your personal skills folder:

```text
~/.claude/skills/blueprint-interview/SKILL.md
```

Windows:

```text
C:\Users\<you>\.claude\skills\blueprint-interview\SKILL.md
```

## Claude Code (one project only)

```text
my-project/
└── .claude/
    └── skills/
        └── blueprint-interview/
            └── SKILL.md
```

## Claude app (claude.ai / desktop)

Zip the `blueprint-interview` folder and upload it from your Skills settings,
or save it from a skill proposal card.

Restart Claude Code (or start a new chat) after installing.

---

# How to Use

1. Start a **new** session or chat.
2. Type `/blueprint-interview`, or just say *"Interview me before we build …"*.
3. Optional: attach what you have (old repo, copy doc, current site link,
   screenshots, competitor links).
4. Answer one question at a time. A single letter like `b` is enough.
   Ask for elaboration or scenarios anytime.
5. Approve the scope (Phase 4), then the architecture and roadmap.
6. Only then start coding, one small task at a time.

---

# Example Prompts

## 1. Client website (no AI)

```text
/blueprint-interview
New WordPress + Elementor site for "Smile Dental Cebu". Their copy doc is attached.
```

Focus: visitor goals (call, book, Messenger), sitemap, who edits content, SEO,
speed, form spam protection, hosting. Skips database, accounts and AI.

## 2. Web system (no AI)

```text
Interview me before building an inventory + POS system in Laravel
for a hardware store with 2 branches.
```

Focus: roles (owner, cashier, branch manager), branch data separation, stock
transfers, end-of-day reports, audit logs, offline sales, backups.

## 3. Mobile app (no AI)

```text
/blueprint-interview
Expo app for booking haircuts at my friend's barbershop.
```

Focus: accounts vs name + phone booking, queue logic, reminder notifications
(Android permissions, battery savers), no-shows, barber admin view. Includes a
spike: test notifications on a real Xiaomi phone.

## 4. AI product

```text
Interview me before building an AI chatbot that answers customer questions
using our product list.
```

Focus: what the bot answers alone vs hands to a human, RAG vs simple lookup,
"never quote a price unless it comes from the database", evals, cost per chat.

---

# How It Fits the Starter Workflow

```text
Blueprint Interview  → approved PROJECT_BLUEPRINT.md
        ↓
Step 2: AGENTS.md    → generated from the approved blueprint
        ↓
Steps 3-8            → starter kit, skeleton, design system, one task at a time
```

See the main [README](../../README.md).

---

# Core Principles It Teaches

- Decide early what is expensive to change later; delay what is cheap to add later.
- Validate with a small audience first (a launch gate).
- Fast first: core actions never wait on AI or the network.
- Deterministic code over "smart" features when a rule can do the job.
- Confirm before consequential actions; enforce permissions on the server.
- Identity comes from the session, never from client input or an AI model.
- Never lose data; keep error messages calm and clear.
- Spikes before features for risky integrations.
