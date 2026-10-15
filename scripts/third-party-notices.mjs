import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const lock = await readFile(join(root, "pnpm-lock.yaml"), "utf8");
if (!/^lockfileVersion: ['"]?9\./m.test(lock)) throw new Error("Review the notices parser before changing lockfile formats.");
const packageBlock = lock.split(/^packages:\r?$/m)[1]?.split(/^snapshots:\r?$/m)[0];
if (!packageBlock) throw new Error("Cannot find locked packages.");
// This deliberately parses only pnpm v9's top-level package keys, not general
// YAML. Package metadata and licenses are read from the actual installed files.
const keys = [...packageBlock.matchAll(/^  (?:'([^']+)'|([^ '\r\n][^\r\n]*)):\r?$/gm)]
  .map((match) => match[1] ?? match[2]).sort();
if (!keys.length) throw new Error("No locked package versions found.");
const installed = new Map();
const store = join(root, "node_modules", ".pnpm");
for (const entry of await readdir(store, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const at = entry.name.indexOf("@", entry.name.startsWith("@") ? 1 : 0);
  if (at < 1) continue;
  const name = entry.name.slice(0, at).replace("+", "/");
  const directory = join(store, entry.name, "node_modules", ...name.split("/"));
  try {
    const metadata = JSON.parse(await readFile(join(directory, "package.json"), "utf8"));
    installed.set(`${metadata.name}@${metadata.version}`, { metadata, directory });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const noticeName = /^(?:licen[cs]e|copying|notice)(?:[.-].*)?$/i;
async function noticesAt(directory, prefix = "", depth = 0) {
  const found = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = join(prefix, entry.name);
    if (entry.isFile() && noticeName.test(entry.name)) {
      const text = await readFile(join(directory, path), "utf8");
      found.push({ path: path.replaceAll("\\", "/"), text: text.trim() });
    } else if (entry.isDirectory() && depth < 7 && entry.name !== "node_modules") {
      // Include vendored/compiled notices too, not just a package's root license.
      found.push(...await noticesAt(directory, path, depth + 1));
    }
  }
  return found;
}

const rows = [];
const collected = [];
let registryOnly = 0;
for (const key of keys) {
  const local = installed.get(key);
  let metadata = local?.metadata;
  if (!metadata && process.argv.includes("--registry")) {
    // Registry reads retrieve metadata only, without installing/executing code.
    const at = key.lastIndexOf("@");
    const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(key.slice(0, at))}/${encodeURIComponent(key.slice(at + 1))}`, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`Registry metadata unavailable for ${key}: ${response.status}`);
    metadata = await response.json();
    registryOnly++;
  }
  if (!metadata) throw new Error(`Missing ${key}; rerun with --registry or generate on the release platform.`);
  const license = typeof metadata.license === "string" ? metadata.license : metadata.license?.type;
  if (!license) throw new Error(`License declaration requires manual review: ${key}`);
  const notices = local ? await noticesAt(local.directory) : [];
  rows.push({ package: key, license, evidence: local ? (notices.length ? `${notices.length} notice/license file(s)` : "Metadata only; verify upstream text") : "Registry metadata only; verify target-platform files" });
  for (const notice of notices) collected.push({ package: key, ...notice });
}

const heading = "Third-party component notices\n\nGenerated from pnpm-lock.yaml and installed package files.\n" +
  "The application's MIT license does not relicense these components. Preserve each applicable upstream license and NOTICE.\n" +
  "This inventory is not legal clearance: metadata-only entries, binary subcomponents, source/relinking obligations, and the actual release artifact require review.\n" +
  "Regenerate on the release platform after dependency changes. Do not modify embedded license or branding notices.\n\n";
const table = rows.map((row) => `${row.package} | ${row.license} | ${row.evidence}`).join("\n");
const texts = collected.map((item) => `\n\n${"=".repeat(72)}\n${item.package} / ${item.path}\n${"=".repeat(72)}\n${item.text}`).join("");
await mkdir(join(root, "public"), { recursive: true });
await writeFile(join(root, "public", "third-party-licenses.txt"), heading + table + texts + "\n");
const markdown = "# Third-party notices\n\n" +
  "The project's original code is MIT-licensed; dependencies and vendored material retain their own licenses. " +
  "[Full collected texts and inventory](public/third-party-licenses.txt) are also served at `/third-party-licenses.txt`.\n\n" +
  "Run `pnpm licenses:generate -- --registry` after a frozen dependency install. The optional registry flag retrieves missing platform-package metadata, not executable code. " +
  "Run on the intended deployment platform and inspect the final artifact: metadata-only entries are not proof that notice/source obligations are satisfied.\n\n" +
  "## Distribution review\n\n" +
  "- Sharp/libvips platform binaries include LGPL-3.0-or-later components. Check applicable licenses, corresponding source, and relinking requirements before distributing binaries/containers. Hosting alone does not automatically license the app under LGPL.\n" +
  "- Lightning CSS and axe-core use MPL-2.0; elkjs uses EPL-2.0. Inspect covered files/source requirements when distributing them.\n" +
  "- caniuse-lite uses CC-BY-4.0. Preserve attribution/license information for distributed data.\n" +
  "- Prisma Studio's upstream NOTICE includes Prisma branding terms. It is currently a development-tool transitive, not an embedded app feature; preserve applicable notices if shipping it.\n" +
  "- Generated Prisma types include an upstream Stack Overflow reference. Do not strip attribution or assume generated code is free of third-party rights.\n" +
  "- Font families in CSS refer to local system fonts; no commercial font binaries are bundled. The checklist SVG/favicon are project-original. The committed screenshots use synthetic records.\n" +
  "- Node/PostgreSQL/container base images carry additional component licenses not fully represented by the npm lockfile. Review them if distributing a runtime/container.\n\n" +
  `## Locked packages\n\n${rows.length} package/version entries; ${registryOnly} use registry-only metadata on this platform. Full text coverage is listed per entry.\n\n` +
  "| Package/version | Declared license | Local evidence |\n| --- | --- | --- |\n" +
  rows.map((row) => `| ${row.package} | ${row.license.replaceAll("|", "\\|")} | ${row.evidence} |`).join("\n") + "\n";
await writeFile(join(root, "THIRD_PARTY_NOTICES.md"), markdown);
console.log(`Generated ${rows.length} locked entries and ${collected.length} license/notice texts (${registryOnly} metadata-only platform entries).`);
console.log(`Public artifact: ${relative(root, join(root, "public", "third-party-licenses.txt"))}`);
