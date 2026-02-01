
import React, { useState, useEffect } from 'react';
import { 
  User, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Users,
  Info,
  HelpCircle
} from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  job: string;
  office: string;
  accessLevel: 'Owner' | 'Editor' | 'Viewer';
}

const Identity: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({ accessLevel: 'Viewer' });

  useEffect(() => {
    const saved = localStorage.getItem('metalab_personnel');
    if (saved) setStaffList(JSON.parse(saved));
    else {
      const initial = [
        { id: '1', name: 'John Doe', job: 'System Manager', office: 'London', accessLevel: 'Editor' },
        { id: '2', name: 'Jane Smith', job: 'Auditor', office: 'New York', accessLevel: 'Viewer' },
      ];
      setStaffList(initial as Staff[]);
      localStorage.setItem('metalab_personnel', JSON.stringify(initial));
    }
  }, []);

  const persist = (data: Staff[]) => {
    setStaffList(data);
    localStorage.setItem('metalab_personnel', JSON.stringify(data));
  };

  const addStaff = () => {
    if (!newStaff.name) return;
    const s: Staff = {
      id: Date.now().toString(),
      name: newStaff.name,
      job: newStaff.job || 'Employee',
      office: newStaff.office || 'Main Office',
      accessLevel: newStaff.accessLevel || 'Viewer'
    };
    persist([...staffList, s]);
    setNewStaff({ accessLevel: 'Viewer' });
    setShowAdd(false);
  };

  const deleteStaff = (id: string) => persist(staffList.filter(s => s.id !== id));

  return (
    <div className="space-y-10 max-w-7xl mx-auto font-mono pb-20">
      {/* Help Banner */}
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-sm flex gap-4">
        <Users className="text-accent shrink-0" size={20} />
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase mb-1">Team & Access Management</h4>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Use this page to manage who has access to your business portal. You can invite new <b>Team Members</b> and set their <b>Access Level</b> 
            (Viewer, Editor, or Owner).
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between border-b border-[#1f1f1f] pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">Team Members</h1>
          <p className="text-gray-500 text-[10px] uppercase">Control who can access this system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Profile Info */}
        <div className="space-y-6">
          <div className="border border-[#1f1f1f] bg-black/40 p-8 flex flex-col items-center text-center rounded-sm">
            <div className="w-24 h-24 border border-accent/20 p-1 mb-6 rounded-full">
              <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-accent">
                <User size={48} />
              </div>
            </div>
            <h2 className="text-lg font-bold text-white uppercase">Your Profile</h2>
            <div className="text-[10px] text-accent font-bold mt-1 uppercase">Main Administrator</div>
            
            <div className="mt-8 w-full space-y-4">
              <div className="flex justify-between border-t border-[#1f1f1f] pt-4">
                <span className="text-[9px] text-gray-500 uppercase">Your Role</span>
                <span className="text-[9px] text-white font-bold uppercase">Owner</span>
              </div>
              <div className="flex justify-between border-t border-[#1f1f1f] pt-4">
                <span className="text-[9px] text-gray-500 uppercase">Verification</span>
                <span className="text-[9px] text-accent font-bold uppercase">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Staff List */}
        <div className="lg:col-span-3 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-2">
                <Users size={14} /> Registered Members
              </h3>
              <button onClick={() => setShowAdd(!showAdd)} className="text-[10px] font-bold text-accent hover:text-white uppercase flex items-center gap-1">
                {showAdd ? <X size={12} /> : <Plus size={12} />} {showAdd ? 'Cancel' : 'Add New Person'}
              </button>
            </div>

            {showAdd && (
              <div className="p-5 border border-accent/30 bg-accent/5 grid grid-cols-1 md:grid-cols-4 gap-4 items-end rounded-sm">
                <div>
                  <label className="text-[9px] text-gray-400 uppercase block mb-1">Full Name</label>
                  <input className="w-full bg-black border border-[#1f1f1f] px-3 py-2 text-[11px] outline-none text-white" value={newStaff.name || ''} onChange={e => setNewStaff({...newStaff, name: e.target.value})} placeholder="e.g. John Smith" />
                </div>
                <div>
                  <label className="text-[9px] text-gray-400 uppercase block mb-1">Job Title</label>
                  <input className="w-full bg-black border border-[#1f1f1f] px-3 py-2 text-[11px] outline-none text-white" value={newStaff.job || ''} onChange={e => setNewStaff({...newStaff, job: e.target.value})} placeholder="e.g. Manager" />
                </div>
                <div>
                  <label className="text-[9px] text-gray-400 uppercase block mb-1">Access Level</label>
                  <select className="w-full bg-black border border-[#1f1f1f] px-3 py-2 text-[11px] outline-none text-white" value={newStaff.accessLevel} onChange={e => setNewStaff({...newStaff, accessLevel: e.target.value as any})}>
                    <option value="Viewer">Viewer (Read Only)</option>
                    <option value="Editor">Editor (Can Change)</option>
                    <option value="Owner">Owner (Full Access)</option>
                  </select>
                </div>
                <button onClick={addStaff} className="bg-accent text-black py-2 text-[10px] font-bold uppercase hover:bg-white flex items-center justify-center gap-2">
                  <Check size={14} /> Add Person
                </button>
              </div>
            )}

            <div className="border border-[#1f1f1f] bg-black/20 rounded-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead className="text-[9px] text-gray-600 border-b border-[#1f1f1f] uppercase bg-white/5">
                    <tr>
                      <th className="px-6 py-4 font-normal">Name</th>
                      <th className="px-6 py-4 font-normal">Job / Location</th>
                      <th className="px-6 py-4 text-center font-normal">Access</th>
                      <th className="px-6 py-4 text-right font-normal">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px] divide-y divide-[#1f1f1f]">
                    {staffList.map(s => (
                      <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4 font-bold text-white uppercase">{s.name}</td>
                        <td className="px-6 py-4 text-gray-500 uppercase">
                          {s.job} // {s.office}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-0.5 border text-[9px] font-bold ${s.accessLevel === 'Owner' ? 'border-accent text-accent' : 'border-gray-800 text-gray-600'}`}>
                            {s.accessLevel}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteStaff(s.id)} className="text-gray-800 hover:text-red-500 transition-colors">
                             <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Identity;
