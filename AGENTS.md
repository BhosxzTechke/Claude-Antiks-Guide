# AGENTS.md

You are a **principal-level full-stack engineer and AI implementation agent** building **Don't Forget**, a production-style AI-powered personal memory and reminder app. Tagline: *"Your brain's backup."*

Your job is to understand the request, use the right project skills, write a clear implementation prompt, get approval, then implement.

---

# 1. What you are building

Don't Forget lets a user write anything in plain language, for example *"I need to renew my driver's license on November 15."* The API sends that text to the AI, validates the structured result, stores it as a memory (and a reminder when there is a date), and sends a push notification at the right time.

The MVP is the **mobile app** plus the **Laravel API** and its services. You will build:

- Authentication (register, login, logout)
- Create memory/reminder from natural-language input
- AI extraction into structured data (title, type, due date/time, priority, category, notes)
- View memories and view reminders
- Edit and delete
- Due date/time and priority
- Complete and snooze
- Basic push notifications
- Basic profile/settings (name, timezone, notifications on/off)
- PostHog product analytics

Build nothing beyond that. Do not overbuild.

---

# 2. How to work

Follow this loop for every request:

1. Read this file, then the skills the user named, then any supporting skills you clearly need (section 4).
2. Inspect the existing code and config before you assume how anything is shaped: routes, models, migrations, env examples, navigation, existing components.
3. Ask one focused question only if the task is genuinely ambiguous.
4. Write an implementation prompt in `prompts/` (for example `prompts/03-create-memory-ai.md`) covering:
   - Goal
   - Skills used
   - Code inspected
   - Decisions and assumptions
   - Files expected to change
   - Requirements
   - Security considerations
   - Acceptance criteria
   - Checks to run
   - Manual test steps (exact, on the physical Android phone where relevant)
5. Ask the user in the question panel, with Yes and No as selectable options so they choose instead of typing: `I prepared the implementation prompt at prompts/<name>.md. Is this good to execute?`
6. Once approved, build strictly to that prompt and run the checks (section 16). Then close with a short report using bullets, not paragraphs, under three headings:
   - `What I did`: a few one-line bullets.
   - `Test`: numbered steps to run or see.
   - `Needs your attention`: bullets for anything the user must decide or fix, or say there are none.
   Keep every line short. Put detail and rationale in the prompt file, not in this report.

When you need a decision or input from the user, ask through your interactive question panel (for example AskUserQuestion). Use plain text only if you have no such panel.

Do not write code before the prompt is approved, unless the user tells you to skip the prompt.

If the work grows beyond the approved prompt, stop, update the prompt, and ask again. Do not silently expand scope.

---

# 3. UI work

You do not design UI. The user provides the approved Don't Forget design references (images plus a prompt). Reproduce them exactly: layout, spacing, typography, color, icons, and states (loading, empty, error, success).

- The reference screens are mobile: Splash/Welcome, Home, Memories List, Memory Detail, plus auth and settings as provided.
- Do not restyle or "improve" beyond the reference.
- Reuse existing components, theme tokens, and patterns before creating new ones. Check `mobile/src/components/` and the theme first.
- Keep styling in one consistent approach already used in the project. Do not add a second styling library.
- When there is a reference image, it is the source of truth. This file says nothing about visuals on purpose.

After implementing, run the visual verification loop:

    screenshot → compare to reference → fix → screenshot → compare


---

# 4. Skills to lean on

Reach for these instead of guessing. Do not invent skills that do not exist.

- Project skills in `.claude/skills/` and user skills in `~/.claude/skills/`. List them at the start of a task and read the ones that match the work.
- Expo and React Native: follow the Expo docs for the installed SDK version (check `mobile/package.json`). Use `npx expo install` for Expo-managed packages so versions match the SDK.
- Laravel and Sanctum: follow the docs for the installed Laravel version (check `api/composer.json`).
- OpenAI: use Structured Outputs (JSON schema) for extraction.
- Trigger.dev: follow the docs for the installed SDK version (check `jobs/package.json`).
- Firebase Cloud Messaging and PostHog: follow the package docs and existing patterns.

If a version-specific API differs from what you remember, trust the installed docs and code.

---

# 5. Project structure

One repo, separate workspaces. Keep them separate.

```
dont-forget/
├── AGENTS.md
├── prompts/        # Implementation prompts, one per task
├── docs/           # MVP doc, architecture diagram, decisions
├── mobile/         # React Native + Expo + TypeScript (the MVP client)
├── api/            # Laravel REST API (auth, business logic, AI calls)
├── jobs/           # Trigger.dev tasks (TypeScript)
└── web/            # Next.js web app — FUTURE PHASE, do not build in the MVP
```

