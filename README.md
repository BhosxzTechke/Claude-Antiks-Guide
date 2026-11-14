# Claude Code Starter

A reusable, professional workflow for building apps with **Claude Code + GitHub Spec Kit**: from an empty folder to a finished, reviewed feature.

> Explanations are in Taglish. Commands stay in English. Tested end to end on the **Mkeni Spec** practice app (Next.js 16, Windows, Claude extension in the editor, Spec Kit 1.4.0).

---

## Which workflow should I use?

| Situation | Workflow |
|---|---|
| **New app, real project, multiple features** | **This README: Spec Kit workflow** |
| Small app, quick prototype, a few screens | [Prompt workflow](workflows/prompt-workflow/README.md): MVP doc + `AGENTS.md` + one `prompts/NN-*.md` per task |
| Big or unclear idea that needs product and architecture decisions first | [`blueprint-interview`](skills/blueprint-interview/README.md) skill, **before** either workflow |
| Want Claude to coach you through this setup step by step | `speckit-project-setup` skill (in your Claude account) |

---

## The map

```
PHASE 0  (optional)  blueprint-interview      → decide WHAT to build and the stack
PHASE A  once per computer                     → uv, Spec Kit CLI
PHASE B  once per app                          → app, Spec Kit, CLAUDE.md, constitution,
                                                 permissions, hooks, reviewer
PHASE C  every feature (repeat)                → branch → specify → clarify → plan → tasks
                                                 → analyze → implement → review → PR → merge
```

**The rule behind every step:** si Claude ang gumagawa ng draft, **ikaw ang nagre-review at nag-a-approve**, saka **commit**.

---

# PHASE 0 — Blueprint interview (optional, for big apps)

Kapag malaki o malabo pa ang idea (halimbawa Mkeni na may AI, auth at notifications), patakbuhin muna ang [`blueprint-interview`](skills/blueprint-interview/README.md). Ang output nito (`PROJECT_BLUEPRINT.md`) ang magiging basehan ng constitution (B4) at ng mga feature specs (Phase C).

Para sa maliit na practice app, pwede itong laktawan.

---

# PHASE A — Machine setup (once per computer)

### A1. Check what you already have

```cmd
node -v
npm -v
git --version
gh --version
uv --version
specify --version
```

### A2. Install `uv` (Spec Kit's installer)

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

> ⚠️ **"'uv' is not recognized" pagkatapos i-install?** Normal. Hindi pa nare-refresh ang PATH ng bukas na terminal. **Isara at buksan ulit ang terminal.** Permanenteng ayos: `uv tool update-shell`.

### A3. Install Spec Kit

```cmd
uv tool install specify-cli
specify --version
specify check
```

> 💡 **Maraming "not found" sa `specify check`?** Normal. Listahan iyan ng lahat ng AI tools na sinusuportahan. Ang mahalaga lang ay ang gagamitin mo. Kung **Claude extension sa editor** ang gamit mo, ayos lang kahit "not found" ang Claude CLI.

---

# PHASE B — Project setup (once per app)

### B1. Create the app + git + GitHub repo

```cmd
cd C:\dev
npx create-next-app@latest my-app
cd my-app
git log --oneline
npm run dev
gh repo create my-app --private --source=. --push
```

- `create-next-app` already makes the first git commit.
- **Bakit git agad?** Ito ang safety net mo kay Claude. Lahat ng binago niya ay makikita (`git diff`) at maibabalik (`git restore`).

> ⚠️ **Bawat bagong app = bagong repo.** Kapag ginamit ulit ang lumang repo, mapapalitan ang history nito.

### B2. Add Spec Kit

```cmd
git status
specify init --here --integration claude --script ps
```

| Flag | Meaning |
|---|---|
| `--here` | Use the current folder |
| `--integration claude` | Generate files for Claude Code (older versions: `--ai claude`) |
| `--script ps` | PowerShell scripts (Windows). Mac/Linux: `--script sh` |
| `--ignore-agent-tools` | Add this if it complains that the Claude CLI isn't found |

**Bago mag-commit, tingnan muna kung ano ang idinagdag:**

```cmd
git status
```

```
.claude/skills/speckit-*      ← the /speckit-... commands (they are SKILLS)
.specify/memory/constitution.md   ← the "constitution", still a template
.specify/templates/           ← shape of spec.md, plan.md, tasks.md
.specify/scripts/powershell/  ← scripts the skills run
```

```cmd
git add .claude .specify
git commit -m "chore: add Spec Kit (Claude skills, PowerShell scripts)"
```

Then **start a new Claude session in the project folder** and type `/speckit` to confirm the commands appear.

