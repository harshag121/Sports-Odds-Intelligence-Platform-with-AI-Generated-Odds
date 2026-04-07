import type { OddsBreakdown } from '../../types/odds.types';
import { formatOdds } from '../../utils/formatters';

export function OddsDisplay({ odds }: { odds: OddsBreakdown }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        ['Team A', odds.teamA],
        ['Draw', odds.draw],
        ['Team B', odds.teamB],
      ].map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-white/8 bg-white/4 px-3 py-2 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-background/35">{label}</div>
          <div className="mt-1 text-lg font-semibold text-on-background">{formatOdds(value as number)}</div>
        </div>
      ))}
    </div>
  );
}
