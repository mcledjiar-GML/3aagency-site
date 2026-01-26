/**
 * Production-grade QA checks (Next.js App Router)
 * - Runs against a running server (QA_BASE_URL) OR auto-starts `npm run start`
 * - Verifies:
 *   - Key routes 200
 *   - robots/sitemap/health/monitoring 200
 *   - SSR HTML: exactly 1 <html ...> and correct lang per locale
 *   - SEO: canonical + hreflang + x-default present (on /en)
 *   - Security: CSP header present and contains nonce- pattern
 *
 * Usage:
 *   node scripts/qa-prod.mjs
 *
 * Optional env:
 *   QA_BASE_URL=http://localhost:3000
 *   QA_PORT=3000
 *   QA_TIMEOUT_MS=8000
 */

import { spawn } from "node:child_process";

const DEFAULT_PORT = Number(process.env.QA_PORT || 3000);
const BASE_URL_ENV = process.env.QA_BASE_URL;
const TIMEOUT_MS = Number(process.env.QA_TIMEOUT_MS || 8000);

const PROD_ORIGIN = "https://www.3aagency.eu";

const ROUTES_200 = [
  "/en",
  "/fr",
  "/de",

  "/en/privacy",
  "/fr/privacy",
  "/de/privacy",

  "/en/cookies",
  "/fr/cookies",
  "/de/cookies",

  "/en/imprint",
  "/fr/mentions-legales",
  "/de/impressum",

  "/en/terms",
  "/fr/cgv",
  "/de/agb",

  "/robots.txt",
  "/sitemap.xml",
  "/api/health",
  "/monitoring",
];

const SSR_LANG = {
  "/en": "en",
  "/fr": "fr",
  "/de": "de",
};

