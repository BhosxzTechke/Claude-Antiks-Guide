# mobile/ — React Native + Expo + TypeScript

## Run
- `npx expo start` → scan the QR code with Expo Go on the physical Android phone.
- `npx expo start --tunnel` if the Wi-Fi blocks phone ↔ laptop traffic.
- Push notifications need a development build: `eas build --profile development --platform android`, install the APK, then `npx expo start` as usual.
- Never start the Android emulator.

## Checks
- `npx tsc --noEmit`
- `npx expo lint`
- `npx expo-doctor` when dependencies or `app.json` / `app.config.*` change

## Rules
- Install Expo-managed packages with `npx expo install <pkg>`, not `npm install`.
- API base URL comes only from `EXPO_PUBLIC_API_URL`. `localhost` on the phone is the phone; use the laptop's LAN IP.
- Anything prefixed `EXPO_PUBLIC_` ships inside the app. No secrets.
- Auth token lives in `expo-secure-store`, never AsyncStorage.
- Talk only to the Laravel API (plus the PostHog SDK). Never call OpenAI, Firebase Admin or the database.
- PostHog event names come from the single events constants file. No memory text, titles, notes or email in event properties.
- Reuse components in `src/components/` and the theme before creating new ones.
