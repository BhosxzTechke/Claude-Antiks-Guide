# PROJECT_BLUEPRINT.md — Don't Forget (working name)

> Single source of truth. Updated after every major decision.
> Status: **Discovery phase**. No code until requirements, architecture and plan are approved.
> Last updated: 2026-11-12

---

## 1. Product Vision & Problem Statement

**Vision:** As fast and simple as Google Keep, but it *understands* what you write and acts on it.

**Problem:** Users forget bills, installments, renewals, account details and social-media tasks. Note apps like Keep store notes but don't understand them. Writing "Meralco due 15th" creates no reminder unless the user manually sets one.

**Core principle — Capture first, AI second:**
1. User types a note and taps save → saved instantly (like Keep). Never waits for AI.
2. In the background (~1–3s), AI reads it and *suggests* actions (e.g. "Remind you Nov 15, 9:00 AM? [Yes] [Edit]").
3. If AI is slow/offline, the note is still safe; AI catches up later.

## 2. Target Users & User Journeys

- **Phase 1 user:** Mike (founder) — dogfooding.
- **Public primary user:** Filipino young working professionals, 22–35 (freelancers/remote workers overlap).
  - Remember: bills, installments ("hulog sa motor"), SSS/PhilHealth/Pag-IBIG, subscriptions, warranties, ID renewals, account details, social-media tasks.
  - Already use Keep / Notes / Messenger-to-self.
- **Scenario walkthrough (each scene = a future test case).** Tags: [MVP] [Pre-public] [1.5]. Stack names marked *candidate* are not final.
  1. **First launch [MVP]** — No login; note box focused. *Tech:* `signInAnonymously()` (candidate Supabase) → anonymous user + JWT kept in secure device storage; IP rate limit + bot check (captcha/Play Integrity, TBD); RLS `user_id = auth.uid()` active from note #1.
  2. **First note → reminder [MVP]** — "hulog sa motor 3200 every 2nd" saves instantly; ~2s later suggestion card (next: Wed, Dec 2, 2026) → Yes → notification permission → exact-alarm prompt → soft sign-in prompt. *Tech:* optimistic UI (local DB + outbox queue) → sync → enrichment job → LLM **structured output** (JSON schema) validated server-side → Tier 0 applied, Tier 1 saved in `suggestions` (status `pending`) → on Yes: reminder with **RRULE** `FREQ=MONTHLY;BYMONTHDAY=2`, stored UTC + timezone Asia/Manila → local notification scheduled. **Idempotency key** prevents duplicate reminders on retry. Embedding saved to pgvector column. Permissions: `POST_NOTIFICATIONS` (Android 13+), `SCHEDULE_EXACT_ALARM` (Android 14+, default-denied → inexact fallback).
  3. **Voice [MVP]** — Mic → editable text → "Monthly or once?". *Tech:* on-device Android SpeechRecognizer (`expo-speech-recognition`); `RECORD_AUDIO` asked on first mic tap; auto-stop on silence; LLM returns `needs_clarification` → Mkeni asks.
  4. **Offline [MVP]** — Saves with ☁️⏳. *Tech:* outbox retries with exponential backoff; MVP conflict rule last-write-wins (single device).
  5. **Photo [MVP; AI reading = 1.5]** — Warranty card photo + text → "Warranty until ~Mar 2027, remind Feb 1, 2027?". *Tech:* image compressed on device → private storage path `{user_id}/…` with storage RLS → viewed via short-lived **signed URL**. LLM extracts purchase date + duration; **code** computes end date (deterministic).
  6. **Password typed [MVP]** — "Looks like a password → save privately?". *Tech:* on-device detector runs before outbox; private note in encrypted local storage; excluded from sync, AI, embeddings.
  7. **Morning briefing [MVP]** — 7:00 AM summary → Today screen. *Tech:* plain SQL query, no LLM; next briefing pre-built + scheduled locally; recomputed whenever reminders change; skipped if empty.
  8. **Due + Mark paid [MVP]** — [Mark paid] [Snooze]. *Tech:* notification action buttons; `reminder_occurrences.completed_at` set; next occurrence from RRULE; unpaid → `overdue` in next briefing.
  9. **Restart / battery saver [MVP]** — Reminders survive reboot; one-time tip on Xiaomi/Oppo/Vivo/Realme. *Tech:* boot receiver restores schedules; **reconcile on every app open**: compare DB upcoming reminders vs OS-scheduled notifications, fix differences.
  10. **Keyword search [MVP]** — "lenovo" → instant. *Tech:* Postgres `tsvector` + GIN index; `pg_trgm` for typos.
  11. **Ask Mkeni [MVP]** — "until when warranty ng laptop ko?" → answer + source. *Tech:* query embedding → **hybrid retrieval** (full-text rank + vector cosine similarity, merged e.g. via reciprocal rank fusion) → top-k notes → LLM with **grounding** rules, must cite note IDs → server checks cited IDs exist and belong to user → below similarity threshold = "I couldn't find that". No answer caching in MVP.
  12. **"Tasks this week?" [MVP]** — List answer. *Tech:* **tool calling**: `list_reminders(from, to)`; tool executor injects `user_id` from JWT; model never sees or sets it; permission tiers enforced in executor.
  13. **Guest quota [MVP]** — Notes still save; AI waits. *Tech:* per-user daily counter; over limit → jobs status `waiting_quota`; capture never blocked.
  14. **Prompt injection [MVP]** — Malicious note text has no effect. *Tech:* note content wrapped as untrusted data; scoped tools; RLS; output schema validation.
  15. **Email sign-up [Pre-public]** — Email + password → verify email. *Tech:* anonymous user upgraded via `updateUser({ email, password })` → same `user_id`; verification + forgot-password flows; custom SMTP (e.g. Resend/Brevo); auth rate limits.
  16. **New phone [MVP for Google users]** — Sign in → notes and reminders return. *Tech:* pull from DB → reschedule all upcoming local notifications. ⚠️ Device-only private notes are **not** restored → warn user before they switch.
  17. **Developer view [MVP]** — Logs + evals. *Tech:* one trace per AI call (trace ID, model, latency, tokens, cost, outcome); ~30-case eval set run before prompt/model changes; metrics: extraction accuracy, retrieval recall@k.

