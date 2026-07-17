import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How FlipMyCase handles browser-local tool input, hosting logs, local storage, and optional services.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]} />
      <div className="mx-auto max-w-3xl px-4 py-10 text-sm leading-7 text-neutral-300">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mt-2 text-neutral-400">Effective January 1, 2026 | Last reviewed July 12, 2026</p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">The short version</h2>
          <p className="mt-3">
            Text and files you enter into FlipMyCase tools are processed in your browser. FlipMyCase
            does not intentionally transmit that tool input to its servers. Google AdSense, Google
            Analytics, and Microsoft Clarity are currently disabled.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">Tool input and local storage</h2>
          <p className="mt-3">
            Some tools use browser localStorage to preserve recent input, options, or theme
            preference on your device. Stored data remains until you clear it, use a tool&apos;s reset
            control, or the browser removes it. The case converter and privacy-sensitive JSON, JWT,
            QR, text-diff, text-cleaning, plain-text, URL extraction, find-and-replace, HTML removal,
            text-to-list, and string-encoding tools keep entered content in page memory instead.
            Current releases also remove the retired storage keys those tools used previously.
          </p>
          <p className="mt-3">
            Browser extensions, device software, and the browser itself operate outside our control.
            Browser-local processing should not be treated as a guarantee that a compromised device
            is secure. Do not paste passwords, private keys, or active access tokens into the site.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">Advertising and analytics status</h2>
          <p className="mt-3">
            FlipMyCase has not been approved to display Google AdSense ads. AdSense, Google Analytics,
            and Microsoft Clarity scripts are not loaded. Empty advertising placeholders are also
            suppressed. These services must not be enabled until the public notice and consent setup
            are reviewed and, for AdSense, the site is approved.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">Hosting and technical logs</h2>
          <p className="mt-3">
            Vercel hosts the website and may process ordinary request information such as IP address,
            user agent, requested URL, timestamps, and security events. Retention depends on provider
            settings, security needs, backups, and legal obligations. We do not promise immediate or
            zero retention of infrastructure logs.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">Offline cache and external links</h2>
          <p className="mt-3">
            A service worker may cache site files on your device so pages load faster or continue to
            work offline. Clear site data in your browser to remove the cache. External links open
            services with their own privacy practices; the destination can receive ordinary request
            and referral information after you choose to visit it.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">Your choices and rights</h2>
          <p className="mt-3">
            You can clear localStorage, cookies, and cached files through your browser settings.
            Depending on where you live, you may also have rights regarding personal information we
            control. Browser-local tool input is not available for us to retrieve or delete remotely.
            We do not sell personal information.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-white">Contact and policy changes</h2>
          <p className="mt-3">
            Use the <Link href="/contact" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">Contact page</Link>{" "}
            for privacy questions. We will update this notice if the site&apos;s data practices or
            third-party services change. See the <Link href="/cookies" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">Cookie Policy</Link>{" "}
            for browser-storage details.
          </p>
        </section>
      </div>
    </>
  );
}
