export type PolicySection = { title: string; paragraphs: string[] };

export const policyUpdated = "October 15, 2026";

// The website and generated Markdown policies share this content so they do
// not drift into different promises about the same data flows.
export const privacySections: PolicySection[] = [
  { title: "Who operates this service", paragraphs: [
    "Internship Tracker is an independent portfolio project operated by Owen Yang. Use the contact information below for privacy, accessibility, account-data, copyright, or abuse requests. Do not include passwords or password-reset links in a request.",
  ] },
  { title: "Information we process", paragraphs: [
    "We store your account name, email address, password hash, tutorial preference, and account timestamps. We also store the applications you enter: companies, roles, locations, statuses, dates, compensation text, job links, notes, tags, resume-version labels, and optional recruiter or referral contact details. We do not accept uploaded resume files.",
    "Your password is processed during signup, sign-in, password changes, and account deletion; the database stores a bcrypt hash rather than your readable password. Password-reset records contain a hashed token, timestamps, and account reference. The raw reset link is delivered to the recipient and processed by the email provider.",
    "Hosting and email providers may process request metadata such as IP addresses, user agents, timestamps, and delivery events. Abuse prevention temporarily stores request counters keyed by account/email and, where supported, IP address in server memory. Expired counters are removed on subsequent requests or when the process ends.",
  ] },
  { title: "Why we use information", paragraphs: [
    "We use information to operate your private recruiting workspace, authenticate access, recover accounts, display your recruiting summaries, and prevent abuse. Application entries are not published as public profiles. Authorized operators and service providers may access information as needed to run, maintain, and protect the service.",
    "Enter only information you are entitled to use. Do not enter government identifiers, health information, confidential employer material, or unnecessary personal information about contacts. This tool is not designed to store sensitive records.",
  ] },
  { title: "Service providers and external links", paragraphs: [
    "When email delivery is configured, Resend receives the recipient address and password-reset email, including the reset link. Our hosting/database providers process account and application information needed to serve the app. Provider names, processing locations, retention, and transfer details are stated in the deployment disclosures below; they must be configured before public registrations are enabled.",
    "The application has no AI API integration, advertising scripts, or third-party visitor-analytics scripts. Dashboard analytics summarize your own recruiting records. We do not run an in-app data-sale or advertising-sharing feature. Hosting-provider use of data is subject to the selected contract and settings; review the deployment disclosures rather than assuming providers never use data for their own purposes.",
    "Job links and other external links lead to independently operated sites. Those sites have their own policies when you choose to visit them.",
  ] },
  { title: "Cookies and browser settings", paragraphs: [
    "Authentication cookies support sign-in sessions, callback navigation, and protection against forged authentication requests. Sessions are configured for up to seven days. Blocking these cookies may prevent sign-in. We do not currently use non-essential tracking cookies or cross-site behavioral advertising, and the application does not change its behavior in response to a browser Do Not Track signal. Reassess this notice and any consent requirements before adding tracking.",
  ] },
  { title: "Retention and deletion", paragraphs: [
    "Application and account information remains until you remove it or delete your account; there is currently no automatic inactive-account deletion. In Account settings, you can permanently delete your account after confirming your current password and typing DELETE. The live database then deletes the account, applications, contacts, tags, and password-reset records through cascading deletion. You will be signed out in that browser. Existing session cookies in other browsers may remain until expiry, but a deleted account cannot access the private workspace.",
    "Password-reset links expire after one hour. Expiration alone does not delete the stored token record. Operators must schedule the provided expired-token cleanup command. Deletion from the live database does not immediately erase provider logs or historical backups; the actual periods and restoration safeguards are described below. We do not promise a provider retention period until it is configured and verified.",
    "The operator has selected a target maximum of 30 days for provider logs and historical backups. This is pending provider configuration and verification, not a guarantee that the current deployment enforces 30-day retention. The verified periods and limitations must be disclosed below before public registrations are enabled.",
  ] },
  { title: "Your requests and choices", paragraphs: [
    "You can edit and remove individual applications in your workspace. Contact the operator for access, correction, account-data copies, deletion assistance, or other rights available under applicable law. We may verify control of the account before acting; do not send identity documents unless a necessary and proportionate verification method has first been agreed. Applicable exceptions and legal obligations may affect a request.",
    "Where EU or UK data-protection law applies, requests may also include portability, restriction, or objection, and a complaint to a competent supervisory authority. The operator must assess the applicable lawful basis and transfer safeguards for the actual audience and deployment; access from a country alone does not determine which laws apply.",
  ] },
  { title: "Age, safety, and updates", paragraphs: [
    "The service is intended for people aged 13 or older, or any higher minimum age required locally. It is not directed to children under 13. Contact the operator if you believe a child has provided personal information. An age statement does not replace any additional obligations that apply when serving minors.",
    "No service can guarantee perfect security. If we change our data practices, we will update this notice and its date and provide any additional notice required by applicable law. Privacy settings and provider choices must reflect the notice before new practices are enabled.",
  ] },
];

