import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { JwtDecoderTool } from "@/components/tools/jwt-decoder";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("jwt-decoder")!;
const pageUrl = buildUrl("/jwt-decoder");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "jwt decoder", "jwt decode", "jwt token decoder", "decode jwt",
    "jwt parser", "jwt viewer", "jwt debugger", "jwt online decoder",
    "json web token decoder", "jwt payload decoder", "jwt header decoder",
    "jwt expiration checker", "jwt token viewer",
  ],
  openGraph: {
    title: tool.title,
    description: tool.description,
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is a JWT (JSON Web Token)?",
    answer:
      "A JWT is a compact, URL-safe token format used for securely transmitting information between parties as a JSON object. It consists of three Base64URL-encoded parts separated by dots: a header (algorithm and type), a payload (claims/data), and a signature. JWTs are commonly used for authentication, authorization, and information exchange in web applications.",
  },
  {
    question: "Is it safe to decode JWTs in the browser?",
    answer:
      "Yes. The header and payload of a JWT are only Base64URL-encoded, not encrypted. Anyone with the token can decode and read them. The signature is what prevents tampering, not secrecy. This tool decodes the token locally in your browser — nothing is sent to any server. However, you should never paste tokens containing sensitive data into untrusted online tools.",
  },
  {
    question: "What is the difference between decoding and verifying a JWT?",
    answer:
      "Decoding a JWT means reading the header and payload by Base64URL-decoding them. Anyone can do this. Verifying a JWT means checking that the signature is valid using the secret key (HMAC) or public key (RSA/ECDSA). Verification confirms the token hasn't been tampered with and was issued by a trusted party. This tool only decodes — it does not verify signatures.",
  },
  {
    question: "What do iat, exp, and nbf mean in a JWT?",
    answer:
      "These are standard JWT claims. 'iat' (Issued At) is the Unix timestamp when the token was created. 'exp' (Expiration Time) is when the token expires and should no longer be accepted. 'nbf' (Not Before) is the earliest time the token should be accepted. All three are Unix timestamps (seconds since January 1, 1970 UTC).",
  },
  {
    question: "What JWT algorithms are most common?",
    answer:
      "HS256 (HMAC with SHA-256) is the most common — it uses a shared secret key. RS256 (RSA with SHA-256) uses a public/private key pair and is preferred for distributed systems where you don't want to share the secret. ES256 (ECDSA with P-256) offers similar security to RS256 with smaller key sizes. PS256 (RSASSA-PSS) is a newer RSA variant with improved security properties.",
  },
  {
    question: "Why does my JWT have three parts separated by dots?",
    answer:
      "The three parts are: (1) Header — contains the algorithm (alg) and token type (typ), Base64URL-encoded. (2) Payload — contains the claims (data), Base64URL-encoded. (3) Signature — created by signing the encoded header and payload with a secret or private key. The dots separate these three Base64URL-encoded strings.",
  },
  {
    question: "Can an expired JWT be used?",
    answer:
      "An expired JWT should not be accepted by a properly implemented server. The 'exp' claim tells the server when to stop accepting the token. However, this is enforced by the server, not by the token itself. Some systems use refresh tokens to obtain new JWTs when the original expires, avoiding the need for the user to re-authenticate.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All JWT decoding happens in your browser using JavaScript. Your token never leaves your device. The tool uses the built-in atob() function to decode Base64URL data locally.",
  },
];

