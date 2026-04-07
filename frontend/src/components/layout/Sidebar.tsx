import { Brain, Heart, LayoutDashboard, Radar, TrendingUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { useMatchesStore } from '../../store/matchesStore';

const items = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/matches', label: 'Markets', icon: TrendingUp },
  { to: '/favorites', label: 'Favorites', icon: Heart },
];

export function Sidebar() {
  const setChatOpen = useMatchesStore((state) => state.setChatOpen);

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-72 shrink-0 pr-6 xl:block">
      <div className="glass-panel flex h-full flex-col rounded-[28px] p-5">
        <div className="mb-8 border-b border-white/8 pb-5">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-secondary">
            <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_12px_rgba(105,246,184,0.8)]" />
            Live intelligence
          </div>
          <h2 className="font-[Space_Grotesk] text-2xl font-bold tracking-tight text-on-background">
            Kinetic Market Console
          </h2>
          <p className="mt-2 text-sm text-on-background/55">
            Real-time odds, confidence signals, and a context-aware betting copilot.
          </p>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition',
                    isActive
                      ? 'bg-primary/10 text-primary ring-1 ring-primary/20'
                      : 'text-on-background/55 hover:bg-white/5 hover:text-on-background',
                  )
                }
                to={item.to}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-8 rounded-3xl border border-secondary/15 bg-secondary/6 p-4">
          <div className="mb-2 flex items-center gap-2 text-secondary">
            <Radar size={16} />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Agent ready</span>
          </div>
          <p className="text-sm text-on-background/70">
            Ask which match is most predictable or where the edge is narrowing fastest.
          </p>
          <button
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-slate-950"
            onClick={() => setChatOpen(true)}
          >
            <Brain size={16} />
            Open AI Chat
          </button>
        </div>
      </div>
    </aside>
  );
}
