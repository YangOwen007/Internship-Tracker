# Deployment guide

## Supported path

Use Node.js 24, pnpm 10.34.6, PostgreSQL 16, and a Next.js-capable host (Vercel is one option). Build with `pnpm build`; self-host with `pnpm start`. Static export is unsupported because auth/database routes require a server.

No hosting is provisioned. External requirements: host account, managed PostgreSQL with backups, HTTPS origin, and Resend access with a verified sender domain. Provider pricing and quotas vary; no free-hosting guarantee is made.

## Environment

Configure real values in the host's secret store. Never expose them as `NEXT_PUBLIC_*` variables.

- `DATABASE_URL`: managed PostgreSQL URL with provider-required TLS. Use a pooling endpoint for serverless traffic and a migration-compatible connection for release migrations. Do not disable certificate validation.
- `NEXTAUTH_SECRET`: at least 32 random bytes, independent from local/test secrets. Keep it stable between releases.
- `NEXTAUTH_URL`: canonical HTTPS origin. Staging/preview deployments need separate origins and databases.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`: both required for production recovery emails, with a verified sender.
- `PUBLIC_SIGNUP_ENABLED`: off by default in production. Enable only after configuring shared limits for login, signup, and recovery.

The process-local limiter is defense in depth. Generic forwarded-IP headers are ignored; the Vercel header is used only with `VERCEL=1`.

## Release

From the release commit with production environment configured:

```sh
pnpm install --frozen-lockfile
pnpm db:generate
pnpm check:env -- --production
pnpm db:migrate:deploy
pnpm lint
pnpm typecheck
pnpm security:scan
pnpm security:audit
pnpm build
pnpm start
```

Run `pnpm test` against a separate local/test database, never production. Back up before migrations. Never use `db:setup`, `db:push`, or seeds as a production release step.

For Vercel, import the repository, select Node.js 24, use the pinned pnpm version and frozen install, and build with `pnpm build`. Apply migrations separately before switching traffic. No Vercel project is created by this repo.

## Smoke checks

1. GET `/api/health`: expect 200 and `database: "reachable"`; expect 503 with PostgreSQL unavailable. This does not verify email.
2. Signed-out visits to the dashboard and create/edit pages must redirect to login.
3. Use synthetic staging accounts to test login, create/edit, filters, board status changes, tutorial, and sign-out.
4. Verify recovery email delivery, HTTPS origin, expired links, and single-use links. No development preview link should appear in production.
5. Test two-user isolation and mobile/keyboard navigation. Inspect CSP and HTTPS cookie behavior.
6. Ensure infrastructure access logs do not record reset-token query strings, cookies, or form bodies.

## Operations and recovery

Enable error monitoring and uptime checks. Log event names/request IDs rather than emails, tokens, notes, or passwords. Enable automated backups and rehearse restoration into staging; decide retention/deletion expectations before accepting real personal data.

Prisma caps each instance at five connections and bounds connection waits. Account for total instance count when sizing database capacity.

For a bad release, restore the last verified app commit. Do not blindly reverse migrations: older code must support the new schema, or restore a tested backup with an explicit downtime plan.

- Readiness 503: check database availability, TLS, credentials, network, capacity, and migration status. Do not reseed.
- Missing tables/client errors: run `db:generate` during build and `db:migrate:deploy` against the correct database.
- Email failure: check provider quota, API key, verified sender, and origin. Users receive the same confirmation regardless of account existence/delivery failure.

Existing JWT sessions survive a password reset; session revocation needs a separate design. CSP permits inline scripts/styles for hydration; nonce-based CSP is deferred. Distributed rate limiting, full browser QA, and backup restoration remain launch prerequisites.
