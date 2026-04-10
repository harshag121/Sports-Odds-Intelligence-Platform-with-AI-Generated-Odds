import { Heart, MessageSquareShare, Sparkles } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useMatchesStore } from '../../store/matchesStore';
import type { Match } from '../../types/match.types';
import { formatConfidence, formatMatchTime } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { OddsDisplay } from './OddsDisplay';
import { ProbabilityBar } from './ProbabilityBar';

export function MatchCard({ match }: { match: Match }) {
  const favorites = useMatchesStore((state) => state.favorites);
  const toggleFavorite = useMatchesStore((state) => state.toggleFavorite);
  const setChatOpen = useMatchesStore((state) => state.setChatOpen);
  const setSelectedMatchId = useMatchesStore((state) => state.setSelectedMatchId);
  const isFavorite = favorites.includes(match.id);

  return (
    <Card className="h-full rounded-[30px] p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge>{match.league}</Badge>
            <Badge className={cn(match.status === 'live' && 'text-secondary ring-secondary/25')}>
              {match.status}
            </Badge>
          </div>
          <h3 className="font-[Space_Grotesk] text-2xl font-bold tracking-tight">
            {match.teamA} vs {match.teamB}
          </h3>
          <p className="mt-2 text-sm text-on-background/55">{formatMatchTime(match.startTime)}</p>
        </div>
        <button
          className={cn(
            'rounded-full border p-2 transition',
            isFavorite
              ? 'border-danger/30 bg-danger/12 text-danger'
              : 'border-white/10 bg-white/4 text-on-background/45',
          )}
          onClick={() => toggleFavorite(match.id)}
        >
          <Heart className={cn(isFavorite && 'fill-current')} size={18} />
        </button>
      </div>

      <ProbabilityBar
        drawProb={match.odds.drawProb}
        teamALabel={match.teamA.split(' ')[0]}
        teamAProb={match.odds.teamAWinProb}
        teamBLabel={match.teamB.split(' ')[0]}
        teamBProb={match.odds.teamBWinProb}
      />

      <div className="mt-5">
        <OddsDisplay odds={match.odds.odds} />
      </div>

      {match.odds.total && (
        <div className="mt-5 rounded-2xl border border-secondary/10 bg-secondary/10 px-4 py-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">Total Points</div>
          <div className="mt-2 text-sm text-on-background/75">
            Predicted: <span className="font-semibold text-on-background">{match.odds.total.prediction}</span>
          </div>
          <div className="mt-2 text-xs text-on-background/60">
            Over: {(match.odds.total.overProb * 100).toFixed(1)}% | Under: {(match.odds.total.underProb * 100).toFixed(1)}%
          </div>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-primary/10 bg-primary/10 px-4 py-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">AI confidence</div>
          <div className="mt-1 text-sm text-on-background/75">{formatConfidence(match.odds.confidenceScore)}</div>
        </div>
        <Sparkles className="text-primary" size={18} />
      </div>

      <div className="mt-5 space-y-2 text-sm text-on-background/60">
        {match.odds.factors.slice(0, 2).map((factor) => (
          <p key={factor}>{factor}</p>
        ))}
      </div>

      <Button
        className="mt-6 w-full"
        onClick={() => {
          setSelectedMatchId(match.id);
          setChatOpen(true);
        }}
        variant="ghost"
      >
        <MessageSquareShare className="mr-2" size={16} />
        Ask AI about this match
      </Button>
    </Card>
  );
}
