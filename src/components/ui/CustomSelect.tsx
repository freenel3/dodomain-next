"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  maxVisibleOptions?: number;
  className?: string;
}

/**
 * Кастомный select компонент
 * Client Component - требует useState для управления открытием/закрытием
 */
export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Выберите...",
  maxVisibleOptions = 5,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Фильтрация опций по поиску
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Показываем только первые N опций
  const visibleOptions = maxVisibleOptions
    ? filteredOptions.slice(0, maxVisibleOptions)
    : filteredOptions;

  // Закрытие при клике вне компонента
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm focus:outline-none focus:border-black transition-all flex items-center justify-between"
      >
        <span className={cn(!value && "text-gray-400")}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
          {/* Поле поиска (если много опций) */}
          {options.length > 10 && (
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 focus:outline-none focus:border-black"
                autoFocus
              />
            </div>
          )}

          {/* Список опций */}
          {visibleOptions.length > 0 ? (
            visibleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                className={cn(
                  "w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors flex items-center justify-between",
                  value === option.value && "bg-gray-100 font-medium"
                )}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-black" />
                )}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              Ничего не найдено
            </div>
          )}

          {/* Показываем количество скрытых опций */}
          {maxVisibleOptions && filteredOptions.length > maxVisibleOptions && (
            <div className="px-3 py-2 text-xs text-gray-500 text-center border-t border-gray-200">
              Ещё {filteredOptions.length - maxVisibleOptions} опций...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
