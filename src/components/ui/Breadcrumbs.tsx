import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Хлебные крошки для навигации
 * Server Component - статичный контент
 */
export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={className} aria-label="Навигация">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
            )}

            {item.path ? (
              <Link
                href={item.path}
                className={cn(
                  "transition-colors",
                  index === items.length - 1
                    ? "text-black font-medium"
                    : "text-gray-600 hover:text-black"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-black font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