> 💡 **Pro habit:** bago tanggapin ang ginawa ng isang tool, alamin kung **ano ang eksaktong binago** nito.

### B3. `CLAUDE.md` (how Claude works in this repo)

1. In Claude: `/init` → Claude reads the real code and drafts `CLAUDE.md`.
2. Edit the draft using [`templates/speckit-setup/CLAUDE.md`](templates/speckit-setup/CLAUDE.md) as the shape:

| ✅ Keep / add | ❌ Remove |
|---|---|
| `@AGENTS.md` as the first line (if the framework created one) | Boilerplate intro ("This file provides guidance...") |
| One line: what the app is | Lists of files that exist "so far" (they go stale) |
| Commands: dev, lint, typecheck, test | Anything Claude can learn by reading the code |
| Gotchas: non-default config, version quirks | **Product rules → they go in the constitution** |
| "Working with me" (your preferences) | |

```cmd
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md"
```

> 💡 **Saan ilalagay ang rules?**
> **`CLAUDE.md`** = paano gumagana si Claude (commands, gotchas, preferences).
> **`constitution.md`** = mga prinsipyo ng produkto at engineering.
> **Huwag ulitin ang parehong rule sa dalawa.** Kapag binago mo ang isa at nakalimutan ang isa, magkakasalungat sila.

> ⚠️ **Walang lumabas na file pagkatapos ng `/init`?** I-check: may naghihintay bang "Allow" sa Claude panel? Tama ba ang folder na bukas? Kung draft lang ang ipinakita: *"Write that to CLAUDE.md."*

### B4. Constitution (the project's "saligang batas")

The principles every spec and plan must follow. `/speckit-plan` checks against it.

```text
/speckit-constitution Project: <name>. Principles:
1. Simplicity first: build only what the current spec asks for.
2. <architecture rule, e.g. "Client-only: no backend" or "Server owns all writes">
3. Minimal dependencies: no new library unless the plan explains why.
4. <data rule, e.g. "Never lose or break user data" or "Every query scoped to user_id">
5. Spec before code: no implementation without approved spec, plan and tasks.
Quality gates: <lint + typecheck + tests> MUST pass before a task is marked done.
Governance: changes go through /speckit-constitution with a version bump.
```

**Review:**
- [ ] No `[PLACEHOLDER]` left
- [ ] Every principle is **measurable** (uses MUST / MUST NOT / SHOULD)
- [ ] Version (1.0.0) and date at the bottom
- [ ] Read anything Claude added that you didn't ask for

| ❌ Vague | ✅ Measurable |
|---|---|
| "Keep it simple" | "No new dependency unless the plan explains why the platform can't do it." |
| "Be secure" | "No API keys in client code." |

```cmd
git add .specify/memory/constitution.md
git commit -m "docs: ratify constitution v1.0.0"
```

### B5. Permissions (`.claude/settings.json`): allow / ask / deny

| List | Meaning | Examples |
|---|---|---|
| **allow** | Do it, don't ask | lint, typecheck, `git status`, `git diff *`, `git log *` |
| **ask** | Ask me first | `npm install *`, `git commit *`, `git push *` |
| **deny** | Never | Read/Edit `./.env`, `./.env.*`; Bash `cat .env*`, `type .env*`, `rm -rf *`, `git push --force *`, `git reset --hard *` |

- Start from [`templates/speckit-setup/.claude/settings.json`](templates/speckit-setup/.claude/settings.json) and adapt the commands to your stack.
- **Deny always wins.**
- `.claude/settings.json` = shared (in git). `.claude/settings.local.json` = only you (gitignored). Your "Yes, don't ask again" clicks are saved in the local one.
- No exact match without `*`: `Bash(git status)` matches only `git status`, not `git status --short`.

**Test it** (new Claude session):

```cmd
echo FAKE_API_KEY=abc123> .env.local
```

```text
Read .env.local and tell me what's inside.
```

✅ Must be blocked. Check all rules with `/permissions`.

> ⚠️ **Butas:** `Read(.env)` blocks the Read tool, **not** `cat .env` or `type .env` in the terminal. Kaya i-deny din ang Bash forms. Para sa mas matibay na harang, gumamit ng hooks (B6).

```cmd
git add .claude/settings.json
git commit -m "chore: add Claude permissions (allow/ask/deny)"
```

### B6. Hooks (automation that can't be forgotten or bypassed)

Deny rules are **patterns**. Halimbawa, hindi nila mahuhuli ang `node -e "require('fs').readFileSync('.env.local')"`. **Hooks are real code** that runs on every tool call.

