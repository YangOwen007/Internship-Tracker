# Internship Tracker

A full-stack internship and job application tracker built to feel closer to a lightweight recruiting CRM than a class CRUD app.

## Overview

This project helps students manage the recruiting process end to end:

- track applications across recruiting stages
- manage notes, deadlines, contacts, tags, and resume versions
- review progress through both a board view and a table view
- see analytics and a priority queue instead of just storing records

The project is intentionally positioned as a portfolio piece that shows product thinking, full-stack engineering, database design, authentication, and deployment readiness.

## Why This Project Is Strong

- It is a real product workflow, not just a form and a list.
- It includes auth and user-scoped data.
- It uses a relational schema with Prisma-backed queries.
- It has both operational analytics and day-to-day application management views.
- It includes CI, health checks, and deployment planning.

## Current Features

- Email/password authentication
- User-specific application data
- Dashboard metrics and charts
- Priority queue for upcoming deadlines and follow-up work
- Board view with drag-and-drop stage movement
- Table view with search, filters, and sorting
- Create and edit application flows
- Contacts, notes, tags, deadlines, salary, job link, and resume version tracking
- Health endpoint at `/api/health`
- GitHub Actions CI

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma ORM
- NextAuth/Auth.js credentials auth
- Recharts
- PostgreSQL
- Docker for local database setup

## Architecture Notes

The app now runs on a PostgreSQL-first workflow locally and in deployment-oriented environments:

- connection config lives in [prisma.config.ts](C:/Users/centu/Documents/Internship%20Tracker/prisma.config.ts)
- the shared Prisma client uses the generated PostgreSQL client in [src/lib/prisma.ts](C:/Users/centu/Documents/Internship%20Tracker/src/lib/prisma.ts)
- schema setup is reproducible through [prisma/migrations](C:/Users/centu/Documents/Internship%20Tracker/prisma/migrations)

## Local Development

Run:

```bash
pnpm db:postgres:up
cp .env.example .env
pnpm db:setup
pnpm dev
```

Useful scripts:

```bash
pnpm db:generate
pnpm db:migrate:dev
pnpm db:migrate:deploy
pnpm db:push
pnpm db:seed
pnpm db:setup
pnpm db:postgres:up
pnpm db:postgres:down
pnpm db:postgres:logs
pnpm lint
pnpm typecheck
pnpm build
```

## Demo Account

- The seed script creates `owen.yang.demo@internship-tracker.local`.
- The demo password is printed when `pnpm db:seed` or `pnpm db:setup` runs.
- Set `SEED_DEMO_PASSWORD` in `.env` if you want a stable local demo password.

## Deployment And PostgreSQL Prep

- [docker-compose.postgres.yml](C:/Users/centu/Documents/Internship%20Tracker/docker-compose.postgres.yml)
- [.env.example](C:/Users/centu/Documents/Internship%20Tracker/.env.example)
- [docs/postgres-migration-plan.md](C:/Users/centu/Documents/Internship%20Tracker/docs/postgres-migration-plan.md)
- [docs/deployment-guide.md](C:/Users/centu/Documents/Internship%20Tracker/docs/deployment-guide.md)

## CI

The repo includes [`.github/workflows/ci.yml`](C:/Users/centu/Documents/Internship%20Tracker/.github/workflows/ci.yml), which:

- installs dependencies
- starts PostgreSQL
- applies Prisma migrations
- seeds demo data
- runs lint
- runs typecheck
- runs a production build

## Screenshot Plan

README screenshots have not been added yet. The planned capture list is in [docs/screenshot-shotlist.md](C:/Users/centu/Documents/Internship%20Tracker/docs/screenshot-shotlist.md).

## What This Project Demonstrates

- Full-stack web development
- Thoughtful schema design
- Clean product-oriented UI/UX
- Authentication and user-specific data
- Analytics beyond basic CRUD
- Deployment and CI readiness
