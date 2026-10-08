# Recipe: Laravel REST API

Default workspace folder: `api/`

## Workspace CLAUDE.md

```markdown
# api/ — Laravel REST API

## Run
- `php artisan serve --host=0.0.0.0 --port=8000` (0.0.0.0 so a phone on the same Wi-Fi can reach it)
- Database: <cloud Postgres / MySQL / SQLite — from the brief>. No Docker or Sail unless the brief says so.

## Checks
- `php artisan test`
- `./vendor/bin/pint --test`
- `php artisan route:list` when routes change
- `php artisan migrate` when migrations change. Never `migrate:fresh` on shared data.

## Rules
- Every user-owned query goes through `$request->user()-><relation>()`. Never a bare `Model::find($id)`.
- Policies for view / update / delete. Another user's record returns 404.
- Validation in Form Requests. Responses through API Resources. Whitelist `$fillable`.
- External APIs (AI, payments, push) are called from one service class each, never from controllers. Mock them in tests.
- `APP_TIMEZONE` stays `UTC`. Convert per user for display.
- Every new endpoint ships with a feature test, including: user A cannot read, edit or delete user B's data.
```

## Allowed commands
`Bash(php artisan test:*)`, `Bash(php artisan route:list:*)`, `Bash(./vendor/bin/pint:*)`, `Bash(vendor/bin/pint:*)`

## CI job

```yaml
  api:
    needs: changes
    if: needs.changes.outputs.api == 'true'
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: api
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testing
        ports: ["5432:5432"]
        options: >-
          --health-cmd pg_isready --health-interval 5s --health-timeout 5s --health-retries 10
    env:
      APP_ENV: testing
      DB_CONNECTION: pgsql
      DB_URL: ""
      DB_HOST: 127.0.0.1
      DB_PORT: 5432
      DB_DATABASE: testing
      DB_USERNAME: postgres
      DB_PASSWORD: postgres
      # Add dummy values for every server secret the app reads at boot, e.g.
      # OPENAI_API_KEY: test-key-not-used
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: "8.3"
          extensions: pdo_pgsql, pgsql
          coverage: none
      - uses: actions/cache@v4
        with:
          path: api/vendor
          key: composer-${{ hashFiles('api/composer.lock') }}
      - run: composer install --no-interaction --prefer-dist --no-progress
      - run: cp .env.example .env && php artisan key:generate
      - run: vendor/bin/pint --test
      - run: php artisan test
```

Use MySQL / SQLite service instead if the brief says so. Match `php-version` to `composer.json`.

## CodeRabbit path instructions

```yaml
    - path: "api/**/*.php"
      instructions: |
        Flag as critical:
        - Any query on a user-owned model not scoped to the authenticated user (e.g. Model::find($id)). Expect $request->user()->relation() plus a Policy.
        - Another user's record returning anything other than 404.
        - Owner IDs taken from request input instead of $request->user().
        - External APIs called outside their service class; AI output saved without validation.
        - Internal/webhook routes without their secret or signature middleware.
        - Secrets, tokens, or full user content written to logs.
        Also check: Form Requests, API Resources, no N+1 on list endpoints.
    - path: "api/database/migrations/**"
      instructions: |
        Check foreign keys cascade correctly, datetimes that matter use timestampTz, and the indexes listed in AGENTS.md exist. Flag tables not in the AGENTS.md data model.
    - path: "api/tests/**"
      instructions: |
        Every new endpoint needs a feature test proving user A cannot read, edit or delete user B's data. External APIs must be faked; no real network calls.
```

## Gitignore
```
api/vendor/
api/.env
api/storage/*.key
```

## Gotchas
- `APP_TIMEZONE` must stay `UTC`; convert per user.
- Cloud Postgres (Neon, Supabase) often needs `sslmode=require` and may give a pooled connection string; check the provider's Laravel guide.
- Sanctum for mobile = personal access tokens, not SPA cookie auth.
- `php artisan serve` without `--host=0.0.0.0` is unreachable from a phone.
