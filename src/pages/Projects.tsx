import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Search,
  CheckCircle2,
  Circle,
  HelpCircle
} from 'lucide-react';

type Task = { id: string; label: string; completed: boolean; };
type Project = { id: string; name: string; status: string; tasks: Task[]; };

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setProjects([
      { id: '1', name: 'Website Launch', status: 'Ongoing', tasks: [{ id: '1', label: 'Create Logo', completed: true }, { id: '2', label: 'Write Content', completed: false }] },
      { id: '2', name: 'Yearly Audit', status: 'Planned', tasks: [] },
    ]);
  }, []);

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-sm flex gap-4">
        <HelpCircle className="text-accent shrink-0" size={20} />
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase mb-1">Project Tracker</h4>
          <p className="text-[10px] text-gray-400">Organize and monitor ongoing business goals.</p>
        </div>
      </div>

      <div className="flex items-end justify-between border-b border-[#1f1f1f] pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase">My Projects</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-black text-[10px] font-bold uppercase hover:bg-white transition-all">
          <Plus size={14} /> New Project
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
        <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-black/40 border border-[#1f1f1f] pl-10 pr-4 py-2 text-[11px] outline-none rounded-sm" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="card-imperium p-6">
            <h3 className="font-bold text-white mb-4 uppercase">{p.name}</h3>
            <div className="space-y-2">
              {p.tasks.map(t => (
                <div key={t.id} className="flex items-center gap-3 text-[11px]">
                  {t.completed ? <CheckCircle2 size={14} className="text-accent" /> : <Circle size={14} className="text-gray-700" />}
                  <span className={t.completed ? 'text-gray-500 line-through' : 'text-gray-300'}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};