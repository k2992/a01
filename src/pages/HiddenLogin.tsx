import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export const HiddenLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      login({ username, password });
      navigate('/app/control');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-black">
      <div className="max-w-md w-full relative z-10">
        <div className="card-imperium p-10 relative">
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 border border-accent/20 mb-6">
              <span className="text-[9px] text-accent uppercase tracking-[0.4em]">Secure Access Portal</span>
            </div>
            <h2 className="text-2xl font-bold tracking-widest uppercase mb-2">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[9px] text-gray-500 uppercase mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-black border border-white/5 px-4 py-3 text-xs focus:border-accent/50 outline-none transition-colors uppercase"
              />
            </div>
            <div>
              <label className="block text-[9px] text-gray-500 uppercase mb-2">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black border border-white/5 px-4 py-3 text-xs focus:border-accent/50 outline-none transition-colors"
              />
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-accent/80 text-white font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-accent transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};