import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      login({ username, password });
      navigate('/office');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-sm w-full space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-400">Access_Auth</h2>
          <p className="text-[10px] text-neutral-600 uppercase tracking-widest">Restricted operator terminal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest">Operator_ID</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-2.5 text-xs text-white outline-none focus:border-accent/50 transition-colors uppercase tracking-widest"
                placeholder="---"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest">Key_Sequence</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-neutral-800 px-4 py-2.5 text-xs text-white outline-none focus:border-accent/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            disabled={isLoading}
            type="submit"
            className="w-full py-3 bg-neutral-100 text-neutral-950 font-bold uppercase text-[10px] tracking-[0.5em] hover:bg-accent transition-all disabled:opacity-50"
          >
            {isLoading ? 'Decrypting...' : 'Authenticate'}
          </button>
        </form>

        <div className="text-center">
          <a href="/" className="text-[9px] text-neutral-700 hover:text-neutral-400 transition-colors uppercase tracking-[0.2em]">Abort_Session</a>
        </div>
      </div>
    </div>
  );
};