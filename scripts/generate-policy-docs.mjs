import { readFile, writeFile } from "node:fs/promises";
import { privacySections, termsSections, policyUpdated } from "../src/lib/legal-content.ts";
import { defaultLegalContactEmail } from "../src/lib/legal-config.ts";

// Import the website's typed content rather than maintaining a second policy
// by hand; the runtime page adds the operator's actual deployment settings.
for (const [file, title, sections] of [
  ["PRIVACY.md", "Privacy notice", privacySections],
  ["TERMS.md", "Terms of use", termsSections],
]) {
  const rendered = `# ${title}\n\nLast updated: ${policyUpdated}\n\n` +
    "Generated from `src/lib/legal-content.ts`. The deployed page also displays the configured private contact email and deployment-specific disclosures. Do not treat missing operator/provider details as finalized.\n\n" +
    sections.map(({ title: heading, paragraphs }) => `## ${heading}\n\n${paragraphs.join("\n\n")}\n`).join("\n") +
    `\n## Contact\n\nThe owner-approved project contact is ${defaultLegalContactEmail}. The deployed operator may explicitly override it using LEGAL_CONTACT_EMAIL. Do not send passwords, reset links, or unnecessary sensitive records.\n` +
    "\n## Deployment configuration\n\nThe website displays `LEGAL_CONTACT_EMAIL`, `PRIVACY_HOSTING_NOTICE`, `PRIVACY_RETENTION_NOTICE`, and `PRIVACY_TRANSFER_NOTICE`. These are intentionally public disclosures, not secrets. Public production signup stays disabled if their shape checks fail. Human verification of their accuracy, provider agreements, and applicable law is still required. See [the operations checklist](docs/legal-operations.md).\n";
  const path = new URL(`../${file}`, import.meta.url);
  if (process.argv.includes("--check")) {
    // Git may check out CRLF on Windows; line endings are not a policy change.
    if ((await readFile(path, "utf8")).replaceAll("\r\n", "\n") !== rendered) throw new Error(`${file} is stale; run pnpm policies:generate.`);
  } else {
    await writeFile(path, rendered);
  }
}
console.log(process.argv.includes("--check") ? "Policy documents match the website content." : "Generated privacy/terms documents from the shared website content.");
