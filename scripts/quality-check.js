import { existsSync, readFileSync } from "node:fs";
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
check(!existsSync(resolve(root, "public/llms-full.txt")), "retired article catalog is not exposed to AI crawlers");
check(!existsSync(resolve(root, "app/api/indexnow/route.ts")), "unauthenticated IndexNow proxy is not exposed");

if (failures > 0) {
  console.error(`\n${failures} quality check(s) failed.`);
  process.exit(1);
}

console.log("\nAll product quality checks passed.");
