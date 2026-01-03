
interface BlogGridProps {
  children: React.ReactNode;
  totalItems?: number;
}

export default function BlogGrid({
  children,
  totalItems,
}: BlogGridProps) {
  return (
    <div className="space-y-6">
      {/* Сетка карточек */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {children}
      </div>

      {/* Информация о количестве */}
      {totalItems !== undefined && (
        <div className="text-sm text-gray-600">Найдено статей: {totalItems}</div>
      )}
    </div>
  );
}
