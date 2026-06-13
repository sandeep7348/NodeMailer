Perplexity — Backend

Overview

This folder contains the Node.js/Express backend for the Perplexity project. It implements user registration (with email verification), authentication, and basic user management.

Prerequisites

- Node.js 18+ (or compatible LTS)
- npm
- MongoDB (local or remote)

Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Create a local `.env` (do NOT commit this file)

Create `backend/.env` with these variables:

```
MONGO_URI=mongodb://127.0.0.1:27017/perplexitydb
PORT=4000
JWT_SECRET=change_this_secret_in_prod
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
GOOGLE_REFRESH_TOKEN=<your-refresh-token>
GOOGLE_USER=you@example.com
```

- `GOOGLE_*` values are used by the email sender. Treat them as secrets and rotate immediately if accidentally exposed.

3. Run the server

```bash
npm start
```

Development tips

- Use `nodemon` for hot reloads during development (`npm install -D nodemon`).
- Server root: [backend/src/app.js](src/app.js)

API Endpoints (examples)

- Register (sends verification email)

	POST http://localhost:4000/api/auth/register

	Headers: `Content-Type: application/json`

	Body:
	```json
	{ "username": "alice", "email": "alice@example.com", "password": "password123" }
	```

	Response: `201 Created` with `user` object and message about verification.

- Resend verification

	POST http://localhost:4000/api/auth/resend-verification

	Body:
	```json
	{ "email": "alice@example.com" }
	```

- Login

	POST http://localhost:4000/api/auth/login

- Users

	GET http://localhost:4000/api/users
	GET http://localhost:4000/api/users/:id

Email troubleshooting

- Server logs: the `sendEmail` call logs `Email sent:` on success and logs errors on failure. Watch the terminal where you run `npm start`.
- If verification email doesn't arrive:
	- Verify `GOOGLE_*` credentials in `backend/.env` are valid.
	- Check Gmail account for blocked sign-in or security email.
	- Temporarily replace the mail transport with a test SMTP (Mailtrap) or log-only transport for local testing.

Security & accidental secrets

- Never commit `.env`. It is included in `backend/.gitignore`.
- If a secret is committed and pushed, rotate/revoke it immediately (Google Cloud Console for OAuth credentials) and remove it from git history.

Recommended rotation steps (if secrets leaked):

1. Revoke the refresh token and delete the OAuth client in Google Cloud Console. Create a new client and obtain new credentials.
2. Replace values in local `backend/.env` and do NOT commit.
3. Remove secrets from repo history (we already cleaned history in this repo). Use `git filter-repo` or the BFG tool for full-history removal in larger repos.

What we already did here

- The repository had an accidental `.env` commit that contained Google OAuth secrets. A cleaned main branch was force-pushed and a local backup branch (`backup-before-clean`) was created then deleted. Ensure you rotated the exposed credentials after this event.

Testing with curl

```bash
curl -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" \
	-d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

Further help

- If you want, I can: rotate the README with more examples, add a Postman collection, or help rotate credentials. Reply with which action you prefer.

License / Contact

- See project root README for licensing and contact details.
