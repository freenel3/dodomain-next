import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface DomainCardProps {
  domain: {
    name: string;
    price: number;
    category: string | null;
    extension: string | null;
  };
}

/**
 * Карточка домена (Pixel-perfect match по скриншоту)
 */
export default function DomainCard({ domain }: DomainCardProps) {
  return (
    <div className="group bg-white border border-gray-200 p-6 flex flex-col hover:border-black transition-all h-full relative">
      <Link href={`/domains/${encodeURIComponent(domain.name)}`} className="flex-1 block">
        {/* Header: Badge + Price */}
        <div className="flex items-start justify-between mb-8">
          <div className="px-3 py-1 bg-gray-100 text-gray-900 text-sm font-medium rounded-sm">
            {domain.category || "Премиум"}
          </div>
          <div className="text-xl md:text-2xl font-display font-bold text-black tracking-tight whitespace-nowrap">
            {formatPrice(domain.price)}
          </div>
        </div>

        {/* Domain Name */}
        <div className="mb-2">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-black group-hover:underline decoration-2 underline-offset-8 tracking-tight break-all">
            {domain.name}
          </h3>
        </div>

        {/* Extension */}
        <div className="flex items-center gap-2 text-gray-500 mb-8">
          <Globe className="w-4 h-4" />
          <span className="text-sm">домен {domain.extension || ".ru"}</span>
        </div>
      </Link>

      {/* Footer Button - Запросить цену */}
      <Link 
         href={`/domains/${encodeURIComponent(domain.name)}`}
         className="w-full flex items-center justify-center gap-2 py-3 border border-black text-black font-medium text-sm hover:bg-black hover:text-white transition-colors uppercase tracking-wide mt-auto"
      >
        <Mail className="w-4 h-4" />
        Запросить цену
      </Link>
    </div>
  );
}
