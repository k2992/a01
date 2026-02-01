import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Cpu, 
  RefreshCcw, 
  LogOut, 
  Server, 
  Database, 
  Globe
} from 'lucide-react';
import { logout, checkHealth } from '../services/api';

export const Office = () => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await checkHealth();
    setTimeout(() => setRefreshing(false), 800);
  };

  const services = [
    { id: 'AUTH-NODE-01', label: 'Identity_Sync', status: 'Online', load: '12%' },
    { id: 'TELE-STOR-02', label: 'Metric_Buffer', status: 'Online', load: '45%' },
    { id: 'EDGE-ROUT-03', label: 'Traffic_Ingress', status: 'Online', load: '22%' },
    { id: 'CORE-SCHD-04', label: 'Task_Scheduler', status: 'Online', load: '08%' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-neutral-900 pb-8">
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold uppercase tracking-[0.3em] text-white">Office_Dashboard</h1>
          <div className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Operator_UID: ADMIN_CORE // Session: ACTIVE</div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-800 text-[10px] uppercase font-bold text-neutral-500 hover:text-white hover:border-neutral-600 transition-all rounded-lg"
          >
            <RefreshCcw size={12} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 bg-neutral-100 text-neutral-950 text-[10px] uppercase font-bold hover:bg-red-500 hover:text-white transition-all rounded-lg shadow-md"
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Uptime', val: '99.99%', icon: Activity },
          { label: 'Network', val: '32.4 Gb/s', icon: Globe },
          { label: 'Telemetry', val: 'Idx: 0.42', icon: Cpu },
          { label: 'Build', val: 'Verified', icon: Database },
        ].map((panel, i) => (
          <div key={i} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 flex items-start justify-between group hover:border-neutral-700 transition-colors shadow-sm">
            <div className="space-y-2">
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{panel.label}</div>
              <div className="text-xl font-bold text-neutral-100 tracking-tight">{panel.val}</div>
            </div>
            <panel.icon size={18} className="text-neutral-700 group-hover:text-accent transition-colors" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/20 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-900/40 flex items-center gap-2">
          <Server size={14} className="text-neutral-500" />
          <h3 className="text-[11px] font-bold uppercase text-neutral-400 tracking-widest">Service_Registry</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] uppercase tracking-wider">
            <thead>
              <tr className="text-neutral-600 border-b border-neutral-800/50 font-bold">
                <th className="px-6 py-4">Service_Ident</th>
                <th className="px-6 py-4">Operational_Label</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Node_Load</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50 text-neutral-400">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-neutral-800/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-[10px] text-neutral-500">{s.id}</td>
                  <td className="px-6 py-4 font-bold text-neutral-300">{s.label}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-neutral-500">{s.load}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] text-neutral-700 uppercase tracking-[0.3em] font-bold border-t border-neutral-900 pt-8">
        <div className="flex items-center gap-6">
          <span>Tier: ALPHA_RESTRICTED</span>
          <span>Node: EU_WEST_1</span>
        </div>
        <span>Operational_State: Synchronized</span>
      </div>
    </div>
  );
};