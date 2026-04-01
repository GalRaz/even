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
