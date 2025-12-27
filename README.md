# Ergon

An open-source digital wellbeing app — a Regain clone built with React Native & Expo.

## Features

- 🎯 **Focus Timer** - Pomodoro-style productivity timer
- 📊 **Statistics** - Track your focus sessions
- 🌙 **Dark Mode** - Material 3 expressive dark theme

## Quick Start

```bash
npm install
npm start
```

Scan QR with [Expo Go](https://expo.dev/go) app.

## Build APK

### Cloud Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login & link project
eas login
eas init

# Build APK
eas build --platform android --profile preview
```

### Local Build (Requires Android SDK)

```bash
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
```

## Tech Stack

- React Native + Expo Router
- Zustand (state management)
- Material 3 Design System

## License

MIT
