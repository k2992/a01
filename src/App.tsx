import { useEffect, useState, type ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AdminShell } from './components/AdminShell';
import { Dashboard } from './pages/Dashboard';
import { AdminCore } from './pages/AdminCore';
import { Projects } from './pages/Projects';
import { System } from './pages/System';
import { Identity } from './pages/Identity';
import { Finance } from './pages/Finance';
import { Notes } from './pages/Notes';
import { Profile } from './pages/Profile';
import { SettingsPage } from './pages/SettingsPage';
import { isAuthenticated, checkHealth } from './services/api';

type ProtectedRouteProps = {
  children?: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App = () => {
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    checkHealth().then(status => setApiOk(status.ok));
    // Apply initial accent color
    document.documentElement.style.setProperty('--accent', '#0ea5e9');
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col font-mono selection:bg-accent/30 selection:text-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route 
          path="/app/*" 
          element={
            <ProtectedRoute>
              <AdminShell />
            </ProtectedRoute>
          } 
        >
          <Route path="control" element={<Dashboard />} />
          <Route path="infrastructure" element={<AdminCore />} />
          <Route path="projects" element={<Projects />} />
          <Route path="finance" element={<Finance />} />
          <Route path="system" element={<System />} />
          <Route path="identity" element={<Identity />} />
          <Route path="notes" element={<Notes />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route index element={<Navigate to="control" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};