import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JQHRPJ9YLF"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-JQHRPJ9YLF', {
  cookie_domain: 'none',
  cookie_flags: 'SameSite=Lax;Secure'
});
            `.trim(),
          }}
        ></script>
      </head>
      <body>
        {children}

        <footer
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: 24,
            fontSize: 14,
            opacity: 0.8,
          }}
        >
          <a href="/" style={{ marginRight: 12 }}>
            Home
          </a>
          <a href="/about" style={{ marginRight: 12 }}>
            About
          </a>
          <a href="/contact" style={{ marginRight: 12 }}>
            Contact
          </a>
          <a href="/privacy" style={{ marginRight: 12 }}>
            Privacy
          </a>
          <a href="/terms">Terms</a>
        </footer>
      </body>
    </html>
  );
}
