# jobs/ — Trigger.dev tasks (TypeScript)

## Run
- `npx trigger.dev@latest dev` — only while working on reminders or notifications.

## Checks
- `npx tsc --noEmit`
- Trigger the task once in dev and confirm the run in the Trigger.dev dashboard.

## Rules
- Tasks receive IDs only (e.g. `{ reminderId }`), never full records.
- Before sending, re-check the reminder with Laravel's internal endpoint. Not `pending` → stop.
- Tasks must be idempotent: a retry must never send twice.
- No business logic here. Laravel owns state; the task waits, sends through FCM, reports back.
- The Firebase service account and `INTERNAL_API_SECRET` stay in this workspace's env, never in `mobile/`.
