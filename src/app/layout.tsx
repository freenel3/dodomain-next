import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { SEO_DEFAULTS } from "@/lib/constants";
import ScrollToTop from "@/components/ui/ScrollToTop";

// Подключаем шрифт Inter для текста
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

// Подключаем шрифт Lora для заголовков
const lora = Lora({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

// Метаданные по умолчанию для всего сайта
export const metadata: Metadata = {
  title: {
    default: SEO_DEFAULTS.SITE_NAME,
    template: `%s | ${SEO_DEFAULTS.SITE_NAME}`,
  },
  description: SEO_DEFAULTS.SITE_DESCRIPTION,
  keywords: SEO_DEFAULTS.SITE_KEYWORDS,
  authors: [{ name: "dodomain" }],
  creator: "dodomain",
  publisher: "dodomain",
  robots: {
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
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://dodomain.ru",
    siteName: SEO_DEFAULTS.SITE_NAME,
    title: SEO_DEFAULTS.SITE_NAME,
    description: SEO_DEFAULTS.SITE_DESCRIPTION,
    images: [
      {
        url: SEO_DEFAULTS.OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SEO_DEFAULTS.SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_DEFAULTS.SITE_NAME,
    description: SEO_DEFAULTS.SITE_DESCRIPTION,
    images: [SEO_DEFAULTS.OG_IMAGE],
    creator: SEO_DEFAULTS.TWITTER_HANDLE,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    // Добавьте здесь коды верификации для Google, Yandex и т.д.
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

// Настройки viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${lora.variable}`}>
      <head>
        {/* Дополнительные мета-теги */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Preconnect к внешним ресурсам */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <main>{children}</main>
        <ScrollToTop />
      </body>
    </html>
  );
}
