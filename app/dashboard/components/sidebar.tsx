'use client';

import { useState, useEffect } from 'react';
import UserProfile from '../components/UserProfile';
import NewTextButton from '../components/NewTextButton';
import Navigation from '../components/Navigation';
import Image from 'next/image';
import menuIcon from '@/public/images/icons/mobilebars.svg';
import closeIcon from '@/public/images/icons/cross.svg';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 766);
      setIsOpen(window.innerWidth >= 766);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {isMobile && !isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-50 p-2 bg-textbase rounded-lg"
        >
          <Image src={menuIcon} alt="Menu" width={24} height={24} />
        </button>
      )}
      
      <div className="md:w-[280px] flex-none">
        <div className={`
          fixed
          flex-none
          min-h-screen
          flex flex-col w-[280px] 
          h-screen bg-textbase text-white
           py-5
          transition-transform duration-300 ease-in-out
          ${!isOpen ? '-translate-x-full' : 'translate-x-0'}
          z-40
          ${!isMobile && 'rounded-l-ud-radius'}
        `}>
          {isMobile && (
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute bottom-4 right-4 p-2 hover:bg-nav-hover rounded-lg"
            >
              <Image src={closeIcon} alt="Close" width={24} height={24} />
            </button>
          )}
          <UserProfile />
          <NewTextButton />
          <Navigation />
        </div>
      </div>
      
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
