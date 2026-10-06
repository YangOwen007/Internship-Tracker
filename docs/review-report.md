# Public review and deployment assessment

Reviewed October 5, 2026. Scope: current source/configuration, reachable Git history, production artifacts, GitHub default-branch presentation and Actions, local PostgreSQL, and local production browser journeys.

## 1. Overall assessment

The reviewed branch is suitable for an engineer to evaluate locally. It is deployable with documented external setup, not an already-provisioned public service. The default GitHub branch still needs the review changes merged and its new CI run verified.

The three principal launch concerns are shared abuse controls, production database/email/HTTPS setup, and existing JWT sessions surviving password reset. No deployment was performed.

## 2. Findings before changes

| Severity/category | Evidence | Impact |
| --- | --- | --- |
| Critical dependency advisories | `package.json` / original lockfile: Next 16.2.10 and NextAuth 4.24.14 | Audit reported four critical and 23 high findings across the production graph. Some advisories require features this app does not use (such as magic-link login or dynamic OG images); package presence does not prove exploitation. Patched versions still avoid shipping known vulnerable code. |
| High auth correctness | `src/lib/password-reset.ts` checked validity before an unconditional token update | Two concurrent requests could both use a supposedly single-use token. |
| High operational exposure | `src/lib/email.ts` logged reset links; recovery action exposed delivery failure only for existing users | Logs held bearer reset credentials, and failures could distinguish registered accounts. |
| Medium reproducibility | `package.json`, CI, README | Generated Prisma client was untracked, with no install hook or explicit CI generation. Tool versions were not pinned, setup omitted install/generation, and public CI failed at install. |
| Medium local safety | `docker-compose.postgres.yml`, `prisma/seed.ts` | Local database port bound all interfaces; `.internal` hosts were incorrectly treated as safe local seed targets. |
| Medium accessibility/mobile | actions menu and application-details/tutorial components | Menu hidden below desktop width; invisible controls could receive focus; dialogs did not fully contain keyboard focus. |
| Medium date correctness | `src/app/applications/actions.ts` | Date-only fields used server-local midnight and could shift after moving hosts/timezones. |
| Medium reliability | Prisma/email connections, no app error boundary | Unbounded external email wait, default connection capacity, and poor page-level recovery. |
| Low public presentation | default-branch README and GitHub About | Machine-specific links and self-evaluation language; no description, topics, screenshots, license, releases, or demo. |

The public failed run inspected was `https://github.com/YangOwen007/Internship-Tracker/actions/runs/30292489079`. Install failed; later checks never ran. This report does not infer that the skipped tests had passed.

## 3. Changes made

- Updated Next and matching lint configuration to 16.3.8, NextAuth to 4.24.15, and Prisma/client/adapter together to stable 7.10.0. Added targeted transitive security overrides and removed the unused `postgres` package. Kept the architecture and lockfile.
- Pinned pnpm 10.34.6 and Node 24; install now generates Prisma. CI configures its disposable environment before install, uses exact Action commit revisions, runs migrations without seed, scans credential patterns, blocks on high production advisories, and reports development-tool advisories separately. Added Dependabot configuration.
- Password reset claims its token atomically inside the password-write transaction. Removed the unused unsafe consume helper. Added hashed-token, expiry, repeat-use, and concurrency regression coverage.
- Removed reset-link logging, bounded email delivery to ten seconds, enforced sender configuration in production, and kept recovery confirmation generic on provider/database failure. Reset validation no longer echoes password values back in action state.
- Added environment shape checks and startup validation; strengthened production auth-secret validation. Added PostgreSQL connection timeout/pool cap, loopback database binding, UTC date writes, and user ownership directly in full application updates.
- Added a recoverable page error boundary, dialog/menu/tutorial focus containment, visible keyboard focus, inert hidden menu controls, a responsive actions menu, and bounded sidebar scrolling.
- Rewrote README and deployment instructions around real behavior and tradeoffs. Removed "Why This Project Is Strong" and portfolio/deployment readiness praise. Documented notes/contact/file-upload limits, missing operations, safe non-seeding setup, and license uncertainty.
- Added real dashboard/login screenshots from the local production build with synthetic data. Removed five unused starter SVGs and made seed person/account names generic.
- Updated GitHub About with a factual description and topics: `internship-tracker`, `nextjs`, `postgresql`, `prisma`, `typescript`. Kept the repository name and empty homepage because no public app URL exists.

## 4. Verification

