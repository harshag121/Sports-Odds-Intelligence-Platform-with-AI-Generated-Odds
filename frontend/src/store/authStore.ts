import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthPayload, AuthTokens, User } from '../types/user.types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setAuth: (payload: AuthPayload) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      setAuth: (payload) =>
        set({
          user: payload.user,
          tokens: payload.tokens,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'odds-intel-auth',
    },
  ),
);
