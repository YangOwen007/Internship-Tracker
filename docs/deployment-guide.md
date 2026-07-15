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
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

## Example Production Env

```bash
DATABASE_URL="postgresql://username:password@host:5432/internship_tracker?schema=public"
NEXTAUTH_SECRET="replace-this-with-a-long-random-string"
NEXTAUTH_URL="https://your-domain.example"
```

## Before Deploying

1. Apply Prisma migrations to the target PostgreSQL database.
2. Seed a test environment.
3. Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
4. Verify auth and dashboard flows against the deployed database.

## Useful Production Checks

- `/api/health` should return a healthy status payload.
- Login, signup, board view, table view, and charts should all load on a fresh session.
- Drag-and-drop board movement should still persist status changes.
