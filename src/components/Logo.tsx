import Link from "next/link";

/**
 * Логотип приложения (Server Component)
 */
export default function Logo() {
  return (
    <Link href="/" className="inline-block group">
      <div className="flex items-baseline font-bold tracking-tighter text-black lowercase text-2xl font-display">
        <span>dodom</span>
        <div className="relative flex flex-col items-center mx-[1px] translate-y-1.5">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-2 left-1/2 -translate-x-1/2"></div>
          <span>a</span>
        </div>
        <span>in</span>
      </div>
    </Link>
  );
}
