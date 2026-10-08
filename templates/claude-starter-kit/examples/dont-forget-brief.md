# Project brief — example (Don't Forget)

A filled brief, for reference. Running `/kickoff read docs/brief.md` with this content reproduces the original Don't Forget setup.

## Name and one-liner
- Name: Don't Forget
- Tagline: Your brain's backup.

## The problem and the core idea
The user types anything in plain language ("Renew my driver's license on Nov 15, bring valid ID"). The API sends it to the AI, validates the structured result, saves a memory (plus a reminder if there's a date), and a push notification arrives at the right time.

## MVP: success looks like
1. Sign up and log in
2. Type a reminder in plain language
3. See it saved correctly (title, date, time)
4. Receive a push notification on time
5. Mark it complete

## MVP features
- Auth (register, login, logout)
- Create memory from one text box (AI extraction: title, type, remind_at, category, priority, notes)
- List / search / filter (All, Reminders, Notes, Completed), detail, edit, delete
- Complete and snooze (fixed: 10 min, 1 hour, tomorrow 9am)
- Push notification at reminder time
- Profile: name, timezone, notifications on/off
- PostHog analytics

## Not in the MVP
Recurring reminders, sharing, attachments, calendar sync, offline mode, voice-first UI, teams, subscriptions.

## Screens
Splash/Welcome, Login, Register, Home, Memories List, Memory Detail, Edit, Settings. References in `docs/design/`.

## Stack
| Part | Tool | Folder |
|---|---|---|
| Mobile | React Native + Expo + TypeScript | `mobile/` |
| API | Laravel + Sanctum | `api/` |
| DB | PostgreSQL (Neon / Supabase) | — |
| AI | OpenAI, Structured Outputs | via `api/` |
| Jobs | Trigger.dev | `jobs/` |
| Push | Firebase Cloud Messaging | via `jobs/` |
| Analytics | PostHog | via `mobile/` |
| Later | Next.js web app | `web/` (do not build) |

WordPress marketing site: separate hosting, not in this repo.

## Architecture
Mobile → Laravel API → Postgres / OpenAI / Trigger.dev → FCM → Mobile. Mobile → PostHog. Laravel owns all state and writes; Trigger.dev only waits, re-checks with Laravel, sends, reports back. OpenAI only from one Laravel service class. Firebase service account lives in `jobs/` env.

## Data model
- users: name, email, password, timezone (IANA), fcm_token?, notifications_enabled
- memories: user_id, raw_input, title, type (reminder|note), category?, priority (low|normal|high), notes?, status (active|completed), completed_at?
- reminders: memory_id (unique), remind_at (timestamptz UTC), status (pending|sent|cancelled), trigger_run_id?, snooze_count, sent_at?
- Indexes: memories(user_id, status), reminders(status, remind_at)

## Rules that must never break
- No date in AI output → note, no reminder. Never invent a date.
- Another user's memory → 404.
- Times stored UTC; AI receives current time + user timezone.
- Snooze / edit / complete / delete cancel the old run; the job re-checks `pending` before sending.

## Dev environment
6GB RAM laptop. Physical Android phone with Expo Go; EAS cloud dev build for push. No emulator, no Docker, cloud DB.

## Review and CI
GitHub Actions + CodeRabbit.

## Roadmap
1. Setup — app calls /api/health from the phone
2. Auth — sign up, log in, log out
3. Memories CRUD — manual create and manage
4. AI — plain text creates a correct memory
5. Notifications — reminder arrives on time
6. Polish & deploy (Railway) — 5–10 real users

## Conflicts resolved (from the original docs)
- Analytics events: use the AGENTS.md list (`user_logged_in`, `reminder_snoozed`, `notification_opened` included); MVP.md's `reminder_delivered` dropped — delivery is tracked server-side by `reminders.sent_at`.
- `PATCH /api/me` also takes `notifications_enabled`; `/snooze` and `/health` endpoints exist (missing from MVP.md table).
- `users.notifications_enabled` and `reminders.snooze_count` exist (missing from MVP.md diagram).
