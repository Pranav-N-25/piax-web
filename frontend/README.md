# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

# PIAX frontend

Frontend-first PIAX period care experience built with React, Vite, React Router and local mock services. The visual direction follows the supplied `UI/` references and uses the real reference imagery where appropriate.

## Run locally

```bash
npm install
npm run dev
```

Build and lint:

```bash
npm run build
npm run lint
```

## Demo accounts

The login flow is intentionally local and uses a simulated OTP. Choose an account in the login screen:

- `customer@example.com` opens the customer space
- `business@example.com` opens the business workspace
- `admin@example.com` opens the admin workspace
- Demo OTP: `123456`

No password or real payment is stored or sent.

## Architecture

`src/data/dummyData.json` is the demo source of truth. Components call service modules such as `productService`, `articleService`, `aiService`, and `orderService`; those services call `mockApi.js`, which adds a small artificial delay and returns demo records. Cart, session, and tracking examples persist in local storage.

The UI is organized around public pages, customer routes, and role-gated business/admin routes. Replacing a mock service with a REST client should not require changing the page components.

## Main routes

Public: `/`, `/products`, `/products/:slug`, `/learn`, `/learn/:category/:articleSlug`, `/ai`, `/about`, `/sustainability`, `/business`, `/support`

Customer: `/app`, `/app/track`, `/app/calendar`, `/app/insights`, `/app/orders`, `/app/profile`, `/cart`, `/checkout`

Role workspaces: `/business/*`, `/admin/*`
