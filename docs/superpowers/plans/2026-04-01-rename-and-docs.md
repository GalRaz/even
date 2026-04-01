# Rename "Halfsies" → "Even" + Documentation Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all occurrences of "Halfsies"/"halfsies" with "Even"/"even" across the codebase, and overhaul README.md, SETUP.md, and config.example.js for clarity.

**Architecture:** Pure find-and-replace + documentation rewrite. No logic changes. Four independent tasks that can be done in any order, committed separately.

**Tech Stack:** Vanilla JS/HTML/CSS, no build step. Manual verification via browser.

**Spec:** `docs/superpowers/specs/2026-04-01-rename-and-docs-design.md`

---

## Task 1: Rename localStorage keys and cache name in JS files

**Files:**
- Modify: `js/exchange.js:3`
- Modify: `js/balance.js:195-286`
- Modify: `js/app.js:281-1347`
- Modify: `sw.js:1`

- [ ] **Step 1: Update `js/exchange.js`**

Change line 3 from:
```js
const LS_KEY = 'halfsies-rates';
```
to:
```js
const LS_KEY = 'even-rates';
```

- [ ] **Step 2: Update `js/balance.js`**

Apply these replacements (all occurrences):
- `'halfsies-balance-view'` → `'even-balance-view'`
- `'halfsies-consol-currency'` → `'even-consol-currency'`
- `'halfsies-currency-balances'` → `'even-currency-balances'`
- `'halfsies-used-currencies'` → `'even-used-currencies'`

Affected lines: 195, 196, 281, 284, 286.

- [ ] **Step 3: Update `js/app.js`**

Apply these replacements (all occurrences):
- `'halfsies-used-currencies'` → `'even-used-currencies'`
- `'halfsies-currency-balances'` → `'even-currency-balances'`
- `'halfsies-last-currency'` → `'even-last-currency'`
- `'halfsies-consol-currency'` → `'even-consol-currency'`
- `'halfsies-balance-view'` → `'even-balance-view'`
- `` `halfsies-export-` `` → `` `even-export-` ``

Affected lines: 281, 283, 292, 296, 348, 355, 408, 461, 467, 609, 614, 656, 1056, 1121, 1122, 1125, 1342, 1344, 1347.

- [ ] **Step 4: Update `sw.js`**

Change line 1 from:
```js
const CACHE_NAME = 'halfsies-v1';
```
to:
```js
const CACHE_NAME = 'even-v1';
```

- [ ] **Step 5: Verify with grep — expect zero results**

