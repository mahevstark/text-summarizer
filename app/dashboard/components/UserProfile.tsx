'use client'

import Image from 'next/image';
import logoutIcon from '@/public/images/icons/logout.svg';
import { checkAuth, logout } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useNotificationStore, NotificationTypes } from '@/app/store/notificationStore';
import { useEffect } from 'react';
import { useState } from 'react';

type AuthUser = {
  email: string;
  status: string | null;
  id: number;
  name: string | null;
} | null;

export default function UserProfile() {
  const router = useRouter();
  const { showNotification } = useNotificationStore();

  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    getUser()
  }, []);

  const getUser = async () => {
    const user = await checkAuth();
    setUser(user);
  }

  // Handle long names by taking first letter of first and last names only
  const initials = user?.name
    ? user.name!.split(' ')
      .filter((_, i) => i === 0 || i === user.name!.split(' ').length - 1)
      .map(name => name[0])
      .join('')
    : '';

  const handleLogout = async () => {
    await logout();
    showNotification(NotificationTypes.success, 'Success', 'You have been successfully logged out');
    router.replace('/login');
  };

  // Truncate long names
  const displayName = user?.name && user.name.length > 20 
    ? user.name.substring(0, 20) + '...'
    : user?.name;

  return (
    <div className="flex items-center gap-3 mb-6 px-4">
      <div className="w-[32px] h-[32px] rounded-full bg-purple-accent flex items-center justify-center font-inter text-profile-name text-white">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-inter text-profile-name truncate">{displayName}</h3>
        <p className="text-profile-email font-inter text-grey-secondary truncate">{user?.email}</p>
      </div>
      <button 
        className="text-grey-secondary hover:text-white flex-shrink-0"
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