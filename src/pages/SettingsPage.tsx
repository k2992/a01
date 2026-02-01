import { useState } from 'react';
import { 
  Palette, 
  Shield, 
  Database, 
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

export const SettingsPage = () => {
  const [accent, setAccent] = useState('#0ea5e9');
  const [securityStates, setSecurityStates] = useState({
    autoLock: true,
    stealth: false,
    encryption: true
  });

  const handleAccentChange = (hex: string) => {
    setAccent(hex);
    document.documentElement.style.setProperty('--accent', hex);
  };

  const commitChanges = () => {
    alert("COMMITTING_CONFIG: System variables updated locally for this session.");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between border-b border-[#1f1f1f] pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">Preferences</h1>
          <p className="text-gray-500 text-[10px] mt-1 uppercase">Local Session Configuration</p>
        </div>
        <button onClick={commitChanges} className="px-6 py-2 bg-accent text-black text-[9px] uppercase font-bold hover:opacity-80 transition-all">
          Commit Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
        <section className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-2">
             <Palette size={14} /> Theme
           </h3>
           <div className="card-imperium p-6 space-y-6">
              <div className="flex gap-3">
                 {ACCENTS.map((c, i) => (
                   <div 
                     key={i} 
                     onClick={() => handleAccentChange(c.hex)}
                     className={`w-8 h-8 border flex items-center justify-center ${accent === c.hex ? 'border-white scale-110' : 'border-[#1f1f1f]'} cursor-pointer hover:scale-110 transition-all`}
                     style={{ backgroundColor: c.hex }}
                   >
                      {accent === c.hex && <Check size={12} className="text-white" />}
                   </div>
                 ))}
              </div>
           </div>
        </section>

        <section className="space-y-4">
           <h3 className="text-[10px] font-bold uppercase text-gray-500 flex items-center gap-2">
             <Shield size={14} /> Security
           </h3>
           <div className="card-imperium p-6 space-y-6">
              {[
                { key: 'autoLock', label: 'AUTO_LOCK_IDLE', icon: Lock },
                { key: 'stealth', label: 'STEALTH_MODE', icon: Eye },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <s.icon size={16} className="text-gray-600" />
                      <span className="text-[10px] font-bold text-white uppercase">{s.label}</span>
                   </div>
                   <div 
                    onClick={() => setSecurityStates(prev => ({...prev, [s.key]: !prev[s.key as keyof typeof prev]}))}
                    className={`w-8 h-4 border ${securityStates[s.key as keyof typeof securityStates] ? 'border-accent/50 bg-accent/10' : 'border-gray-800 bg-gray-900'} relative cursor-pointer`}
                   >
                      <div className={`absolute top-0 w-4 h-full ${securityStates[s.key as keyof typeof securityStates] ? 'right-0 bg-accent' : 'left-0 bg-gray-700'}`}></div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};