```bash
grep -ri 'halfsies' js/ sw.js
```
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add js/exchange.js js/balance.js js/app.js sw.js
git commit -m "refactor: rename halfsies localStorage and cache keys to even"
```

---

## Task 2: Rename metadata files

**Files:**
- Modify: `manifest.json`
- Modify: `LICENSE`
- Modify: `config.example.js`

- [ ] **Step 1: Update `manifest.json`**

Replace the full file contents with:
```json
{
  "name": "Even",
  "short_name": "Even",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#f2f0eb",
  "theme_color": "#f2f0eb",
  "icons": [
    {
      "src": "assets/icons/icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

- [ ] **Step 2: Update `LICENSE`**

Change line 3 from:
```
Copyright (c) 2026 Halfsies Contributors
```
to:
```
Copyright (c) 2026 Even Contributors
```

- [ ] **Step 3: Update `config.example.js`**

Replace the full file contents with:
```js
// Even Configuration
// Copy this file to config.js and fill in your values.
// See SETUP.md or open setup.html for a guided walkthrough.

const APP_CONFIG = {
  // Display name shown in the app header and browser tab
  appName: "Even",

  // Firebase — create a project at https://console.firebase.google.com
  firebase: {
    apiKey: "",           // Firebase console → Project settings → Your apps
    authDomain: "",       // e.g. your-project.firebaseapp.com
    projectId: "",        // e.g. your-project
    storageBucket: "",    // e.g. your-project.appspot.com
    messagingSenderId: "", // numeric ID from Firebase config
    appId: "",            // starts with "1:"
  },

  // EmailJS — optional email notifications (set enabled: true to activate)
  // Sign up at https://www.emailjs.com
  emailjs: {
    enabled: false,
    publicKey: "",    // EmailJS dashboard → Account → Public Key
    serviceId: "",    // EmailJS dashboard → Email Services
    templateId: "",   // EmailJS dashboard → Email Templates
  },

  // Your deployed app URL — used in notification emails (leave empty to auto-detect)
  // e.g. "https://even.yourdomain.com"
  appUrl: "",
};
```

- [ ] **Step 4: Verify with grep — expect zero results**

```bash
grep -ri 'halfsies' manifest.json LICENSE config.example.js
```
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add manifest.json LICENSE config.example.js
git commit -m "refactor: rename Halfsies to Even in manifest, license, and config template"
```

---

## Task 3: Rewrite README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace README.md with the new content**

```markdown
# Even

A shared expense tracker for two people. Track who owes what, split costs, settle up — all in a lightweight PWA that works offline.

<p align="center">
  <img src="assets/screenshots/dashboard.png" alt="Dashboard with balance and history" width="260">
  &nbsp;&nbsp;
  <img src="assets/screenshots/add-expense.png" alt="Add expense form" width="260">
</p>

## Features

- **Expenses & Payments** — Log shared costs with descriptions, amounts, and currency. Settle up when ready.
- **Multi-Currency** — 30+ currencies with live exchange rates. Consolidated balance view converts everything to one currency.
- **Categories** — Automatic emoji categorization (groceries, dining, transport, etc.)
- **Recurring Expenses** — Set up weekly or monthly expenses that auto-create.
- **Weekly Duels** — Fun mini-games (coin flip, rock-paper-scissors, wheel spin, and more) that adjust your balance.
- **Insights** — Category breakdowns, spending trends, and fun facts about your shared expenses.
- **History** — Full timeline with search, edit, and CSV export.
- **PWA** — Install on your phone's home screen. Works offline with background sync.
- **Notifications** — Optional email alerts when your partner adds an expense (via EmailJS).

## Quick Start

1. Clone this repo
2. Follow [SETUP.md](SETUP.md) to connect Firebase and deploy

The setup wizard (`setup.html`) can also walk you through it interactively.

## How It Works

Even is designed for exactly two people. Both users sign in with Google, and Firestore rules ensure only those two accounts can access the data. All expenses are split between the two of you — either evenly or assigned in full to one person.

The balance shows how much one person owes the other across all currencies, with the option to view a consolidated total in a single currency using live exchange rates.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla JS, HTML, CSS (no build step) |
| Database | Firebase Firestore (real-time sync, offline) |
| Auth | Firebase Authentication (Google sign-in) |
| Notifications | EmailJS (optional) |
| Hosting | Any static host |

## License

[MIT](LICENSE)
```

- [ ] **Step 2: Verify with grep — expect zero results**

```bash
grep -i 'halfsies' README.md
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for Even (rename + trim duplication with SETUP.md)"
```

---

## Task 4: Restructure SETUP.md

**Files:**
- Modify: `SETUP.md`

- [ ] **Step 1: Replace SETUP.md with the restructured content**

```markdown
# Even Setup Guide

Total time: ~10 minutes.

**Prefer a guided experience?** Open `setup.html` in your browser — it walks you through the same steps with a visual wizard.

---

## Prerequisites

- A Google account (used for Firebase and sign-in)
- A second Google account for your partner

---

## Core Setup

### 1. Clone the repo

```bash
git clone https://github.com/GalRaz/halfsies.git
cd halfsies
```

> **Note:** If you rename the GitHub repo to `even`, update this URL and the directory name accordingly.

### 2. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**, name it anything, disable Google Analytics
3. Click **Create**

### 3. Enable Google Authentication

1. In Firebase → **Authentication → Sign-in method**
2. Click **Google**, toggle it **on**, pick any support email
3. Click **Save**

### 4. Create a Firestore database

1. In Firebase → **Firestore Database → Create database**
2. Select **Production mode**, choose a region, click **Create**

### 5. Deploy Firestore security rules

Edit `firestore.rules` — replace the placeholder emails with the two Gmail addresses that will use the app:

```
request.auth.token.email in ['you@gmail.com', 'partner@gmail.com'];
```

Deploy the rules:

```bash
# Install Firebase CLI if needed
npm install -g firebase-tools
firebase login

firebase deploy --only firestore:rules
```

Alternatively, paste the rules directly in **Firebase → Firestore → Rules**.

### 6. Create config.js

1. In Firebase → **Project Settings** (gear icon) → **General** → scroll to **"Your apps"**
2. Click the web icon (`</>`), register the app, copy the `firebaseConfig` object
3. Copy the config template and fill in your values:

```bash
cp config.example.js config.js
```

```javascript
const APP_CONFIG = {
  appName: "Even",

  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123:web:abc123",
  },

  emailjs: {
    enabled: false,
    publicKey: "",
    serviceId: "",
    templateId: "",
  },

  appUrl: "",
};
```

### 7. Deploy the app

Pick any static hosting option:

**Firebase Hosting**
```bash
firebase init hosting
# Set public directory to: . (current directory)
# Configure as SPA: No
firebase deploy
```

**GitHub Pages**
Push to a GitHub repo and enable Pages in **Settings → Pages**.

**Netlify / Vercel**
Drag and drop the folder, or connect your GitHub repo.

**Local**
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Optional: Email Notifications

1. Sign up at [emailjs.com](https://www.emailjs.com) (free tier: 200 emails/month)
2. Create a service (connect your Gmail)
3. Create an email template with these variables:
   - `to_email`, `to_name`, `from_name`
   - `action`, `description`, `balance`, `app_link`
4. Update `config.js`:

```javascript
emailjs: {
  enabled: true,
  publicKey: "your-public-key",
  serviceId: "your-service-id",
  templateId: "your-template-id",
},
```

---

## Troubleshooting

**"Setup wizard keeps appearing"**
Make sure `config.js` exists in the root directory (same folder as `index.html`) and has valid Firebase values.

**"Permission denied" errors**
Check that your Firestore rules have the correct email addresses and are deployed.

**"Auth domain not authorized"**
In Firebase Console → **Authentication → Settings → Authorized domains**, add your hosting domain.

**App won't load offline**
The service worker caches assets on first visit. Load the app online at least once to prime the cache.
```

- [ ] **Step 2: Verify with grep — expect zero results**

```bash
grep -i 'halfsies' SETUP.md
```
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add SETUP.md
git commit -m "docs: restructure SETUP.md — critical path first, optional steps separated"
```

---

## Final Verification

- [ ] **Full codebase grep — expect zero results**

```bash
grep -ri 'halfsies' --include='*.js' --include='*.html' --include='*.json' --include='*.md' --include='*.css' --include='*.rules' .
```
Expected: no output (the only remaining reference will be in git history and the spec/plan docs themselves, which is fine).
