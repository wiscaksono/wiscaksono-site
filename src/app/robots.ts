export default function robots() {
  const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;
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
