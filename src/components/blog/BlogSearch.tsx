"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// Простой хук дебаунса, чтобы не тянуть зависимости
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function BlogSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  
  const [inputValue, setInputValue] = useState(searchParams.get("search")?.toString() || "");
  const debouncedSearch = useDebounce(inputValue, 300);

  // Эффект срабатывает когда дебаунс значение меняется
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    
    // Предотвращаем пустой пуш при первой загрузке если параметры совпадают
    if (debouncedSearch !== (searchParams.get("search") || "")) {
       replace(`?${params.toString()}`);
    }
  }, [debouncedSearch, replace, searchParams]); // searchParams нужен в деп зависимостях, но аккуратно

  return (
    <div className="max-w-md mx-auto">
      <input
        type="text"
        placeholder="Поиск статей..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-4 py-3 text-sm border-2 border-gray-800 rounded focus:outline-none focus:border-blue-500 bg-white"
      />
    </div>
  );
}
