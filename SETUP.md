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

## Troubleshooting

**"Setup wizard keeps appearing"**
Make sure `config.js` exists in the root directory (same folder as `index.html`) and has valid Firebase values.

**"Permission denied" errors**
Check that your Firestore rules have the correct email addresses and are deployed.

**"Auth domain not authorized"**
In Firebase Console → **Authentication → Settings → Authorized domains**, add your hosting domain.

**App won't load offline**
The service worker caches assets on first visit. Load the app online at least once to prime the cache.
