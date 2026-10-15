# Legal and privacy operations

This checklist is operational guidance, not legal advice or a compliance certification.
Policy text lives in `src/lib/legal-content.ts`; run `pnpm policies:generate` after
editing it. `/privacy` and `/terms` add the current public deployment settings.

## Approved decisions

- Original project material is MIT-licensed, copyright 2026 Owen Yang. Dependencies retain their own licenses.
- The public privacy, copyright, abuse, and accessibility contact is yangowen.projects@gmail.com. Ownership/deliverability of that mailbox must be maintained by the operator; this repo does not send test mail.
- Account deletion immediately removes live-database account/application/contact/tag/reset records after password verification and a typed confirmation.
- There is no automatic deletion of inactive accounts. Do not invent an inactivity period in the notice.
- The target maximum retention for provider logs and historical backups is **30 days**, but it is **not yet an enforced or advertised guarantee**. Select/configure providers, verify all retention layers, and document the actual settings before public launch. If a provider cannot meet the target, obtain a new decision instead of silently extending it.
- Seed recruiting scenarios are fictional. Company names, statuses, and compensation in seeds do not describe real offers or endorsement. Do not reseed an existing database merely to update these labels.

## Before enabling public signup

1. Confirm the contact mailbox is controlled and monitored. Use a private channel for records, never a public issue.
2. Fill `PRIVACY_HOSTING_NOTICE` with actual app/database providers, processing regions, operator access, and material provider data-use settings. These values are rendered publicly; exclude secrets and connection strings.
3. Fill `PRIVACY_RETENTION_NOTICE` with verified log, email-event, and backup periods, deletion limitations, and any required exceptions. The 30-day target remains pending until contracts and settings support it.
4. Fill `PRIVACY_TRANSFER_NOTICE` with the applicable lawful bases and international-transfer assessment/safeguards for the real audience. Obtain legal advice where applicability or roles are unclear; do not claim GDPR compliance from a configuration flag.
5. Check hosting plan eligibility, acceptable-use terms, provider DPA coverage, subprocessors, and model-training/data-sharing defaults. The October 15, 2026 review found Vercel Hobby/trial training permissions with opt-out, personal/noncommercial Hobby limits, and Pro/Enterprise scope in its published DPA. Recheck current [terms](https://vercel.com/legal/terms) and [DPA](https://vercel.com/legal/dpa) at selection time. No account settings were changed by this repo.
6. Confirm [Resend terms](https://resend.com/legal/terms-of-service), [AUP](https://resend.com/legal/acceptable-use), [DPA](https://resend.com/legal/dpa), and [subprocessors](https://resend.com/legal/subprocessors). Recovery emails are user-requested transactional messages, not recruiter outreach. Check quotas, sender authorization, and delivery/event retention.
7. Review jurisdiction/minor eligibility, third-party recruiter information, notices, and any required terms-assent process with qualified advice. Signup links are not a recorded clickwrap-consent mechanism. A 13+ statement alone does not resolve COPPA or local contract rules.
8. Configure shared abuse controls, then run `pnpm check:env -- --production` with the real public settings and `PUBLIC_SIGNUP_ENABLED=true`. Shape validation is a guardrail, not proof of legal adequacy. Existing production defaults keep registration closed.
9. Run `pnpm licenses:generate -- --registry` after the frozen install **on the release platform**. Review metadata-only entries and binary/vendored components, keep applicable license/NOTICE/source-access material in the release, and inspect browser-delivered bundles and any distributed containers. The checked-in artifact is a Windows collection, not clearance for all platform binaries.

## Retention and recovery

Schedule `pnpm privacy:cleanup` daily in an approved operator-controlled job with
the correct database secret. It deletes only expired password-reset records and
prints a count, never tokens, email addresses, or connection URLs. No scheduled
job is provisioned by the repository. Until scheduled, expiration prevents token
use but does not bound token-record retention. Do not run seeds for cleanup.

Do not record reset query strings, cookies, request bodies, passwords, or notes
in application/proxy/monitoring logs. Align platform access logs, email events,
database replicas, and backup storage with the approved retention target. Disable
unnecessary analytics and verify provider model-training settings before data is sent.

Restoring an old backup must not silently restore a previously deleted account
to service. Restore into an isolated environment; reconcile verified deletion
requests before admitting traffic. Define a restricted, minimal request ledger
and its retention before relying on backups; no such ledger or automated
reconciliation system is claimed to exist here. Do not retain deleted content in
logs as a substitute. Document exceptional legal holds rather than promising
unconditional erasure from every system.

## Handling requests

The public contact is for privacy/data-copy, correction/deletion assistance,
copyright, abuse, and accessibility concerns. Verify account control before
disclosing records or performing manual deletion; never accept an arbitrary
email/ID alone as authority. Prefer self-service deletion. For a data-copy request,
export only the verified user's records and share through a private authenticated
method; no built-in export or automatic legal-response system is provided.

Record the request category, verification outcome, action, and follow-up deadline
without copying passwords, reset tokens, notes, or unnecessary identity documents.
Determine jurisdiction-specific deadlines/exceptions rather than promising a
single universal response time. Escalate suspected child-data collection,
breaches, contested ownership, and complex legal demands to qualified advice.
If adopting DMCA safe-harbor arrangements, verify registration and all required
procedures separately; an email contact is not sufficient by itself.

## Attribution and source provenance

Maintain `THIRD_PARTY_NOTICES.md` and `/third-party-licenses.txt`; the project's
MIT license cannot override upstream licenses or trademark rights. Preserve the
Prisma Studio branding NOTICE where applicable. The original checklist artwork
is in `src/app/icon.svg`; `pnpm icons:generate` renders its ICO counterpart.
System font references do not grant redistribution rights to font binaries.
Confirm rights in any future artwork, screenshots, copied snippets, coursework,
or employer contributions before publication. No history rewrite is authorized.
