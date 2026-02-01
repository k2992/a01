
import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Save, 
  Trash2, 
  Search, 
  FileText, 
  Clock, 
  Tag as TagIcon, 
  Activity,
  Bold,
  Italic,
  Underline,
  AlignCenter,
  AlignLeft,
  AlignRight,
  X,
  Type as TypeIcon,
  Code,
  Shield,
  Zap,
  Lock,
  Mail,
  Terminal,
  Globe,
  Cpu,
  Layers,
  Disc,
  Settings,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Target,
  Briefcase,
  Palette,
  Download,
  Upload
} from 'lucide-react';

// Icon library for selection
const ICON_OPTIONS = [
  { name: 'FileText', icon: FileText },
  { name: 'Code', icon: Code },
  { name: 'Shield', icon: Shield },
  { name: 'Zap', icon: Zap },
  { name: 'Lock', icon: Lock },
  { name: 'Mail', icon: Mail },
  { name: 'Terminal', icon: Terminal },
  { name: 'Globe', icon: Globe },
  { name: 'Cpu', icon: Cpu },
  { name: 'Layers', icon: Layers },
  { name: 'Disc', icon: Disc },
  { name: 'Settings', icon: Settings },
  { name: 'AlertCircle', icon: AlertCircle },
  { name: 'CheckCircle', icon: CheckCircle },
  { name: 'MessageSquare', icon: MessageSquare },
  { name: 'Activity', icon: Activity },
  { name: 'Target', icon: Target },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Tag', icon: TagIcon },
  { name: 'Clock', icon: Clock },
];

