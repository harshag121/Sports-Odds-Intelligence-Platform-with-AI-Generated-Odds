import { useMemo, useState } from 'react';
import { BrainCircuit, Send, X } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { useMatches } from '../../hooks/useMatches';
import { useMatchesStore } from '../../store/matchesStore';
import type { AgentResponse } from '../../types/odds.types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ChatMessage } from './ChatMessage';
import { SuggestedChips } from './SuggestedChips';

interface ConversationItem {
  id: string;
  from: 'user' | 'assistant';
  message: string | AgentResponse;
}

export function AIChat({ open }: { open: boolean }) {
  const [draft, setDraft] = useState('');
  const [conversation, setConversation] = useState<ConversationItem[]>([]);
  const setChatOpen = useMatchesStore((state) => state.setChatOpen);
  const selectedMatchId = useMatchesStore((state) => state.selectedMatchId);
  const { matches } = useMatches();
  const chat = useChat();

  const selectedMatch = useMemo(
    () => matches.find((match) => match.id === selectedMatchId),
    [matches, selectedMatchId],
  );

  const submitPrompt = async (prompt: string) => {
    if (!prompt.trim()) {
      return;
    }

    setConversation((current) => [
      ...current,
      { id: crypto.randomUUID(), from: 'user', message: prompt },
    ]);
    setDraft('');

    const response = await chat.mutateAsync(prompt);
    setConversation((current) => [
      ...current,
      { id: crypto.randomUUID(), from: 'assistant', message: response },
    ]);
  };

  return (
    <Modal open={open} onClose={() => setChatOpen(false)}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary">
              <BrainCircuit size={16} />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Agent console</span>
            </div>
            <h2 className="font-[Space_Grotesk] text-2xl font-bold">AI Odds Interpreter</h2>
            <p className="mt-2 text-sm text-on-background/55">
              {selectedMatch
                ? `Focused on ${selectedMatch.teamA} vs ${selectedMatch.teamB}.`
                : 'Ask about value spots, close markets, or confidence levels.'}
            </p>
          </div>
          <button className="rounded-full border border-white/10 p-2 text-on-background/55" onClick={() => setChatOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <SuggestedChips onPick={submitPrompt} />
        </div>

        <div className="mt-5 flex-1 space-y-3 overflow-y-auto pr-1">
          {conversation.length ? (
            conversation.map((item) => (
              <ChatMessage key={item.id} from={item.from} message={item.message} />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 p-5 text-sm text-on-background/45">
              The assistant can explain why a side is favored, surface the closest odds, and point out the most predictable match.
            </div>
          )}
        </div>

        <form
          className="mt-5 flex gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            void submitPrompt(draft);
          }}
        >
          <input
            className="flex-1 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm outline-none focus:border-primary"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask the agent about the current board..."
            value={draft}
          />
          <Button disabled={chat.isPending} type="submit">
            <Send className="mr-2" size={16} />
            Send
          </Button>
        </form>
      </div>
    </Modal>
  );
}
