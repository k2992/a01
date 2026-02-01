import { useState, useRef, useEffect } from 'react';
import { 
  RefreshCcw, 
  Grid,
  History,
  Info
} from 'lucide-react';

export const System = () => {
  const [logs] = useState<string[]>([
    "System started successfully at 9:00 AM",
    "Connecting to central server...",
    "All security checks passed."
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-sm flex gap-4">
        <Info className="text-accent shrink-0" size={20} />
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase mb-1">Health Monitor</h4>
          <p className="text-[10px] text-gray-400">Technical health of the platform nodes and services.</p>
        </div>
      </div>

      <div className="flex items-end justify-between border-b border-[#1f1f1f] pb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Tech Health</h1>
        <button className="px-4 py-2 border border-[#1f1f1f] text-[10px] font-bold uppercase hover:bg-white/5 text-gray-500 hover:text-white transition-all">
          <RefreshCcw size={12} className="inline mr-2" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="card-imperium p-6">
             <h3 className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2 mb-6">
                <Grid size={14} /> Services
             </h3>
             <div className="p-4 border border-[#1f1f1f] bg-black/20">
                <div className="flex justify-between items-center mb-4">
                   <span className="text-[11px] font-bold uppercase">Main Server</span>
                   <span className="text-[9px] text-accent border border-accent/20 px-2">Online</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full">
                   <div className="h-full bg-accent w-[12%] rounded-full"></div>
                </div>
             </div>
          </section>

          <section className="card-imperium overflow-hidden h-[250px] flex flex-col">
             <div className="bg-[#111] px-4 py-2 border-b border-[#1f1f1f] flex items-center gap-2">
                <History size={14} className="text-gray-500" />
                <h3 className="text-[11px] font-bold uppercase text-gray-500">Activity</h3>
             </div>
             <div ref={logContainerRef} className="flex-1 overflow-y-auto p-6 text-[11px] space-y-1 custom-scrollbar text-gray-400">
                {logs.map((log, i) => <div key={i}>{log}</div>)}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};