# Recipe: Next.js web app (TypeScript, App Router)

Default workspace folder: `web/`

## Workspace CLAUDE.md

```markdown
# web/ — Next.js (App Router) + TypeScript

## Run
- `npm run dev` → http://localhost:3000

## Checks
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build` when routes, config, or dependencies change

## Rules
- Talk to the project's own API only. No direct database access unless AGENTS.md says this app owns the database.
- Anything prefixed `NEXT_PUBLIC_` ships to the browser. No secrets.
- Server-only code (secrets, admin SDKs) lives in server components, route handlers or server actions, and imports `server-only`.
- Auth tokens in httpOnly cookies, never localStorage.
- Reuse `components/` and the theme. Every page has loading / empty / error states.
```

## Allowed commands
`Bash(npm run lint:*)`, `Bash(npm run build:*)`

## CI job

```yaml
  web:
    needs: changes
    if: needs.changes.outputs.web == 'true'
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: web
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: web/package-lock.json
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run lint
      - run: npm run build
```

## CodeRabbit path instructions

```yaml
    - path: "web/**"
      instructions: |
        Flag as critical: secrets in client components or NEXT_PUBLIC_ variables; tokens in localStorage; server-only modules imported into client components; data fetched for another user.
        Also check: loading / error boundaries, no unnecessary "use client".
```

## Gitignore
```
web/node_modules/
web/.next/
web/.env*.local
```

## Gotchas
- `NEXT_PUBLIC_*` is inlined at build time; changing it needs a rebuild.
- Server vs client components: a `"use client"` file can't import server-only code.
- Check the installed Next.js major version; App Router APIs changed between versions.
