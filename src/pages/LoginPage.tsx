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
      navigate('/app/control');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-black font-mono">
      {/* Background HUD Detail */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent"></div>
      
      <div className="max-w-md w-full relative z-10 animate-in zoom-in-95 duration-500">
        <div className="card-imperium p-10 relative shadow-2xl">
          {/* Cyan HUD Corners */}
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-tr"></div>
          <div className="hud-corner-bl"></div>
          <div className="hud-corner-br"></div>

          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 border border-accent/20 mb-6">
              <span className="text-[9px] text-accent uppercase tracking-[0.4em] font-bold">Secure Access Portal</span>
            </div>
            <h2 className="text-2xl font-bold tracking-[0.2em] uppercase mb-2">Login</h2>
            <p className="text-neutral-600 text-[10px] uppercase tracking-wider font-bold">MetaLab Systems // Security Level 4</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[9px] text-neutral-500 uppercase tracking-[0.2em] font-bold ml-1">User Identifier</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="OPERATOR_ID"
                className="w-full bg-black border border-white/5 px-4 py-3 text-xs focus:border-accent/50 outline-none transition-colors font-mono tracking-widest uppercase text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[9px] text-neutral-500 uppercase tracking-[0.2em] font-bold ml-1">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-black border border-white/5 px-4 py-3 text-xs focus:border-accent/50 outline-none transition-colors font-mono tracking-widest text-white"
              />
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-accent/80 text-white font-bold uppercase text-[10px] tracking-[0.5em] hover:bg-accent transition-all flex items-center justify-center gap-3 group disabled:opacity-50 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
            >
              {isLoading ? (
                <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Authenticate
                  <div className="w-1 h-1 bg-white group-hover:animate-ping"></div>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <a href="/" className="text-[9px] text-neutral-600 hover:text-accent transition-colors uppercase tracking-widest font-bold">Return to Home</a>
          </div>
        </div>
        
        <p className="mt-8 text-[8px] text-neutral-700 text-center uppercase tracking-[0.2em] leading-relaxed px-8 font-bold">
          Notice: All login attempts are monitored and recorded. Unauthorized access is strictly prohibited by Sovereign Tier protocols.
        </p>
      </div>
    </div>
  );
};