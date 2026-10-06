import "dotenv/config";

const failures = [];
const secret = process.env.NEXTAUTH_SECRET?.trim();
if (!secret || secret.length < 32 || /replace-this|generate-a|ci-local-secret/.test(secret)) {
  failures.push("NEXTAUTH_SECRET must be a non-placeholder secret of at least 32 characters.");
}
for (const [name, protocols] of [
  ["DATABASE_URL", ["postgres:", "postgresql:"]],
  ["NEXTAUTH_URL", ["https:", "http:"]],
]) {
  try {
    const url = new URL(process.env[name] ?? "");
    if (!protocols.includes(url.protocol)) throw new Error();
    if (name === "NEXTAUTH_URL" && url.protocol !== "https:" &&
        !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) {
      failures.push("NEXTAUTH_URL must use HTTPS outside local development.");
    }
  } catch {
    failures.push(`${name} must be a valid configured URL.`);
  }
}
// This explicit release check avoids contacting providers or printing values.
if (process.argv.includes("--production")) {
  for (const name of ["RESEND_API_KEY", "RESEND_FROM_EMAIL"]) {
    if (!process.env[name]?.trim()) failures.push(`${name} is required for production recovery email.`);
  }
}
failures.forEach((message) => console.error(message));
if (failures.length) process.exitCode = 1;
else console.log("Environment shape validated; external service access is not verified.");
