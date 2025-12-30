import Link from "next/link";

/**
 * Логотип dodomain
 * Server Component - не требует интерактивности
 */
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-8 h-8 bg-black flex items-center justify-center transition-transform group-hover:scale-105">
        <span className="text-white font-bold text-sm">D</span>
      </div>
      <span className="text-xl font-bold text-black tracking-tight">
        dodomain
      </span>
    </Link>
  );
}
