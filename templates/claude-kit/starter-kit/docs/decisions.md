# Decisions

One line per decision, newest first. Format: `YYYY-MM-DD — decision — why (optional)`.
Claude: treat these as settled. Do not reopen them unless the user asks.

- 2026-09-22 — Trigger.dev tasks hold the Firebase service account and send the pushes; Laravel never sends them — keeps FCM out of the request path.
- 2026-09-22 — Snooze uses fixed options (10 min, 1 hour, tomorrow 9am) — no custom picker in the MVP.
- 2026-09-22 — Push notification work uses an EAS cloud development build — remote push doesn't work in Expo Go on Android; avoids a local Android toolchain on the 6GB laptop.
- 2026-09-22 — Another user's memory returns 404, not 403 — don't confirm IDs exist.
- 2026-09-22 — `remind_at` stored in UTC; display uses `users.timezone`.
- 2026-09-22 — No date in the AI result → save as a note, no reminder. Never invent a date.
- 2026-09-22 — WordPress is a separate SEO/marketing site, not in this repo. Next.js web app is a later phase.
- 2026-09-22 — No Sanity, Redis, AWS, vector DB/RAG, subscriptions or collaboration in the MVP.
