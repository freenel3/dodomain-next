"use client";

import { Search, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface DomainSearchAndFiltersProps {
  extensions: string[];
}

export default function DomainSearchAndFilters({ extensions }: DomainSearchAndFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Local state to manage inputs before navigation
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedExtension, setSelectedExtension] = useState(searchParams.get("extension") || "");
  const [priceFrom, setPriceFrom] = useState(searchParams.get("priceFrom") || "");
  const [priceTo, setPriceTo] = useState(searchParams.get("priceTo") || "");
  const [lengthVal, setLengthVal] = useState(searchParams.get("length") || "");

  // Update URL helper
  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset page on filter change
    if (updates.page !== undefined) {
         // handled by pagination comp
    } else {
        params.delete("page");
    }

    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const val = e.target.value;
     setSearchTerm(val);
     // Debounce or just update on enter? for now, let's update on change with timeout or just use local state + Enter? 
     // The original code used onChange with immediate history update. Let's replicate that but maybe with slight debounce or just direct.
     // To mimic previous behavior exact:
     const params = new URLSearchParams(window.location.search);
     if (val) params.set("search", val);
     else params.delete("search");
     params.delete("page");
     // Use replace to avoid history pollution on every keystroke
     window.history.replaceState(null, "", `?${params.toString()}`);
     // We need to trigger a router refresh to re-fetch server data
     router.refresh(); 
  };
  
  // Actually, for a Server Component to update, we need navigation.
  // Let's implement a robust "apply on change" approach.
  const handleFilterChange = (key: string, value: string) => {
      // Update local state is not strictly needed if we push immediately, but good for UI consistency during load
      if (key === 'extension') setSelectedExtension(value);
      if (key === 'length') setLengthVal(value);
      
      updateParams({ [key]: value });
  };
  
  const handleReset = () => {
    setSearchTerm("");
    setSelectedExtension("");
    setPriceFrom("");
    setPriceTo("");
    setLengthVal("");
    router.push("/domains");
  };

  return (
    <>
        {/* 1. Search Bar (Full Width) */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск доменов..."
              value={searchTerm}
              onChange={(e) => {
                  setSearchTerm(e.target.value);
                  const val = e.target.value;
                  const params = new URLSearchParams(searchParams.toString());
                  if (val) params.set("search", val);
                  else params.delete("search");
                  params.delete("page");
                  router.replace(`?${params.toString()}`);
                  // Note: simple router.replace might not trigger server component fetch if it's considered shallow.
                  // But Next.js App Router usually handles query param changes as navigation.
              }}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 text-base text-black focus:outline-none focus:border-black transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* 2. Horizontal Filter Bar */}
        <div className="mb-8 bg-gray-50/50 p-6 border border-gray-100 rounded-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            
            {/* Zone Filter (Select) */}
            <div className="lg:col-span-3">
              <label className="text-sm font-bold text-black mb-2 block">Зона</label>
              <div className="relative">
                 <select 
                   className="w-full appearance-none bg-white border border-gray-200 px-4 py-3 pr-8 rounded-sm text-sm focus:outline-none focus:border-black cursor-pointer"
                   value={selectedExtension}
                   onChange={(e) => handleFilterChange("extension", e.target.value)}
                 >
                   <option value="">Все зоны</option>
                   {extensions.map(ext => (
                     <option key={ext} value={ext}>{ext}</option>
                   ))}
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                 </div>
              </div>
            </div>

            {/* Price From (Input) */}
            <div className="lg:col-span-2">
               <label className="text-sm font-bold text-black mb-2 block">Цена от</label>
               <input
                 type="number"
                 placeholder="0"
                 value={priceFrom}
                 onChange={(e) => setPriceFrom(e.target.value)}
                 onBlur={() => updateParams({ priceFrom: priceFrom })}
                 className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-black"
               />
            </div>

            {/* Price To (Input) */}
            <div className="lg:col-span-2">
               <label className="text-sm font-bold text-black mb-2 block">Цена до</label>
               <input
                 type="number"
                 placeholder="∞"
                 value={priceTo}
                 onChange={(e) => setPriceTo(e.target.value)}
                 onBlur={() => updateParams({ priceTo: priceTo })}
                 className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-black"
               />
            </div>

            {/* Length (Select) */}
            <div className="lg:col-span-3">
              <label className="text-sm font-bold text-black mb-2 block">Длина</label>
              <div className="relative">
                 <select 
                   className="w-full appearance-none bg-white border border-gray-200 px-4 py-3 pr-8 rounded-sm text-sm focus:outline-none focus:border-black cursor-pointer"
                   value={lengthVal}
                   onChange={(e) => handleFilterChange("length", e.target.value)}
                 >
                   <option value="">Любая длина</option>
                   <option value="2">2 символа</option>
                   <option value="3">3 символа</option>
                   <option value="4">4 символа</option>
                   <option value="5">5 символов</option>
                   <option value="5+">Более 5</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                 </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="lg:col-span-2">
               <button
                 onClick={handleReset}
                 className="w-full bg-gray-100 text-black border border-transparent px-4 py-3 rounded-sm text-sm font-medium hover:bg-gray-200 transition-colors"
               >
                 Сбросить
               </button>
            </div>

          </div>
        </div>
    </>
  );
}
