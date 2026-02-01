import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Briefcase, 
  Settings2,
  Clock,
  ArrowRight,
  Wallet,
  Zap,
  TrendingUp,
  Award,
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

export const Dashboard = () => {
  const navigate = useNavigate();
  const [totalMoney] = useState(54200);
  const [monthlyBudget] = useState(2250);
  const [projectCount] = useState(1);
  const [teamCount] = useState(3);

  const handleSafetyLock = () => {
    if (confirm("Would you like to log out and lock the system?")) {
      logout();
      navigate('/');
    }
  };

  const successScore = Math.floor((totalMoney / 1000) + (projectCount * 10) + (teamCount * 5));

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-sm flex gap-4">
        <Info className="text-accent shrink-0" size={20} />
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase mb-1">Welcome to your Dashboard</h4>
          <p className="text-[10px] text-gray-400">Main control page for oversight of money, team, and active projects.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1f1f1f] pb-8 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 border border-accent/20 bg-accent/5 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(14,165,233,0.1)]">
             <Award size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest">Main Dashboard</h1>
            <p className="text-gray-600 text-[10px] uppercase">Business Portal // Version 2.0</p>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="text-right">
            <div className="text-[9px] text-gray-600 uppercase mb-1">Success Score</div>
            <div className="text-2xl font-bold text-accent">{successScore}</div>
          </div>
          <div className="text-right border-l border-[#1f1f1f] pl-10">
            <div className="text-[9px] text-gray-600 uppercase mb-1">Total Savings</div>
            <div className="text-2xl font-bold text-white">${totalMoney.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-imperium p-6">
           <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={9} />
                <YAxis stroke="#444" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #1f1f1f' }} />
                <Area type="monotone" dataKey="growth" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.1} />
              </AreaChart>
           </ResponsiveContainer>
        </div>
        <div className="card-imperium p-6">
           <ResponsiveContainer width="100%" height={250}>
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                <XAxis dataKey="name" stroke="#444" fontSize={9} />
                <YAxis stroke="#444" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #1f1f1f' }} />
                <Bar dataKey="usage" fill="var(--accent)" fillOpacity={0.5} />
              </BarChart>
           </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={handleSafetyLock} className="card-imperium p-4 text-[10px] font-bold uppercase hover:bg-white/5">Sign Out</button>
        <Link to="/app/settings" className="card-imperium p-4 text-[10px] font-bold uppercase hover:bg-white/5 text-center">Settings</Link>
        <Link to="/app/system" className="card-imperium p-4 text-[10px] font-bold uppercase hover:bg-white/5 text-center">Health</Link>
        <Link to="/app/finance" className="card-imperium p-4 text-[10px] font-bold uppercase hover:bg-white/5 text-center">Finance</Link>
      </div>
    </div>
  );
};