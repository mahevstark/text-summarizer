'use client'

import Image from 'next/image';
import logoutIcon from '@/public/images/icons/logout.svg';
import { logout } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useNotificationStore } from '@/app/store/notificationStore';

export default function UserProfile() {
  const router = useRouter();
  const { showNotification } = useNotificationStore();

  const handleLogout = async () => {
    await logout();
    showNotification('You have been successfully logged out', 'success', 'success');
    router.replace('/login');
  };

  return (
    <div className="flex items-center gap-3 mb-6 px-4">
      <div className="w-[32px] h-[32px] rounded-full bg-purple-accent flex items-center justify-center font-inter text-profile-name text-white">
        JD
      </div>
      <div className="flex-1">
        <h3 className="text-white font-inter text-profile-name">John Doe</h3>
        <p className="text-profile-email font-inter text-grey-secondary">johndoe@email.com</p>
      </div>
      <button 
        className="text-grey-secondary hover:text-white"
        onClick={handleLogout}
      >
        <Image 
          src={logoutIcon} 
          alt="Logout"
          width={32}
          height={32}
        />
      </button>
    </div>
  );
} 