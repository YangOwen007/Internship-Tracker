# Internship Tracker

A full-stack internship and job application tracker for organizing a student recruiting search.

## Overview

This project helps students manage the recruiting process end to end:

- track applications across recruiting stages
- manage a notes field, deadlines, one contact per application, tags, and resume-version labels
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
- Confirm-password validation during sign-up
- Forgot-password and password-reset flow
- User-specific application data
- Dashboard metrics and charts
- Priority queue for upcoming deadlines and follow-up work
- Board view with drag-and-drop stage movement
- Table view with search, filters, and sorting
- Create and edit application flows
- One contact per application, notes, tags, deadlines, salary, job links, and resume-version labels
- First-login tutorial with replay support
- Database-backed readiness endpoint at `/api/health`
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

- connection config lives in [`prisma.config.ts`](prisma.config.ts)
- the shared Prisma client uses the generated PostgreSQL client in [`src/lib/prisma.ts`](src/lib/prisma.ts)
- schema setup is reproducible through [`prisma/migrations`](prisma/migrations)

## Local Development

Run:

```bash
pnpm db:postgres:up
cp .env.example .env
pnpm db:setup # destructive demo seed; local and CI databases only
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
pnpm test
pnpm build
```

## Demo Account

- The seed script creates `owen.yang.demo@internship-tracker.local` on a local or explicitly approved test database.
- Set `SEED_DEMO_PASSWORD` in `.env` before seeding if you need a known local password. Passwords are never printed.
- `pnpm db:setup` deletes existing rows and is only for disposable local or CI databases. The seed refuses production and non-local targets unless `ALLOW_DESTRUCTIVE_SEED=true` is explicitly set.

## Deployment And PostgreSQL Prep

- [`docker-compose.postgres.yml`](docker-compose.postgres.yml)
- [`.env.example`](.env.example)
- [`docs/postgres-migration-plan.md`](docs/postgres-migration-plan.md)
- [`docs/deployment-guide.md`](docs/deployment-guide.md)

## Password Reset Email Behavior

- In local development, forgot-password shows a browser preview link if no email provider is configured.
- In production, set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` to send real password-reset emails.

## CI

The repo includes [`.github/workflows/ci.yml`](.github/workflows/ci.yml), which:

- installs dependencies
- starts PostgreSQL
- applies Prisma migrations
- seeds demo data
- runs lint
- runs typecheck
- runs tests
- runs a production build

## Screenshot Plan

README screenshots have not been added yet. The planned capture list is in [`docs/screenshot-shotlist.md`](docs/screenshot-shotlist.md).

## What This Project Demonstrates

- Full-stack web development
- Thoughtful schema design
- Clean product-oriented UI/UX
- Authentication and user-specific data
- Analytics beyond basic CRUD
- Deployment and CI readiness
