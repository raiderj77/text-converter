export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://text-case-converter-beta.vercel.app/sitemap.xml",
  };
}
