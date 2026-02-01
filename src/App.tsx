import { useEffect, useState, type ReactNode } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { PublicLanding } from './pages/PublicLanding';
import { About } from './pages/About';
import { Office } from './pages/Office';
import { isAuthenticated, checkHealth } from './services/api';

type ProtectedRouteProps = {
  children?: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const App = () => {
  const [apiOk, setApiOk] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    checkHealth().then(status => setApiOk(status.ok));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono selection:bg-accent/30 selection:text-white">
      {/* Visual Proof Container */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Header Bar with explicit styling */}
        <header className="flex items-center justify-between border border-neutral-800 bg-neutral-900/40 rounded-xl px-4 py-3 mb-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-bold uppercase tracking-[0.2em] hover:text-accent transition-colors">
              MetaLab Office
            </Link>
            <div className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900/60 px-2 py-1 text-xs text-neutral-400 font-bold uppercase">
              Build: v2.5.0
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <Link 
              to="/about" 
              className={`text-[11px] uppercase font-bold tracking-widest transition-colors ${location.pathname === '/about' ? 'text-accent' : 'text-neutral-500 hover:text-neutral-200'}`}
            >
              About
            </Link>
            {isAuthenticated() && (
              <Link 
                to="/office" 
                className={`text-[11px] uppercase font-bold tracking-widest transition-colors ${location.pathname === '/office' ? 'text-accent' : 'text-neutral-500 hover:text-neutral-200'}`}
              >
                Office
              </Link>
            )}
          </nav>
        </header>

        <main className="min-h-[60vh] animate-in fade-in duration-500">
          <Routes>
            <Route path="/" element={<PublicLanding />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/office" 
              element={
                <ProtectedRoute>
                  <Office />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="mt-20 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] text-neutral-600 uppercase tracking-[0.2em]">
            MetaLab Systems // {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${apiOk ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'} animate-pulse`}></div>
            <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-tight">
              {apiOk ? 'Health: Nominal' : 'Health: Degraded'}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};