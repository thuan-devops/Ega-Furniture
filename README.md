# EGA Furniture Auth Setup

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment

Copy `.env.example` to `.env` and fill in your real OAuth credentials:

```bash
copy .env.example .env
```

Then replace:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `FACEBOOK_APP_ID`
- `FACEBOOK_APP_SECRET`
- `FACEBOOK_REDIRECT_URI`
- `SESSION_SECRET`

## 3. Run the app

```bash
npm start
```

Then open:
- http://localhost:3000/login

## 4. Google OAuth setup

- Go to Google Cloud Console
- Create OAuth client ID
- Authorized redirect URIs:
  - http://localhost:3000/auth/google/callback

## 5. Facebook OAuth setup

- Go to Facebook Developers
- Create an app with Facebook Login
- Valid OAuth redirect URIs:
  - http://localhost:3000/auth/facebook/callback
