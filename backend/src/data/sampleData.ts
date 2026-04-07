import { hashSync } from 'bcryptjs';

export interface StoredMatch {
  id: string;
  sport: string;
  league: string;
  teamA: string;
  teamB: string;
  teamARating: number;
  teamBRating: number;
  startTime: string;
  status: 'scheduled' | 'live' | 'completed';
  homeAdvantage?: boolean;
  recentForm?: number[];
  headToHead?: {
    teamAWins: number;
    teamBWins: number;
  };
}

export interface StoredUser {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
}

export const matches: StoredMatch[] = [
  {
    id: 'm1',
    sport: 'Basketball',
    league: 'NBA',
    teamA: 'Golden State Warriors',
    teamB: 'Phoenix Suns',
    teamARating: 88,
    teamBRating: 84,
    startTime: '2026-04-08T19:30:00.000Z',
    status: 'live',
    homeAdvantage: true,
    recentForm: [1, 1, 0, 1, 1],
    headToHead: { teamAWins: 6, teamBWins: 4 },
  },
  {
    id: 'm2',
    sport: 'Football',
    league: 'Premier League',
    teamA: 'Manchester City',
    teamB: 'Arsenal',
    teamARating: 92,
    teamBRating: 90,
    startTime: '2026-04-08T17:00:00.000Z',
    status: 'scheduled',
    homeAdvantage: true,
    recentForm: [1, 1, 1, 0, 1],
    headToHead: { teamAWins: 5, teamBWins: 3 },
  },
  {
    id: 'm3',
    sport: 'Football',
    league: 'NFL',
    teamA: 'Kansas City Chiefs',
    teamB: 'Buffalo Bills',
    teamARating: 93,
    teamBRating: 91,
    startTime: '2026-04-09T00:20:00.000Z',
    status: 'scheduled',
    homeAdvantage: false,
    recentForm: [1, 0, 1, 1, 1],
    headToHead: { teamAWins: 4, teamBWins: 4 },
  },
  {
    id: 'm4',
    sport: 'Football',
    league: 'UEFA Champions League',
    teamA: 'Real Madrid',
    teamB: 'Inter Milan',
    teamARating: 90,
    teamBRating: 85,
    startTime: '2026-04-10T19:00:00.000Z',
    status: 'scheduled',
    homeAdvantage: true,
    recentForm: [1, 1, 1, 1, 0],
    headToHead: { teamAWins: 7, teamBWins: 2 },
  },
];

export const users: StoredUser[] = [
  {
    id: 'u1',
    email: 'demo@oddsai.dev',
    username: 'demo-trader',
    passwordHash: hashSync('password123', 10),
  },
];

export const favorites = new Map<string, string[]>([['u1', ['m1', 'm4']]]);
