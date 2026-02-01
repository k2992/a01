
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  Search,
  X,
  Check,
  CheckCircle2,
  Circle,
  HelpCircle,
  Info
} from 'lucide-react';

interface Task {
  id: string;
  label: string;
  completed: boolean;
}

interface Project {
  id: string;
  name: string;
  status: 'Ongoing' | 'Planned' | 'On Hold' | 'Done';
  phase: string;
  description: string;
  tasks: Task[];
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [newTaskLabel, setNewTaskLabel] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('metalab_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      const initial: Project[] = [
        { id: '1', name: 'Website Launch', status: 'Ongoing', phase: 'Design', description: 'Building the new customer site.', tasks: [{ id: '1', label: 'Create Logo', completed: true }, { id: '2', label: 'Write Content', completed: false }] },
        { id: '2', name: 'Yearly Audit', status: 'Planned', phase: 'Planning', description: 'Checking our business reports.', tasks: [] },
      ];
      setProjects(initial);
      localStorage.setItem('metalab_projects', JSON.stringify(initial));
    }
  }, []);

  const saveProjects = (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem('metalab_projects', JSON.stringify(updated));
  };

  const addProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      name: 'New Project',
      status: 'Planned',
      phase: 'Planning',
      description: 'Describe your new project here.',
      tasks: []
    };
    saveProjects([newProj, ...projects]);
    startEditing(newProj);
  };

  const startEditing = (p: Project) => {
    setIsEditing(p.id);
    setEditForm({ ...p });
  };

  const handleUpdate = () => {
    if (!isEditing) return;
    const updated = projects.map(p => p.id === isEditing ? { ...p, ...editForm } as Project : p);
    saveProjects(updated);
    setIsEditing(null);
  };

  const deleteProject = (id: string) => {
    if (confirm("Are you sure? This project will be permanently deleted.")) {
      saveProjects(projects.filter(p => p.id !== id));
    }
  };

  const addTask = () => {
    if (!newTaskLabel || !isEditing) return;
    const newTask: Task = { id: Date.now().toString(), label: newTaskLabel, completed: false };
    const updatedTasks = [...(editForm.tasks || []), newTask];
    setEditForm({ ...editForm, tasks: updatedTasks });
    setNewTaskLabel('');
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = editForm.tasks?.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    setEditForm({ ...editForm, tasks: updatedTasks });
  };

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-mono pb-20">
      {/* Help Banner */}
      <div className="p-4 bg-accent/5 border border-accent/20 rounded-sm flex gap-4">
        <HelpCircle className="text-accent shrink-0" size={20} />
        <div>
          <h4 className="text-[11px] font-bold text-white uppercase mb-1">Project & Task Tracker</h4>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Organize your business goals here. Add a <b>New Project</b>, then click it to add <b>Tasks</b> that need to be finished. 
            Check off tasks as you complete them to stay organized.
          </p>
        </div>
      </div>

      <div className="flex items-end justify-between border-b border-[#1f1f1f] pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">My Projects</h1>
          <p className="text-gray-500 text-[10px] uppercase">Keep track of everything you are working on</p>
        </div>
        <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-accent text-black text-[10px] font-bold uppercase hover:bg-white transition-all">
          <Plus size={14} /> Create New Project
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
          <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-black/40 border border-[#1f1f1f] pl-10 pr-4 py-2 text-[11px] outline-none focus:border-accent/50 rounded-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Project List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-[#1f1f1f] bg-black/20 rounded-sm overflow-hidden">
             <table className="w-full text-left">
               <thead className="text-[9px] text-gray-600 border-b border-[#1f1f1f] uppercase bg-white/5">
                 <tr>
                   <th className="px-6 py-4 font-normal">Project Name</th>
                   <th className="px-6 py-4 text-center font-normal">Status</th>
                   <th className="px-6 py-4 text-right font-normal">Manage</th>
                 </tr>
               </thead>
               <tbody className="text-[11px] divide-y divide-[#1f1f1f]">
                 {filtered.map(p => (
                   <tr key={p.id} className={`hover:bg-white/5 group ${isEditing === p.id ? 'bg-accent/5' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="font-bold text-white uppercase">{p.name}</div>
                        <div className="text-[9px] text-gray-500 mt-1 line-clamp-1">{p.description}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 border text-[9px] font-bold ${p.status === 'Ongoing' ? 'border-accent text-accent' : 'border-gray-800 text-gray-600'}`}>{p.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3 text-gray-600">
                          <button onClick={() => startEditing(p)} className="hover:text-accent transition-colors"><Edit3 size={14} /></button>
                          <button onClick={() => deleteProject(p.id)} className="hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Task Editor */}
        <div className="lg:col-span-2">
           {isEditing ? (
             <div className="border border-accent/30 bg-black/40 p-6 space-y-6 rounded-sm animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-4">
                   <h3 className="text-[11px] font-bold uppercase text-accent">Edit: {editForm.name}</h3>
                   <div className="flex gap-2">
                      <button onClick={handleUpdate} className="text-accent hover:text-white"><Check size={18} /></button>
                      <button onClick={() => setIsEditing(null)} className="text-gray-600 hover:text-red-500"><X size={18} /></button>
                   </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] text-gray-400 uppercase block mb-1">Project Name</label>
                      <input className="w-full bg-black border border-[#1f1f1f] px-3 py-2 text-[11px] outline-none text-white uppercase" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[9px] text-gray-400 uppercase block mb-1">Progress Status</label>
                      <select className="w-full bg-black border border-[#1f1f1f] px-3 py-2 text-[11px] outline-none text-white" value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value as any})}>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Planned">Planned</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Done">Completed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[9px] text-gray-400 uppercase block mb-1">To-Do List</label>
                    <div className="border border-[#1f1f1f] bg-black/20 p-4 space-y-4 rounded-sm">
                       <div className="flex gap-2">
                         <input placeholder="Add a new task..." className="flex-1 bg-black border border-[#1f1f1f] px-3 py-1.5 text-[11px] outline-none" value={newTaskLabel} onChange={e => setNewTaskLabel(e.target.value)} />
                         <button onClick={addTask} className="px-3 bg-accent text-black hover:bg-white transition-colors"><Plus size={14} /></button>
                       </div>
                       <div className="space-y-2">
                          {editForm.tasks?.map(t => (
                            <div key={t.id} onClick={() => toggleTask(t.id)} className="flex items-center gap-3 cursor-pointer group hover:bg-white/5 p-2 rounded-sm transition-colors">
                               {t.completed ? <CheckCircle2 size={14} className="text-accent" /> : <Circle size={14} className="text-gray-700" />}
                               <span className={`text-[11px] font-bold ${t.completed ? 'text-gray-600 line-through' : 'text-gray-300'}`}>{t.label}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
             </div>
           ) : (
             <div className="h-full border border-dashed border-[#1f1f1f] flex flex-col items-center justify-center p-12 text-center text-gray-700 rounded-sm">
                <Briefcase size={40} strokeWidth={1} className="mb-4 opacity-20" />
                <span className="text-[11px] uppercase tracking-widest">Select a project to see details</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
