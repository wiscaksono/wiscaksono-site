export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml`,
    host: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
  };
}