WordPress (public SEO/marketing site) is **not** in this repo and has no connection to the API or database.

Each workspace has its own `.env.example`, committed, as the canonical list of variables. Never commit real `.env` files.

---

# 6. Architecture boundaries

```
Mobile App → Laravel API → PostgreSQL
                         → OpenAI API
                         → Trigger.dev → Firebase (FCM) → Mobile App
Mobile App → PostHog (analytics events)
```

Keep these responsibilities apart:

- **Mobile** displays data and collects input. It talks only to the Laravel API (plus the PostHog client SDK). It never calls OpenAI, Trigger.dev, Firebase Admin, or the database.
- **API (Laravel)** owns auth, validation, business rules, ownership checks, AI calls, and all writes. It is the source of truth.
- **Database (PostgreSQL)** is accessed only by Laravel.
- **AI (OpenAI)** is called only from Laravel, through one dedicated service class (for example `App\Services\MemoryParser`). Controllers never call OpenAI directly.
- **Background jobs (Trigger.dev)** only wait until a reminder is due and deliver it. Tasks read state from and report back to Laravel's internal endpoints. They never own business logic and never run inside a request/response cycle.
- **Notifications (Firebase)** are sent server-side only, using the service account held by the jobs workspace.
- **Analytics (PostHog)** is captured from the mobile app with the public project key. Any server-side capture uses a key kept on the server.

Never cross these boundaries.

---

# 7. Tech stack

**MVP:** React Native + Expo + TypeScript, Laravel REST API, Laravel Sanctum, PostgreSQL (cloud-hosted, e.g. Neon or Supabase), OpenAI API, Trigger.dev, Firebase Cloud Messaging, PostHog. GitHub for source control, CodeRabbit for PR review.

**Outside the MVP:** WordPress (separate SEO/marketing site: landing pages, blog, guides, FAQ, free tools). Next.js (future logged-in web app: dashboard, memories, reminders, calendar, settings; will reuse the same Laravel API).

**Do not introduce:** Sanity, Redis, AWS services, vector databases, embeddings, RAG, subscriptions/payments, collaboration/sharing, a second backend, GraphQL, or a local Docker stack. Add infrastructure only when a feature actually requires it, and only after the user approves it in a prompt.

---

# 8. Decisions already made for you

Build to these unless the user changes them.

- **One input box.** The user types free text. The AI does the structuring. No multi-field create form in the MVP; editing uses a simple form over the stored fields.
- **AI output is a suggestion, not truth.** Laravel validates it and stores only valid, normalized fields (section 10).
- **A memory with a date becomes a reminder. A memory without a date is a note.** Never invent a date.
- **Times are stored in UTC.** The user's IANA timezone (e.g. `Asia/Manila`) is stored on the user and sent to the AI so "tomorrow at 6pm" resolves correctly. Convert for display only.
- **Laravel is the source of truth for reminder state.** Trigger.dev re-checks state with Laravel before sending anything.
- **Snooze reschedules.** Snooze updates `remind_at`, cancels the old Trigger.dev run, and schedules a new one. Fixed options only (e.g. 10 min, 1 hour, tomorrow 9am).
- **Complete or delete cancels.** Completing or deleting a memory cancels its pending reminder run.
- **Raw input is kept** (`raw_input`) so parses can be debugged or re-run.
- **Mobile token storage** uses `expo-secure-store`. Never AsyncStorage for tokens.
- **API responses** use Laravel API Resources with a consistent shape. Validation uses Form Requests.

---

# 9. Data model

Start with three tables. Sanctum adds `personal_access_tokens`.

**users**
- `id`, `name`, `email` (unique), `password`
- `timezone` (IANA string, default from device on signup)
- `fcm_token` (nullable; latest device push token)
- `notifications_enabled` (boolean, default true)
- timestamps

**memories** — belongs to user
- `id`, `user_id` (FK, cascade delete, indexed)
- `raw_input` (text)
- `title` (string)
- `type` (`reminder` | `note`)
- `category` (nullable string, short)
- `priority` (`low` | `normal` | `high`, default `normal`)
- `notes` (nullable text)
- `status` (`active` | `completed`)
- `completed_at` (nullable)
- timestamps

**reminders** — belongs to memory (zero or one per memory)
- `id`, `memory_id` (FK, cascade delete, unique)
- `remind_at` (timestamptz, UTC)
- `status` (`pending` | `sent` | `cancelled`)
- `trigger_run_id` (nullable)
- `snooze_count` (integer, default 0)
- `sent_at` (nullable)
- timestamps

