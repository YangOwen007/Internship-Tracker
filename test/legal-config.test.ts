import test from "node:test";
import assert from "node:assert/strict";
import { getLegalConfiguration } from "@/lib/legal-config";
import { isPublicSignupEnabled } from "@/lib/security";

test("incomplete legal disclosures keep production public signup closed", () => {
  const config = getLegalConfiguration({ LEGAL_CONTACT_EMAIL: "" });
  assert.equal(config.ready, false);
  assert.equal(config.missing.length, 4);
  assert.equal(isPublicSignupEnabled({ nodeEnv: "production", publicSignupEnabled: "true" }, config.ready), false);
  assert.equal(isPublicSignupEnabled({ nodeEnv: "development", publicSignupEnabled: undefined }, config.ready), true);
});

test("the owner-approved project contact is available without exposing a private commit email", () => {
  assert.equal(getLegalConfiguration({}).contactEmail, "yangowen.projects@gmail.com");
  assert.equal(getLegalConfiguration({}).ready, false);
});

test("contact and deployment notices reject placeholders and header-injection addresses", () => {
  for (const email of ["person@example.com", "bad\r\nBcc:other@site.org", "not an email"]) {
    assert.equal(getLegalConfiguration({ LEGAL_CONTACT_EMAIL: email }).contactEmail, null);
  }
  const config = getLegalConfiguration({
    LEGAL_CONTACT_EMAIL: "privacy@operator.org",
    PRIVACY_HOSTING_NOTICE: "TBD",
    PRIVACY_RETENTION_NOTICE: "replace-this",
    PRIVACY_TRANSFER_NOTICE: "TODO",
  });
  assert.equal(config.ready, false);
  assert.equal(config.missing.length, 3);
});

test("complete public disclosures pass shape validation without overriding the signup flag", () => {
  const config = getLegalConfiguration({
    LEGAL_CONTACT_EMAIL: "privacy@operator.org",
    PRIVACY_HOSTING_NOTICE: "Hosting/DB provider and processing regions documented.",
    PRIVACY_RETENTION_NOTICE: "Provider backup and log periods configured and documented.",
    PRIVACY_TRANSFER_NOTICE: "Relevant lawful bases, contractual safeguards, and regions documented.",
  });
  assert.equal(config.ready, true);
  assert.equal(isPublicSignupEnabled({ nodeEnv: "production", publicSignupEnabled: "true" }, config.ready), true);
  assert.equal(isPublicSignupEnabled({ nodeEnv: "production", publicSignupEnabled: "false" }, config.ready), false);
});
