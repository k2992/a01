import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export const PublicLanding = () => {
  const [clicks, setClicks] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setShowLogin(true);
    }
  };

  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mimic decryption lag
    setTimeout(() => {
      login({ username, password });
      setIsLoading(false);
      navigate('/office');
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-20 text-center">
      <div className="space-y-4">
        <h1 
          onClick={handleTitleClick}
          className="text-4xl md:text-6xl font-bold uppercase tracking-[0.4em] text-neutral-200 select-none cursor-default active:text-white transition-all"
        >
          MetaLab Office
        </h1>
        <p className="text-xs text-neutral-600 uppercase tracking-[0.3em] font-bold">
          Internal operator console
        </p>
      </div>

      {!showLogin ? (
        <div className="max-w-md text-neutral-500 text-[11px] leading-relaxed uppercase tracking-widest space-y-4 pt-10 border-t border-neutral-900">
          <p>
            This terminal is restricted to authorized personnel. 
            All connections are monitored and logged. 
            Unauthorized access attempts will result in node isolation and telemetry reporting.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-sm p-8 border border-neutral-800 bg-neutral-900/20 rounded-2xl space-y-8 animate-in zoom-in-95 duration-300">
          <div className="space-y-1 text-center border-b border-neutral-800 pb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Identity Verification</h2>
            <p className="text-[9px] text-neutral-600 uppercase tracking-widest">Enter operator credentials</p>
          </div>
          
          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div className="space-y-2 text-left">
              <label className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest ml-1">Operator_ID</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-accent/50 transition-colors uppercase tracking-[0.1em]"
                placeholder="---"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest ml-1">Key_Sequence</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-accent/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button 
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-neutral-100 text-neutral-950 font-bold uppercase text-[10px] tracking-[0.5em] hover:bg-accent hover:text-white transition-all disabled:opacity-50 rounded-lg shadow-lg"
            >
              {isLoading ? 'Decrypting...' : 'Authenticate'}
            </button>
          </form>

          <button 
            onClick={() => setShowLogin(false)}
            className="text-[9px] text-neutral-700 hover:text-neutral-400 transition-colors uppercase tracking-widest font-bold"
          >
            Abort_Session
          </button>
        </div>
      )}
    </div>
  );
};