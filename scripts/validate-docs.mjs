import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
let config;

try {
  config = JSON.parse(fs.readFileSync(path.join(root, "docs.json"), "utf8"));
} catch (error) {
  console.error("[FAIL] docs.json is invalid JSON");
  console.error(error.message);
  process.exit(1);
}

const pages = [];
const versions = [];

function walk(node) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach(walk);
    return;
  }

  if (node.version && Array.isArray(node.groups)) {
    versions.push(node);
  }

  if (Array.isArray(node.pages)) {
    for (const page of node.pages) {
      if (typeof page === "string") pages.push(page);
      else walk(page);
    }
  }

  for (const key of ["tabs", "versions", "groups", "anchors", "dropdowns", "languages"]) {
    if (Array.isArray(node[key])) walk(node[key]);
  }
}

function expectedOfficialUrl(page) {
  const match = page.match(/^(v[123])\/(.+)$/);
  if (!match) return "https://inertiajs.com/docs/v3/getting-started";

  const [, version, rawSlug] = match;
  const slug = rawSlug === "getting-started/index" ? "getting-started" : rawSlug;
  return `https://inertiajs.com/docs/${version}/${slug}`;
}

function validatePage(page, content, rel) {
  if (!content.startsWith("---")) errors.push(`Missing frontmatter: ${rel}`);
  if (!/^title:\s*.+/m.test(content)) errors.push(`Missing title: ${rel}`);
  if (/^description:\s*/m.test(content)) errors.push(`Description is not allowed in article frontmatter: ${rel}`);

  const fences = content.match(/^```/gm)?.length ?? 0;
  if (fences % 2 !== 0) errors.push(`Unbalanced code fences: ${rel}`);

  if (!/^## Tài liệu chính thức$/m.test(content)) {
    errors.push(`Missing official documentation footer: ${rel}`);
  }

  const officialUrl = expectedOfficialUrl(page);
  if (!content.includes(officialUrl)) {
    errors.push(`Missing expected official source link in ${rel}: ${officialUrl}`);
  }

  const tail = content.slice(-1200);
  if (!tail.includes("## Tài liệu chính thức")) {
    errors.push(`Official documentation link must be near the end of article: ${rel}`);
  }
}

walk(config.navigation);

for (const page of pages) {
  const file = path.join(root, `${page}.mdx`);
  if (!fs.existsSync(file)) {
    errors.push(`Missing page: ${page}.mdx`);
    continue;
  }

  const content = fs.readFileSync(file, "utf8");
  validatePage(page, content, `${page}.mdx`);
}

const sampleFiles = [];

function collectMdx(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectMdx(full);
    else if (entry.isFile() && entry.name.endsWith(".mdx")) sampleFiles.push(full);
  }
}

collectMdx(path.join(root, "samples"));

for (const file of sampleFiles) {
  const content = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);

  for (const match of content.matchAll(/\]\((\/samples\/[^)#]+)(?:#[^)]+)?\)/g)) {
    const target = path.join(root, `${match[1].slice(1)}.mdx`);
    if (!fs.existsSync(target)) errors.push(`Broken sample link in ${rel}: ${match[1]}`);
  }
}

if (sampleFiles.length < 19) {
  errors.push(`Expected at least 19 sample pages, found ${sampleFiles.length}`);
}

// Editorial guard: avoid ambiguous cost metaphors in Vietnamese learning content.
for (const file of sampleFiles) {
  const content = fs.readFileSync(file, "utf8");
  if (/\bđắt(?:\s+tiền)?\b/iu.test(content)) {
    errors.push(`Ambiguous performance wording (đắt): ${path.relative(root, file)}`);
  }
}

const duplicates = pages.filter((page, i) => pages.indexOf(page) !== i);
for (const duplicate of [...new Set(duplicates)]) errors.push(`Duplicate navigation page: ${duplicate}`);

const expected = new Map([["3.x", 50], ["2.x", 44], ["1.x", 31]]);
for (const version of versions) {
  const count = (version.groups ?? []).reduce((sum, group) => sum + (group.pages?.length ?? 0), 0);
  const expectedCount = expected.get(version.version);
  if (expectedCount && count !== expectedCount) {
    errors.push(`${version.version}: expected ${expectedCount} pages, found ${count}`);
  }
}

if (errors.length) {
  console.error(`\n[FAIL] Documentation validation found ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("[PASS] docs.json is valid JSON");
console.log(`[PASS] ${pages.length} navigation pages exist with title-only frontmatter and official-source footers`);
console.log(`[PASS] ${versions.length} version trees keep their expected page counts`);
console.log("[PASS] code fences are balanced");
console.log(`[PASS] ${sampleFiles.length} sample pages pass link/editorial checks`);
