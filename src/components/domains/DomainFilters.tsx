"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CustomSelect from "@/components/ui/CustomSelect";
import {
  DOMAIN_CATEGORIES,
  DOMAIN_EXTENSIONS,
  DOMAIN_LENGTH_FILTERS,
} from "@/lib/constants";

interface DomainFiltersProps {
  categories: string[];
  extensions: string[];
  currentFilters: {
    search?: string;
    category?: string;
    extension?: string;
    priceFrom?: string;
    priceTo?: string;
    length?: string;
  };
}

/**
 * Фильтры для каталога доменов
 * Client Component - требует useState для управления фильтрами
 */
export default function DomainFilters({
  categories,
  extensions,
  currentFilters,
}: DomainFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [localFilters, setLocalFilters] = useState({
    category: currentFilters.category || "",
    extension: currentFilters.extension || "",
    priceFrom: currentFilters.priceFrom || "",
    priceTo: currentFilters.priceTo || "",
    length: currentFilters.length || "",
  });

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);

    // Обновляем URL с новыми фильтрами
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Сбрасываем страницу на первую при изменении фильтров
    params.delete("page");

    router.push(`/domains?${params.toString()}`);
  };

  const resetFilters = () => {
    setLocalFilters({
      category: "",
      extension: "",
      priceFrom: "",
      priceTo: "",
      length: "",
    });

    const params = new URLSearchParams();
    router.push("/domains");
  };

  const formatPrice = (value: string) => {
    if (!value) return "";
    return parseInt(value.replace(/\s/g, "")).toLocaleString("ru-RU");
  };

  const handlePriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = value ? parseInt(value).toLocaleString("ru-RU") : "";
    setLocalFilters({ ...localFilters, priceFrom: formatted });
  };

  const handlePriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = value ? parseInt(value).toLocaleString("ru-RU") : "";
    setLocalFilters({ ...localFilters, priceTo: formatted });
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-5 gap-3">
        {/* Категория */}
        <div>
          <label className="block text-xs font-medium text-black mb-1.5">
            Категория
          </label>
          <CustomSelect
            value={localFilters.category}
            onChange={(value) => updateFilters("category", value)}
            options={[
              { value: "", label: "Все категории" },
              ...categories.map((cat) => ({ value: cat, label: cat })),
            ]}
            placeholder="Все категории"
          />
        </div>

        {/* Зона */}
        <div>
          <label className="block text-xs font-medium text-black mb-1.5">
            Зона
          </label>
          <CustomSelect
            value={localFilters.extension}
            onChange={(value) => updateFilters("extension", value)}
            options={[
              { value: "", label: "Все зоны" },
              ...extensions.map((ext) => ({ value: ext, label: ext })),
            ]}
            placeholder="Все зоны"
            maxVisibleOptions={5}
          />
        </div>

        {/* Цена от */}
        <div>
          <label className="block text-xs font-medium text-black mb-1.5">
            Цена от
          </label>
          <input
            type="text"
            placeholder="0"
            value={localFilters.priceFrom}
            onChange={handlePriceFromChange}
            onBlur={() =>
              updateFilters(
                "priceFrom",
                localFilters.priceFrom.replace(/\s/g, "")
              )
            }
            className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-all"
          />
        </div>

        {/* Цена до */}
        <div>
          <label className="block text-xs font-medium text-black mb-1.5">
            Цена до
          </label>
          <input
            type="text"
            placeholder="∞"
            value={localFilters.priceTo}
            onChange={handlePriceToChange}
            onBlur={() => updateFilters("priceTo", localFilters.priceTo.replace(/\s/g, ""))}
            className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-all"
          />
        </div>

        {/* Длина */}
        <div>
          <label className="block text-xs font-medium text-black mb-1.5">
            Длина
          </label>
          <select
            value={localFilters.length}
            onChange={(e) => updateFilters("length", e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 text-black text-sm focus:outline-none focus:border-black transition-all"
          >
            <option value="">Любая длина</option>
            {DOMAIN_LENGTH_FILTERS.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        {/* Кнопка сброса */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full px-3 py-2 bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-all"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
}
