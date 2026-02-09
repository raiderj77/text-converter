import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Text Case Converter",
  description:
    "Convert text into uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more. Fast tool with clean UI.",
  alternates: {
    canonical: "https://text-case-converter-beta.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7171402107622932"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}

        <footer
          style={{
            padding: 24,
            maxWidth: 960,
            margin: "0 auto",
            opacity: 0.8,
            fontSize: 14,
          }}
        >
          <a href="/about">About</a> {" | "}
          <a href="/privacy">Privacy</a> {" | "}
          <a href="/terms">Terms</a>
        </footer>
      </body>
    </html>
  );
}
