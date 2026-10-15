type LegalEnvironment = {
  LEGAL_CONTACT_EMAIL?: string;
  PRIVACY_HOSTING_NOTICE?: string;
  PRIVACY_RETENTION_NOTICE?: string;
  PRIVACY_TRANSFER_NOTICE?: string;
};

// The owner explicitly approved publishing this project-only contact address.
export const defaultLegalContactEmail = "yangowen.projects@gmail.com";

const placeholder = /\b(?:todo|tbd|replace[- ]?this|your[- ]domain|example\.(?:com|test|invalid))\b/i;

// Only these deliberately public settings may appear on the legal pages.
// Never pass the full environment to a component or expose database/API values.
export function getLegalConfiguration(environment: LegalEnvironment = {
  LEGAL_CONTACT_EMAIL: process.env.LEGAL_CONTACT_EMAIL,
  PRIVACY_HOSTING_NOTICE: process.env.PRIVACY_HOSTING_NOTICE,
  PRIVACY_RETENTION_NOTICE: process.env.PRIVACY_RETENTION_NOTICE,
  PRIVACY_TRANSFER_NOTICE: process.env.PRIVACY_TRANSFER_NOTICE,
}) {
  const email = (environment.LEGAL_CONTACT_EMAIL ?? defaultLegalContactEmail).trim();
  const contactEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) &&
    !placeholder.test(email) && !/\.(?:example|test|invalid|localhost|local)$/i.test(email) ? email : null;
  const notices = {
    hosting: environment.PRIVACY_HOSTING_NOTICE?.trim() ?? "",
    retention: environment.PRIVACY_RETENTION_NOTICE?.trim() ?? "",
    transfers: environment.PRIVACY_TRANSFER_NOTICE?.trim() ?? "",
  };
  const missing = [
    ...(!contactEmail ? ["LEGAL_CONTACT_EMAIL"] : []),
    ...Object.entries(notices)
      .filter(([, value]) => !value || placeholder.test(value))
      .map(([key]) => ({
        hosting: "PRIVACY_HOSTING_NOTICE",
        retention: "PRIVACY_RETENTION_NOTICE",
        transfers: "PRIVACY_TRANSFER_NOTICE",
      })[key]!),
  ];

  return { contactEmail, ...notices, missing, ready: missing.length === 0 };
}
