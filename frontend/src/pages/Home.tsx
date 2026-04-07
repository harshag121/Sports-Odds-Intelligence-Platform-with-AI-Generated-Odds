import { Activity, ArrowUpRight, ShieldCheck, Sparkles, Waves } from 'lucide-react';
import { MatchGrid } from '../components/matches/MatchGrid';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { useMatches } from '../hooks/useMatches';
import { useOdds } from '../hooks/useOdds';
import { formatConfidence } from '../utils/formatters';

export function HomePage() {
  const { matches } = useMatches();
  const { topPick, closeCalls, liveMatches } = useOdds();

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-[34px] px-6 py-7">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge>Predictive engine v3.4</Badge>
            <Badge className="text-secondary ring-secondary/20">Latency 24ms</Badge>
          </div>
          <h1 className="max-w-3xl font-[Space_Grotesk] text-4xl font-bold tracking-tight sm:text-5xl">
            AI-generated odds, real-time market movement, and an analyst console built for sports traders.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-on-background/62">
            The platform combines Elo-style probability modeling, batch odds generation, and a conversational agent that turns raw numbers into explanations.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['Top pick', topPick ? `${topPick.teamA}` : 'Loading'],
              ['Closest line', closeCalls[0] ? `${closeCalls[0].teamA} vs ${closeCalls[0].teamB}` : 'Pending'],
              ['Live board', `${liveMatches.length} active markets`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/8 bg-white/4 p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-on-background/35">
                  {label}
                </div>
                <div className="mt-3 text-lg font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[34px] p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">AI signal</p>
              <h2 className="mt-2 font-[Space_Grotesk] text-2xl font-bold">Most predictable match</h2>
            </div>
            <ShieldCheck className="text-secondary" size={20} />
          </div>
          {topPick ? (
            <>
              <div className="rounded-[28px] border border-secondary/15 bg-secondary/7 p-5">
                <div className="text-sm text-on-background/55">{topPick.league}</div>
                <div className="mt-2 text-2xl font-semibold">
                  {topPick.teamA} vs {topPick.teamB}
                </div>
                <div className="mt-3 text-secondary">{formatConfidence(topPick.odds.confidenceScore)}</div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-on-background/60">
                {topPick.odds.factors.map((factor) => (
                  <div key={factor} className="flex items-center gap-2">
                    <Sparkles className="text-primary" size={14} />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { icon: Activity, label: 'Live updates', value: `${liveMatches.length} streaming`, accent: 'text-primary' },
          { icon: Waves, label: 'Closest odds', value: `${closeCalls.length} tight markets`, accent: 'text-tertiary' },
          { icon: ArrowUpRight, label: 'Tracked matches', value: `${matches.length} on board`, accent: 'text-secondary' },
        ].map((item) => (
          <Card key={item.label} className="rounded-[28px] p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-on-background/35">
                  {item.label}
                </div>
                <div className="mt-3 text-2xl font-semibold">{item.value}</div>
              </div>
              <item.icon className={item.accent} size={20} />
            </div>
          </Card>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-[Space_Grotesk] text-2xl font-bold">Featured markets</h2>
            <p className="text-sm text-on-background/55">The board below refreshes to simulate real-time price motion.</p>
          </div>
        </div>
        <MatchGrid matches={matches.slice(0, 3)} />
      </section>
    </div>
  );
}