export const termsSections: PolicySection[] = [
  { title: "Purpose and eligibility", paragraphs: [
    "Internship Tracker is a personal recruiting-organization tool operated by Owen Yang. Use it only if you are at least 13 and meet any higher locally required age. If you cannot enter an agreement on your own, obtain any permission required by applicable law. Do not create accounts for others without authority.",
  ] },
  { title: "Your account and entries", paragraphs: [
    "You retain your rights in the information you submit. You authorize the operator and configured service providers to host, process, and display it only as needed to provide, maintain, and protect the service, as described in the Privacy notice. These service terms do not transfer ownership of your content or replace the separate licenses for source code and third-party software.",
    "Keep your credentials private and use accurate account information. Submit only content you have the right to use. Do not include confidential employer documents, unnecessary third-party personal data, or sensitive identifiers.",
  ] },
  { title: "Acceptable use and complaints", paragraphs: [
    "Do not infringe copyright or privacy rights, harass people, send spam, attempt unauthorized access, disrupt the service, or use it unlawfully. The app does not publish user profiles, send recruiter outreach, or accept document uploads. Report copyright, privacy, accessibility, or abuse concerns using the contact information below; do not post private records or credentials in public GitHub issues.",
    "The operator may restrict or suspend access reasonably needed to address abuse, legal obligations, or service protection. Where practicable and legally appropriate, affected users will be given an explanation and a way to contact the operator about the decision. A complaint contact alone does not establish a registered DMCA safe-harbor program.",
  ] },
  { title: "Accuracy, independence, and availability", paragraphs: [
    "You are responsible for verifying job postings, deadlines, application statuses, and compensation. The service is not a recruiter and does not guarantee employment, data accuracy, uninterrupted availability, or preservation of every entry. Keep your own copy of important recruiting information.",
    "This is an independent portfolio project, not affiliated with or endorsed by UC San Diego, GitHub, or companies referenced in examples. Seed recruiting scenarios, statuses, contacts, and compensation are fictional, not actual offers or employer statements. Third-party names and marks belong to their respective owners.",
    "The service is provided as available and as is, with warranty exclusions only to the extent permitted by law. Nothing in these terms excludes mandatory consumer rights or liability that cannot lawfully be excluded. No mandatory arbitration, class-action waiver, or chosen jurisdiction is imposed here.",
  ] },
  { title: "Leaving the service and changes", paragraphs: [
    "You may stop using the service and delete your account in Account settings. Live-database deletion is permanent; provider logs and backups follow the retention disclosures in the Privacy notice. Contact the operator if you need assistance before deletion. Account-data copies are handled by request, not by a built-in export feature.",
    "These terms may be updated as the service changes. The published version will show the update date; additional notice will be provided where required by law. Existing source-code licenses and mandatory statutory rights are not revoked by changes to these service terms.",
  ] },
];
