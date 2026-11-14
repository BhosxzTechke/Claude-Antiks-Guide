# Spec Kit setup templates

Tested files from the Mkeni Spec practice project. Copy them into a new app **after** `specify init` (Phase B2 in the main README).

```
speckit-setup/
├── CLAUDE.md                        ← template, shape your /init result like this (B3)
└── .claude/
    ├── settings.json                ← permissions + hooks registration (B5, B6)
    ├── hooks/
    │   ├── protect-secrets.mjs      ← blocks any tool call that mentions .env (B6)
    │   └── lint-fix.mjs             ← runs eslint --fix after edits (B6)
    └── agents/
        └── spec-reviewer.md         ← read-only reviewer subagent (B7)
```

## Before you copy

- `.claude/` already exists after `specify init` (it holds `skills/`). Copy **into** it, don't replace it.
- `settings.json` allow rules use `npm run lint` and `npx tsc --noEmit`. Change them to your stack's commands.
- `lint-fix.mjs` runs `npx eslint --fix`. Change it if the project uses another linter. Don't add a new dependency just for this.
- Still **test** after copying: fake `.env.local` must be blocked (Read, `cat`/`type`, and `node -e ...readFileSync`), and `/hooks` must list both project hooks.

## Better: let Claude adapt them

```text
Copy the files from <path>/templates/speckit-setup/.claude into this project's .claude folder
(keep .claude/skills). Adapt the allow commands and lint-fix.mjs to this project's stack.
Explain each change. Don't touch other files.
```
