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
const analytics = read("components/analytics-consent.tsx");
const nav = read("components/layout/nav.tsx");
const footer = read("components/layout/footer.tsx");
const themeProvider = read("components/layout/theme-provider.tsx");
const globalStyles = read("app/globals.css");
const sitemap = read("app/sitemap.ts");
const config = read("next.config.ts");
const vercelConfig = read("vercel.json");
const adSlot = read("components/ui/ad-slot.tsx");
const adsTxt = read("public/ads.txt");
const serviceWorker = read("public/sw.js");
const llms = read("public/llms.txt");
const buildStandards = read("EMPIRE_BUILD_STANDARDS.md");
const privacy = read("app/privacy/page.tsx");
const privacyCenter = read("app/privacy-and-testing/page.tsx");
const privacyTestRunner = read("components/privacy-test-runner.tsx");
const toolInventory = read("lib/tool-inventory.ts");
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
const randomNumberPage = read("app/random-number-generator/page.tsx");
const randomNumberTool = read("components/tools/random-number-generator.tsx");
const secureRandom = read("lib/secure-random.ts");
const randomNumberGuide = read("content/blog/random-number-generator-guide.md");
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

check(!/(adsbygoogle|googletagmanager|clarity\.ms)/i.test(layout), "root layout does not load third parties before consent");
check(analytics.includes('consent !== "granted"') && analytics.includes("send_page_view: false"), "analytics requires opt-in and disables automatic page views");
check(analytics.includes("window.location.pathname") && !analytics.includes("window.location.search"), "analytics strips URL query strings");
check(!/FormData|FileReader|sessionStorage/.test(analytics), "analytics cannot read tool input or generated output");
check(!analytics.includes("receives only") && privacy.includes("standard technical and analytics data"), "analytics disclosures do not omit ordinary technical data");
check(/googletagmanager\.com/.test(`${config}\n${vercelConfig}`) && /google-analytics\.com/.test(`${config}\n${vercelConfig}`), "deployment security policies allow the approved analytics hosts");
check(config.includes("frame-src 'none'") && vercelConfig.includes("frame-src 'none'"), "all deployment layers block third-party frames");
check(!config.includes("'unsafe-eval'") && !vercelConfig.includes("'unsafe-eval'"), "production CSP does not permit string evaluation");
check(!adSlot.includes("NEXT_PUBLIC_"), "deployment variables cannot accidentally enable advertising");
check(adSlot.includes("return null"), "disabled ads reserve no blank space");
check(/^google\.com, pub-7171402107622932, DIRECT, f08c47fec0942fa0$/m.test(adsTxt), "ads.txt authorizes the correct AdSense seller");
check(/^OWNERDOMAIN=flipmycase\.com$/m.test(adsTxt) && !/^MANAGERDOMAIN=/m.test(adsTxt), "ads.txt identifies the owner without inventing a monetization manager");
check(!/Include `OWNERDOMAIN` and `MANAGERDOMAIN`/.test(buildStandards), "portfolio standards do not require a false MANAGERDOMAIN");
check(buildStandards.includes("TCF v2.3") && !buildStandards.includes("TCF v2.2"), "portfolio standards require the current AdSense TCF version");
check(!/https?:\/\//i.test(footer), "sitewide footer does not run a reciprocal external-link scheme");
check(config.includes('source: "/blog/:path*"') && config.includes('destination: "/tools"'), "retired blog routes redirect to the product");
check(!sitemap.includes('url: `${BASE_URL}/blog'), "retired blog content is absent from the sitemap");
check(!publicDiscovery.includes('href="/blog') && !publicDiscovery.includes("/blog/"), "public discovery surfaces do not promote retired articles");
check(blogLoader.includes("return []") && blogLoader.includes("return null"), "retired article loader cannot publish content");
check(!schema.includes("SearchAction"), "structured data does not claim a nonexistent search action");
check(!schema.includes('"@type": "Person"') && schema.includes("`${SITE_URL}#organization`"), "shared schema uses the real site organization instead of a fictional Person name");
check(!layout.includes("new Date()") && !sitemap.includes("new Date()") && !sitemap.includes("toISOString"), "site metadata does not manufacture deployment freshness");
check(privacy.includes("has not been approved to display Google AdSense ads"), "privacy notice accurately describes AdSense status");
check(privacy.includes("blocked until you explicitly allow it") && privacy.includes("after removing the URL query string"), "privacy notice accurately describes opt-in analytics");
check(terms.includes("Google Analytics loads only") && llms.includes("Optional Google Analytics loads only"), "trust and discovery copy accurately describes opt-in analytics");
check(!privacySensitiveTools.includes("localStorage"), "privacy-sensitive tools do not persist entered content");
check(storageCleanup.includes('"fmc_jwt_input"') && storageCleanup.includes('"fmc_qr_code"'), "legacy token and QR storage keys are removed");
check(!/safely paste passwords|safely paste[^\n]+API keys/i.test(homepage), "homepage does not encourage pasting credentials");
check(privacy.includes("Do not paste passwords, private keys, or active access tokens"), "privacy notice gives appropriate credential warning");
check(!about.includes("there is no server to send your text to"), "about page does not make an inaccurate no-server claim");
check(cookies.includes("do not persist entered content"), "browser storage notice describes memory-only tools");
check(privacy.includes("`${SITE_URL}/privacy`"), "/privacy declares route-specific canonical metadata");
check(privacyCenter.includes("`${SITE_URL}/privacy-and-testing`") && privacyCenter.includes("alternates: { canonical: pageUrl }"), "/privacy-and-testing declares route-specific canonical metadata");
check(footer.includes('href="/privacy-and-testing"') && privacy.includes('href="/privacy-and-testing"') && terms.includes('href="/privacy-and-testing"') && sitemap.includes('"privacy-and-testing"') && llms.includes("https://flipmycase.com/privacy-and-testing"), "privacy and test center is discoverable from trust and machine-readable surfaces");
check(toolInventory.includes("REFERENCE_GUIDE_SLUGS") && toolInventory.includes("LOCAL_STORAGE_TOOL_SLUGS") && privacyCenter.includes("75 interactive tools") && privacyCenter.includes("25 currently reference localStorage") && privacyCenter.includes("other 50 keep tool state in page"), "public tool and storage inventory uses the reviewed classifications");
check(privacyTestRunner.includes('type="button"') && privacyTestRunner.includes('role="status" aria-live="polite"') && privacyTestRunner.includes('<caption className="sr-only">'), "sample test runner is user-triggered and reports through an accessible table");
check(!/FaqSchema|WebAppSchema|SoftwareApplication|FAQPage/.test(privacyCenter) && !/(?:100\s*%|test percentage|all tools (?:are )?verified|zero data|no server|never uploaded)/i.test(privacyCenter), "privacy and test center avoids unsupported schema and assurance claims");
check(packageJson.includes('"prebuild": "npm run lint:predeploy && npm run lint:content && npm run test:quality && npm run test:regressions"'), "prebuild runs regression coverage after static quality gates");
check(cookies.includes("`${SITE_URL}/cookies`"), "/cookies declares route-specific canonical metadata");
check(contact.includes("`${SITE_URL}/contact`"), "/contact declares route-specific canonical metadata");
check(terms.includes("`${SITE_URL}/terms`"), "/terms declares route-specific canonical metadata");
check(accessibility.includes("`${SITE_URL}/accessibility`"), "/accessibility declares route-specific canonical metadata");
check(aiAnalyzerTool.includes("This is an unvalidated heuristic, not an AI detector"), "AI analyzer clearly discloses its validation limit");
check(!/Human-typical|AI-typical|confidence score indicating likelihood/i.test(`${aiAnalyzerPage}\n${aiAnalyzerTool}`), "public AI analyzer does not label heuristic output as authorship evidence");
check(!/respond within|solution within/i.test(`${contact}\n${accessibility}`), "trust pages do not promise unverified response times");
check(!toolSources.includes('isDark ? "text-neutral-500" : "text-neutral-400"'), "tool themes do not use the inaccessible muted-text mapping");
check(![about, cookies, contact, terms, accessibility, privacy].some((page) => /<main[ >]/.test(page)), "trust pages do not nest main landmarks inside the site layout");
check(nav.includes("aria-expanded={toolsOpen}") && nav.includes("aria-expanded={mobileOpen}") && nav.includes('event.key !== "Escape"'), "navigation exposes menu state and supports Escape");
check(analytics.includes("aria-labelledby=\"analytics-choices-title\"") && analytics.includes("min-h-11"), "analytics choices have named dialog content and accessible targets");
check(themeProvider.includes("data-theme={mode}") && globalStyles.includes('[data-theme="light"] .text-neutral-300'), "light theme preserves readable server-rendered content");
check(globalStyles.includes('[data-theme="light"] input::placeholder') && globalStyles.includes("color: #737373"), "light-theme form placeholders retain readable contrast");
check(!themeProvider.includes("preventDefault()") && !themeProvider.includes('key.toLowerCase() === "l"'), "theme control does not override the browser address-bar shortcut");
check(!/Ctrl\/?(?:⌘|Cmd).*L toggles theme/i.test(toolSources), "tool hints do not advertise a removed browser-shortcut override");
check(config.includes("frame-ancestors 'none'") && config.includes("form-action 'self'") && vercelConfig.includes("frame-ancestors 'none'"), "deployment CSP constrains framing and form submissions");
check(serviceWorker.includes("if (url.search)") && serviceWorker.includes("PAGE_CACHE_LIMIT") && serviceWorker.includes("STATIC_CACHE_LIMIT"), "service worker skips query-string pages and bounds local caches");
check(!/crawler-visible|crawler-only|hidden[^\n]{0,40}(?:Google|crawler|search engine)/i.test(`${homepage}\n${toolSources}`), "visible content is not implemented as crawler-only copy");
check(homepage.includes("supports 16 outputs") && homepage.includes("16 deterministic JavaScript transformations"), "homepage describes the actual converter output count");
check(packageJson.includes('"qrcode"') && qrTool.includes('from "qrcode"'), "QR generation uses the bundled dependency");
check(!/cdnjs|createElement\("script"\)|localStorage/.test(qrTool), "QR generation avoids external scripts and persistent input storage");
check(qrPage.includes("code bundled with FlipMyCase"), "QR privacy explanation matches the implementation");
check(!randomNumberTool.includes("Math.random"), "random number tool does not use the non-cryptographic Math.random API");
check(randomNumberTool.includes("secureRandomInt") && randomNumberTool.includes("secureUniqueIntegers"), "random number and dice paths use the reviewed secure helpers");
check(secureRandom.includes("crypto.getRandomValues") && secureRandom.includes("candidate < unbiasedLimit"), "random range mapping uses Web Crypto with rejection sampling");
check(secureRandom.includes("new Map<bigint, bigint>()"), "unique mode uses a bounded-memory sparse shuffle");
check(randomNumberPage.includes("www.w3.org/TR/webcrypto-2/#Crypto-method-getRandomValues") && randomNumberPage.includes("csrc.nist.gov/pubs/sp/800/90/c/final"), "random number claims cite primary technical standards");
check(!/suitable for (?:fair draws|security-sensitive)|true randomness|truly unbiased/i.test(`${randomNumberPage}\n${randomNumberGuide}`), "randomness copy avoids unsupported security and fairness guarantees");
check(!existsSync(resolve(root, "public/llms-full.txt")), "retired article catalog is not exposed to AI crawlers");
check(!existsSync(resolve(root, "app/api/indexnow/route.ts")), "unauthenticated IndexNow proxy is not exposed");

if (failures > 0) {
  console.error(`\n${failures} quality check(s) failed.`);
  process.exit(1);
}

console.log("\nAll product quality checks passed.");
