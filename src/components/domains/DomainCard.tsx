import Link from "next/link";
import { Globe, Calendar, TrendingUp } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface DomainCardProps {
  domain: {
    name: string;
    price: number;
    category: string;
    extension: string;
    registeredYear?: number;
    traffic?: string;
    description?: string;
  };
}

/**
 * Карточка домена
 * Server Component - статичный контент
 */
export default function DomainCard({ domain }: DomainCardProps) {
  return (
    <Link
      href={`/domains/${encodeURIComponent(domain.name)}`}
      className="group bg-white border border-gray-200 p-4 hover:border-black transition-all relative"
    >
      {/* Header с категорией и ценой */}
      <div className="flex items-start justify-between mb-3">
        <div className="px-2 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium">
          {domain.category}
        </div>
        <div className="text-xl font-display font-bold text-black tracking-tight">
          {formatPrice(domain.price)}
        </div>
      </div>

      {/* Название домена */}
      <h3 className="text-2xl font-display font-bold text-black mb-1.5 group-hover:underline tracking-tight">
        {domain.name}
      </h3>

      {/* Зона и описание */}
      <div className="flex items-center gap-1.5 text-gray-600 mb-3">
        <Globe className="w-3.5 h-3.5" />
        <span className="text-xs">домен {domain.extension}</span>
      </div>

      {domain.description && (
        <p className="text-sm text-gray-700 line-clamp-2">
          {domain.description}
        </p>
      )}

      {/* Дополнительная информация */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
        {domain.registeredYear && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{domain.registeredYear}</span>
          </div>
        )}
        {domain.traffic && (
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{domain.traffic}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
