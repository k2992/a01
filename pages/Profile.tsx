
import React from 'react';
import { User, Shield, Key, Mail, Globe, Monitor, Smartphone, Terminal } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto font-mono">
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">USER_IDENTITY</h1>
          <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider">Access Tier: OVERSEER // UID_88201-B</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-[#1f1f1f] text-[9px] uppercase tracking-widest hover:bg-white/5 transition-colors">UPDATE_IDENT</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Identity Summary */}
        <div className="space-y-6">
          <div className="card-imperium p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 border border-sky-500/30 p-1 mb-6">
              <div className="w-full h-full bg-gray-900 flex items-center justify-center text-sky-500">
                <User size={40} />
              </div>
            </div>
            <h2 className="text-lg font-bold tracking-widest">ADMIN_ROOT</h2>
            <div className="text-[9px] text-sky-500 uppercase tracking-widest mb-4">Infrastructure Oversight</div>
            <div className="flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-sm">
              <Shield size={10} className="text-sky-500" />
              <span className="text-[8px] font-bold text-sky-400">CLASS_4_AUTH</span>
            </div>
          </div>

          <div className="card-imperium p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">IDENT_DETAILS</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[8px] text-gray-600 uppercase">Primary_Email</div>
                <div className="text-[11px] text-gray-300">root@metalab.corp</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-600 uppercase">Linked_Nodes</div>
                <div className="text-[11px] text-gray-300">ALPHA_07, BETA_01</div>
              </div>
              <div>
                <div className="text-[8px] text-gray-600 uppercase">Join_Date</div>
                <div className="text-[11px] text-gray-300">2026.01.12</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="lg:col-span-3 space-y-6">
          <div className="card-imperium p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Key size={14} className="text-sky-500" />
              CREDENTIAL_MGMT
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-[#1f1f1f] bg-black/40">
                <div className="flex items-center gap-4">
                  <Mail className="text-gray-600" size={16} />
                  <div>
                    <div className="text-[10px] font-bold">PASSWORD_SEQUENCE</div>
                    <div className="text-[8px] text-gray-500 uppercase">Last changed 42 days ago</div>
                  </div>
                </div>
                <button className="px-3 py-1 border border-gray-800 text-[9px] uppercase hover:border-sky-500 transition-all">ROTATE</button>
              </div>
              <div className="flex items-center justify-between p-4 border border-[#1f1f1f] bg-black/40">
                <div className="flex items-center gap-4">
                  <Smartphone className="text-gray-600" size={16} />
                  <div>
                    <div className="text-[10px] font-bold">2FA_BIOMETRIC</div>
                    <div className="text-[8px] text-sky-500 uppercase tracking-widest">ACTIVE / SECURE</div>
                  </div>
                </div>
                <button className="px-3 py-1 border border-gray-800 text-[9px] uppercase hover:border-sky-500 transition-all">MANAGE</button>
              </div>
            </div>
          </div>

          <div className="card-imperium p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Terminal size={14} className="text-sky-500" />
              API_ACCESS_KEYS
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[8px] text-gray-600 border-b border-[#1f1f1f]">
                  <tr>
                    <th className="pb-4 px-2">KEY_NAME</th>
                    <th className="pb-4 px-2">PERMISSIONS</th>
                    <th className="pb-4 px-2">LAST_USED</th>
                    <th className="pb-4 px-2 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-[10px]">
                  {[
                    { name: 'INFRA_READ_ONLY', scope: 'Read', used: '2 min ago' },
                    { name: 'PROD_DEPLOY_KEY', scope: 'Full', used: 'Just now' },
                    { name: 'METRIC_SCRAPER', scope: 'Metrics', used: '6h ago' },
                  ].map((k, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="py-4 px-2 font-bold">{k.name}</td>
                      <td className="py-4 px-2 text-gray-500 uppercase">{k.scope}</td>
                      <td className="py-4 px-2 text-gray-500">{k.used}</td>
                      <td className="py-4 px-2 text-right">
                        <button className="text-red-500 hover:text-red-400 transition-colors">REVOKE</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="mt-4 w-full py-2 border border-dashed border-[#1f1f1f] text-[9px] text-gray-500 uppercase tracking-widest hover:border-sky-500 hover:text-sky-500 transition-all">
              + GENERATE_NEW_TOKEN
            </button>
          </div>

          <div className="card-imperium p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Monitor size={14} className="text-sky-500" />
              ACTIVE_SESSIONS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { device: 'Workstation 01', ip: '192.168.1.44', location: 'London, UK', current: true },
                { device: 'Mobile Device', ip: '10.0.4.88', location: 'Remote_VPN', current: false },
              ].map((s, i) => (
                <div key={i} className={`p-4 border ${s.current ? 'border-sky-500/50 bg-sky-500/5' : 'border-[#1f1f1f] bg-black/40'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold">{s.device}</span>
                    {s.current && <span className="text-[7px] bg-sky-500 text-black px-1 font-bold">CURRENT</span>}
                  </div>
                  <div className="text-[8px] text-gray-500 uppercase space-y-0.5">
                    <div>IP: {s.ip}</div>
                    <div>LOC: {s.location}</div>
                  </div>
                  {!s.current && (
                    <button className="mt-3 text-[9px] text-red-500 uppercase hover:underline">Terminate</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
