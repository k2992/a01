
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminShell from './components/AdminShell';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import System from './pages/System';
import Identity from './pages/Identity';
import SettingsPage from './pages/SettingsPage';
import Notes from './pages/Notes';
import Finance from './pages/Finance';
import Profile from './pages/Profile';
import AdminCore from './pages/AdminCore';
import { isAuthenticated, checkHealth } from './services/api';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [apiOk, setApiOk] = useState<boolean | null>(null);

  useEffect(() => {
    checkHealth().then(status => setApiOk(status.ok));
    
    // Global accent listener
    const applyAccent = () => {
      const accent = localStorage.getItem('metalab_accent_color') || '#0ea5e9';
      document.documentElement.style.setProperty('--accent', accent);
    };
    window.addEventListener('storage', applyAccent);
    return () => window.removeEventListener('storage', applyAccent);
  }, []);

  return (
    <div className="min-h-screen text-white flex flex-col font-mono selection:bg-sky-500 selection:text-black">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin Routes */}
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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
