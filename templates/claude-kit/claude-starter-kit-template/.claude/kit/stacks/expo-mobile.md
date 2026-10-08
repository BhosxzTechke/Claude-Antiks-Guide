# Recipe: React Native + Expo + TypeScript

Default workspace folder: `mobile/`

## Workspace CLAUDE.md

```markdown
# mobile/ — React Native + Expo + TypeScript

## Run
- `npx expo start` → scan the QR code with Expo Go on the physical phone.
- `npx expo start --tunnel` if the Wi-Fi blocks phone ↔ laptop traffic.
- Native features (push, some SDKs) need a development build: `eas build --profile development --platform android`, install the APK, then `npx expo start`.
- <"Never start the Android emulator." if the brief says low RAM / physical phone only>

## Checks
- `npx tsc --noEmit`
- `npx expo lint`
- `npx expo-doctor` when dependencies or `app.json` / `app.config.*` change

## Rules
- Install Expo-managed packages with `npx expo install <pkg>` (asks first), not `npm install`.
- API base URL only from `EXPO_PUBLIC_API_URL`. `localhost` on the phone is the phone; use the laptop's LAN IP.
- Anything prefixed `EXPO_PUBLIC_` ships inside the app. No secrets.
- Auth token in `expo-secure-store`, never AsyncStorage.
- Talk only to the project's own API (plus client SDKs listed in AGENTS.md). Never call AI providers, admin SDKs, or the database directly.
- Analytics event names come from one constants file. No user content or email in event properties.
- Reuse `src/components/` and the theme before creating new components. Every screen has loading / empty / error states.
```

## Allowed commands
`Bash(npx expo lint:*)`, `Bash(npx expo-doctor:*)`

## Ask commands
`Bash(npx expo install:*)`, `Bash(npm install:*)`, `Bash(eas build:*)`

## CI job

```yaml
  mobile:
    needs: changes
    if: needs.changes.outputs.mobile == 'true'
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: mobile
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: mobile/package-lock.json
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx expo lint
```

## CodeRabbit path instructions

```yaml
    - path: "mobile/**"
      instructions: |
        Flag as critical:
        - Any secret or private key in mobile code or config (list this project's server secrets by name).
        - Any EXPO_PUBLIC_ variable holding something other than a public value.
        - Auth tokens stored outside expo-secure-store.
        - Direct calls to AI providers, admin SDKs, job runners or the database.
        - Analytics events carrying user content or email, or event names not from the constants file.
        Also check: reuse of existing components, loading / empty / error states.
```

## Gitignore
```
mobile/node_modules/
mobile/.expo/
mobile/.env
mobile/android/
mobile/ios/
```
(Keep `android/` and `ios/` ignored only if the project uses Continuous Native Generation / prebuild.)

## Gotchas
- Remote push notifications don't work in Expo Go on Android (SDK 53+). Use a development build.
- `EXPO_PUBLIC_*` values are bundled into the app binary.
- Package versions must match the Expo SDK; `npx expo install` picks the right one.
- `google-services.json` is client config (safe to ship); the Firebase *service account* is a server secret.
