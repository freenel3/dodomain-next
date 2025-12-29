import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-xs text-gray-600 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-3 h-3" />}
          {item.path ? (
            <Link href={item.path} className="hover:text-black transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-black">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
