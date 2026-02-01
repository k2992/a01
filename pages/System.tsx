
import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Cpu, 
  RefreshCcw, 
  Server,
  Zap,
  Play,
  Square,
  ShieldCheck,
  Grid,
  HelpCircle,
  History,
  Info
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  status: 'Running' | 'Stopped' | 'Issue' | 'Starting';
  howLong: string;
  useLevel: number;
}

const System: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    "System started successfully at 9:00 AM",
    "Connecting to central server...",
    "All security checks passed."
  ]);
  
  const [locations, setLocations] = useState([
    { id: 'London Office', load: 12, status: 'Active' },
    { id: 'New York Office', load: 45, status: 'Active' },
    { id: 'Tokyo Hub', load: 0, status: 'Offline' },
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: 'S_01', name: 'Login System', status: 'Running', howLong: '142 Days', useLevel: 2 },
    { id: 'S_02', name: 'Payments Processor', status: 'Running', howLong: '12 Days', useLevel: 15 },
    { id: 'S_03', name: 'Security Firewall', status: 'Issue', howLong: '8 Hours', useLevel: 88 },
    { id: 'S_04', name: 'Database Storage', status: 'Stopped', howLong: '--', useLevel: 0 },
  ]);

  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [...prev, `${time} - ${msg}`]);
  };

  useEffect(() => {
    if (logContainerRef.current) logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [logs]);

  const toggleLocation = (id: string) => {
    setLocations(prev => prev.map(loc => loc.id === id ? { ...loc, status: loc.status === 'Active' ? 'Offline' : 'Active' } : loc));
    addLog(`Changed status for ${id}`);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto font-mono pb-20">
      {/* Help Banner */}
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-sm flex gap-4">
        <Info className="text-accent shrink-0" size={20} />
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase mb-1">Service & Tech Monitor</h4>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            This page shows you the technical health of your platform. You can see which services are currently <b>Running</b> and if there are any <b>Issues</b>.
            Use the <b>Activity Log</b> at the bottom to see a history of what the system has been doing.
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between border-b border-[#1f1f1f] pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">Tech Health</h1>
          <p className="text-gray-500 text-[10px] uppercase">Monitoring all business services</p>
        </div>
        <button onClick={() => addLog("Refreshing all system data...")} className="px-4 py-2 border border-[#1f1f1f] text-[10px] font-bold uppercase hover:bg-white/5 transition-all text-gray-500 hover:text-white">
          <RefreshCcw size={12} className="inline mr-2" /> Refresh Status
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Services Section */}
          <section className="border border-[#1f1f1f] bg-black/40 p-6 space-y-6 rounded-sm">
             <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
                  <Grid size={14} /> Main Services
                </h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(s => (
                  <div key={s.id} className="p-4 border border-[#1f1f1f] bg-black/20 rounded-sm">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <div className="text-[11px] font-bold text-white uppercase tracking-tight">{s.name}</div>
                           <div className="text-[8px] text-gray-600 mt-1 uppercase">Uptime: {s.howLong}</div>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 border font-bold ${
                          s.status === 'Running' ? 'border-accent/50 text-accent' :
                          s.status === 'Issue' ? 'border-amber-500/50 text-amber-500' :
                          'border-red-900/50 text-red-700'
                        }`}>{s.status}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-gray-900 rounded-full">
                           <div className={`h-full rounded-full ${s.useLevel > 80 ? 'bg-red-500' : 'bg-accent'}`} style={{ width: `${s.useLevel}%` }}></div>
                        </div>
                        <span className="text-[9px] text-gray-600 font-bold">{s.useLevel}% Usage</span>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Activity Log */}
          <section className="border border-[#1f1f1f] bg-black/20 flex flex-col h-[250px] rounded-sm overflow-hidden">
             <div className="bg-[#111] px-4 py-2 border-b border-[#1f1f1f] flex items-center gap-2">
                <History size={14} className="text-gray-500" />
                <h3 className="text-[11px] font-bold uppercase text-gray-500">Activity History</h3>
             </div>
             <div ref={logContainerRef} className="flex-1 overflow-y-auto p-6 text-[11px] space-y-1 bg-black/60 custom-scrollbar text-gray-400">
                {logs.map((log, i) => <div key={i}>{log}</div>)}
                <div className="text-accent animate-pulse">|</div>
             </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <section className="border border-[#1f1f1f] bg-black/40 p-6 space-y-6 rounded-sm">
              <h3 className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
                 <ShieldCheck size={14} /> System Health
              </h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 uppercase">Response Time</span>
                    <span className="text-[11px] text-accent font-bold">Fast</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 uppercase">Memory Used</span>
                    <span className="text-[11px] text-amber-500 font-bold">High (92%)</span>
                 </div>
                 <div className="h-1.5 w-full bg-gray-900 rounded-full">
                    <div className="h-full bg-amber-500 w-[92%] rounded-full"></div>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default System;
