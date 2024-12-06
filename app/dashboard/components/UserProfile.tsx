import Image from 'next/image';
import logoutIcon from '@/public/images/icons/logout.svg';

export default function UserProfile() {
  return (
    <div className="flex items-center gap-3 mb-6 px-4">
      <div className="w-[32px] h-[32px] rounded-full bg-purple-accent flex items-center justify-center font-inter text-profile-name text-white">
        JD
      </div>
      <div className="flex-1">
        <h3 className="text-white font-inter text-profile-name">John Doe</h3>
        <p className="text-profile-email font-inter text-grey-secondary">johndoe@email.com</p>
      </div>
      <button className="text-grey-secondary hover:text-white">
        <Image 
          src={logoutIcon} 
          alt="Settings"
          width={32}
          height={32}
        />
      </button>
    </div>
  );
} 