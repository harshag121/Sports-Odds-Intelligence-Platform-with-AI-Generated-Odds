import { suggestedPrompts } from '../../utils/constants';

export function SuggestedChips({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestedPrompts.map((prompt) => (
        <button
          key={prompt}
          className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-on-background/70 transition hover:border-primary/30 hover:text-primary"
          onClick={() => onPick(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
