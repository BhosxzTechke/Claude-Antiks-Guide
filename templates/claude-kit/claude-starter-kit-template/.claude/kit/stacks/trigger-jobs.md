# Recipe: Trigger.dev background tasks (TypeScript)

Default workspace folder: `jobs/`

## Workspace CLAUDE.md

```markdown
# jobs/ — Trigger.dev tasks (TypeScript)

## Run
- `npx trigger.dev@latest dev` — only while working on task code.

## Checks
- `npx tsc --noEmit`
- When task code changes: trigger the task once in dev and confirm the run in the Trigger.dev dashboard.

## Rules
- Tasks receive IDs only (e.g. `{ reminderId }`), never full records or user content.
- Before acting, re-fetch state from the API's internal endpoint. If it's no longer actionable, stop.
- Tasks are idempotent: a retry must never act twice.
- No business logic. The API owns state; the task waits, does the side effect, reports back.
- Server secrets used here (service accounts, internal API secret) stay in this workspace's env, never in client workspaces.
```

## Allowed commands
(none beyond `npx tsc --noEmit`, already allowed)

## Ask commands
`Bash(npx trigger.dev@latest deploy:*)`

## CI job

```yaml
  jobs:
    needs: changes
    if: needs.changes.outputs.jobs == 'true'
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: jobs
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: jobs/package-lock.json
      - run: npm ci
      - run: npx tsc --noEmit
```

## CodeRabbit path instructions

```yaml
    - path: "jobs/**"
      instructions: |
        Tasks must take IDs only, re-check state with the API before acting, be idempotent on retry, and contain no business logic. Flag credentials hardcoded instead of read from env.
```

## Gitignore
```
jobs/node_modules/
jobs/.env
jobs/.trigger/
```

## Gotchas
- Cancelling a delayed run can fail or race; the state re-check is required, not optional.
- Follow the docs for the installed SDK version (`jobs/package.json`); v3 and v4 APIs differ.