## 3. Product Requirements & MVP Scope

**Memory types in scope:**
| Type | Example | Handling |
|---|---|---|
| Bills / payments | "Pay motorcycle installment Nov 2" | Reminder suggestion |
| Subscriptions / renewals | "Netflix renews 20th, ₱549" | Recurring reminder |
| Account context | "Facebook uses mike.dev@gmail.com" | Searchable memory |
| Social-media tasks | "Reply to Ate Joy by Friday" | Reminder suggestion |
| Facts / warranties | "Lenovo warranty until Mar 2027" | Searchable memory |
| **Secrets (passwords, 2FA, OTP)** | — | **NOT stored / never sent to AI in MVP** (see §8) |

**Capture methods (Decision #7)** — founder importance scores: typing 7, voice 8, photo 3 (photo seen as a big future feature).
| Method | MVP | Later |
|---|---|---|
| Typing | Primary; app opens with cursor in note box | — |
| Voice | In-app mic button via on-device Android SpeechRecognizer (`expo-speech-recognition`) → free, text goes through same capture-first pipeline. Requires dev build (not Expo Go). | If Taglish accuracy is poor: cloud STT fallback (OpenAI gpt-4o-mini-transcribe ≈ $0.003/min) |
| Photo/screenshot | Attach image to a note (schema supports attachments from day 1) | Phase 1.5: AI reads bill/receipt → suggests due date & amount |

**Draft MVP scope — Phase 1 (dogfooding) — AWAITING APPROVAL**

In scope:
1. Quick capture: text + on-device voice; instant save; offline queue
2. Photo/screenshot attach (no AI reading yet)
3. Background AI enrichment: tags, extracted fields (amount, date, account), reminder suggestions — per permission tiers (#8)
4. Reminders: one-time + recurring (e.g. monthly installments); mark done/paid → next occurrence; local notifications
5. Morning briefing (DB-built) + "Today" screen
6. One search box: instant keyword results + "Ask Mkeni" answer with source note; time-based queries via tool calls
7. Secret detector → private note (never sent to AI)
8. Anonymous account on first launch → link Google; guest AI quota
9. RLS + server-controlled user ID everywhere
10. Basic eval set (seed cases) + AI call logging (latency, cost, errors)

Out of scope (later):
- Phase 1.5: photo AI extraction (bill → reminder)
- Pre-public: email + password sign-in, mascot art/animation, polished onboarding, hallway-tested name/brand assets
- Later: home-screen widget, encrypted vault, email sign-in, multi-device sync polish, pricing/subscriptions, web app, iOS

## 4. Brand & Design Direction
- **Brand feel (Decision #12):** smart, trustworthy assistant — calm, premium, "personal secretary".
- **Name (Decision #13, provisional): Mkeni** — pronounced "mi-KEH-nee". Coined from founder's name (Mike). No existing app/company found in preliminary web search.
  - Tagline carries the meaning, e.g. "Mkeni — your personal memory assistant".
  - Mitigations for spelling ≠ pronunciation: show "Mkeni (mi-KEH-nee)" on Play Store + onboarding; register mikeni domain(s) too; add "Mikeni" as Play Store keyword.
  - Before final: hallway test (5 people hear it → type it) + Play Store / domain / IPOPHL trademark check.
- Previous shortlist (backup options) (availability = preliminary web check only; full Play Store / domain / IPOPHL trademark check before final):
  | Candidate | Origin & meaning | Notes |
  |---|---|---|
  | Gunita | Tagalog: memory, recollection, remembrance | Filipino identity; slight memorial/nostalgic tone |
  | Hypomnema | Ancient Greek: reminder, note, memorandum; also a note-keeping tablet | Exact meaning; hard to spell; small existing uses (Obsidian plugin, iOS flashcard app) |
  | Memoranda | Latin: "things to be remembered" (root of "memo") | Clear to English speakers; availability unchecked |
  | Tandaan | Tagalog: "remember (this)" | Closest to "Don't Forget"; availability unchecked |
  - Rejected: Mneme (existing "Mneme AI" notes app), Mnemosyne (existing flashcard software), Codex (OpenAI), Tala (major PH lending app).
- Feel: Keep-like — fast, minimal, low friction.
- **Mascot (Decision #14): core personality, long term** — but a *calm, competent* character, not a goofy one, so it fits "trustworthy assistant".
  - Tone rules: warm/playful on success, empty states, onboarding; **serious and plain** on money, deadlines, errors, security.
  - No guilt-trip or streak-pressure notifications (conflicts with Decision #6: skip briefing when nothing is due).
  - **The app IS the character (Decision #15):** the AI speaks as "Mkeni" in first person ("I'll remind you on Nov 2"). Persona lives in the system prompt + copy guide. Mkeni must stay honest: says when unsure, never claims to have done an action that is still pending confirmation.
  - Phasing: Day 1 = written voice/tone guide only; dogfooding = static placeholder; pre-public = full mascot design + limited animation.

## 5. Technical Stack & Reasons
_TBD — decided after product/UX/AI interviews._ Constraint: physical Android device, no emulator required.

## 6. System Architecture & Diagrams
_TBD_

## 7. Database & API Design
**Fixed from day 1 (Decision #4):** every user-owned row has `user_id`; RLS enabled; timestamps stored in UTC with user timezone stored separately (default Asia/Manila).
Details: _TBD_

## 8. Authentication & Security
- **Secrets policy (Decision #2):** Store account *context* (which email, linked number, where the password is kept), never the secret itself.
  - On-device secret detector runs **before** any AI call (patterns: "password", "pw", 6-digit OTPs, long random strings) → offers "Save as private note (AI won't read)".
  - v2 candidate: zero-knowledge encrypted vault (client-side keys). Not MVP.
- **AI tools receive user ID from the server, never from the model.**
- Auth flow structure exists from day 1 even while only the founder uses it.
- **Guest mode via anonymous accounts (Decision #10):**
  - First launch: no sign-in screen. App silently creates an anonymous account (candidate: Supabase `signInAnonymously()`), so `user_id` + RLS work from note #1.
  - Upgrade = link Google to the same account (Supabase `linkIdentity`) → **same `user_id`, no data migration**.
  - Abuse guards: IP rate limit on anonymous sign-ups, bot protection (captcha or Play Integrity — decide in stack phase), lower AI quota for anonymous users (e.g. ~20 AI actions/day, tune later).
  - RLS policies may check `is_anonymous` JWT claim to restrict account-only features.
  - Honest UI: guest data is lost on uninstall / clear data / new phone.
  - Cleanup: delete anonymous accounts inactive 30+ days (tune later).
  - **Sign-in prompts:** (1) soft, skippable prompt after first confirmed reminder; (2) one gentle reminder after ~5 notes; max 2–3 prompts total. **Required** only for backup, new device/sync, or exceeding guest AI quota.
  - Rejected for MVP: local-only guest storage with merge-on-signup (merge conflicts, AI still needs server).
- **Sign-in method (Decision #11):** Google only for now (Android users nearly all have Google accounts). Email OTP/magic link can be added later cheaply. Implementation note: native Google Sign-In → ID token → Supabase (candidate `signInWithIdToken` / `linkIdentity`); requires dev build — v1 had Google Sign-In/EAS issues, so this gets an early spike task.
- **Email + password sign-in (Decision #16, Pre-public):** add alongside Google. Use **email** (not bare username) so password reset and verification work. Requires email verification + "forgot password" screens, and **custom SMTP before public** (Supabase default sender is test-only, ~2 emails/hour, team addresses only). Anonymous → email upgrade keeps same `user_id`.
- Remaining items (sessions, tokens, rate limiting, deletion, backups): _TBD_

## 9. AI, Memory & RAG Architecture
- AI runs in background after save; it **suggests**, user **confirms**.
- **AI permission tiers (Decision #8)** — enforced in server code, not just in the prompt:
  | Tier | Actions | Rule |
  |---|---|---|
  | 0 — Auto | Tag/category, extract fields (amount, date, account), link related notes | AI does it silently; user can edit |
  | 1 — Confirm | Create/edit reminder, schedule notification, recurring rules | Suggestion card; nothing fires until tapped |
  | 2 — Confirm + warning | Delete, bulk changes, anything irreversible | Explicit confirm screen |
- Confirmation cards show the date in full human form ("Sun, Nov 2, 2026 · 9:00 AM") so misreads are visible.
- Ambiguity → AI asks instead of guessing (e.g. "Once, or every 2nd of the month?").
- Unconfirmed suggestions appear in the morning briefing ("1 suggestion waiting") so they're never silently lost.

**Search & Ask (Decision #9)** — one search box, "fast first, smart second":
| Query type | Example | Mechanism | Speed / cost |
|---|---|---|---|
| Keyword | "Lenovo" | Postgres full-text search + trigram (typo-tolerant) | Instant, free |
| Question about a fact | "Until when is my Lenovo warranty?" | **RAG**: hybrid retrieve (keyword + vector) → LLM answers only from retrieved notes, cites source note | ~1–3s, small LLM cost |
| Meaning, not words (Taglish) | "Kailan bayad sa bike?" vs note "hulog sa motor" | Vector (embedding) similarity catches it; keyword alone fails | Included in hybrid |
| Structured / time-based | "What important tasks this week?" | **Tool call**, not RAG: `list_reminders(from, to)` DB query | Fast, accurate |
- Keyword results render instantly; AI answer appears on top when the query looks like a question.
- **pgvector in MVP: yes** — it's a Postgres extension (no new service). Embedding generated in the same background step as AI enrichment. Cost reference: OpenAI text-embedding-3-small = $0.02 / 1M tokens (verified 2026-11-12) → ~10k notes ≈ $0.01. Final embedding model chosen with provider decision.
- AI answer must say "I couldn't find that" instead of guessing when retrieval finds nothing.
- Eval needed: Taglish retrieval quality (embedding models' Filipino performance unverified).
- Model choice, embeddings, hybrid search, guardrails: _TBD_

## 10. Notifications & Background Workflows
**Daily return loop (Decision #6):** Morning briefing notification + due-time reminders.
- Briefing default 7:00 AM, user-adjustable. Short: max ~3 items + "and 2 more".
- Skip the briefing on days with nothing due (avoid notification fatigue).
- Briefing content is built **deterministically from the database** (query: due today / this week / renewals). No LLM needed → fast, free, reliable. AI phrasing optional later.
- MVP candidate (to confirm in stack phase): schedule briefing + reminders as **local notifications** on device, rescheduled whenever data changes → may remove need for a server cron/Trigger.dev in Phase 1. Revisit when multi-device sync arrives.
- Tap briefing → opens "Today" screen.
- **Production reality of local notifications (Decision #17):** they work after deployment — the phone's OS fires them, not our server. Requirements/caveats:
  - Android 13+: user must allow notifications (ask at first confirmed reminder, not at launch).
  - Android 14+: exact-time alarms (`SCHEDULE_EXACT_ALARM`) are denied by default; `USE_EXACT_ALARM` is restricted by Play policy to alarm/calendar apps. Plan: ask user to allow exact alarms (with explanation) + fall back to inexact timing if declined.
  - Reboot: expo-notifications uses boot permission to restore schedules — verify on Mike's phone.
  - OEM battery savers (common on Xiaomi/Oppo/Vivo/Realme) may delay or kill alarms → in-app guide to whitelist Mkeni; test on real devices.
  - Reschedule all upcoming reminders from DB on app open, sign-in, and new phone.
  - When multi-device sync arrives: server-side scheduling + push (FCM) needed. Candidate: Postgres cron + Edge Function — likely still no Trigger.dev.

## 11. Testing, Evaluations & Observability
_TBD_. Seed eval cases: motorcycle installment Nov 2; Lenovo warranty lookup; "important tasks this week".

## 12. Implementation Roadmap
**Phasing rule (Decision #4):** Decide early what is expensive to change later; delay what is cheap to add later.

| Day 1 (do correctly) | Delay (add after dogfooding) |
|---|---|
| `user_id` + RLS everywhere | Polished onboarding, mascot |
| Auth flow structure | Guest mode UX polish |
| Memory + reminder data model | Pricing / subscriptions |
| Server-controlled user ID for AI tools | Analytics dashboards |
| Proper timezone handling | Scaling / caching optimization |

**Go-public gate:** Mike uses it daily for 2–4 weeks and it replaces Keep. If not, fix the core first.

Tasks: _TBD_

## 13. Architecture Decisions & Open Questions

### Decision Log
| # | Date | Decision | Why |
|---|---|---|---|
| 1 | 2026-11-12 | Capture first, AI second | Fixes v1 slowness; works offline; AI errors low-risk |
| 2 | 2026-11-12 | Store account context, not secrets | Notes go to AI API; breach risk; password managers already solve this |
| 3 | 2026-11-12 | Phase 1 = founder only; later public Play Store | Validate before polishing |
| 4 | 2026-11-12 | Phasing rule + go-public gate | Avoid both rewrite trap and premature-polish trap |
| 5 | 2026-11-12 | Primary public user: Filipino young professionals 22–35 | Matches founder's pain; high-stakes recurring items; can pay later |
| 6 | 2026-11-12 | Daily loop = morning briefing + due reminders; briefing built from DB, not LLM | Habit trigger; deterministic = cheap/fast/reliable |
| 7 | 2026-11-12 | Typing + on-device voice in MVP; photo attach in MVP, photo AI in Phase 1.5 | Voice rated high; on-device STT is free and fast; vision AI is costlier |
| 8 | 2026-11-12 | AI permission tiers: auto for low-risk metadata, confirm for reminders/notifications, confirm+warn for destructive | Prevents silent wrong reminders; keeps speed for harmless actions |
| 9 | 2026-11-12 | One search box: instant keyword results + AI answer (hybrid RAG) + tool calls for time queries; pgvector in MVP | Taglish synonyms need semantic search; pgvector adds no new service; cost negligible |
| 10 | 2026-11-12 | Guest mode = silent anonymous account; soft sign-in prompt after first confirmed reminder; Google linked to same user_id | Zero friction to first value; no data migration; abuse limited by quotas |
| 11 | 2026-11-12 | Sign-in: Google only (for now) | One tap; covers target users; add email later if requested |
| 12 | 2026-11-12 | Brand feel: smart, trustworthy assistant | Users trust it with bills and account info |
| 13 | 2026-11-12 | Name: Mkeni ("mi-KEH-nee"), provisional | Unique, ownable, founder story; pending hallway test + trademark check |
| 14 | 2026-11-12 | Mascot = core personality (calm, competent); built pre-public, not Day 1 | Brand warmth without undermining trust; avoids v1 premature polish |
| 15 | 2026-11-12 | App = character: AI speaks as "Mkeni" | Stronger, simpler brand; fits agentic assistant |
| 16 | 2026-11-12 | Add email + password sign-in — Pre-public phase | Not everyone wants Google; email enables reset/verification |
| 17 | 2026-11-12 | Local notifications in production + exact-alarm permission flow + OEM battery guide | Works without server; Android 14 exact alarm default-deny |

### Open Questions
- Home-screen widget (post-MVP?)
- Mkeni: hallway test + availability/trademark check
- Approve draft MVP scope (§3)
- Test Android SpeechRecognizer with Taglish on Mike's phone (spike task)
- Spike: Google Sign-In on dev build + link to anonymous account
- Stack, backend, scheduling, model provider
- Previous repo/files to inspect
