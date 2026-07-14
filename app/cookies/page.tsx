import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/schema";

export const metadata = {
  title: "Cookie and Browser Storage Policy",
  description: "How FlipMyCase uses local storage, offline cache, and cookies.",
};

export default function CookiesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Cookie Policy", href: "/cookies" }]} />
      <main className="mx-auto max-w-3xl px-4 py-10 text-sm leading-7 text-neutral-300">
        <h1 className="text-3xl font-bold text-white">Cookie and Browser Storage Policy</h1>
        <p className="mt-2 text-neutral-400">Last reviewed July 12, 2026</p>

        <h2 className="mt-8 text-xl font-semibold text-white">Current cookie status</h2>
        <p className="mt-3">
          FlipMyCase does not currently load Google AdSense, Google Analytics, Microsoft Clarity,
          or a third-party consent platform. The current site does not intentionally set optional
          analytics or advertising cookies.
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

        <h2 className="mt-8 text-xl font-semibold text-white">Future changes</h2>
        <p className="mt-3">
          If optional analytics or advertising is enabled later, this policy and the privacy notice
          will be updated and an appropriate consent control will be implemented before those
          services load.
        </p>

        <p className="mt-8">
          Questions? Use the <Link href="/contact" className="text-blue-400 hover:text-blue-300">Contact page</Link>.
        </p>
      </main>
    </>
  );
}
