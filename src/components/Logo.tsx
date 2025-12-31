import Link from "next/link";

/**
 * Логотип приложения (Server Component)
 */
export default function Logo() {
  return (
    <Link href="/" className="inline-block group">
      <div className="flex items-baseline font-bold tracking-tighter text-black lowercase text-2xl font-display">
        <span>dodoma</span>
        <div className="relative flex flex-col items-center mx-[1px]">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 opacity-100"></div>
          <span>i</span>
        </div>
        <span>n</span>
      </div>
    </Link>
  );
}
