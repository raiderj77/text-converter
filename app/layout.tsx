import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
