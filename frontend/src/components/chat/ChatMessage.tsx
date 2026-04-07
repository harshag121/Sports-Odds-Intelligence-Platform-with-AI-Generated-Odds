import type { AgentResponse } from '../../types/odds.types';

interface ChatMessageProps {
  from: 'user' | 'assistant';
  message: string | AgentResponse;
}

export function ChatMessage({ from, message }: ChatMessageProps) {
  const assistant = typeof message !== 'string';

  return (
    <div className={from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={[
          'max-w-[88%] rounded-3xl px-4 py-3',
          from === 'user'
            ? 'bg-primary text-slate-950'
            : 'border border-white/8 bg-white/4 text-on-background',
        ].join(' ')}
      >
        {assistant ? (
          <div className="space-y-3">
            <p className="text-sm leading-6">{message.answer}</p>
            <p className="text-xs text-on-background/60">{message.reasoning}</p>
          </div>
        ) : (
          <p className="text-sm">{message}</p>
        )}
      </div>
    </div>
  );
}
