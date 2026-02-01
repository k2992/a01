
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Cpu, 
  ShieldCheck, 
  Briefcase, 
  Settings2,
  Clock,
  ArrowRight,
  Wallet,
  Zap,
  TrendingUp,
  Award,
  HelpCircle,
  Info
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { logout } from '../services/api';

const MOCK_CHART_DATA = [
  { name: 'Week 1', growth: 45000, usage: 20 },
  { name: 'Week 2', growth: 48000, usage: 35 },
  { name: 'Week 3', growth: 47500, usage: 25 },
  { name: 'Week 4', growth: 52000, usage: 50 },
  { name: 'Week 5', growth: 53500, usage: 30 },
  { name: 'Week 6', growth: 55000, usage: 45 },
  { name: 'Week 7', growth: 54200, usage: 40 },
];

const Control: React.FC = () => {
  const navigate = useNavigate();
  const [totalMoney, setTotalMoney] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);

  useEffect(() => {
    const assets = JSON.parse(localStorage.getItem('metalab_assets') || '[]');
    const assetsTotal = assets.reduce((acc: number, a: any) => acc + (a.value || 0), 0);
    
    const autos = JSON.parse(localStorage.getItem('metalab_automations') || '[]');
    const income = autos.filter((a: any) => a.type === 'INCOMING' && a.status === 'ACTIVE').reduce((acc: number, a: any) => acc + a.amount, 0);
    const expenses = autos.filter((a: any) => a.type === 'OUTGOING' && a.status === 'ACTIVE').reduce((acc: number, a: any) => acc + a.amount, 0);
    
    setTotalMoney(assetsTotal);
    setMonthlyBudget(income - expenses);

    const projects = JSON.parse(localStorage.getItem('metalab_projects') || '[]');
    setProjectCount(projects.filter((p: any) => p.status === 'ACTIVE').length);

    const team = JSON.parse(localStorage.getItem('metalab_personnel') || '[]');
    setTeamCount(team.length + 1);
  }, []);

  const handleSafetyLock = () => {
    if (confirm("Would you like to log out and lock the system? This is for your security.")) {
      logout();
      navigate('/');
    }
  };

  const overallSuccessScore = Math.floor((totalMoney / 1000) + (projectCount * 10) + (teamCount * 5));

  return (
    <div className="space-y-10 max-w-7xl mx-auto font-mono pb-20">
      {/* Help Banner */}
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-sm flex gap-4">
        <Info className="text-accent shrink-0" size={20} />
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase mb-1">Welcome to your Dashboard</h4>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            This is your main control page. You can see your money, your team, and your current projects below. 
            Use the sidebar on the left to navigate to different sections of your business.
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1f1f1f] pb-8 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 border border-accent/20 bg-accent/5 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(14,165,233,0.1)]">
             <Award size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest">Main Dashboard</h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5 px-2 py-0.5 border border-accent/20 bg-accent/5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                <span className="text-[9px] text-accent font-bold uppercase tracking-tight">System Online</span>
              </div>
              <p className="text-gray-600 text-[10px] uppercase">Business Portal // Version 2.0</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-10">
          <div className="text-right">
            <div className="text-[9px] text-gray-600 uppercase mb-1">Success Score</div>
            <div className="text-2xl font-bold text-accent tracking-tighter">{overallSuccessScore.toLocaleString()}</div>
          </div>
          <div className="text-right border-l border-[#1f1f1f] pl-10">
            <div className="text-[9px] text-gray-600 uppercase mb-1">Total Savings</div>
            <div className="text-2xl font-bold text-white tracking-tighter">${totalMoney.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 border border-[#1f1f1f] bg-black/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
              <TrendingUp size={14} /> Financial Growth (30 Days)
            </h3>
            <span className="text-[9px] text-accent font-bold uppercase">Showing Recent Data</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#444" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #1f1f1f', fontSize: '11px' }} />
                <Area type="monotone" dataKey="growth" stroke="var(--accent)" fillOpacity={1} fill="url(#colorGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="border border-[#1f1f1f] bg-black/40 p-6 space-y-6">
          <h3 className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
            <Activity size={14} /> Platform Usage
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#444" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #1f1f1f', fontSize: '11px' }} />
                <Bar dataKey="usage" fill="var(--accent)" opacity={0.5} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="pt-2 border-t border-[#1f1f1f] text-[9px] text-gray-600 uppercase text-center">System is running well</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Link */}
        <div className="border border-[#1f1f1f] bg-black/40 p-6 space-y-4 group hover:border-accent/30 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
              <Briefcase size={14} /> Active Projects
            </h3>
            <Link to="/app/projects" className="text-accent hover:opacity-80">
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-white font-bold">{projectCount} Ongoing Items</div>
            <div className="text-[9px] text-gray-600 uppercase">Everything is on schedule</div>
          </div>
        </div>

        {/* Finance Link */}
        <div className="border border-[#1f1f1f] bg-black/40 p-6 space-y-4 group hover:border-accent/30 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
              <Wallet size={14} /> Money & Balance
            </h3>
            <Link to="/app/finance" className="text-accent hover:opacity-80">
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-white font-bold">${totalMoney.toLocaleString()} Total</div>
            <div className="text-[9px] text-accent font-bold uppercase">Monthly flow: ${monthlyBudget.toLocaleString()}</div>
          </div>
        </div>

        {/* Team Link */}
        <div className="border border-[#1f1f1f] bg-black/40 p-6 space-y-4 group hover:border-accent/30 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
              <Activity size={14} /> Team Members
            </h3>
            <Link to="/app/identity" className="text-accent hover:opacity-80">
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center text-[10px]">
               <span className="text-gray-500 uppercase">Total Personnel</span>
               <span className="text-white font-bold">{teamCount} People</span>
            </div>
            <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
               <div className="h-full bg-accent w-[60%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={handleSafetyLock}
          className="border border-[#1f1f1f] bg-black/40 p-4 flex flex-col items-center gap-2 hover:bg-red-500/10 transition-colors text-center group text-gray-600 hover:text-red-500"
        >
          <ShieldCheck size={16} />
          <span className="text-[10px] font-bold uppercase">Sign Out & Lock</span>
        </button>
        <Link to="/app/settings" className="border border-[#1f1f1f] bg-black/40 p-4 flex flex-col items-center gap-2 hover:bg-white/5 transition-colors text-center group text-gray-600 hover:text-white">
          <Settings2 size={16} className="group-hover:text-accent" />
          <span className="text-[10px] font-bold uppercase">Change Theme</span>
        </Link>
        <Link to="/app/system" className="border border-[#1f1f1f] bg-black/40 p-4 flex flex-col items-center gap-2 hover:bg-white/5 transition-colors text-center group text-gray-600 hover:text-white">
          <Clock size={16} className="group-hover:text-accent" />
          <span className="text-[10px] font-bold uppercase">Server Refresh</span>
        </Link>
        <Link to="/app/finance" className="border border-[#1f1f1f] bg-black/40 p-4 flex flex-col items-center gap-2 hover:bg-white/5 transition-colors text-center group text-gray-600 hover:text-white">
          <Zap size={16} className="group-hover:text-accent" />
          <span className="text-[10px] font-bold uppercase">Pay Bills</span>
        </Link>
      </div>
    </div>
  );
};

export default Control;
