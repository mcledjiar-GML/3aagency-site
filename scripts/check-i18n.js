const fs = require("fs");
const path = require("path");

const LOCALES = ["en", "fr", "de"];
const baseDir = path.join(process.cwd(), "src", "messages");

function flatten(obj, prefix = "", out = []) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    else out.push(key);
  }
  return out;
}

function readJson(locale) {
  const p = path.join(baseDir, `${locale}.json`);
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const dicts = Object.fromEntries(LOCALES.map(l => [l, readJson(l)]));
const keysByLocale = Object.fromEntries(
  LOCALES.map(l => [l, new Set(flatten(dicts[l]))])
);

const allKeys = new Set();
for (const l of LOCALES) for (const k of keysByLocale[l]) allKeys.add(k);

let ok = true;
for (const l of LOCALES) {
  const missing = [...allKeys].filter(k => !keysByLocale[l].has(k)).sort();
  if (missing.length) {
    ok = false;
    console.log(`\n❌ Missing keys in ${l}.json (${missing.length})`);
    for (const k of missing) console.log(" -", k);
  } else {
    console.log(`✅ ${l}.json has all keys`);
  }
}

process.exit(ok ? 0 : 1);
