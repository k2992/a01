import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';

export const Notes = () => {
  const [notes] = useState<any[]>([]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest">Notes</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-black text-[10px] font-bold uppercase hover:bg-white transition-all">
          <Plus size={14} /> New Record
        </button>
      </div>

      <div className="card-imperium flex flex-col items-center justify-center p-12 text-center border-dashed">
        <div className="w-12 h-12 flex items-center justify-center text-gray-800 mb-8"><FileText size={48} /></div>
        <h3 className="text-sm font-bold tracking-[0.5em] uppercase text-gray-400">No Records</h3>
      </div>
    </div>
  );
};