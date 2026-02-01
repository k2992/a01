import { useEffect, useState, type ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AdminShell } from './components/AdminShell';
import { Dashboard } from './pages/Dashboard';
// Fix: Use default imports for components that are exported as default from their respective files
import Projects from './pages/Projects';
import System from './pages/System';
import Identity from './pages/Identity';
import SettingsPage from './pages/SettingsPage';
import Notes from './pages/Notes';
import { Finance } from './pages/Finance';
import Profile from './pages/Profile';
import AdminCore from './pages/AdminCore';
import { isAuthenticated, checkHealth } from './services/api';

// Fix: Marking children as optional to resolve the 'missing children' type error in JSX usage which can occur in some TypeScript environments
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
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col font-mono selection:bg-sky-500 selection:text-black">
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
          <Route path="system" element={<System />} />
          <Route path="identity" element={<Identity />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notes" element={<Notes />} />
          <Route path="finance" element={<Finance />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route index element={<Navigate to="control" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
