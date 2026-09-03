# Deployment Guide

This app now uses PostgreSQL locally and is intended to deploy with the same database shape in production:

- Next.js app host
- PostgreSQL database
- environment-based configuration for auth and database URLs

## Recommended Deployment Shape

1. Host the app on a Next.js-friendly platform such as Vercel.
2. Use a managed PostgreSQL database.
3. Set these env vars in production:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET` generated from a cryptographically secure random value
   - `NEXTAUTH_URL` set to the final HTTPS origin
   - `RESEND_API_KEY` for password-reset delivery
   - `RESEND_FROM_EMAIL` using a verified sender domain
   - `PUBLIC_SIGNUP_ENABLED=true` only when public registration is intended and protected by a platform-level distributed rate limit

## Example Production Env

```bash
DATABASE_URL="postgresql://username:password@host:5432/internship_tracker?schema=public"
NEXTAUTH_SECRET="generate-a-strong-random-secret"
NEXTAUTH_URL="https://your-domain.example"
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="Internship Tracker <noreply@your-domain.example>"
```

## Before Deploying

1. Provision a managed PostgreSQL database with backups and copy its connection string into `DATABASE_URL`.
2. Apply Prisma migrations to the target PostgreSQL database with `pnpm db:migrate:deploy`.
3. Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.
4. Verify sign-up, sign-in, forgot-password, reset-password, and dashboard flows against the deployed database.

Never run `pnpm db:setup` against production. It includes a destructive demo seed and is reserved for disposable local and CI databases.

## Useful Production Checks

- `/api/health` should return HTTP 200 with `database: "reachable"`; it returns HTTP 503 when PostgreSQL is unavailable.
- Login, signup, board view, table view, and charts should all load on a fresh session.
- Drag-and-drop board movement should still persist status changes.
- If email is configured, forgot-password should send a real reset email.
- If email is not configured, local development should still show the on-page preview reset link.
