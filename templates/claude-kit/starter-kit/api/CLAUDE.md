# api/ — Laravel REST API

## Run
- `php artisan serve --host=0.0.0.0 --port=8000` (so the phone can reach it)
- Database is cloud PostgreSQL (Neon / Supabase). No local Postgres, no Docker, no Sail.

## Checks
- `php artisan test`
- `./vendor/bin/pint --test`
- `php artisan route:list` when routes change
- `php artisan migrate` when migrations change. Never `migrate:fresh` against shared or production data.

## Rules
- Every user query goes through `$request->user()->memories()`. Never a bare `Memory::find($id)`.
- Policies for view / update / delete. Another user's memory returns 404.
- Validation in Form Requests; responses through API Resources.
- OpenAI is called only from the parser service class, never from a controller. Mock it in tests.
- AI output is untrusted: validate before saving. No date → `note`, no reminder.
- `/api/internal/*` is protected by the shared-secret middleware, never by user tokens.
- `APP_TIMEZONE` stays `UTC`. Convert per user with `users.timezone`.
- Every new endpoint ships with a feature test, including: user A cannot read, edit or delete user B's memory.
