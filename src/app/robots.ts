import { MetadataRoute } from "next";

/**
 * Генерация robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dodomain.ru";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
