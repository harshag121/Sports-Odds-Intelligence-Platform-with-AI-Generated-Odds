import { Bell, BrainCircuit, Menu, Search, UserCircle2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useMatchesStore } from '../../store/matchesStore';
import { navLinks } from '../../utils/constants';
import { Button } from '../ui/Button';

export function Navbar() {
  const user = useAuthStore((state) => state.user);
  const setChatOpen = useMatchesStore((state) => state.setChatOpen);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/6 bg-[#040b18]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-white/8 p-2 text-on-background/70 md:hidden">
              <Menu size={18} />
            </button>
            <div>
              <div className="font-[Space_Grotesk] text-lg font-bold tracking-tight text-glow text-primary">
                OddsAI Terminal
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-on-background/40">
                Predictive Pulse Active
              </div>
            </div>
          </div>
          <nav className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                className={({ isActive }) =>
                  [
                    'font-[Space_Grotesk] text-sm tracking-tight transition',
                    isActive ? 'text-primary' : 'text-on-background/55 hover:text-on-background',
                  ].join(' ')
                }
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <label className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/4 px-4 py-2 sm:flex">
            <Search className="text-on-background/45" size={16} />
            <input
              className="w-40 bg-transparent text-sm text-on-background outline-none placeholder:text-on-background/35"
              placeholder="Search markets..."
            />
          </label>
          <button className="rounded-full border border-white/8 p-2 text-on-background/55 transition hover:text-primary">
            <Bell size={16} />
          </button>
          <Button className="hidden sm:inline-flex" onClick={() => setChatOpen(true)} variant="secondary">
            <BrainCircuit className="mr-2" size={16} />
            Ask AI
          </Button>
          <div className="flex items-center gap-2 rounded-full border border-primary/12 bg-primary/6 px-3 py-1.5">
            <UserCircle2 className="text-primary" size={18} />
            <span className="text-sm text-on-background/80">{user?.username ?? 'Guest Trader'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
