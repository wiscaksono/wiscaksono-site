export default function robots() {
  const WEBSITE_URL = "https://wiscaksono.me";
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${WEBSITE_URL}/sitemap.xml`,
    host: `${WEBSITE_URL}`,
  };
}
