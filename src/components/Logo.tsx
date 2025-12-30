import Link from "next/link";

/**
 * Логотип dodomain
 * Server Component - не требует интерактивности
 */
export default function Logo() {
  return (
    <Link href="/" className="relative group inline-block">
      <div className="relative flex items-start">
        <span className="text-2xl font-display font-bold tracking-tighter text-black lowercase">
          dodom
        </span>
        <div className="relative inline-flex flex-col items-center">
          <span className="text-2xl font-display font-bold tracking-tighter text-black lowercase">
            a
          </span>
          <div className="relative inline-flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mb-0.5 group-hover:scale-125 transition-transform"></div>
            <span className="text-2xl font-display font-bold tracking-tighter text-black lowercase">
              in
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