- Baseline `pnpm lint` and `pnpm typecheck` passed before edits.
- Final `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` passed. Tests increased from eight to nine; the new database test exercises concurrent and expired reset-token behavior. Prisma clients disconnect after integration tests.
- Frozen install and production build passed in an isolated source copy without `.env`, generated Prisma, `node_modules`, or `.next`, with synthetic environment supplied to the process. This approximates a clean checkout on Windows; the hosted Linux CI result is a separate check.
- Production dependency audit improved from 50 findings (four critical) to zero. Full audit retains one high development-only `braces` advisory through lint tooling, with no published fix. ESLint 9 also emits a support/deprecation warning; a major toolchain migration was deferred.
- `node scripts/secret-scan.mjs --history`: zero selected credential-pattern matches. The scanner reports locations without matched values, includes untracked source, skips deleted paths, and is explicitly not exhaustive. Manual tracked-history filename inspection found only `.env.example`, not real env/key/log/database artifacts.
- Configured `NEXTAUTH_SECRET`, `RESEND_API_KEY`, and `DATABASE_URL` values were absent from `.next/static`. There were zero public static source-map files. This does not cover private host access logs or inaccessible external service history.
- Environment validation passes locally, rejects a placeholder auth secret, and correctly fails production email validation when Resend settings are absent. No secret value is printed.
- Live readiness returned 200 with PostgreSQL and 503 with it stopped, without detailed database errors. The container was restarted and existing data retained.
- Browser checks: signed-out protected-route redirect; login; first-login tutorial prompt and skip; create a synthetic application; details dialog; Shift+Tab wrapping; Escape focus restoration; mobile dashboard at 390x844 without horizontal overflow; mobile menu/sign-out/replay; tutorial replay; and sign-out returning to login. Screenshots were inspected visually.
- Local Markdown file/image targets resolve. Public GitHub README rendering, About, branch/tag state, Actions failure, and absence of releases/open PRs were inspected.

Limits: no real Resend email was sent because production sender/API configuration is absent. No hosted deployment, backup restore, load test, or automated axe/Lighthouse suite was run. This repository has no configured automated browser/accessibility harness; manual checks above do not replace one. Review does not establish complete security coverage.

## 5. Access and deployment handoff

Repository: `https://github.com/YangOwen007/Internship-Tracker`. Use the review branch until it is merged. Setup commands and exact environment roles are in README; production configuration, release commands, smoke checks, backup/rollback behavior, and common failure recovery are in `deployment-guide.md`.

Local sequence: copy `.env.example`, replace the auth secret, frozen install, `db:postgres:up`, `db:generate`, `db:migrate:deploy`, and `dev`; open `http://localhost:3000`. Production sequence: configure host secrets, `check:env -- --production`, frozen install/generation, release migration, `build`, and `start` (or the platform's Next.js runtime). Never seed production.

External prerequisites: host account, managed PostgreSQL/TLS/backups, strong auth secret, canonical HTTPS origin, verified Resend sender/API key, and shared abuse controls before enabling public signup. Provider costs/limits must be checked for the selected accounts. There is no verified hosted URL.

## 6. Recommended next steps

1. Verify the review PR's hosted CI and merge the reviewed changes to `main` so the default repository page and cloning path reflect this work.
2. Configure staging host/database/email and shared limits; verify actual recovery delivery and backup restoration before public use.
3. Implement password-reset session revocation, then decide email verification, account deletion/retention, and public registration policy.
4. Add browser regression/accessibility checks, server-side pagination for large datasets, and more real screenshots.
5. Choose a license explicitly if reuse/contributions are intended; create a release only after CI and staging checks are verified.
6. Track the remaining `braces` advisory and ESLint support status. Do not claim a passing production audit covers developer tooling.

No external production credential leak was identified, so this pass does not prescribe a specific credential rotation or claim one occurred. Historical local demo passwords/paths are not evidence of a live production key; rotate any credential if it was reused outside disposable development. Published history was not rewritten.

## 7. File and repository summary

Changes are grouped across README/deployment/security/report documentation and screenshots; `.env.example`, `.nvmrc`, package/lock/workspace files; Docker and CI/Dependabot; auth/recovery/database/action code; error and focus/navigation components; and test/scanning/environment scripts. Removed unused starter SVGs. Generated Prisma, build caches, test credentials, and local environment files remain untracked.

Preserved schema and migration history, current design direction, JWT/bcrypt/reset-token cryptography, and repository identity. No license, release, invented demo URL, hosting configuration, deployment, destructive seed, or published-history rewrite was added. The disposable browser-review user and application were removed after testing; real user records were not reset.
