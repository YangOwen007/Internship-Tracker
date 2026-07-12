# Deployment Guide

This app is currently easiest to develop locally with SQLite, but the intended deployed setup is:

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

Use `.env.production.example` as the template.

```bash
DATABASE_URL="postgresql://username:password@host:5432/internship_tracker?schema=public"
NEXTAUTH_SECRET="replace-this-with-a-long-random-string"
NEXTAUTH_URL="https://your-domain.example"
```

## Before Deploying

1. Finish the PostgreSQL provider switch in Prisma.
2. Regenerate the Prisma client cleanly.
3. Replace the SQLite bootstrap path with migrations.
4. Seed a test environment.
5. Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

## Useful Production Checks

- `/api/health` should return a healthy status payload.
- Login, signup, board view, table view, and charts should all load on a fresh session.
- Drag-and-drop board movement should still persist status changes.
