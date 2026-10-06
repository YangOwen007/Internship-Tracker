import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

// Report locations and rule names only: matched credentials must never enter logs.
const rules = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["GitHub token", /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b/],
  ["AWS access key", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ["Resend key", /\bre_[A-Za-z0-9]{24,}\b/],
];
const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
let findings = 0;

function scan(text, location) {
  text.split(/\r?\n/).forEach((line, index) => {
    for (const [name, pattern] of rules) {
      if (pattern.test(line) && !line.includes("re_xxxxxxxxxxxxxxxxxxxxx")) {
        console.error(`${location}:${index + 1}: possible ${name} (redacted)`);
        findings++;
      }
    }
  });
}

for (const file of git("ls-files", "--cached", "--others", "--exclude-standard", "-z").split("\0").filter(Boolean)) {
  // Known binary assets cannot contain source credentials and are not decoded.
  if (/\.(?:ico|png|jpg|jpeg|webp|woff2?)$/i.test(file)) continue;
  if (!existsSync(file)) continue;
  scan(readFileSync(file, "utf8"), file);
}
if (process.argv.includes("--history")) {
  scan(git("log", "--all", "-p", "--format=commit %h", "--", ".", ":(exclude)pnpm-lock.yaml"), "git-history");
}
console.log(`Secret-pattern scan: ${findings} finding(s). This is not an exhaustive credential detector.`);
process.exitCode = findings ? 1 : 0;
