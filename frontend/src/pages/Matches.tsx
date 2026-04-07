import { useDeferredValue, useState } from 'react';
import { MatchGrid } from '../components/matches/MatchGrid';
import { Input } from '../components/ui/Input';
import { useMatches } from '../hooks/useMatches';

export function MatchesPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const { matches } = useMatches();

  const filteredMatches = matches.filter((match) => {
    const haystack = `${match.teamA} ${match.teamB} ${match.league} ${match.sport}`.toLowerCase();
    return haystack.includes(deferredQuery.toLowerCase());
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-[Space_Grotesk] text-4xl font-bold tracking-tight">Match intelligence</h1>
          <p className="mt-2 text-on-background/55">
            Responsive board with live-style odds motion, AI explanations, and favorite tracking.
          </p>
        </div>
        <div className="w-full max-w-md">
          <Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search league, team, or sport..."
            value={query}
          />
        </div>
      </div>

      <MatchGrid matches={filteredMatches} />
    </div>
  );
}
