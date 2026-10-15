# Privacy notice

Last updated: October 15, 2026

Generated from `src/lib/legal-content.ts`. The deployed page also displays the configured private contact email and deployment-specific disclosures. Do not treat missing operator/provider details as finalized.

## Who operates this service

Internship Tracker is an independent portfolio project operated by Owen Yang. Use the contact information below for privacy, accessibility, account-data, copyright, or abuse requests. Do not include passwords or password-reset links in a request.

## Information we process

We store your account name, email address, password hash, tutorial preference, and account timestamps. We also store the applications you enter: companies, roles, locations, statuses, dates, compensation text, job links, notes, tags, resume-version labels, and optional recruiter or referral contact details. We do not accept uploaded resume files.

Your password is processed during signup, sign-in, password changes, and account deletion; the database stores a bcrypt hash rather than your readable password. Password-reset records contain a hashed token, timestamps, and account reference. The raw reset link is delivered to the recipient and processed by the email provider.

Hosting and email providers may process request metadata such as IP addresses, user agents, timestamps, and delivery events. Abuse prevention temporarily stores request counters keyed by account/email and, where supported, IP address in server memory. Expired counters are removed on subsequent requests or when the process ends.

## Why we use information

We use information to operate your private recruiting workspace, authenticate access, recover accounts, display your recruiting summaries, and prevent abuse. Application entries are not published as public profiles. Authorized operators and service providers may access information as needed to run, maintain, and protect the service.

Enter only information you are entitled to use. Do not enter government identifiers, health information, confidential employer material, or unnecessary personal information about contacts. This tool is not designed to store sensitive records.

## Service providers and external links

When email delivery is configured, Resend receives the recipient address and password-reset email, including the reset link. Our hosting/database providers process account and application information needed to serve the app. Provider names, processing locations, retention, and transfer details are stated in the deployment disclosures below; they must be configured before public registrations are enabled.

The application has no AI API integration, advertising scripts, or third-party visitor-analytics scripts. Dashboard analytics summarize your own recruiting records. We do not run an in-app data-sale or advertising-sharing feature. Hosting-provider use of data is subject to the selected contract and settings; review the deployment disclosures rather than assuming providers never use data for their own purposes.

Job links and other external links lead to independently operated sites. Those sites have their own policies when you choose to visit them.

## Cookies and browser settings

Authentication cookies support sign-in sessions, callback navigation, and protection against forged authentication requests. Sessions are configured for up to seven days. Blocking these cookies may prevent sign-in. We do not currently use non-essential tracking cookies or cross-site behavioral advertising, and the application does not change its behavior in response to a browser Do Not Track signal. Reassess this notice and any consent requirements before adding tracking.

## Retention and deletion

Application and account information remains until you remove it or delete your account; there is currently no automatic inactive-account deletion. In Account settings, you can permanently delete your account after confirming your current password and typing DELETE. The live database then deletes the account, applications, contacts, tags, and password-reset records through cascading deletion. You will be signed out in that browser. Existing session cookies in other browsers may remain until expiry, but a deleted account cannot access the private workspace.

Password-reset links expire after one hour. Expiration alone does not delete the stored token record. Operators must schedule the provided expired-token cleanup command. Deletion from the live database does not immediately erase provider logs or historical backups; the actual periods and restoration safeguards are described below. We do not promise a provider retention period until it is configured and verified.

The operator has selected a target maximum of 30 days for provider logs and historical backups. This is pending provider configuration and verification, not a guarantee that the current deployment enforces 30-day retention. The verified periods and limitations must be disclosed below before public registrations are enabled.

## Your requests and choices

You can edit and remove individual applications in your workspace. Contact the operator for access, correction, account-data copies, deletion assistance, or other rights available under applicable law. We may verify control of the account before acting; do not send identity documents unless a necessary and proportionate verification method has first been agreed. Applicable exceptions and legal obligations may affect a request.

Where EU or UK data-protection law applies, requests may also include portability, restriction, or objection, and a complaint to a competent supervisory authority. The operator must assess the applicable lawful basis and transfer safeguards for the actual audience and deployment; access from a country alone does not determine which laws apply.

## Age, safety, and updates

The service is intended for people aged 13 or older, or any higher minimum age required locally. It is not directed to children under 13. Contact the operator if you believe a child has provided personal information. An age statement does not replace any additional obligations that apply when serving minors.

No service can guarantee perfect security. If we change our data practices, we will update this notice and its date and provide any additional notice required by applicable law. Privacy settings and provider choices must reflect the notice before new practices are enabled.

## Contact

The owner-approved project contact is yangowen.projects@gmail.com. The deployed operator may explicitly override it using LEGAL_CONTACT_EMAIL. Do not send passwords, reset links, or unnecessary sensitive records.

## Deployment configuration

The website displays `LEGAL_CONTACT_EMAIL`, `PRIVACY_HOSTING_NOTICE`, `PRIVACY_RETENTION_NOTICE`, and `PRIVACY_TRANSFER_NOTICE`. These are intentionally public disclosures, not secrets. Public production signup stays disabled if their shape checks fail. Human verification of their accuracy, provider agreements, and applicable law is still required. See [the operations checklist](docs/legal-operations.md).
