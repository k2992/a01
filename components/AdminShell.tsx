
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  LogOut, 
  ChevronRight, 
  Network, 
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

  const primaryItems = [
    { label: 'Home', path: '/app/control', icon: LayoutDashboard },
    { label: 'Our Servers', path: '/app/infrastructure', icon: Server },
    { label: 'My Projects', path: '/app/projects', icon: Briefcase },
    { label: 'Money & Budget', path: '/app/finance', icon: Wallet },
    { label: 'Tech Health', path: '/app/system', icon: Cpu },
    { label: 'My Notes', path: '/app/notes', icon: FileText },
  ];

  const protocolItems = [
    { label: 'Team Members', path: '/app/identity', icon: User },
    { label: 'Network Map', path: '/app/system', icon: Network },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] font-mono">
      <aside className="w-64 admin-sidebar flex flex-col z-20 border-r border-[#1f1f1f]">
        <div className="p-6 border-b border-[#1f1f1f] flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-accent flex items-center justify-center">
               <div className="w-4 h-4 bg-accent"></div>
            </div>
            <span className="text-lg tracking-[0.1em] font-bold">METALAB</span>
          </div>
          <span className="text-[9px] text-gray-500 uppercase tracking-widest">Management Portal</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
          <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-4 px-2">Main Menu</div>
          <div className="space-y-1 mb-8">
            {primaryItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 transition-all duration-200 ${
                    isActive 
                      ? 'bg-accent/10 text-accent border-l-2 border-accent' 
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={14} className={isActive ? 'text-accent' : 'text-gray-600'} />
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight size={10} className="text-accent" />}
                </Link>
              );
            })}
          </div>

          <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-4 px-2">Detailed View</div>
          <div className="space-y-1">
            {protocolItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 transition-all duration-200 ${
                    isActive 
                      ? 'bg-accent/10 text-accent border-l-2 border-accent' 
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={14} className={isActive ? 'text-accent' : 'text-gray-600'} />
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-[#1f1f1f] space-y-2">
          <Link 
            to="/app/profile"
            className={`w-full flex items-center gap-3 px-3 py-2 transition-colors ${location.pathname === '/app/profile' ? 'text-accent' : 'text-gray-600 hover:text-white'}`}
          >
            <User size={14} />
            <span className="text-[11px]">My Account</span>
          </Link>
          <Link 
            to="/app/settings"
            className={`w-full flex items-center gap-3 px-3 py-2 transition-colors ${location.pathname === '/app/settings' ? 'text-accent' : 'text-gray-600 hover:text-white'}`}
          >
            <Settings size={14} />
            <span className="text-[11px]">Settings</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <LogOut size={14} />
            <span className="text-[11px]">Log Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 px-8 flex items-center justify-between z-10 shrink-0 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-gray-600 uppercase">Location:</span>
            <span className="text-[11px] font-bold text-accent uppercase">
              {location.pathname.split('/').pop()?.replace('-', ' ')}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-[9px] text-gray-600 uppercase">Account Security</span>
              <span className="text-[11px] font-bold text-accent">High Protection</span>
            </div>
            <div className="h-8 w-px bg-[#1f1f1f]"></div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 uppercase">Status:</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 border border-accent/20 bg-accent/5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                <span className="text-[9px] text-accent font-bold uppercase tracking-tight">Active</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 relative custom-scrollbar bg-[#050505]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
