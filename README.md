Perplexity Backend
==================

This repository contains the backend API for the Perplexity project.

The backend implementation is located in the `backend/` folder and includes:

- User registration with email verification
- Authentication using JWT
- User profile and list endpoints
- Email delivery through Gmail OAuth2
- MongoDB data persistence with Mongoose

Repository Structure
--------------------

- `backend/src/app.js` - Express application setup and middleware
- `backend/src/routes/` - Route definitions for auth, users, chats, and messages
- `backend/src/controllers/` - Request handlers and business logic
- `backend/src/models/` - Mongoose schemas and data models
- `backend/src/services/` - Email sending and other shared services
- `backend/.gitignore` - Ignores local `.env` and other sensitive files
- `backend/README.md` - Backend-specific documentation and examples

Setup
-----

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a local `.env` file in `backend/` with the required variables:

```env
MONGO_URI=mongodb://127.0.0.1:27017/perplexitydb
PORT=4000
JWT_SECRET=change_this_secret_in_prod
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
GOOGLE_REFRESH_TOKEN=<your-refresh-token>
GOOGLE_USER=you@example.com
```

3. Start the backend server:

```bash
npm start
```

> Important: Do not commit `.env` to git. The `backend/.gitignore` file already excludes it.

API Overview
------------

Common API endpoints include:

- `POST /api/auth/register` - Create a new user and send a verification email
- `POST /api/auth/login` - Authenticate a user and return a JWT
- `POST /api/auth/resend-verification` - Resend email verification link
- `GET /api/users` - List users (authenticated access)
- `GET /api/users/:id` - Fetch a specific user by ID

Example registration request:

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"password123"}'
```

Security Notes
--------------

- The project uses `JWT_SECRET` to sign authentication tokens.
- Gmail OAuth credentials in `backend/.env` must remain secret.
- If secrets are exposed, rotate or revoke them immediately in Google Cloud.

More Information
----------------

For complete backend documentation, troubleshooting tips, and more examples, see `backend/README.md`.