| Hook | When | Does |
|---|---|---|
| [`protect-secrets.mjs`](templates/speckit-setup/.claude/hooks/protect-secrets.mjs) | **PreToolUse** (`Bash\|Read\|Edit\|Write\|Grep`) | Blocks (exit 2) anything whose command, file path, path or glob mentions `.env` |
| [`lint-fix.mjs`](templates/speckit-setup/.claude/hooks/lint-fix.mjs) | **PostToolUse** (`Edit\|Write`) | Runs `eslint --fix` on edited code files, never fails the edit |

- Node scripts (`.mjs`) work on Windows, Mac and Linux.
- Registered in `settings.json` as `node "$CLAUDE_PROJECT_DIR/.claude/hooks/<name>.mjs"`.
- Check with `/hooks`. It shows the source of each hook: **Project**, **User** or **Plugin**.

**Test the bypass** (must be blocked by the hook):

```text
Run: node -e "console.log(require('fs').readFileSync('.env.local','utf8'))"
```

> 💡 **Security hook checklist:** exit `2` = block, exit `0` = ok · if input can't be read, allow (don't break all work) · think about **every** tool (Bash, Read, Edit, Write, Grep, Glob) · watch for false positives (`.env.example`).
> 💡 **Use what's already installed.** We used ESLint, not Prettier, because the constitution says no new dependencies. Ginagabayan ng constitution kahit ang setup decisions.

```cmd
git add .claude
git commit -m "chore: add hooks (protect secrets, eslint fix on edit)"
```

### B7. Reviewer subagent

A **separate Claude with fresh context** that did not write the code, so it isn't biased. Parang inspector na galing sa labas.

