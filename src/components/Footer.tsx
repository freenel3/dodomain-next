import Link from "next/link";
import Logo from "@/components/Logo";

/**
 * Футер приложения (Pixel-perfect match)
 */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* 1. Логотип и слоган */}
          <div className="flex flex-col items-start gap-4">
            <div className="-ml-1">
              <Logo />
            </div>
            <p className="text-gray-500 text-sm font-medium">
              Ведущая площадка доменов
            </p>
          </div>

          {/* 2. Площадка */}
          <div>
            <h3 className="font-display font-bold text-black mb-6 text-base">
              Площадка
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/domains" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Все домены
                </Link>
              </li>
              <li>
                <Link href="/sell-domain" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Продать домен
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Ресурсы */}
          <div>
            <h3 className="font-display font-bold text-black mb-6 text-base">
              Ресурсы
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Компания */}
          <div>
            <h3 className="font-display font-bold text-black mb-6 text-base">
              Компания
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-black transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-black transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} dodomain. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
