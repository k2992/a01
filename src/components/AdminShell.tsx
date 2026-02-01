import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  LogOut, 
  ChevronRight, 
  Settings,
  FileText,
  Briefcase,
  Cpu,
  Wallet,
  Server
} from 'lucide-react';
import { logout } from '../services/api';

export const AdminShell = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Control', path: '/app/control', icon: LayoutDashboard },
    { label: 'Infrastructure', path: '/app/infrastructure', icon: Server },
    { label: 'Projects', path: '/app/projects', icon: Briefcase },
    { label: 'Finance', path: '/app/finance', icon: Wallet },
    { label: 'System', path: '/app/system', icon: Cpu },
    { label: 'Notes', path: '/app/notes', icon: FileText },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] font-mono selection:bg-accent/30 selection:text-white">
      {/* Sidebar Rail */}
      <aside className="w-64 flex flex-col z-20 border-r border-white/5 bg-[#050505]">
        <div className="p-8 border-b border-white/5 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-accent flex items-center justify-center">
               <div className="w-4 h-4 bg-accent"></div>
            </div>
            <span className="text-lg tracking-[0.2em] font-bold uppercase">METALAB</span>
          </div>
          <span className="text-[9px] text-neutral-600 uppercase tracking-widest font-bold">Imperium Hub</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-10 custom-scrollbar">
          <div className="text-[10px] text-neutral-600 uppercase tracking-[0.3em] mb-6 px-4 font-bold">Management</div>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-accent/5 text-accent border-l-2 border-accent' 
                      : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon size={14} className={isActive ? 'text-accent' : 'text-neutral-600'} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={10} className="text-accent" />}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1 bg-black/20">
          <Link to="/app/profile" className="flex items-center gap-3 px-4 py-2 text-neutral-600 hover:text-white transition-colors">
            <User size={14} /> <span className="text-[11px] uppercase font-bold tracking-widest">Profile</span>
          </Link>
          <Link to="/app/settings" className="flex items-center gap-3 px-4 py-2 text-neutral-600 hover:text-white transition-colors">
            <Settings size={14} /> <span className="text-[11px] uppercase font-bold tracking-widest">Settings</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-neutral-600 hover:text-red-500 transition-colors">
            <LogOut size={14} /> <span className="text-[11px] uppercase font-bold tracking-widest">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 px-10 flex items-center justify-between z-10 shrink-0 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-4 text-[11px] font-bold text-accent uppercase tracking-[0.2em]">
            Location: <span className="text-white ml-2">{location.pathname.split('/').pop()?.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.5)]"></div>
            <span className="text-[9px] text-accent font-bold uppercase tracking-[0.3em]">System Online</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 relative custom-scrollbar bg-[#050505]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};