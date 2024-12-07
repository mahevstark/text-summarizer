'use client';

import UserProfile from '../components/UserProfile';
import NewTextButton from '../components/NewTextButton';
import Navigation from '../components/Navigation';

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-screen bg-textbase text-white max-w-sidebar-width rounded-l-ud-radius py-5">
      <UserProfile />
      <NewTextButton />
      <Navigation />
    </div>
  );
}

