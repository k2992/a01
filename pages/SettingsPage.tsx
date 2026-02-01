
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Palette, 
  Shield, 
  Database, 
  Monitor,
  Lock,
  Eye,
  Globe,
  Check
} from 'lucide-react';

const ACCENTS = [
  { name: 'SKY_BLUE', hex: '#0ea5e9' },
  { name: 'RED_PURGE', hex: '#ef4444' },
  { name: 'EMERALD_SYNC', hex: '#10b981' },
  { name: 'AMBER_WARN', hex: '#f59e0b' },
  { name: 'VIOLET_CORE', hex: '#8b5cf6' }
];

const SettingsPage: React.FC = () => {
  const [accent, setAccent] = useState(localStorage.getItem('metalab_accent_color') || '#0ea5e9');
  const [securityStates, setSecurityStates] = useState({
    autoLock: true,
    stealth: false,
    encryption: true
  });

  const handleAccentChange = (hex: string) => {
    setAccent(hex);
    localStorage.setItem('metalab_accent_color', hex);
    document.documentElement.style.setProperty('--accent', hex);
  };

  const commitChanges = () => {
    alert("COMMITTING_CONFIG: System variables updated across all nodes.");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-mono">
      <div className="flex items-end justify-between border-b border-[#1f1f1f] pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">SYSTEM_PREFERENCES</h1>
          <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider">Local Config Override: ENABLED // SECTOR: DELTA-9</p>
        </div>
        <button 
          onClick={commitChanges}
          className="px-6 py-2 bg-accent text-white text-[9px] uppercase tracking-widest font-bold hover:opacity-80 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        >
          COMMIT_CHANGES
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
        
        {/* INTERFACE CONFIG */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
             <Palette size={14} /> INTERFACE_THEME
           </h3>
           <div className="border border-[#1f1f1f] bg-black/40 p-6 space-y-6">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <div className="text-[10px] font-bold text-white uppercase tracking-widest">Protocol_Black</div>
                    <div className="text-[8px] text-gray-600 uppercase tracking-widest">Optimized for low-light command centers</div>
                 </div>
                 <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                 </div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[9px] text-gray-500 uppercase tracking-widest">
                    <span>Accent_Color</span>
                    <span className="text-accent font-bold">{ACCENTS.find(a => a.hex === accent)?.name || 'CUSTOM'}</span>
                 </div>
                 <div className="flex gap-3">
                    {ACCENTS.map((c, i) => (
                      <div 
                        key={i} 
                        onClick={() => handleAccentChange(c.hex)}
                        className={`w-8 h-8 border flex items-center justify-center ${accent === c.hex ? 'border-white scale-110 shadow-lg' : 'border-[#1f1f1f]'} cursor-pointer hover:scale-110 transition-all`}
                        style={{ backgroundColor: c.hex }}
                      >
                         {accent === c.hex && <Check size={12} className="text-white" />}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* SECURITY CONFIG */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
             <Shield size={14} /> SECURITY_ENFORCEMENT
           </h3>
           <div className="border border-[#1f1f1f] bg-black/40 p-6 space-y-6">
              {[
                { key: 'autoLock', label: 'AUTO_LOCK_IDLE', icon: Lock },
                { key: 'stealth', label: 'STEALTH_MODE', icon: Eye },
                { key: 'encryption', label: 'ENCRYPTED_PERSISTENCE', icon: Shield },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between border-b border-[#1f1f1f] pb-4 last:border-0 last:pb-0">
                   <div className="flex items-center gap-4">
                      <s.icon size={16} className="text-gray-600" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{s.label}</span>
                   </div>
                   <div 
                    onClick={() => setSecurityStates(prev => ({...prev, [s.key]: !prev[s.key as keyof typeof prev]}))}
                    className={`w-8 h-4 border ${securityStates[s.key as keyof typeof securityStates] ? 'border-accent/50 bg-accent/10' : 'border-gray-800 bg-gray-900'} relative cursor-pointer transition-colors`}
                   >
                      <div className={`absolute top-0 w-4 h-full transition-all duration-200 ${securityStates[s.key as keyof typeof securityStates] ? 'right-0 bg-accent' : 'left-0 bg-gray-700'}`}></div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* INFRA CONFIG */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
             <Database size={14} /> STORAGE_&_BACKUPS
           </h3>
           <div className="border border-[#1f1f1f] bg-black/40 p-6 space-y-6">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">CLOUD_SYNC</span>
                 <span className="text-[8px] text-accent font-bold uppercase tracking-widest animate-pulse">LIVE_SYNCING...</span>
              </div>
              <div className="space-y-2">
                 <button className="w-full py-3 border border-accent/20 bg-accent/5 text-accent text-[9px] font-bold uppercase tracking-widest hover:bg-accent/10 transition-colors">INITIATE_REMOTE_BACKUP</button>
                 <button className="w-full py-3 border border-[#1f1f1f] text-gray-600 text-[9px] font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-colors">FLUSH_CACHE_DATA</button>
              </div>
           </div>
        </section>

        {/* LOCALIZATION */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
             <Globe size={14} /> LOCALIZATION_SYSTEM
           </h3>
           <div className="border border-[#1f1f1f] bg-black/40 p-6 space-y-4">
              <div className="space-y-1">
                 <div className="text-[10px] font-bold text-white uppercase tracking-widest">TIME_ZONE_ANCHOR</div>
                 <div className="text-[8px] text-gray-600 uppercase tracking-widest">Coordinate from System BIOS or Network</div>
              </div>
              <div className="flex gap-4">
                 <div className="flex-1 p-3 border border-accent/30 bg-accent/5 text-accent text-center text-[9px] font-bold uppercase tracking-widest">UTC_DEFAULT</div>
                 <div className="flex-1 p-3 border border-[#1f1f1f] text-gray-700 text-center text-[9px] font-bold uppercase tracking-widest">NETWORK_LOCK</div>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
};

export default SettingsPage;
