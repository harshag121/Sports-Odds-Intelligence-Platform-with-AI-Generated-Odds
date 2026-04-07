import { Heart } from 'lucide-react';
import { MatchGrid } from '../components/matches/MatchGrid';
import { Card } from '../components/ui/Card';
import { useMatches } from '../hooks/useMatches';
import { useMatchesStore } from '../store/matchesStore';

export function FavoritesPage() {
  const { matches } = useMatches();
  const favorites = useMatchesStore((state) => state.favorites);
  const favoriteMatches = matches.filter((match) => favorites.includes(match.id));

  if (!favoriteMatches.length) {
    return (
      <Card className="rounded-[34px] p-8 text-center">
        <Heart className="mx-auto text-danger" size={26} />
        <h1 className="mt-4 font-[Space_Grotesk] text-3xl font-bold">No favorites yet</h1>
        <p className="mt-3 text-on-background/55">
          Save matches from the main board and they will stay synced in local storage.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <h1 className="font-[Space_Grotesk] text-4xl font-bold tracking-tight">Favorite matches</h1>
      <p className="mb-6 mt-2 text-on-background/55">
        Your tracked matches stay pinned here for quick access and AI follow-up.
      </p>
      <MatchGrid matches={favoriteMatches} />
    </div>
  );
}
