import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Отключаем ESLint и TypeScript для сборки
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Настройки для Docker (standalone output)
  output: "standalone",
  // Оптимизация изображений
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Настройки для Tailwind CSS
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Переменные окружения для клиентского доступа
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || "dodomain",
  },

  // Настройки webpack для исключения серверных модулей из клиентского бандла
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        pg: false,
      };
    }
    return config;
  },

  // Заголовки безопасности
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  // Перенаправления (если нужно)
  async redirects() {
    return [];
  },
};

export default nextConfig;
