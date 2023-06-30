import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about/personal",
    "/about/work",
    "/about/gear",
    "/projects/all-projects",
    "/projects/react",
    "/projects/next",
    "/projects/html",
    "/contacts",
  ].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
