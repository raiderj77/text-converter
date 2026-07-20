import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cookie and Browser Storage Policy",
  description: "How FlipMyCase uses local storage, offline cache, and cookies.",
  alternates: { canonical: `${SITE_URL}/cookies` },
};

export default function CookiesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Cookie Policy", href: "/cookies" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 text-sm leading-7 text-neutral-300">
        <h1 className="text-3xl font-bold text-white">Cookie and Browser Storage Policy</h1>
        <p className="mt-2 text-neutral-400">Last reviewed July 19, 2026</p>

        <h2 className="mt-8 text-xl font-semibold text-white">Current cookie status</h2>
        <p className="mt-3">
          FlipMyCase does not currently load Google AdSense or Microsoft Clarity. Google Analytics
          remains blocked until you select &quot;Allow analytics.&quot; If allowed, it may set analytics
          cookies after receiving only a sanitized page title and path. Text, files, generated output,
          tool settings, and URL query strings are not included in these page views.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-white">Local storage</h2>
        <p className="mt-3">
          LocalStorage is browser storage, not a cookie. FlipMyCase tools use it to remember the
          selected theme and, for some tools, the most recent input or settings. Privacy-sensitive
          tools such as the case converter, JSON formatter, JWT decoder, QR generator, and text diff
          do not persist entered content. Current releases remove the legacy storage keys those tools
          used in older versions. Any remaining browser storage stays on the device until you clear it,
          reset the tool, or the browser removes it.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-white">Offline cache</h2>
        <p className="mt-3">
          A service worker may cache site code, styles, and other public files for performance and
          offline use. The cache is stored on your device and does not contain a server copy of your
          tool input.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-white">How to clear site data</h2>
        <p className="mt-3">
          Use your browser&apos;s privacy or site-data settings to remove local storage, cookies, and
          cached files for flipmycase.com. This can erase saved drafts and preferences permanently.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-white">Analytics choices</h2>
        <p className="mt-3">
          Your analytics choice is stored in localStorage so it can be honored on later visits. Use
          the persistent Privacy choices button to change it. With analytics denied, the Google
          Analytics script is not downloaded. You can also clear site data in your browser.
        </p>

        <p className="mt-8">
          Questions? Use the <Link href="/contact" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">Contact page</Link>.
        </p>
      </div>
    </>
  );
}
