# PostgreSQL Migration Plan

This project is currently optimized for fast local iteration with SQLite, but the schema and app structure are being prepared for a PostgreSQL move.

## What Is Already Ready

- Prisma models already represent relational app data cleanly.
- App queries are centralized instead of scattered across components.
- Auth and CRUD flows are already scoped by user.
- A local PostgreSQL container config now exists in `docker-compose.postgres.yml`.

## What Still Needs To Change

1. Switch the Prisma datasource provider in `prisma/schema.prisma` from `sqlite` to `postgresql`.
2. Regenerate the Prisma client in an environment where Prisma CLI works cleanly.
3. Replace the SQLite-only bootstrap path with Prisma migrations.
4. Update deployment env vars to use a hosted PostgreSQL URL.

## Why We Are Not Flipping Today

The current local Windows runtime has been reliable for app development but flaky around Prisma CLI and client regeneration. Doing migration prep first keeps the app stable while making the remaining database switch smaller and easier to reason about.

## Suggested Cutover Order

1. Start PostgreSQL locally with Docker.
2. Copy `.env.postgres.example` into `.env` for a test branch or separate local environment.
3. Change Prisma provider to `postgresql`.
4. Regenerate Prisma client.
5. Use migrations instead of `prisma/bootstrap.ts`.
6. Run the seed script against PostgreSQL.
7. Verify auth, CRUD, filters, and charts.
