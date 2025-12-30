import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
  canonical?: string;
}

/**
 * Генератор SEO метаданных для страниц
 * Используется для генерации metadata в Next.js 15
 */
export function generateSEO(props: SEOProps): Metadata {
  const { title, description, keywords, ogImage, noindex, canonical } = props;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title,
    description,
    keywords,
    alternates: canonical
      ? {
          canonical: canonical.startsWith("http")
            ? canonical
            : `${baseUrl}${canonical}`,
        }
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "dodomain",
      url: canonical
        ? canonical.startsWith("http")
          ? canonical
          : `${baseUrl}${canonical}`
        : baseUrl,
      images: ogImage
        ? [
            {
              url: ogImage.startsWith("http")
                ? ogImage
                : `${baseUrl}${ogImage}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage
        ? [ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`]
        : undefined,
      creator: "@dodomain",
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

/**
 * Структурированные данные для JSON-LD
 * Используются для улучшения SEO
 */
export interface WebSiteSchema {
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

export interface ArticleSchema {
  "@type": "Article" | "BlogPosting";
  headline: string;
  image?: string;
  author: {
    "@type": string;
    name: string;
  };
  datePublished: string;
  dateModified?: string;
  description: string;
}

export function generateJsonLd<T extends Record<string, any>>(data: T) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }),
      }}
    />
  );
}

/**
 * Генерация JSON-LD для WebSite
 */
export function WebSiteJsonLd({
  name,
  url,
  description,
  potentialAction,
}: WebSiteSchema) {
  return generateJsonLd({
    "@type": "WebSite",
    name,
    url,
    description,
    ...(potentialAction && { potentialAction }),
  });
}

/**
 * Генерация JSON-LD для Article
 */
export function ArticleJsonLd(schema: ArticleSchema) {
  return generateJsonLd(schema);
}
