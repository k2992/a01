import { Lock, Cpu, Server, Zap } from 'lucide-react';

export const AdminCore = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">Admin Core</h1>
          <p className="text-gray-500 text-[10px] mt-1 uppercase">Infrastructure Level: Root</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-imperium p-6">
            <h3 className="text-xs font-bold uppercase mb-6 flex items-center gap-2">
              <Zap size={14} className="text-accent" /> Protocols
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'HARDENED_SHELL', status: 'ACTIVE' },
                { label: 'GEO_SHARDING', status: 'STANDBY' },
              ].map((p, i) => (
                <div key={i} className="p-4 border border-[#1f1f1f] bg-black/40 hover:border-accent/30 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold tracking-widest">{p.label}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 border ${p.status === 'ACTIVE' ? 'border-accent/50 text-accent' : 'border-gray-800 text-gray-600'}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-imperium p-6 border-accent/20">
            <h3 className="text-xs font-bold uppercase mb-6">Security</h3>
            <div className="flex items-center justify-center py-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border border-accent/10 flex items-center justify-center animate-spin-slow">
                  <div className="w-20 h-20 rounded-full border border-accent/30 border-t-accent"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={24} className="text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};