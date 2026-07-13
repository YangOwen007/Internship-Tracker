# PostgreSQL Migration Status

The PostgreSQL cutover is now complete in the codebase.

## What Changed

1. The Prisma schema now targets PostgreSQL.
2. The datasource URL moved into [prisma.config.ts](C:/Users/centu/Documents/Internship%20Tracker/prisma.config.ts), which matches Prisma 7's config model.
3. The generated Prisma client was regenerated for PostgreSQL, including the `passwordHash` field on `User`.
4. The SQLite-only bootstrap workaround was removed.
5. The project now uses an initial migration in [prisma/migrations](C:/Users/centu/Documents/Internship%20Tracker/prisma/migrations).
6. Seed data now writes directly through the PostgreSQL Prisma client.
7. CI now boots PostgreSQL, applies migrations, and seeds data before verification.

## Local Setup

1. Start PostgreSQL with `pnpm db:postgres:up`.
2. Copy `.env.postgres.example` to `.env`.
3. Run `pnpm db:setup`.
4. Start the app with `pnpm dev`.

## Remaining Operational Work

1. Verify the migration against the local Docker database if PostgreSQL is not already running.
2. Point deployment to a hosted PostgreSQL instance.
3. Capture updated screenshots once the deployed environment is live.