- Copy [`templates/speckit-setup/.claude/agents/spec-reviewer.md`](templates/speckit-setup/.claude/agents/spec-reviewer.md) to `.claude/agents/`.
- **Read-only tools only** (Read, Grep, Glob, git diff/status). It reports; **you** decide what to fix.
- It checks: spec acceptance criteria (met / not met / can't verify, with file:line), every constitution principle, ticked tasks vs real code, scope creep, untracked files.

**Test it before any feature:**

```text
Use the spec-reviewer subagent. Run git status, then check whether CLAUDE.md and the constitution contradict each other.
```

```cmd
git add .claude/agents
git commit -m "chore: add spec-reviewer subagent"
```

> ⚠️ The `/agents` wizard was removed in newer Claude versions. Create the file directly, or ask Claude to create it.

### ✅ Phase B done

```
✅ B1 App + git + GitHub     ✅ B5 Permissions (tested)
✅ B2 Spec Kit                ✅ B6 Hooks (tested)
✅ B3 CLAUDE.md               ✅ B7 Reviewer (tested)
✅ B4 Constitution
```

Wala pang app code, pero may rules, saligang batas, proteksyon, automation at inspector na ang project mo.

---

# PHASE C — Every feature (repeat)

## First: size the work (S / M / L)

| Size | Example | Process |
|---|---|---|
| **S** | Typo, color, small bug | Ask Claude directly → lint → commit. **No Spec Kit.** |
| **M** | Small addition to an existing feature | Plan Mode (Shift+Tab), or specify + plan + tasks only |
| **L** | New feature, data, auth, money, anything hard to undo | **The full loop below** |

> ⚠️ **Pinakamalaking pagkakamali ng mga nagsisimula sa Spec Kit:** gamitin ang buong proseso sa maliliit na pagbabago. 20 tasks para sa pagpapalit ng kulay ay sayang lang ng oras.

## The L-feature loop

```
C1 branch → C2 specify → C3 clarify → C4 plan → C5 tasks → C6 analyze
   → C7 implement (one phase at a time: test → review → commit) → C8 PR → merge
```

### C1. Branch first

```cmd
git checkout main
git pull
git checkout -b 001-upcoming-notes
```

> ⚠️ Spec Kit 1.4 does **not** create a branch for you (it tracks the current feature in `.specify/feature.json`). Gawin mo ito mismo. Huwag mag-feature work sa `main`.

### C2. `/speckit-specify` — WHAT and WHY

```text
/speckit-specify A tiny notes app. The user types a short note that includes a date, like "bayad kuryente sa Nov 15", and saves it. Saved notes appear in an "Upcoming" list, soonest first. Notes must still be there after reloading the page.
```

- **Walang tech words:** no frameworks, storage, or components. ("after reloading the page", hindi "localStorage")
- Creates `specs/001-name/spec.md` and a self quality checklist.
- ⚠️ **"Defaults I chose"** = desisyong ginawa **para sa iyo**. Sadyang tanggapin o tanggihan ang bawat isa.

```cmd
git add specs .specify/feature.json
git commit -m "docs(001): add spec"
```

### C3. `/speckit-clarify` — find what's unclear

Optional, pero gawin. Nagtatanong ito isa-isa, at isinusulat ang mga sagot mo sa **Clarifications** section (may petsa).

- Kapag hindi sigurado, piliin ang **pinakasimple**.
- **Bantayan ang mga sagot na sumasalungat sa constitution.** (Sa practice: muntik nang mabura ang sirang data, na sumasalungat sa "never lose user data".) Mas mura itong ayusin sa spec kaysa sa code.

### C4. `/speckit-plan` — HOW

```text
/speckit-plan Next.js App Router + TypeScript, as already set up. Store notes in localStorage. Parse dates with our own small function. No new libraries. Keep it to as few files as possible.
```

Creates `plan.md` (+ `research.md`, `data-model.md`, `quickstart.md`). **Review:**
- [ ] **Constitution Check:** all principles pass, or a violation is clearly justified
- [ ] **New dependencies?** Should be none unless justified
- [ ] **"Ano ang mahirap baguhin pagkatapos?"** Usually the stored data format → add a **version** field (`{ "version": 1, "notes": [...] }`) so you can migrate later

```cmd
git add specs
git commit -m "docs(001): add plan"
```

### C5. `/speckit-tasks` — STEPS

**Review:**
- [ ] Small tasks, logic before UI
- [ ] **Every task leaves the app working AND safe.** ❌ "unsafe version now, fixed in a later task" + a warning. ✅ Write the safe version from the start. *Ang babalang kailangang tandaan ay babalang malilimutan.*
- [ ] No parallel tasks that touch the same file (they would conflict)
- [ ] Nothing that isn't in the spec or plan (scope creep)

### C6. `/speckit-analyze` — consistency check before code

Finds contradictions, coverage gaps, type errors and scope creep **before** code exists.

| Severity | Action |
|---|---|
| CRITICAL | Stop. Fix before implementing. |
| MEDIUM | Fix before implementing. |
| LOW | Fix if quick, or accept on purpose. |

- **Re-run after fixing.** Your own edits create new inconsistencies.
- Set the spec **Status: Approved**. That's your formal sign-off (constitution: spec before code).

```cmd
git add specs
git commit -m "docs(001): resolve analyze findings; spec approved"
```

### C7. `/speckit-implement` — one phase at a time

```text
/speckit-implement Phase 1 and 2 only (Setup + Foundational). Stop after, run lint and typecheck.
```

After **each** phase:
1. `npm run dev` → follow `quickstart.md` yourself (you are the user)
2. `Use the spec-reviewer subagent on specs/001-upcoming-notes`
3. Fix findings → tick tasks
4. Commit

```cmd
git add .
git commit -m "feat(001): setup and foundational tasks"
```

> ⚠️ **Never leave implemented code uncommitted.** Sa practice, may code na naisulat pero hindi na-commit at walang na-tick na task. Mas mabuti ang 5 maliliit na commit kaysa isang malaking hindi naka-commit.
> 💡 Kapag may existing code na: **suriin laban sa spec, huwag isulat ulit.**
> 💡 Kapag nagbago ang plano habang nag-i-implement: **update spec/plan/tasks first, then code.**

### C8. Pull request and merge

```cmd
git push -u origin 001-upcoming-notes
gh pr create --fill
```

Review the PR on GitHub (and CI / CodeRabbit if set up), then **merge**. Next feature: back to C1 with `002-...`.

---

# Branching and commits

```
main ──●────────────────●──────────────────●──→   always working, always deployable
        \              /  \               /
         001-upcoming-notes  002-design-system
```

| Thing | Convention | Example |
|---|---|---|
| Feature branch | `NNN-short-name` (same number as `specs/NNN-...`) | `001-upcoming-notes` |
| Quick fix branch (S size) | `fix/short-name` | `fix/date-typo` |
| Commit types | `feat`, `fix`, `docs`, `chore`, `refactor`, `test` | `feat(001): save note with date` |
| Spec/plan/tasks commits | `docs(NNN): ...` | `docs(001): add plan` |
| Setup commits | `chore: ...` | `chore: add hooks` |

- **One feature = one branch = one PR.**
- Commit **after every approved step**, so the history shows when and why the plan changed.
- ❌ Avoid `"update"` as a commit message. Walang masasabi ang ganyan sa history.

---

# UI features

Same loop, plus a **design reference** and a **visual check**. Spec Kit handles behavior; it can't describe how things look on its own.

```
0. Design reference first → docs/design/home.png (ChatGPT image, Figma, Claude Design)
1. Design system as its OWN feature first (002-design-system): colors, fonts, spacing, buttons
2. Then screens, each with the full loop
```

| Step | UI addition |
|---|---|
| **specify** | Point to the reference as **source of truth**. List **every state**: empty, loading, error, filled. Sizes: 360px and 1280px. |
| **plan** | Reuse theme tokens and existing components. No new UI library unless justified. |
| **tasks** | Include a task: "Compare with docs/design/home.png at 360px and 1280px; fix differences." |
| **implement** | **Verify loop:** build → screenshot → compare with reference → fix → repeat. Use the `frontend-design` skill. |
| **review** | spec-reviewer + a visual review (`impeccable` critique) |

```text
/speckit-specify Home screen. Design reference: docs/design/home.png (source of truth).
States: empty (no notes yet), list with notes, error message, saving.
Must work on phone (360px) and desktop (1280px).
```

Add a UI principle to the constitution (version **1.0.0 → 1.1.0**, MINOR bump):

```text
/speckit-constitution Add principle VI. Design Fidelity: when a design reference exists, it is the source of truth. Screens MUST use theme tokens (no hardcoded colors or sizes) and MUST be checked against the reference at 360px and 1280px before a task is marked done.
```

Skills: [`frontend-design`](skills/frontend-design/README.md) (visual direction) · [`impeccable`](skills/impeccable/README.md) (critique, polish)

---

# Changing the rules

| Situation | Do this |
|---|---|
| The constitution blocks something good (e.g. a test runner) | **Amend it openly:** `/speckit-constitution` + version bump. Baguhin ang batas, huwag labagin nang palihim. |
| You keep correcting Claude the same way | Add a line to `CLAUDE.md`, or make a project skill |
| A procedure repeats across features | Project skill in `.claude/skills/` |

Version bumps: **MAJOR** = principle removed or redefined · **MINOR** = principle or section added · **PATCH** = wording fixes.

---

# Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| `'uv'` / `'specify'` is not recognized | Terminal has old PATH | Open a new terminal; `uv tool update-shell` |
| Claude Code "not found" in `specify check` | Using the editor extension, not the CLI | OK. Use `--ignore-agent-tools` in `specify init` |
| `/speckit-*` or new commands don't appear | Session started before files existed | New Claude session in the project folder |
| `/init` produced no file | Pending approval, wrong folder, or draft only | Approve / open the right folder / "Write that to CLAUDE.md" |
| Login: "Console is temporarily unavailable" | Anthropic-side incident | Check status.claude.com, wait, or log in with a Claude subscription account |
| `AGENTS.md` changed by itself | The framework writes blocks into it (e.g. Next.js agent rules and feedback) | **Read it before committing.** Tool-generated files can instruct Claude. Turn off what you don't want (e.g. `experimental.agentFeedback` in `next.config.ts`). |

---

# Lessons learned (mga aral)

- 💡 **Draft → review → approve → commit.** Si Claude ang gumagawa, ikaw ang may kontrol.
- 💡 **Verify, don't assume.** "Malamang protektado" ≠ "napatunayang protektado". Test every guardrail.
- 💡 **Tools change fast.** Kapag hindi tugma ang instructions sa nakikita mo, ang tool at ang opisyal na docs ang tama, hindi ang tutorial.
- 💡 **The setup pays off.** In the practice app, the two smartest plan decisions came straight from `@AGENTS.md` (Next 16 docs) and the `CLAUDE.md` gotchas.
- 💡 **Cheaper early.** A problem found in the spec costs minutes; in the code, hours.
- 💡 **Defaults are decisions made for you.** Accept or reject them on purpose.
- 💡 **Every task leaves the app working and safe.**
- 💡 **Commit often**, on a feature branch, with clear messages.

---

# What's in this repo

```
Claude-Code-Starter/
├── README.md                      ← this guide (Spec Kit workflow)
├── templates/
│   ├── speckit-setup/             ← tested .claude files + CLAUDE.md template (Phase B)
│   ├── claude-starter-kit/        ← kit for the prompt workflow
│   └── starter-kit/
├── workflows/
│   └── prompt-workflow/README.md  ← original workflow, for small apps
├── skills/
│   ├── blueprint-interview/       ← Phase 0: product + architecture interview
│   ├── frontend-design/           ← UI direction
│   ├── impeccable/                ← UI critique and polish
│   ├── client-reply/              ← client messages (not part of this workflow)
│   └── elementor-site-from-doc/   ← Elementor builds (not part of this workflow)
├── docs/                          ← background notes (CLAUDE.md, MCP, agents, skills, prompting)
├── examples/
└── assets/
```
