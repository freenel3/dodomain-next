"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  
  const linkClass = (path: string) => 
    `transition-colors text-sm ${isActive(path) ? 'text-black font-medium' : 'text-gray-900 hover:text-black'}`;

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <nav className="flex gap-6 items-center">
          <Link href="/domains" className={linkClass('/domains')}>Домены</Link>
          <Link href="/sell-domain" className={linkClass('/sell-domain')}>Продать</Link>
          <Link href="/blog" className={linkClass('/blog')}>Блог</Link>
          <Link href="/about" className={linkClass('/about')}>О нас</Link>
          <Link href="/contact" className={linkClass('/contact')}>Контакты</Link>
        </nav>
      </div>
    </header>
  );
}
