import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Match } from '../types/match.types';

interface MatchesState {
  matches: Match[];
  favorites: string[];
  chatOpen: boolean;
  selectedMatchId: string | null;
  setMatches: (matches: Match[]) => void;
  updateMatch: (match: Match) => void;
  toggleFavorite: (matchId: string) => void;
  setChatOpen: (open: boolean) => void;
  setSelectedMatchId: (matchId: string | null) => void;
}

export const useMatchesStore = create<MatchesState>()(
  persist(
    (set) => ({
      matches: [],
      favorites: [],
      chatOpen: false,
      selectedMatchId: null,
      setMatches: (matches) => set({ matches }),
      updateMatch: (match) =>
        set((state) => ({
          matches: state.matches.map((current) => (current.id === match.id ? match : current)),
        })),
      toggleFavorite: (matchId) =>
        set((state) => ({
          favorites: state.favorites.includes(matchId)
            ? state.favorites.filter((id) => id !== matchId)
            : [...state.favorites, matchId],
        })),
      setChatOpen: (open) => set({ chatOpen: open }),
      setSelectedMatchId: (matchId) => set({ selectedMatchId: matchId }),
    }),
    {
      name: 'odds-intel-matches',
      partialize: ({ favorites }) => ({ favorites }),
    },
  ),
);
