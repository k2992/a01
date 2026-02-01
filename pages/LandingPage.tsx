
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Activity, Layers, Disc } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showSecretLink, setShowSecretLink] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogoClick = () => {
    setLogoClicks(prev => prev + 1);
  };

  useEffect(() => {
    if (logoClicks >= 5) {
      setShowSecretLink(true);
      const timer = setTimeout(() => {
        setLogoClicks(0);
        setShowSecretLink(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [logoClicks]);

  return (
    <div className="h-screen w-screen flex flex-col font-mono overflow-hidden relative selection:bg-sky-500 selection:text-black">
      {/* Dynamic Header */}
      <nav className="h-16 border-b border-white/5 px-8 flex items-center justify-between z-50">
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-4 cursor-default group"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
             <div className="absolute inset-0 rounded-full border border-sky-500/30 group-hover:border-sky-500 transition-colors duration-500"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div>
          </div>
          <span className="text-sm tracking-[0.5em] font-bold text-white/80 group-hover:text-white transition-colors">METALAB</span>
        </div>

        <div className="hidden md:flex items-center gap-12">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-600 uppercase tracking-widest">System_Time</span>
            <span className="text-[10px] text-sky-500">{time}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-600 uppercase tracking-widest">Uptime_Index</span>
            <span className="text-[10px] text-white">99.9997%</span>
          </div>
          <div className="h-8 w-px bg-white/5"></div>
          {showSecretLink && (
            <Link 
              to="/login" 
              className="text-[9px] text-sky-400 border border-sky-400/30 px-3 py-1 uppercase hover:bg-sky-500 hover:text-black transition-all animate-pulse"
            >
              Portal_Entry
            </Link>
          )}
        </div>
      </nav>

      {/* Main Mysterious Viewport */}
      <main className="flex-1 relative flex items-center justify-center p-8">
        {/* Subtle grid elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[70vh] border border-white/5 pointer-events-none -z-10">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-sky-500 opacity-20"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-sky-500 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-sky-500 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-sky-500 opacity-20"></div>
        </div>

        <div className="max-w-4xl w-full flex flex-col items-center">
          {/* Abstract Hero */}
          <div className="text-center space-y-2 mb-12">
            <div className="inline-block px-4 py-1 border border-white/5 mb-4">
               <span className="text-[9px] text-gray-500 uppercase tracking-[0.6em]">Protocol_a01</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
              Sovereign <span className="text-sky-500">Tier</span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 tracking-[0.4em] uppercase">
              <span>Identity</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>Integrity</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>Sovereignty</span>
            </div>
          </div>

          {/* Compact Info Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { icon: Terminal, label: 'Node_Status', val: 'Active' },
              { icon: Activity, label: 'Sync_Freq', val: '2.4 Thz' },
              { icon: Layers, label: 'Prot_Layer', val: 'Shielded' },
              { icon: Disc, label: 'Core_Ver', val: '2026.a01' }
            ].map((item, i) => (
              <div key={i} className="card-imperium p-4 flex flex-col gap-2 group hover:border-sky-500/50 transition-all">
                <item.icon size={14} className="text-sky-500/50 group-hover:text-sky-500" />
                <div>
                  <div className="text-[8px] text-gray-600 uppercase tracking-widest">{item.label}</div>
                  <div className="text-[10px] text-white tracking-widest uppercase">{item.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Abstract Data Visualization (Mini) */}
          <div className="mt-12 w-full max-w-lg h-12 flex items-end gap-1 px-4">
             {Array.from({length: 40}).map((_, i) => (
               <div 
                 key={i} 
                 className="flex-1 bg-white/5 hover:bg-sky-500/50 transition-all"
                 style={{ height: `${Math.random() * 100}%` }}
               ></div>
             ))}
          </div>
          <div className="mt-2 text-[8px] text-gray-700 uppercase tracking-[0.3em]">Sector_Flux_Monitoring</div>
        </div>
      </main>

      {/* Persistent Footer Stats */}
      <footer className="h-12 border-t border-white/5 px-8 flex items-center justify-between text-[9px] text-gray-600 uppercase tracking-widest z-50 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
            Tier_01_Global
          </span>
          <span className="hidden md:inline">Latency: 0.04ms</span>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy_Lex</a>
          <a href="#" className="hover:text-white transition-colors">Infra_Spec</a>
          <div className="flex items-center gap-2 cursor-default group">
            <span className="text-gray-800">Operational</span>
            <Link 
              to="/login" 
              className="w-2 h-2 rounded-full bg-sky-900 group-hover:bg-sky-500 transition-colors"
            />
          </div>
        </div>
      </footer>

      {/* Side HUD Elements */}
      <div className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 space-y-4 opacity-30">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
        <div className="vertical-text text-[8px] tracking-[0.5em] text-white uppercase whitespace-nowrap" style={{writingMode: 'vertical-rl'}}>SOVEREIGN_INFRASTRUCTURE</div>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
      </div>
      
      <div className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 space-y-4 opacity-30">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
        <div className="vertical-text text-[8px] tracking-[0.5em] text-white uppercase whitespace-nowrap" style={{writingMode: 'vertical-rl'}}>METALAB_CORPORATION_2026</div>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-auto"></div>
      </div>
    </div>
  );
};

export default LandingPage;