function now() {
  return new Date().toISOString();
}
function logInfo(msg) {
  console.log(`[${now()}] ${msg}`);
}
function logOk(msg) {
  console.log(`✅ ${msg}`);
}
function logFail(msg) {
  console.error(`❌ ${msg}`);
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

async function waitForServer(baseUrl, getSpawnError) {
  const probe = new URL("/api/health", baseUrl).toString();
  const maxAttempts = 60; // ~60s
  for (let i = 1; i <= maxAttempts; i++) {
    const spawnError = getSpawnError?.();
    if (spawnError) throw spawnError;

    try {
      const res = await fetchWithTimeout(probe, { method: "GET" });
      if (res.status === 200) return true;
    } catch {
      // ignore
    }
    await sleep(1000);
  }
  return false;
}

function countOccurrences(haystack, needle) {
  if (!haystack || !needle) return 0;
  let count = 0;
  let idx = 0;
  while (true) {
    const pos = haystack.indexOf(needle, idx);
    if (pos === -1) break;
    count++;
    idx = pos + needle.length;
  }
  return count;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function headerGet(res, name) {
  return res.headers.get(name);
}

async function check200(baseUrl, path) {
  const url = new URL(path, baseUrl).toString();
  const res = await fetchWithTimeout(url, { method: "GET", redirect: "follow" });
  assert(res.status === 200, `${path} attendu 200, obtenu ${res.status}`);
  return res;
}

async function checkSSRHtmlLang(baseUrl, path, expectedLang) {
  const res = await check200(baseUrl, path);

  const ct = headerGet(res, "content-type") || "";
  assert(ct.includes("text/html"), `${path} attendu text/html, obtenu "${ct}"`);

  const html = await res.text();

  const countHtml = countOccurrences(html.toLowerCase(), "<html");
  assert(
    countHtml === 1,
    `${path} SSR doit contenir exactement 1 "<html" ; trouvé ${countHtml}`
  );

  const htmlTagMatch = html.match(/<html\b[^>]*>/i);
  assert(htmlTagMatch, `${path} impossible de trouver la balise <html ...>`);

  const htmlTag = htmlTagMatch[0];
  const langMatch = htmlTag.match(/\blang="([^"]+)"/i);
  assert(langMatch, `${path} <html> doit contenir lang="..."`);

  const langValue = langMatch[1];
  assert(
    langValue === expectedLang,
    `${path} attendu lang="${expectedLang}", obtenu lang="${langValue}"`
  );

  const csp = headerGet(res, "content-security-policy");
  assert(csp, `${path} header "Content-Security-Policy" manquant`);
  assert(/nonce-/i.test(csp), `${path} CSP doit contenir "nonce-"`);

  return { html };
}

function hasCanonical(html) {
  return /<link[^>]+rel=["']canonical["'][^>]*>/i.test(html);
}
function hasHreflang(html) {
  return /<link[^>]+rel=["']alternate["'][^>]+hreflang=["'][^"']+["'][^>]*>/i.test(
    html
  );
}
function hasXDefault(html) {
  return /hreflang=["']x-default["']/i.test(html);
}

async function checkSEO(baseUrl) {
  const url = new URL("/en", baseUrl).toString();
  const res = await fetchWithTimeout(url, { method: "GET", redirect: "follow" });
  assert(res.status === 200, `/en attendu 200, obtenu ${res.status}`);

  const html = await res.text();
  assert(hasCanonical(html), `/en: canonical manquante`);
  assert(hasHreflang(html), `/en: hreflang manquants`);
  assert(hasXDefault(html), `/en: hreflang="x-default" manquant`);

  const canonicalMatch = html.match(
    /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i
  );
  if (canonicalMatch?.[1]) {
    const href = canonicalMatch[1];
    if (href.startsWith(PROD_ORIGIN)) {
      // ok
    } else if (href.startsWith("http://") || href.startsWith("https://")) {
      // ok
    } else {
      logInfo(`ℹ️  /en canonical relatif: "${href}" (ok si voulu)`);
    }
  }
}

async function runAllChecks(baseUrl) {
  const failures = [];

  logInfo(`Vérification des routes 200 (${ROUTES_200.length}) sur ${baseUrl}`);
  for (const path of ROUTES_200) {
    try {
      await check200(baseUrl, path);
      logOk(`${path} → 200`);
    } catch (e) {
      logFail(`${path} → ${e.message}`);
      failures.push({ path, error: e.message });
    }
  }

  logInfo(`Vérification SSR + CSP nonce sur /en /fr /de`);
  for (const [path, expectedLang] of Object.entries(SSR_LANG)) {
    try {
      await checkSSRHtmlLang(baseUrl, path, expectedLang);
      logOk(`${path} → SSR OK (1 <html>, lang="${expectedLang}", CSP nonce ok)`);
    } catch (e) {
      logFail(`${path} → ${e.message}`);
      failures.push({ path, error: e.message });
    }
  }

  logInfo(`Vérification SEO sur /en`);
  try {
    await checkSEO(baseUrl);
    logOk(`/en → SEO OK (canonical + hreflang + x-default)`);
  } catch (e) {
    logFail(`/en → ${e.message}`);
    failures.push({ path: "/en (SEO)", error: e.message });
  }

  if (failures.length > 0) {
    console.error("\n====================");
    console.error(`❌ QA PROD FAILED: ${failures.length} erreur(s)`);
    for (const f of failures) console.error(`- ${f.path}: ${f.error}`);
    console.error("====================\n");
    process.exitCode = 1;
  } else {
    console.log("\n====================");
    console.log("✅ QA PROD PASSED: tout est OK");
    console.log("====================\n");
  }
}

function spawnStart(port) {
  const env = { ...process.env, NODE_ENV: "production" };
  const common = { stdio: "inherit", env, windowsHide: true };

  if (process.platform === "win32") {
    const cmd = `npm run start -- -p ${port}`;
    return spawn("cmd.exe", ["/d", "/s", "/c", cmd], common);
  }

  return spawn("npm", ["run", "start", "--", "-p", String(port)], common);
}

async function startServerIfNeeded(port) {
  if (BASE_URL_ENV) {
    return { baseUrl: BASE_URL_ENV, child: null };
  }

  const baseUrl = `http://localhost:${port}`;
  logInfo(`QA_BASE_URL non défini → lancement de "npm run start -- -p ${port}"`);

  let spawnError = null;
  const child = spawnStart(port);
  child.once("error", (err) => {
    spawnError = err;
  });

  const ok = await waitForServer(baseUrl, () => spawnError);
  if (!ok) {
    if (spawnError) throw spawnError;
    try {
      child.kill();
    } catch {
      // ignore
    }
    throw new Error(`Le serveur Next n'a pas répondu sur ${baseUrl} (probe /api/health)`);
  }

  logInfo(`Serveur OK sur ${baseUrl}`);
  return { baseUrl, child };
}

async function main() {
  let child = null;
  try {
    const { baseUrl, child: started } = await startServerIfNeeded(DEFAULT_PORT);
    child = started;
    await runAllChecks(baseUrl);
  } catch (e) {
    logFail(e?.message || String(e));
    process.exitCode = 1;
  } finally {
    if (child) {
      logInfo("Arrêt du serveur Next…");
      try {
        child.kill();
      } catch {
        // ignore
      }
      await sleep(500);
    }
  }
}

await main();