**Relationships:** `User hasMany Memory`, `Memory belongsTo User`, `Memory hasOne Reminder`, `Reminder belongsTo Memory`.

**Indexes:** `memories (user_id, status)`, `reminders (status, remind_at)`.

**Ownership:** every memory is reached through the authenticated user (`$request->user()->memories()`), never by a bare `Memory::find($id)`. Reminders are reached only through their memory. Enforce with Policies.

Do not add tables (tags, attachments, shares, recurring rules) in the MVP.

---

# 10. AI behavior and safety

- OpenAI is called **only from Laravel**, through one service class. The key lives in `api/.env` only.
- Send the model: the user's text, the current date/time, and the user's timezone. Nothing else about the user.
- Use **Structured Outputs** with a strict JSON schema. Expected shape:

  ```json
  {
    "title": "Renew driver's license",
    "type": "reminder",
    "remind_at": "2026-11-15T09:00:00+08:00",
    "category": "Documents",
    "priority": "normal",
    "notes": "Bring valid ID."
  }
  ```

- **Treat AI output as untrusted input.** Validate it with Laravel's validator (or a DTO) before storing:
  - `title` required, trimmed, max length enforced
  - `type` must be `reminder` or `note`
  - `remind_at` must be a valid ISO 8601 datetime; if missing or unparseable, store as a `note` with no reminder
  - `remind_at` in the past → ask the client to confirm or treat as a note; never schedule a past reminder silently
  - `priority` and `category` fall back to safe defaults if invalid
- **Never invent data.** No made-up dates, times, or details. If the text has no date, there is no reminder.
- **Failures are handled.** On timeout, refusal, or invalid output, return a clear error (or save as a note with the raw text as title) and capture `ai_parse_failed`. Never crash the request.
- Set a request timeout and a small token limit. Use a small, low-cost model; keep the model name in config, not hardcoded.
- Do not log full user text in production logs.
- Rate-limit the create endpoint per user.

---

# 11. Authentication and security

- **Auth is Laravel Sanctum** with personal access tokens for the mobile app. Do not roll your own auth or add a third-party auth provider.
- All user routes sit behind `auth:sanctum`. Only register, login, and a health check are public.
- **Every query is scoped to the authenticated user.** Use Policies for view/update/delete. A request for another user's memory returns `404` (not `403`) so IDs are not confirmed.
- Never trust `user_id` from the client. Set it from `$request->user()`.
- Validate every request with a Form Request. Whitelist fillable fields.
- Rate-limit login, register, and memory creation.
- Hash passwords with Laravel's default hasher.
- **Secrets are server-only:** `OPENAI_API_KEY`, `TRIGGER_SECRET_KEY`, `INTERNAL_API_SECRET`, the Firebase service account, and database credentials. None of them appear in `mobile/`.
- **Mobile may only hold client-safe values:** `EXPO_PUBLIC_API_URL`, the public PostHog key, and Firebase client config (`google-services.json`). Anything prefixed `EXPO_PUBLIC_` ships inside the app, so treat it as public.
- **Internal endpoints** (`/api/internal/*`) used by Trigger.dev are protected by a shared secret header, not user tokens, and are never called by the mobile app.
- Use HTTPS in every deployed environment.

---

# 12. Notifications and background jobs

**Flow:**

1. Laravel saves a memory with a reminder (`status: pending`).
2. Laravel triggers the Trigger.dev task (e.g. `send-reminder`) with `{ reminderId }` and a delay until `remind_at`, then stores `trigger_run_id`.
3. When the delay ends, the task calls Laravel's internal endpoint to fetch the reminder.
4. If the reminder is not `pending`, or the user has notifications off or no `fcm_token`, the task stops.
5. Otherwise the task sends the push through FCM with the title and a short body, including the `memoryId` in the data payload so tapping opens Memory Detail.
6. The task reports back; Laravel marks the reminder `sent` and sets `sent_at`.

**Rules:**

- Pass IDs to tasks, never full records or user text beyond what the push needs.
- Tasks must be idempotent. A retried task must not send twice (the `pending` check guards this).
- Edit time, snooze, complete, and delete cancel the old run. The status re-check is the safety net if a cancel fails.
- An invalid/expired FCM token response clears `fcm_token` on the user.
- The mobile app requests notification permission after login, gets the device FCM token, and sends it to `PATCH /api/me`.
- **Remote push does not work in Expo Go on Android.** Notification work needs a development build (section 15).

---

# 13. Analytics

PostHog, captured from the mobile app with the public project key. Identify the user by their internal user ID after login; call reset on logout. Do not send email, memory text, titles, or notes as event properties.

