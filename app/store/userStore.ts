import { create } from 'zustand';
import { checkAuth } from '@/app/actions/auth';

type AuthUser = {
  email: string;
  status: string | null;
  id: number;
  name: string | null;
} | null;

interface UserState {
  user: AuthUser;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: AuthUser) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  fetchUser: async () => {
    set({ isLoading: true });
    const user = await checkAuth();
    set({ user, isLoading: false });
  },
  setUser: (user) => set({ user }),
})); 