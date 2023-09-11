import { MetadataRoute } from "next";
import { allAbouts } from "contentlayer/generated";
import { allProjects } from "contentlayer/generated";

export default function sitemap(): MetadataRoute.Sitemap {
  const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;

  const routes = ["", "/contacts"].map((route) => ({
    url: `${WEBSITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const abouts = allAbouts.map((about) => ({
    url: `${WEBSITE_URL}/about/${about.title}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const projects = allProjects.map((project) => ({
    url: `${WEBSITE_URL}/projects/${project.title.toLowerCase()}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...abouts, ...projects];
}
