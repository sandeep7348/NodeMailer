Perplexity Backend
==================

This repository contains the backend API for the Perplexity project.

The backend is located in the `backend/` folder and provides:

- User registration with email verification
- Authentication with JWT
- User management endpoints
- Email sending via Gmail OAuth2

Getting Started
---------------

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a local `.env` file in `backend/` with these variables:

```env
MONGO_URI=mongodb://127.0.0.1:27017/perplexitydb
PORT=4000
JWT_SECRET=change_this_secret_in_prod
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
GOOGLE_REFRESH_TOKEN=<your-refresh-token>
GOOGLE_USER=you@example.com
```

> Do not commit `.env` to git. Treat all `GOOGLE_*` values as sensitive secrets.

3. Run the server:

```bash
npm start
```

More Information
----------------

See `backend/README.md` for detailed backend documentation, API examples, troubleshooting, and security guidance.
