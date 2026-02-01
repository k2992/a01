import { useState } from 'react';
// Fix: Added missing Link import from react-router-dom
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Settings2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Info,
  ShieldAlert
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
  { name: '01', growth: 45000, usage: 20 },
  { name: '02', growth: 48000, usage: 35 },
  { name: '03', growth: 47500, usage: 25 },
  { name: '04', growth: 52000, usage: 50 },
  { name: '05', growth: 53500, usage: 30 },
  { name: '06', growth: 55000, usage: 45 },
  { name: '07', growth: 54200, usage: 40 },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [totalMoney] = useState(54200);
  const [successScore] = useState(1284);

  const handleSafetyLock = () => {
    if (confirm("Initiate emergency lockout?")) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="p-5 bg-accent/5 border border-accent/20 rounded-sm flex gap-5">
        <Info className="text-accent shrink-0" size={20} />
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.1em] mb-1">Imperium Control Initialized</h4>
          <p className="text-[10px] text-neutral-500 leading-relaxed uppercase tracking-tighter">Oversight active for all distributed nodes. Telemetry is being streamed from Sovereign Tier core.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-10 gap-8">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 border border-accent/20 bg-accent/5 flex items-center justify-center text-accent shadow-[0_0_25px_rgba(14,165,233,0.1)] relative">
             <div className="absolute inset-0 border border-white/5 m-1"></div>
             <Award size={36} />
          </div>
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-[0.3em]">Imperium <span className="text-accent">Control</span></h1>
            <div className="flex items-center gap-4 mt-2">
               <span className="text-neutral-600 text-[10px] uppercase font-bold tracking-widest">Protocol: TIER_01 // SEC_LVL: ALPHA</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-12">
          <div className="text-right">
            <div className="text-[10px] text-neutral-600 uppercase mb-1 font-bold tracking-widest">Success_Score</div>
            <div className="text-3xl font-bold text-accent tracking-tighter">{successScore}</div>
          </div>
          <div className="text-right border-l border-white/5 pl-12">
            <div className="text-[10px] text-neutral-600 uppercase mb-1 font-bold tracking-widest">Total_Capital</div>
            <div className="text-3xl font-bold text-white tracking-tighter">${totalMoney.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card-imperium p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-bold uppercase text-neutral-500 tracking-[0.2em] flex items-center gap-2">
                <TrendingUp size={14} /> Metric Growth Forecast
              </h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 text-[9px] text-accent font-bold"><div className="w-1.5 h-1.5 bg-accent"></div> LIVE</div>
              </div>
           </div>
           <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />
                <XAxis dataKey="name" stroke="#333" fontSize={9} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#333" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #111', fontSize: '10px', color: '#fff' }} />
                <Area type="monotone" dataKey="growth" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorAccent)" strokeWidth={2} />
              </AreaChart>
           </ResponsiveContainer>
        </div>

        <div className="card-imperium p-8">
           <h3 className="text-[10px] font-bold uppercase text-neutral-500 tracking-[0.2em] mb-8 flex items-center gap-2">
              <Activity size={14} /> Usage Spectrum
           </h3>
           <ResponsiveContainer width="100%" height={280}>
              <BarChart data={MOCK_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />
                <XAxis dataKey="name" stroke="#333" fontSize={9} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#333" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #111', fontSize: '10px' }} />
                <Bar dataKey="usage" fill="#0ea5e9" fillOpacity={0.5} radius={[2, 2, 0, 0]} />
              </BarChart>
           </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: ShieldAlert, label: 'Safety_Lock', path: '#', action: handleSafetyLock, danger: true },
          { icon: Settings2, label: 'Preference_V3', path: '/app/settings' },
          { icon: Clock, label: 'Ref_Interval', path: '/app/system' },
          { icon: TrendingUp, label: 'Growth_Logs', path: '/app/finance' },
        ].map((item, i) => (
          <button 
            key={i} 
            onClick={item.action ? item.action : undefined}
            className={`card-imperium p-6 flex flex-col items-center gap-3 group transition-all text-center ${item.danger ? 'hover:bg-red-500/10 hover:border-red-500/50' : 'hover:bg-white/5 hover:border-accent/50'}`}
          >
            {item.path && !item.action ? <Link to={item.path} className="absolute inset-0"></Link> : null}
            <item.icon size={18} className={item.danger ? 'text-red-900 group-hover:text-red-500' : 'text-neutral-700 group-hover:text-accent'} />
            <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${item.danger ? 'text-neutral-600 group-hover:text-red-500' : 'text-neutral-500 group-hover:text-white'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};