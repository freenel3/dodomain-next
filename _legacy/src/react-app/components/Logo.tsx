import { Link } from 'react-router';

export default function Logo() {
  return (
    <Link to="/" className="relative group inline-block">
      <div className="relative flex items-start">
        <span className="text-2xl font-display font-bold tracking-tighter text-black lowercase">
          dodom
        </span>
        <div className="relative inline-flex flex-col items-center">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mb-0.5 group-hover:scale-125 transition-transform"></div>
          <span className="text-2xl font-display font-bold tracking-tighter text-black lowercase">
            a
          </span>
        </div>
        <span className="text-2xl font-display font-bold tracking-tighter text-black lowercase">
          in
        </span>
      </div>
    </Link>
  );
}