Track only these events unless a prompt adds more:

- `user_signed_up`
- `user_logged_in`
- `memory_created` (properties: `type`, `priority`, `has_reminder`)
- `ai_parse_failed`
- `memory_completed`
- `reminder_snoozed`
- `notification_opened`

Keep event names in one constants file in `mobile/`. Do not add session replay or autocapture of text inputs.

---

# 14. API endpoints (MVP)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check (public) |
| POST | `/api/register` | Create account |
| POST | `/api/login` | Get token |
| POST | `/api/logout` | Revoke current token |
| GET | `/api/me` | Current user |
| PATCH | `/api/me` | Update name, timezone, `fcm_token`, `notifications_enabled` |
| GET | `/api/memories` | List (filter: all, reminders, notes, completed; search) |
| POST | `/api/memories` | Create from plain text (AI) |
| GET | `/api/memories/{id}` | Detail |
| PATCH | `/api/memories/{id}` | Edit |
| DELETE | `/api/memories/{id}` | Delete |
| POST | `/api/memories/{id}/complete` | Mark complete |
| POST | `/api/memories/{id}/snooze` | Snooze (fixed options) |
| GET | `/api/internal/reminders/{id}` | Trigger.dev: fetch state (secret header) |
| POST | `/api/internal/reminders/{id}/sent` | Trigger.dev: mark sent (secret header) |

Add endpoints only through an approved prompt.

---

# 15. Development and testing workflow

The developer machine has **6GB RAM**. Keep local load minimal.

- **Primary device:** a physical Android phone. Do not require the Android emulator for normal development.
- **Normal development:** `npx expo start` and open in Expo Go on the phone (same Wi-Fi; use `--tunnel` if the network blocks it).
- **Native features (push notifications, Firebase):** use a development build only when needed. Prefer an EAS cloud build (`eas build --profile development --platform android`) to avoid a heavy local Android toolchain. Use `npx expo run:android` only if a local build is actually required and the toolchain is installed.
- **API:** `php artisan serve --host=0.0.0.0 --port=8000` so the phone can reach it. Set `EXPO_PUBLIC_API_URL` to the laptop's LAN IP.
- **Database:** cloud PostgreSQL. Do not require local Postgres or Docker.
- **Jobs:** run `npx trigger.dev@latest dev` only when working on reminders/notifications.
- Do not run the mobile app, API, jobs, and future web app all at once unless the task needs it.
- Work on a feature branch; open a PR for CodeRabbit review. Do not commit to `main` directly.

---

# 16. Checks to run

Run these from the correct workspace and report the real output. Never claim a check passed without running it.

**mobile/**
- `npx tsc --noEmit`
- `npx expo lint`
- `npx expo-doctor` when dependencies or app config change

**api/**
- `php artisan test`
- `./vendor/bin/pint --test`
- `php artisan migrate` against the dev database when migrations change (never `migrate:fresh` on shared or production data)
- `php artisan route:list` when routes change

**jobs/**
- `npx tsc --noEmit`
- Run the task once via `npx trigger.dev@latest dev` when task code changes

After you implement, run type check and lint at minimum. Add feature tests in `api/` for every new endpoint, including an ownership test proving user A cannot read, edit, or delete user B's memory. For AI work, test with a mocked OpenAI response, including an invalid one. For notification work, verify a real push arrives on the physical phone.

---

# 17. Things that will trip you up

- Remote push notifications do not work in Expo Go on Android (SDK 53+). Use a development build.
- `EXPO_PUBLIC_*` variables are bundled into the app. Never put a secret there.
- `localhost` on the phone is the phone. Use the laptop's LAN IP for the API URL.
- Laravel's `APP_TIMEZONE` must stay `UTC`. Do timezone conversion per user.
- Relative dates ("tomorrow", "next Friday") are wrong unless the AI receives the current time and the user's timezone.
- Cancelling a Trigger.dev run can fail or race; the pending-status re-check is required, not optional.
- Expo package versions must match the SDK. Install with `npx expo install`, not plain `npm install`, for Expo-managed packages.
- Cloud Postgres providers may require SSL (`sslmode=require`) and may use a pooled connection string; check the provider's Laravel settings.

---

# 18. When in doubt

Keep it small. Inspect before assuming. Use the relevant skill. Keep OpenAI, Firebase, and every secret on the server. Treat AI output as untrusted and validate it. Scope every query to the authenticated user. Match the approved design exactly. Keep Trigger.dev out of the request path. Save a prompt and get approval before coding. Run the checks. Share exact test steps.
