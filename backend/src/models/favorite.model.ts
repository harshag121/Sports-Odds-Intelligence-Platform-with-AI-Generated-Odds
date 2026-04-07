import { favorites } from '../data/sampleData.js';

export const favoriteModel = {
  getByUser(userId: string) {
    return favorites.get(userId) ?? [];
  },
  add(userId: string, matchId: string) {
    const current = new Set(favorites.get(userId) ?? []);
    current.add(matchId);
    favorites.set(userId, [...current]);
    return favorites.get(userId) ?? [];
  },
  remove(userId: string, matchId: string) {
    const current = (favorites.get(userId) ?? []).filter((id) => id !== matchId);
    favorites.set(userId, current);
    return current;
  },
};
