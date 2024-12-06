'use client';

import UserProfile from './UserProfile';
import NewTextButton from './NewTextButton';
import Navigation from './Navigation';

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-screen bg-textbase text-white max-w-sidebar-width rounded-l-ud-radius py-5">
      <UserProfile />
      <NewTextButton />
      <Navigation />
    </div>
  );
}

