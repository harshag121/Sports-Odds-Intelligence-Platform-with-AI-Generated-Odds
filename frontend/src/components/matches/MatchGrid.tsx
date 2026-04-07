import type { Match } from '../../types/match.types';
import { MatchCard } from './MatchCard';

export function MatchGrid({ matches }: { matches: Match[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
