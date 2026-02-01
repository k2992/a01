
import React from 'react';
import { Shield, Zap, Globe, Lock, Cpu, Server, Activity } from 'lucide-react';

const AdminCore: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto font-mono">
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">ADMIN_CORE</h1>
          <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider">Infrastructure Level: ROOT // CORE_SYSTEMS_ACTIVE</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-red-900/50 text-red-500 text-[9px] uppercase tracking-widest hover:bg-red-500/5 transition-colors">EMERGENCY_LOCK</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Protocols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-imperium p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap size={14} className="text-sky-500" />
              SYSTEM_PROTOCOLS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'HARDENED_SHELL', status: 'ACTIVE', desc: 'Layer 7 deep packet inspection and filtering' },
                { label: 'AUTO_REDUNDANCY', status: 'ACTIVE', desc: 'Real-time node failover orchestration' },
                { label: 'GEO_SHARDING', status: 'STANDBY', desc: 'Distributed data partition across sectors' },
                { label: 'QUANTUM_SIG', status: 'ACTIVE', desc: 'Next-gen cryptographic authentication' },
              ].map((p, i) => (
                <div key={i} className="p-4 border border-[#1f1f1f] bg-black/40 hover:border-sky-500/30 transition-all cursor-default">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold tracking-widest">{p.label}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 border ${p.status === 'ACTIVE' ? 'border-sky-500/50 text-sky-500' : 'border-gray-800 text-gray-600'}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-500 leading-relaxed uppercase">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-imperium p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Server size={14} className="text-sky-500" />
              INFRASTRUCTURE_NODES
            </h3>
            <div className="space-y-3">
              {[
                { node: 'ALPHA-01', location: 'EU_CENTRAL', load: '12%', status: 'ONLINE' },
                { node: 'BETA-07', location: 'US_EAST', load: '45%', status: 'ONLINE' },
                { node: 'GAMMA-03', location: 'ASIA_PACIFIC', load: '88%', status: 'WARN' },
                { node: 'SIGMA-X', location: 'ORBITAL_HUB', load: '05%', status: 'ONLINE' },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between p-3 border-l-2 border-[#1f1f1f] bg-white/5 hover:border-sky-500 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                    <div>
                      <div className="text-[10px] font-bold tracking-widest">{n.node}</div>
                      <div className="text-[8px] text-gray-600 uppercase">{n.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-[8px] text-gray-600">CPU_LOAD</div>
                      <div className="text-[10px] text-white">{n.load}</div>
                    </div>
                    <span className={`text-[9px] font-bold ${n.status === 'WARN' ? 'text-yellow-500' : 'text-sky-500'}`}>{n.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <div className="card-imperium p-6 border-sky-500/20">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">SECURITY_STATUS</h3>
            <div className="flex items-center justify-center py-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border border-sky-500/10 flex items-center justify-center animate-spin-slow">
                  <div className="w-20 h-20 rounded-full border border-sky-500/30 border-t-sky-500"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={24} className="text-sky-500" />
                </div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-[10px] font-bold uppercase">PERIMETER_SECURED</div>
              <div className="text-[8px] text-gray-500 uppercase tracking-widest">Active Threats: 00</div>
            </div>
            <button className="w-full mt-6 py-2 bg-sky-600/10 border border-sky-500/30 text-sky-400 text-[9px] uppercase tracking-widest font-bold hover:bg-sky-500/20 transition-all">
              RUN_VULN_SCAN
            </button>
          </div>

          <div className="card-imperium p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">ACCESS_POLICIES</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400 uppercase">Multi-Factor Auth</span>
                <div className="w-8 h-4 bg-sky-500/20 border border-sky-500/50 relative cursor-pointer">
                  <div className="absolute top-0 right-0 w-4 h-full bg-sky-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400 uppercase">IP_Whitelisting</span>
                <div className="w-8 h-4 bg-gray-900 border border-gray-700 relative cursor-pointer">
                  <div className="absolute top-0 left-0 w-4 h-full bg-gray-600"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400 uppercase">Hardware_Keys</span>
                <div className="w-8 h-4 bg-sky-500/20 border border-sky-500/50 relative cursor-pointer">
                  <div className="absolute top-0 right-0 w-4 h-full bg-sky-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCore;
