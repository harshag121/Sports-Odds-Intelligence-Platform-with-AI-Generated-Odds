import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AIChat } from './components/chat/AIChat';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { FavoritesPage } from './pages/Favorites';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { MatchesPage } from './pages/Matches';
import { RegisterPage } from './pages/Register';
import { useAuthStore } from './store/authStore';
import { useMatchesStore } from './store/matchesStore';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />;
  }

  return children;
}

function AppShell() {
  const chatOpen = useMatchesStore((state) => state.chatOpen);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(133,173,255,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(105,246,184,0.12),_transparent_24%),linear-gradient(180deg,#030817_0%,#060e20_52%,#081126_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-25 [background-image:radial-gradient(circle,_rgba(133,173,255,0.16)_1px,transparent_1px)] [background-size:28px_28px]" />
      <Navbar />
      <div className="mx-auto flex max-w-[1600px] gap-0 px-4 pb-10 pt-20 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<MatchesPage />} path="/matches" />
            <Route
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
              path="/favorites"
            />
          </Routes>
          <Footer />
        </main>
      </div>
      <AIChat open={chatOpen} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<AppShell />} path="/*" />
    </Routes>
  );
}
