import { MetadataRoute } from "next";

/**
 * Генерация robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dodomain.ru";

  return {
    rules: [
      {
        userAgent: "Yandex",
        allow: [
          "/",
          "/blog",
          "/domains$",
          "/domains/*",
          "/contact",
          "/sell-domain",
          "/about",
        ],
        disallow: [
          "/blog?",
          "/domains?",
          "/hltdot",
          "/admin-dashboard",
          "/admin*",
          "/faq",
          "/terms",
          "/privacy",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/blog",
          "/domains$",
          "/domains/*",
          "/contact",
          "/sell-domain",
          "/about",
        ],
        disallow: [
          "/blog?",
          "/domains?",
          "/hltdot",
          "/admin-dashboard",
          "/admin*",
          "/faq",
          "/terms",
          "/privacy",
        ],
      },
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
