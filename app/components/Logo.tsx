import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="relative group inline-block">
      <div className="relative flex items-start font-display">
        <span className="text-2xl font-bold tracking-tighter text-black lowercase font-serif">
          dodom
        </span>
        <div className="relative inline-flex flex-col items-center">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mb-0.5 group-hover:scale-125 transition-transform"></div>
          <span className="text-2xl font-bold tracking-tighter text-black lowercase font-serif">
            a
          </span>
        </div>
        <span className="text-2xl font-bold tracking-tighter text-black lowercase font-serif">
          in
        </span>
      </div>
    </Link>
  )
}
