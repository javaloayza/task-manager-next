import { create } from 'zustand';
import { User } from '@/lib/types/user';

/* The `interface AuthState` in the TypeScript code snippet is defining a structure for the
authentication state in the application. */
interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  clearAuth: () => set({ user: null, token: null })
}));