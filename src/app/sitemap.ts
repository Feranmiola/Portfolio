import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// A single-page site: hash fragments aren't separate URLs, so list the page once.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
