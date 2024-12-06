import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import homeIcon from '@/public/images/icons/home.svg';
import historyIcon from '@/public/images/icons/history.svg';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 px-3">
      <Link 
        href="/dashboard"
        className={`flex items-center gap-3 px-3 py-2 rounded-lg font-inter text-nav ${
          pathname === '/dashboard' ? 'bg-nav-active' : 'hover:bg-nav-hover'
        }`}
      >
        <Image 
          src={homeIcon} 
          alt="Home"
          width={20}
          height={20}
        />
        <span>Home</span>
      </Link>

      <Link 
        href="/dashboard/history"
        className={`flex items-center gap-3 px-3 py-2 rounded-lg font-inter text-nav ${
          pathname === '/dashboard/history' ? 'bg-nav-active' : 'hover:bg-nav-hover'
        }`}
      >
        <Image 
          src={historyIcon} 
          alt="History"
          width={20}
          height={20}
        />
        <span>History</span>
        <span className="flex justify-center items-center gap-0 py-0 rounded-badge border border-badge-border bg-badge-bg text-sm px-1">15</span>
      </Link>
    </nav>
  );
} 