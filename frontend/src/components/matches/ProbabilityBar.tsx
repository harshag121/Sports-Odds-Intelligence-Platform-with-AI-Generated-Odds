import { formatProbability } from '../../utils/formatters';

interface ProbabilityBarProps {
  teamALabel: string;
  teamAProb: number;
  teamBLabel: string;
  teamBProb: number;
  drawProb: number;
}

export function ProbabilityBar({
  teamALabel,
  teamAProb,
  teamBLabel,
  teamBProb,
  drawProb,
}: ProbabilityBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-on-background/40">
        <span>{teamALabel}</span>
        <span>Draw {formatProbability(drawProb)}</span>
        <span>{teamBLabel}</span>
      </div>
      <div className="flex h-3 overflow-hidden rounded-full bg-white/6">
        <div className="bg-primary" style={{ width: `${teamAProb * 100}%` }} />
        <div className="bg-tertiary" style={{ width: `${drawProb * 100}%` }} />
        <div className="bg-secondary" style={{ width: `${teamBProb * 100}%` }} />
      </div>
      <div className="flex items-center justify-between text-xs text-on-background/60">
        <span>{formatProbability(teamAProb)}</span>
        <span>{formatProbability(teamBProb)}</span>
      </div>
    </div>
  );
}
