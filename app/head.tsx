export default function Head() {
  return (
    <>
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
