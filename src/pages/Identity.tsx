import { useState, useEffect } from 'react';
import { 
  User, 
} from 'lucide-react';

export const Identity = () => {
  const [staffList, setStaffList] = useState<any[]>([]);

  useEffect(() => {
    setStaffList([
      { id: '1', name: 'John Doe', job: 'System Manager', accessLevel: 'Editor' },
      { id: '2', name: 'Jane Smith', job: 'Auditor', accessLevel: 'Viewer' },
    ]);
  }, []);

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      <div className="flex items-end justify-between border-b border-[#1f1f1f] pb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Team</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="card-imperium p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 border border-accent/20 p-1 mb-6 rounded-full flex items-center justify-center text-accent">
                <User size={48} />
            </div>
            <h2 className="text-lg font-bold text-white uppercase">Profile</h2>
            <div className="text-[10px] text-accent font-bold mt-1 uppercase">Administrator</div>
        </div>

        <div className="lg:col-span-3 card-imperium overflow-hidden">
           <table className="w-full text-left">
              <thead className="text-[9px] text-gray-600 border-b border-[#1f1f1f] uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-center">Access</th>
                </tr>
              </thead>
              <tbody className="text-[11px] divide-y divide-[#1f1f1f]">
                {staffList.map(s => (
                  <tr key={s.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold uppercase">{s.name}</td>
                    <td className="px-6 py-4 text-gray-500 uppercase">{s.job}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-0.5 border border-gray-800 text-[9px] font-bold text-gray-600">{s.accessLevel}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};