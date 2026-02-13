export default function Head() {
  return (
    <>
      <title>Text Case Converter</title>
      <meta
        name="description"
        content="Convert text to uppercase, lowercase, title case, camelCase, snake_case, and more instantly."
      />

      {/* Google tag (gtag.js) */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-JQHRPJ9YLF"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JQHRPJ9YLF');
          `,
        }}
      />
    </>
  );
}
