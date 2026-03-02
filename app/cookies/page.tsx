import Link from "next/link";
import { ManageCookiePreferences } from "@/components/ui/cookie-consent";

export const metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for FlipMyCase explaining how we use cookies, local storage, and your consent options.",
};

export default function CookiesPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24, lineHeight: 1.6 }}>
      <h1>Cookie Policy</h1>

      <p>
        This Cookie Policy explains how FlipMyCase ("we", "our", or "us") uses cookies and similar tracking technologies when you visit our website.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files that are stored on your device when you visit a website. They help the website remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.
      </p>

      <h2>How we use cookies</h2>
      <p>We use cookies for the following purposes:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for the basic functionality of the site, such as remembering your theme preference (light/dark mode) and your last input text.</li>
        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
        <li><strong>Advertising Cookies:</strong> Used to deliver ads relevant to you and your interests, and to measure the effectiveness of advertising campaigns.</li>
      </ul>

      <h2>Types of cookies we use</h2>
      <h3>1. Essential Cookies (Strictly Necessary)</h3>
      <p>These cookies are necessary for the website to function and cannot be switched off.</p>
      <ul>
        <li><strong>theme-preference:</strong> Stores your light/dark mode preference</li>
        <li><strong>last-input:</strong> Stores your last entered text for session persistence</li>
      </ul>

      <h3>2. Analytics Cookies (Performance)</h3>
      <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
      <ul>
        <li><strong>Google Analytics:</strong> _ga, _gid, _gat cookies for anonymous traffic analysis</li>
        <li><strong>Purpose:</strong> Understand how visitors use our site, which pages are most popular, and detect technical issues</li>
      </ul>

      <h3>3. Advertising Cookies (Marketing)</h3>
      <p>These cookies may be set through our site by our advertising partners.</p>
      <ul>
        <li><strong>Google AdSense:</strong> Various cookies for ad personalization and measurement</li>
        <li><strong>Purpose:</strong> Build a profile of your interests and show you relevant ads on other sites</li>
      </ul>

      <h2>Your cookie choices</h2>
      <p>
        You have several options to control cookies:
      </p>
      <ul>
        <li><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect your experience on our site.</li>
        <li><strong>Cookie Consent Banner:</strong> When you first visit our site, you'll see a cookie consent banner where you can choose which types of cookies to accept.</li>
        <li><strong>Opt-Out Tools:</strong> You can opt out of personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">YourAdChoices</a> or <a href="https://youradchoices.com/" target="_blank" rel="noopener noreferrer">NAI Consumer Opt-Out</a>.</li>
      </ul>

      <ManageCookiePreferences />

      <h2>Third-party cookies</h2>
      <p>
        We use third-party services that may set their own cookies:
      </p>
      <ul>
        <li><strong>Google Analytics:</strong> For website analytics</li>
        <li><strong>Google AdSense:</strong> For advertising (if enabled)</li>
      </ul>
      <p>
        These third parties have their own privacy policies and cookie policies. We encourage you to review them.
      </p>

      <h2>Local Storage</h2>
      <p>
        In addition to cookies, we use browser local storage to store your theme preference and last input text. This data stays on your device and is not transmitted to our servers.
      </p>

      <h2>Changes to this Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
      </p>

      <h2>Contact us</h2>
      <p>
        If you have any questions about this Cookie Policy, please contact us through our <Link href="/contact">Contact page</Link>.
      </p>

      <p><strong>Last updated:</strong> 2026-02-20</p>
    </main>
  );
}