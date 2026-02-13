export default function Head() {
  return (
    <>
      <title>Text Case Converter</title>
      <meta
        name="description"
        content="Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, and slug."
      />

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
          `.trim(),
        }}
      />
    </>
  );
}
