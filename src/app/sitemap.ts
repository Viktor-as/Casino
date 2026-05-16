import type { MetadataRoute } from "next";

import { getSiteOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/lazybos`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
