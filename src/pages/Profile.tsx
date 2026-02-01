import { User, Shield, Mail, Terminal } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Identity</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="card-imperium p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 border border-accent/30 p-1 mb-6 flex items-center justify-center text-accent">
            <User size={40} />
          </div>
          <h2 className="text-lg font-bold uppercase tracking-widest">Admin</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-sm mt-4">
            <Shield size={10} className="text-accent" />
            <span className="text-[8px] font-bold text-accent uppercase">Authorized</span>
          </div>
        </div>

        <div className="lg:col-span-3 card-imperium p-6">
          <h3 className="text-xs font-bold uppercase mb-6 flex items-center gap-2">
            <Terminal size={14} className="text-accent" /> Metadata
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border border-[#1f1f1f] bg-black/40">
              <Mail className="text-gray-600" size={16} />
              <div>
                <div className="text-[10px] font-bold uppercase">Primary_Email</div>
                <div className="text-[11px] text-gray-300">root@metalab.corp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};