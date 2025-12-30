"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Кнопка прокрутки вверх страницы
 * Client Component - требует useState и useEffect для отслеживания позиции скролла
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показываем кнопку при прокрутке вниз более 300px
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-all hover:scale-110"
          aria-label="Наверх"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
