# Internship Tracker

A polished internship application tracker aimed at sophomore recruiting. The goal is to build a project that is genuinely useful during recruiting while also showing strong full-stack engineering fundamentals on GitHub.

## Current State

The repo started empty. It now has:

- A Next.js App Router + TypeScript foundation
- Tailwind-based styling with a custom dashboard visual system
- A typed application domain model with sample recruiting data
- A recruiter-friendly dashboard shell with analytics, pipeline view, and application table

This is an intentional MVP foundation rather than a generic landing page. The next milestone is wiring the same information architecture to real auth and database persistence.

## Recommended MVP Scope

Build these first, and build them well:

1. Authentication and user-specific data
2. Application CRUD with strong validation
3. Dashboard analytics
4. Table view with filters, sorting, and search
5. Kanban or status pipeline view
6. Contacts, deadlines, notes, and resume version tracking

That scope is strong enough for a portfolio piece because it demonstrates product thinking, database design, UI polish, and full-stack execution without spreading the project too thin.

## Recommended Stack

This repo currently uses:

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4

Recommended next additions:

- PostgreSQL for primary storage
- Prisma ORM for schema, migrations, and typed database access
- Auth.js for authentication
- Recharts or Tremor charts once the dashboard is backed by real data
- Docker and GitHub Actions after the MVP data flow is stable

Why this stack:

- Next.js gives you one codebase for UI, server components, actions, and API routes.
- Prisma + PostgreSQL is a clean, internship-worthy combination that teaches real schema and migration workflows.
- Auth.js makes the app feel like a real product with protected data and user-specific records.

## Implementation Plan

1. Foundation
   - Clean app shell
   - Shared design language
   - Typed domain model
2. Data layer
   - Add Prisma schema
   - Set up PostgreSQL
   - Seed realistic demo data
3. Authentication
   - Add Auth.js
   - Protect dashboard routes
   - Scope all application data by user
4. Core product flows
   - Create and edit applications
   - Table filters and search
   - Kanban status management
5. Analytics
   - Response, interview, and offer metrics
   - Time-series application chart
   - Breakdown by status, role, and location
6. Portfolio polish
   - README screenshots
   - Deployment setup
   - Tests and CI

## Local Development

Use the bundled Node runtime or your local Node install, then run:

```bash
pnpm dev
```

Useful scripts:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## What This Project Should Demonstrate

- Full-stack web development
- Thoughtful schema design
- Clean, responsive product UI
- User authentication
- Analytics beyond basic CRUD
- Project quality that reads well to recruiters and hiring managers