const COLOR_OPTIONS = [
  { name: 'Sky Blue', hex: '#0ea5e9' },
  { name: 'Emerald', hex: '#22c55e' },
  { name: 'Rose', hex: '#ef4444' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Slate', hex: '#64748b' },
];

const TEXT_COLORS = [
  { name: 'Default', hex: '#ffffff' },
  { name: 'Sky Blue', hex: '#0ea5e9' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Yellow', hex: '#eab308' },
];

interface Note {
  id: string;
  title: string;
  content: string; 
  updatedAt: number;
  tags: string[];
  icon: string;
  color: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newTag, setNewTag] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('metalab_notes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotes(parsed);
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    }
  }, []);

  const saveToStorage = (updatedNotes: Note[]) => {
    localStorage.setItem('metalab_notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    setIsSaving(true);
    setHasUnsavedChanges(false);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'NEW_RECORD',
      content: '<div><br></div>',
      updatedAt: Date.now(),
      tags: ['SYSTEM'],
      icon: 'FileText',
      color: '#0ea5e9',
    };
    const updated = [newNote, ...notes];
    saveToStorage(updated);
    setActiveNoteId(newNote.id);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    saveToStorage(updated);
    if (activeNoteId === id) setActiveNoteId(null);
  };

  const handleManualSave = () => {
    if (!activeNoteId || !editorRef.current) return;
    const currentContent = editorRef.current.innerHTML;
    const updatedNotes = notes.map(n => 
      n.id === activeNoteId ? { ...n, content: currentContent, updatedAt: Date.now() } : n
    );
    saveToStorage(updatedNotes);
  };

  const updateActiveNoteField = (field: keyof Note, value: any) => {
    if (!activeNoteId) return;
    const updated = notes.map(n => 
      n.id === activeNoteId ? { ...n, [field]: value, updatedAt: Date.now() } : n
    );
    setNotes(updated);
    setHasUnsavedChanges(true);
  };

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = newTag.trim().toUpperCase();
    if (!activeNoteId || !tag) return;
    const note = notes.find(n => n.id === activeNoteId);
    if (note && !note.tags.includes(tag)) {
      const updatedTags = [...note.tags, tag];
      updateActiveNoteField('tags', updatedTags);
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    if (!activeNoteId) return;
    const note = notes.find(n => n.id === activeNoteId);
    if (note) {
      const updatedTags = note.tags.filter(t => t !== tagToRemove);
      updateActiveNoteField('tags', updatedTags);
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    setHasUnsavedChanges(true);
    if (editorRef.current) editorRef.current.focus();
  };

  const handleEditorChange = () => {
    setHasUnsavedChanges(true);
  };

  const activeNote = notes.find(n => n.id === activeNoteId);
  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.content && n.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
    n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    if (editorRef.current && activeNote) {
        editorRef.current.innerHTML = activeNote.content;
        setHasUnsavedChanges(false);
    }
  }, [activeNoteId]);

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getNoteIcon = (iconName: string) => {
    const found = ICON_OPTIONS.find(i => i.name === iconName);
    return found ? <found.icon size={18} /> : <FileText size={18} />;
  };

  const getNoteIconSmall = (iconName: string) => {
    const found = ICON_OPTIONS.find(i => i.name === iconName);
    return found ? <found.icon size={12} /> : <FileText size={12} />;
  };

  const exportToJson = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `metalab_notes_backup_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importFromJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = event.target.files?.[0];
    if (!file) return;

    fileReader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedNotes = JSON.parse(content);
        if (Array.isArray(importedNotes)) {
          // Simple check for required fields in the first element
          if (importedNotes.length > 0 && (!importedNotes[0].id || !importedNotes[0].title)) {
             throw new Error("Invalid format");
          }
          saveToStorage(importedNotes);
          setActiveNoteId(null);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (err) {
        console.error("Import error:", err);
        alert("CRITICAL_FAILURE: Data buffer corrupted or invalid format.");
      }
    };
    fileReader.readAsText(file);
    // Reset the input so the same file can be selected again
    if (event.target) event.target.value = '';
  };

  return (
    <div className="h-full flex flex-col space-y-6 max-w-7xl mx-auto font-mono">
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-widest">SECURE_NOTES</h1>
          <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider">Storage Tier: ENCRYPTED // PERSISTENCE_MANUAL</p>
        </div>
        <div className="flex gap-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={importFromJson} 
            accept=".json" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 border border-white/5 text-[9px] uppercase tracking-widest font-bold hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
            title="Import Data Buffer"
          >
            <Upload size={14} /> IMPORT_JSON
          </button>
          <button 
            onClick={exportToJson}
            className="flex items-center gap-2 px-4 py-2 border border-white/5 text-[9px] uppercase tracking-widest font-bold hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
            title="Export Data Buffer"
          >
            <Download size={14} /> EXPORT_JSON
          </button>
          <button onClick={createNote} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-[9px] uppercase tracking-widest font-bold hover:bg-sky-500 transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <Plus size={14} /> GENERATE_NEW
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-8 pb-4">
        {/* Sidebar: Notes List */}
        <div className="lg:col-span-1 flex flex-col gap-4 min-h-0 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
            <input 
              type="text"
              placeholder="FILTER_RECORDS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-[#1f1f1f] pl-9 pr-4 py-2 text-[10px] uppercase tracking-widest outline-none focus:border-sky-500/50 transition-colors"
            />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-[#1f1f1f] text-[9px] text-gray-700 uppercase">No entries detected</div>
            ) : (
              filteredNotes.map(note => (
                <div 
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={`p-4 border cursor-pointer transition-all group relative overflow-hidden ${
                    activeNoteId === note.id ? 'bg-white/5' : 'bg-black/20 hover:bg-white/[0.03]'
                  }`}
                  style={{ borderColor: activeNoteId === note.id ? `${note.color}80` : '#1f1f1f' }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ backgroundColor: note.color }}></div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 truncate pr-4">
                      <span style={{ color: note.color }}>{getNoteIconSmall(note.icon)}</span>
                      <span className={`text-[10px] font-bold tracking-[0.1em] truncate ${activeNoteId === note.id ? 'text-white' : 'text-gray-400'}`}>
                        {note.title || 'UNTITLED_ENTRY'}
                      </span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} className="text-gray-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <p className="text-[8px] text-gray-600 leading-relaxed mb-3 line-clamp-2 uppercase tracking-tighter">
                    {stripHtml(note.content).substring(0, 100) || "NO_DATA_BUFFERED"}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {note.tags.map((t, idx) => (
                      <span key={idx} className="text-[7px] border border-white/10 px-1.5 py-0.5 uppercase tracking-tighter text-gray-500 bg-white/5">{t}</span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main: Note Editor */}
        <div className="lg:col-span-3 h-full flex flex-col min-h-[500px]">
          {activeNote ? (
            <div className="card-imperium h-full flex flex-col overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-[#1f1f1f] flex flex-col gap-5 bg-gradient-to-b from-white/[0.02] to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 w-full">
                    {/* Icon Selection */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowIconPicker(!showIconPicker)}
                        className="p-2 border border-white/10 hover:border-sky-500/50 transition-all"
                        style={{ color: activeNote.color }}
                      >
                        {getNoteIcon(activeNote.icon)}
                      </button>
                      {showIconPicker && (
                        <div className="absolute top-full left-0 mt-2 z-50 p-3 bg-black border border-[#1f1f1f] shadow-2xl grid grid-cols-5 gap-2 w-48">
                          {ICON_OPTIONS.map(opt => (
                            <button 
                              key={opt.name} 
                              onClick={() => { updateActiveNoteField('icon', opt.name); setShowIconPicker(false); }}
                              className="p-2 hover:bg-white/5 transition-colors text-gray-400 hover:text-sky-500"
                            >
                              <opt.icon size={16} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input 
                      type="text"
                      value={activeNote.title}
                      onChange={(e) => updateActiveNoteField('title', e.target.value)}
                      placeholder="ENTRY_TITLE..."
                      className="bg-transparent text-2xl font-bold tracking-[0.2em] outline-none uppercase placeholder:text-gray-900 w-full text-white"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Category Color Picker */}
                    <div className="flex items-center gap-1">
                      {COLOR_OPTIONS.map(c => (
                        <button 
                          key={c.hex} 
                          onClick={() => updateActiveNoteField('color', c.hex)}
                          className={`w-3 h-3 rounded-full border border-white/10 transition-transform ${activeNote.color === c.hex ? 'scale-125 border-white' : 'hover:scale-110'}`}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                    <button onClick={handleManualSave} className={`p-2.5 border transition-all shrink-0 flex items-center gap-2 ${hasUnsavedChanges ? 'text-sky-400 border-sky-500/50 bg-sky-500/10' : 'text-gray-500 border-white/5 bg-white/5'}`}>
                      <Save size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">SAVE</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-[9px] text-sky-500/60 font-bold tracking-widest">
                    <TagIcon size={12} /> CLASSIFICATION:
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {activeNote.tags.map((tag, i) => (
                      <div key={i} className="flex items-center gap-2 px-2.5 py-1 border border-sky-500/20 bg-sky-500/10 text-sky-400 text-[8px] font-bold uppercase tracking-widest">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="text-sky-700 hover:text-red-500"><X size={10} /></button>
                      </div>
                    ))}
                    <form onSubmit={addTag} className="flex items-center">
                      <input 
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="+ ATTACH_TAG"
                        className="bg-white/5 border border-white/10 px-3 py-1 text-[8px] uppercase tracking-widest outline-none focus:border-sky-500/50 w-32 font-bold placeholder:text-gray-800 h-[22px]"
                      />
                    </form>
                  </div>
                </div>
              </div>

              {/* Enhanced Toolbar */}
              <div className="px-6 py-3 border-b border-[#1f1f1f] bg-black/60 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <button onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }} className="toolbar-btn" title="Bold"><Bold size={16} /></button>
                  <button onMouseDown={(e) => { e.preventDefault(); execCommand('italic'); }} className="toolbar-btn" title="Italic"><Italic size={16} /></button>
                  <button onMouseDown={(e) => { e.preventDefault(); execCommand('underline'); }} className="toolbar-btn" title="Underline"><Underline size={16} /></button>
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                {/* Text Color Picker */}
                <div className="flex items-center gap-1.5">
                  <Palette size={14} className="text-gray-600" />
                  {TEXT_COLORS.map(tc => (
                    <button 
                      key={tc.hex} 
                      onMouseDown={(e) => { e.preventDefault(); execCommand('foreColor', tc.hex); }}
                      className="w-4 h-4 rounded-sm border border-white/10 hover:scale-110 transition-transform"
                      style={{ backgroundColor: tc.hex }}
                      title={tc.name}
                    />
                  ))}
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                <div className="flex items-center gap-1">
                  <button onMouseDown={(e) => { e.preventDefault(); execCommand('justifyLeft'); }} className="toolbar-btn"><AlignLeft size={16} /></button>
                  <button onMouseDown={(e) => { e.preventDefault(); execCommand('justifyCenter'); }} className="toolbar-btn"><AlignCenter size={16} /></button>
                  <button onMouseDown={(e) => { e.preventDefault(); execCommand('justifyRight'); }} className="toolbar-btn"><AlignRight size={16} /></button>
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                <button onMouseDown={(e) => { e.preventDefault(); execCommand('insertUnorderedList'); }} className="px-3 py-1 hover:bg-white/5 text-[9px] font-bold tracking-widest text-gray-500 rounded border border-white/5">LIST_ITEM</button>
                <button onMouseDown={(e) => { e.preventDefault(); execCommand('removeFormat'); }} className="toolbar-btn text-red-500/50 hover:text-red-500"><TypeIcon size={16} /></button>
              </div>
              
              <div className="flex-1 p-0 flex flex-col overflow-hidden bg-[rgba(5,5,5,0.4)] relative">
                <div className="absolute top-4 left-6 right-6 flex items-center gap-8 text-[7px] text-gray-700 border-b border-white/5 pb-2 pointer-events-none z-10 uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2"><Activity size={9} className="text-sky-500/50" />BUFFER_INPUT: READY</div>
                  <div className="flex items-center gap-2"><div className={`w-1 h-1 rounded-full ${hasUnsavedChanges ? 'bg-yellow-500 animate-pulse' : 'bg-sky-500'}`}></div>IO_STATE: {hasUnsavedChanges ? 'DIRTY_BUFFER' : 'SYNCED'}</div>
                </div>
                
                <div 
                  ref={editorRef}
                  contentEditable
                  onInput={handleEditorChange}
                  className="flex-1 bg-transparent outline-none text-[15px] leading-relaxed tracking-wide custom-scrollbar overflow-y-auto rich-text-area px-10 pt-14 pb-10 selection:bg-sky-500/30"
                  style={{ minHeight: '100px', color: '#f0f0f0' }}
                ></div>
              </div>

              <div className="p-4 bg-black border-t border-white/5 flex items-center justify-between text-[8px] font-bold tracking-[0.2em]">
                <div className="flex gap-6 items-center">
                  <span className={`w-1.5 h-1.5 rounded-full ${hasUnsavedChanges ? 'bg-yellow-500' : 'bg-sky-500'}`}></span>
                  <span className={hasUnsavedChanges ? 'text-yellow-500/80' : 'text-sky-500/80'}>{hasUnsavedChanges ? 'UNCOMMITTED_DATA' : 'METALAB_SYNC_STABLE'}</span>
                  <div className="text-gray-600 uppercase">IDENT: {activeNote.id}</div>
                </div>
                <div className="text-gray-700 uppercase">SYNCED: {new Date(activeNote.updatedAt).toLocaleTimeString()}</div>
              </div>
            </div>
          ) : (
            <div className="card-imperium flex-1 flex flex-col items-center justify-center text-center p-12 border-dashed">
              <div className="w-24 h-24 border border-white/5 flex items-center justify-center text-gray-800 mb-8"><FileText size={48} strokeWidth={1} /></div>
              <h3 className="text-sm font-bold tracking-[0.5em] uppercase mb-4 text-gray-400">Null_Record_Selected</h3>
              <button onClick={createNote} className="px-10 py-4 border border-sky-500/20 text-sky-500 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-sky-500 hover:text-black transition-all">+ Create_New_Entry</button>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .toolbar-btn {
          padding: 0.5rem;
          color: #64748b;
          transition: all 0.2s;
          border-radius: 4px;
        }
        .toolbar-btn:hover {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }
        .rich-text-area:empty:before {
          content: "INITIALIZE SECURE DATA ENTRY PROTOCOL...";
          color: #1a1a1a;
          pointer-events: none;
          display: block;
          letter-spacing: 0.3em;
          font-weight: 900;
        }
        .rich-text-area b, .rich-text-area strong { 
            font-weight: 800; 
            color: #ffffff !important;
            display: inline-block;
        }
        .rich-text-area i, .rich-text-area em { 
            font-style: italic; 
            color: #ffffff !important;
            display: inline-block;
        }
        .rich-text-area u { 
            text-decoration: underline; 
            text-decoration-thickness: 1px;
            text-underline-offset: 2px;
            color: #ffffff !important;
            display: inline-block;
        }
        .rich-text-area ul { list-style-type: disc; padding-left: 1.5rem; margin-top: 0.5rem; }
        .rich-text-area li { margin-bottom: 0.25rem; }
        .rich-text-area div { margin-bottom: 0.25rem; }
      `}</style>
    </div>
  );
};

export default Notes;
