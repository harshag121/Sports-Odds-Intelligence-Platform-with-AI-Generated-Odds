import { matches } from '../data/sampleData.js';

export const matchModel = {
  findAll() {
    return matches;
  },
  findById(id: string) {
    return matches.find((match) => match.id === id);
  },
  findLive() {
    return matches.filter((match) => match.status === 'live');
  },
};