export default function JwtDecoderPage() {
  return (
    <>
      <WebAppSchema
        name="Free JWT Decoder"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "JWT Decoder", href: "/jwt-decoder" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">JWT Decoder</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free JWT Decoder
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A JWT decoder parses JSON Web Tokens to reveal the header and payload data, including expiration status. Paste your JWT below to decode and inspect its contents instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the JWT Decoder Tool</h2>

          <h2>JWT Decoder Features and Options</h2>

          <h2>About the Free Online JWT Decoder</h2>

        </div>


        <div className="mt-4">
          <JwtDecoderTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="jwt-decoder" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Decode JWT Tokens Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your JWT.</strong> Copy
              the full JWT string (three dot-separated parts) from your
              application, API response, browser dev tools, or authentication
              header and paste it into the input field.
            </p>
            <p>
              <strong className="text-neutral-200">2. View the decoded data.</strong> The
              header and payload appear as formatted JSON instantly. The Token
              Summary section shows the algorithm, type, issued time, and
              expiration status at a glance.
            </p>
            <p>
              <strong className="text-neutral-200">3. Check expiration.</strong> The
              expiration badge is color-coded: green means the token is still
              valid, yellow means it expires within one hour, and red means the
              token has already expired.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the results.</strong> Use
              the Copy Header, Copy Payload, or Copy Full Decoded buttons to
              copy formatted JSON to your clipboard for use in documentation or
              debugging.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding JSON Web Tokens in Web Development
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              JSON Web Tokens have become the dominant standard for
              authentication and authorization in modern web applications.
              Unlike traditional session-based authentication where the server
              stores session data, JWTs are stateless: all the information the
              server needs to authenticate a request is contained within the
              token itself. This makes JWTs ideal for distributed systems,
              microservices, and single-page applications.
            </p>
            <p>
              <strong className="text-neutral-200">How JWTs work</strong> is
              straightforward. When a user logs in, the server creates a JWT
              containing claims (user ID, roles, permissions) and signs it with
              a secret key. The client stores this token (usually in memory or
              an HTTP-only cookie) and sends it with every subsequent request.
              The server verifies the signature to ensure the token has not been
              tampered with, then reads the claims without needing to query a
              database.
            </p>
            <p>
              <strong className="text-neutral-200">Security considerations</strong> are
              critical when working with JWTs. The payload is only
              Base64URL-encoded, not encrypted, so anyone with the token can
              read its contents. Never store sensitive data like passwords or
              credit card numbers in a JWT. Always use HTTPS to prevent token
              interception. Set short expiration times and implement token
              refresh flows. Store tokens securely on the client side, ideally
              in HTTP-only, secure, SameSite cookies rather than localStorage.
            </p>
            <p>
              <strong className="text-neutral-200">Common JWT claims</strong> include
              &apos;sub&apos; (subject, usually the user ID), &apos;iss&apos;
              (issuer, who created the token), &apos;aud&apos; (audience, who
              the token is intended for), &apos;exp&apos; (expiration),
              &apos;iat&apos; (issued at), and &apos;nbf&apos; (not before).
              Applications can also include custom claims like roles,
              permissions, or tenant IDs. Keeping the payload small improves
              performance since the token is sent with every request.
            </p>
            <p>
              Developers encounter JWTs daily when building APIs, debugging
              authentication issues, inspecting OAuth tokens, or integrating
              with identity providers like Auth0, Firebase Auth, or AWS
              Cognito. A quick decoder like this tool lets you inspect token
              contents without writing code, verify expiration times, and
              confirm that claims contain the expected values during
              development and troubleshooting.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="jwt-decoder" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About JWT Decoder
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="jwt-decoder" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Decode JWTs here, then use our other developer tools for encoding,
            hashing, and data formatting.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Base64, URL, HTML, hex & binary encoding</p>
            </Link>
            <Link
              href="/hash-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">#️⃣</div>
              <div className="mt-1 text-sm font-semibold">Hash Generator</div>
              <p className="mt-1 text-xs text-neutral-400">MD5, SHA-256, SHA-512 hash generation</p>
            </Link>
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON data</p>
            </Link>
            <Link
              href="/unix-timestamp-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🕐</div>
              <div className="mt-1 text-sm font-semibold">Unix Timestamp</div>
              <p className="mt-1 text-xs text-neutral-400">Convert epoch time to human dates</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
