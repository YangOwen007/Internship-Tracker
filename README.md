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
- SQLite for current local development
- PostgreSQL-ready deployment path

## Architecture Notes

The app currently uses a SQLite-first local workflow because it keeps iteration fast and stable in the current environment. The codebase has been cleaned up so the final PostgreSQL switch is much smaller than it would have been earlier:

- shared database configuration lives in [src/lib/database-config.ts](C:/Users/centu/Documents/Internship%20Tracker/src/lib/database-config.ts)
- the Prisma client is prepared for both the current SQLite path and a future standard connection-string path in [src/lib/prisma.ts](C:/Users/centu/Documents/Internship%20Tracker/src/lib/prisma.ts)
- local PostgreSQL setup and cutover docs are already in place

## Local Development

Run:

```bash
pnpm db:setup
pnpm dev
```

If Prisma CLI is flaky in your local Windows runtime, use:

```bash
pnpm db:setup:direct
pnpm dev
```

Useful scripts:

```bash
pnpm db:generate
pnpm db:bootstrap
pnpm db:seed
pnpm db:seed:direct
pnpm db:setup:direct
pnpm db:postgres:up
pnpm db:postgres:down
pnpm db:postgres:logs
pnpm lint
pnpm typecheck
pnpm build
```

## Demo Account

- Email: `owen.yang.demo@internship-tracker.local`
- Password: `demo12345`

## Deployment And PostgreSQL Prep

- [docker-compose.postgres.yml](C:/Users/centu/Documents/Internship%20Tracker/docker-compose.postgres.yml)
- [.env.postgres.example](C:/Users/centu/Documents/Internship%20Tracker/.env.postgres.example)
- [.env.production.example](C:/Users/centu/Documents/Internship%20Tracker/.env.production.example)
- [docs/postgres-migration-plan.md](C:/Users/centu/Documents/Internship%20Tracker/docs/postgres-migration-plan.md)
- [docs/deployment-guide.md](C:/Users/centu/Documents/Internship%20Tracker/docs/deployment-guide.md)

## CI

The repo includes [`.github/workflows/ci.yml`](C:/Users/centu/Documents/Internship%20Tracker/.github/workflows/ci.yml), which:

- installs dependencies
- bootstraps a local SQLite database
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
