# Design: Rename "Halfsies" → "Even" + Documentation Overhaul

**Date:** 2026-04-01
**Scope:** Option B — rename all occurrences of "Halfsies" to "Even", overhaul README and SETUP docs, improve config.example.js clarity.

---

## 1. Rename "Halfsies" → "Even"

Replace every occurrence of "Halfsies" (and "halfsies") with "Even" (and "even") across the codebase.

### Files affected

| File | What changes |
|------|-------------|
| `manifest.json` | `name` and `short_name` fields |
| `LICENSE` | Project name in copyright line |
| `README.md` | All text references |
| `SETUP.md` | All text references |
| `config.example.js` | `appName` field value |
| `sw.js` | Cache key: `halfsies-v1` → `even-v1` |
| `js/app.js` | All localStorage key prefixes: `halfsies-*` → `even-*` |
| `js/balance.js` | All localStorage key prefixes: `halfsies-*` → `even-*` |
| `js/exchange.js` | localStorage key prefix: `halfsies-rates` → `even-rates` |

### Side effect: localStorage migration

Renaming localStorage keys means existing users will lose cached non-critical preferences (balance view, last-used currency, etc.) on first load after the update. Expense data lives in Firestore and is unaffected. Preferences repopulate naturally as the user interacts with the app.

---

## 2. README.md Overhaul

**Goal:** A clean, scannable entry point. Remove duplication with SETUP.md.

### New structure

1. **One-line description** — "Even is a shared expense tracker for two people."
2. **Screenshot** — dashboard screenshot from `assets/screenshots/`
3. **Features** — tight bulleted list (same features, pruned prose)
4. **Quick start** — two sentences: clone the repo, follow SETUP.md
5. **Tech stack** — short table

### What gets removed

- The inline "Setup" section that duplicates SETUP.md. Replaced with a single link.

---

## 3. SETUP.md Restructure

**Goal:** Make the critical path obvious. Optional steps clearly separated.

### New structure

1. **Prerequisites** — Firebase account, two Google accounts (2 lines)
2. **Core setup** — linear numbered steps:
   1. Create Firebase project
   2. Enable Firestore
   3. Enable Google Auth
   4. Deploy Firestore security rules
   5. Create `config.js` from `config.example.js`
   6. Deploy / serve the app
3. **Deployment options** — own headed section: Firebase Hosting, GitHub Pages, Netlify, local server
4. **Optional: EmailJS notifications** — clearly marked optional, moved to bottom
5. **Troubleshooting** — unchanged, stays at end

### What changes

Currently optional and required steps are interspersed, making it unclear when the minimum viable setup is complete. The new structure separates concerns so a user can stop after step 6 and have a working app.

---

## 4. config.example.js Inline Comments

Add a short comment on every field explaining what it is and where to find it in the relevant dashboard. The `appName` field value changes to `"Even"`.

```js
const APP_CONFIG = {
  appName: "Even", // Display name shown in the app

  firebase: {
    apiKey: "",           // Firebase console → Project settings → Your apps
    authDomain: "",       // e.g. your-project.firebaseapp.com
    projectId: "",        // e.g. your-project
    storageBucket: "",    // e.g. your-project.appspot.com
    messagingSenderId: "",
    appId: "",
  },

  emailjs: {
    enabled: false,       // Set to true only if you want email notifications
    publicKey: "",        // EmailJS dashboard → Account → Public Key
    serviceId: "",        // EmailJS dashboard → Email Services
    templateId: "",       // EmailJS dashboard → Email Templates
  },

  appUrl: "",             // Your deployed app URL, e.g. https://even.yourdomain.com
};
```

---

## Out of scope

- In-app copy/label changes (Option C)
- Code refactoring or architectural changes
- New features
