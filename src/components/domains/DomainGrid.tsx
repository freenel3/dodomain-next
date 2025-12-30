import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DomainGridProps {
  children: React.ReactNode;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * Сетка доменов с пагинацией
 * Client Component - требует useState для управления страницой
 */
export default function DomainGrid({
  children,
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: DomainGridProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Всегда показываем первую страницу
    pages.push(1);

    // Показываем страницы вокруг текущей
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Показываем многоточие если есть разрыв
    if (startPage > 2) {
      pages.splice(1, 0, "...");
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Всегда показываем последнюю страницу
    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="space-y-6">
      {/* Сетка карточек */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">{children}</div>

      {/* Информация о количестве */}
      <div className="text-sm text-gray-600">Найдено доменов: {totalItems}</div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {/* Кнопка "Назад" */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "p-2 border border-gray-300 hover:border-black transition-all",
              currentPage === 1 &&
                "opacity-30 cursor-not-allowed disabled:hover:border-gray-300"
            )}
            aria-label="Предыдущая страница"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Номера страниц */}
          <div className="flex gap-1">
            {pageNumbers.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-gray-400"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium border transition-all",
                    currentPage === page
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  )}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Кнопка "Вперёд" */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "p-2 border border-gray-300 hover:border-black transition-all",
              currentPage === totalPages &&
                "opacity-30 cursor-not-allowed disabled:hover:border-gray-300"
            )}
            aria-label="Следующая страница"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
