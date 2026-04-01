# Halfsies Setup Guide

This guide walks you through setting up your own Halfsies instance. Total time: ~10 minutes.

**Prefer a guided experience?** Open `setup.html` in your browser — it walks you through the same steps with a visual wizard.

---

## Prerequisites

- A Google account (for Firebase and sign-in)
- A place to host static files (Firebase Hosting, GitHub Pages, Netlify, or even localhost)

---

## 1. Clone the Repo

```bash
git clone https://github.com/GalRaz/halfsies.git
cd halfsies
```

## 2. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Name it anything (e.g., "halfsies")
4. Disable Google Analytics (not needed)
5. Click **Create**

## 3. Enable Google Authentication

1. In your Firebase project, navigate to **Authentication → Sign-in method**
2. Click **Google** and toggle it **on**
3. Select any email as the support email
4. Click **Save**

## 4. Create Firestore Database

1. Navigate to **Firestore Database → Create database**
2. Select **Production mode**
3. Choose a region close to you
4. Click **Create**

## 5. Deploy Firestore Security Rules

Edit `firestore.rules` — replace the placeholder emails with the Gmail addresses of your two users:

```
request.auth.token.email in ['YOUR_EMAIL_1@example.com', 'YOUR_EMAIL_2@example.com'];
```

Then deploy the rules:

```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools
firebase login

# Deploy just the rules
firebase deploy --only firestore:rules
```

Or paste the rules manually in **Firestore → Rules** in the Firebase Console.

## 6. Get Your Firebase Config

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **"Your apps"** and click the web icon (`</>`)
3. Register the app (any name, skip hosting setup)
4. Copy the `firebaseConfig` object

## 7. Create config.js

Copy the example config:

```bash
cp config.example.js config.js
```

Fill in your Firebase values:

```javascript
const APP_CONFIG = {
  appName: "Halfsies",

  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.firebasestorage.app",
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

## 8. Deploy

Pick any static hosting option:

### Firebase Hosting
```bash
firebase init hosting
# Set public directory to: . (current directory)
# Configure as SPA: No
firebase deploy
```

### GitHub Pages
Push to a GitHub repo and enable Pages in Settings → Pages.

### Netlify / Vercel
Drag and drop the folder, or connect your GitHub repo.

### Local
```bash
# Using Python
python3 -m http.server 8000

# Using Node
npx serve .
```

Then open `http://localhost:8000` in your browser.

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
In Firebase Console → Authentication → Settings → Authorized domains, add your hosting domain.

**App won't load offline**
The service worker caches assets on first visit. Make sure to load the app online at least once.
