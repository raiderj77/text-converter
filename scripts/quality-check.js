import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
let failures = 0;

function read(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function check(condition, message) {
  if (condition) {
    console.log(`PASS ${message}`);
  } else {
    console.error(`FAIL ${message}`);
    failures += 1;
  }
}

const layout = read("app/layout.tsx");
const sitemap = read("app/sitemap.ts");
const config = read("next.config.ts");
const vercelConfig = read("vercel.json");
const adSlot = read("components/ui/ad-slot.tsx");
const privacy = read("app/privacy/page.tsx");
const blogLoader = read("lib/blog-markdown.ts");
const schema = read("components/seo/schema.tsx");
const packageJson = read("package.json");
const homepage = read("app/page.tsx");
const about = read("app/about/page.tsx");
const cookies = read("app/cookies/page.tsx");
const contact = read("app/contact/page.tsx");
const terms = read("app/terms/page.tsx");
const accessibility = read("app/accessibility/page.tsx");
const aiAnalyzerPage = read("app/ai-writing-analyzer/page.tsx");
const aiAnalyzerTool = read("components/tools/ai-writing-analyzer.tsx");
const qrPage = read("app/qr-code-generator/page.tsx");
const qrTool = read("components/tools/qr-code-generator.tsx");
const storageCleanup = read("components/privacy-storage-cleanup.tsx");
const toolSources = readdirSync(resolve(root, "components/tools"))
  .filter((name) => name.endsWith(".tsx"))
  .map((name) => read(`components/tools/${name}`))
  .join("\n");
const privacySensitiveTools = [
  "case-converter",
  "json-formatter",
  "jwt-decoder",
  "text-diff",
  "text-cleaner",
  "plain-text-converter",
  "extract-urls",
  "find-and-replace",
  "remove-html-tags",
  "text-to-list",
  "string-encoder",
].map((name) => read(`components/tools/${name}.tsx`)).join("\n");
const publicDiscovery = [
  read("components/layout/nav.tsx"),
  read("components/layout/footer.tsx"),
  read("app/page.tsx"),
  read("app/learn/page.tsx"),
  read("public/llms.txt"),
].join("\n");

check(!/(adsbygoogle|googletagmanager|clarity\.ms)/i.test(layout), "third-party monetization and analytics scripts are disabled");
check(!/(googlesyndication|googletagmanager|google-analytics|clarity\.ms)/i.test(`${config}\n${vercelConfig}`), "deployment security policies do not allow disabled third parties");
check(config.includes("frame-src 'none'") && vercelConfig.includes("frame-src 'none'"), "all deployment layers block third-party frames");
check(!config.includes("'unsafe-eval'") && !vercelConfig.includes("'unsafe-eval'"), "production CSP does not permit string evaluation");
check(!adSlot.includes("NEXT_PUBLIC_"), "deployment variables cannot accidentally enable advertising");
check(adSlot.includes("return null"), "disabled ads reserve no blank space");
check(config.includes('source: "/blog/:path*"') && config.includes('destination: "/tools"'), "retired blog routes redirect to the product");
check(!sitemap.includes('url: `${BASE_URL}/blog'), "retired blog content is absent from the sitemap");
check(!publicDiscovery.includes('href="/blog') && !publicDiscovery.includes("/blog/"), "public discovery surfaces do not promote retired articles");
check(blogLoader.includes("return []") && blogLoader.includes("return null"), "retired article loader cannot publish content");
check(!schema.includes("SearchAction"), "structured data does not claim a nonexistent search action");
check(!layout.includes("new Date()") && !sitemap.includes("new Date()") && !sitemap.includes("toISOString"), "site metadata does not manufacture deployment freshness");
check(privacy.includes("has not been approved to display Google AdSense ads"), "privacy notice accurately describes AdSense status");
check(/Google AdSense, Google\s+Analytics, and Microsoft Clarity are currently disabled/.test(privacy), "privacy notice accurately describes analytics status");
check(!privacySensitiveTools.includes("localStorage"), "privacy-sensitive tools do not persist entered content");
check(storageCleanup.includes('"fmc_jwt_input"') && storageCleanup.includes('"fmc_qr_code"'), "legacy token and QR storage keys are removed");
check(!/safely paste passwords|safely paste[^\n]+API keys/i.test(homepage), "homepage does not encourage pasting credentials");
check(privacy.includes("Do not paste passwords, private keys, or active access tokens"), "privacy notice gives appropriate credential warning");
check(!about.includes("there is no server to send your text to"), "about page does not make an inaccurate no-server claim");
check(cookies.includes("do not persist entered content"), "browser storage notice describes memory-only tools");
check(privacy.includes("`${SITE_URL}/privacy`"), "/privacy declares route-specific canonical metadata");
check(cookies.includes("`${SITE_URL}/cookies`"), "/cookies declares route-specific canonical metadata");
check(contact.includes("`${SITE_URL}/contact`"), "/contact declares route-specific canonical metadata");
check(terms.includes("`${SITE_URL}/terms`"), "/terms declares route-specific canonical metadata");
check(accessibility.includes("`${SITE_URL}/accessibility`"), "/accessibility declares route-specific canonical metadata");
check(aiAnalyzerTool.includes("This is an unvalidated heuristic, not an AI detector"), "AI analyzer clearly discloses its validation limit");
check(!/Human-typical|AI-typical|confidence score indicating likelihood/i.test(`${aiAnalyzerPage}\n${aiAnalyzerTool}`), "public AI analyzer does not label heuristic output as authorship evidence");
check(!/respond within|solution within/i.test(`${contact}\n${accessibility}`), "trust pages do not promise unverified response times");
check(!toolSources.includes('isDark ? "text-neutral-500" : "text-neutral-400"'), "tool themes do not use the inaccessible muted-text mapping");
check(![about, cookies, contact, terms, accessibility, privacy].some((page) => /<main[ >]/.test(page)), "trust pages do not nest main landmarks inside the site layout");
check(packageJson.includes('"qrcode"') && qrTool.includes('from "qrcode"'), "QR generation uses the bundled dependency");
check(!/cdnjs|createElement\("script"\)|localStorage/.test(qrTool), "QR generation avoids external scripts and persistent input storage");
check(qrPage.includes("code bundled with FlipMyCase"), "QR privacy explanation matches the implementation");
check(!existsSync(resolve(root, "public/llms-full.txt")), "retired article catalog is not exposed to AI crawlers");
check(!existsSync(resolve(root, "app/api/indexnow/route.ts")), "unauthenticated IndexNow proxy is not exposed");

if (failures > 0) {
  console.error(`\n${failures} quality check(s) failed.`);
  process.exit(1);
}

console.log("\nAll product quality checks passed.");
