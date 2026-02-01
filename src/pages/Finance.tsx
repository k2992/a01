import { useState, useEffect } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Trash2, 
  X, 
  Check, 
  Target, 
  HelpCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface Account {
  id: string;
  name: string;
  category: 'Cash & Bank' | 'Crypto' | 'Stocks' | 'Property';
  value: number;
}

interface ScheduledPayment {
  id: string;
  label: string;
  amount: number;
  dayOfMonth: number;
  type: 'Money In' | 'Money Out';
  status: 'Active' | 'Paused';
}

export const Finance = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [payments, setPayments] = useState<ScheduledPayment[]>([]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  
  const [newAccount, setNewAccount] = useState<Partial<Account>>({ category: 'Cash & Bank', value: 0 });
  const [newPayment, setNewPayment] = useState<Partial<ScheduledPayment>>({ type: 'Money Out', dayOfMonth: 1, amount: 0 });

  useEffect(() => {
    // Initializing with mock data for this session
    setAccounts([{ id: '1', name: 'Main Business Account', category: 'Cash & Bank', value: 54200 }]);
    setPayments([
      { id: '1', label: 'Internet & Utilities', amount: 150, dayOfMonth: 1, type: 'Money Out', status: 'Active' },
      { id: '2', label: 'Project Salary', amount: 2400, dayOfMonth: 15, type: 'Money In', status: 'Active' }
    ]);
  }, []);

  const addAccount = () => {
    if (!newAccount.name || !newAccount.value) return;
    const account: Account = {
      id: Date.now().toString(),
      name: newAccount.name,
      category: (newAccount.category as any) || 'Cash & Bank',
      value: Number(newAccount.value)
    };
    setAccounts([...accounts, account]);
    setNewAccount({ category: 'Cash & Bank', value: 0 });
    setShowAddAccount(false);
  };

  const addPayment = () => {
    if (!newPayment.label || !newPayment.amount) return;
    const payment: ScheduledPayment = {
      id: Date.now().toString(),
      label: newPayment.label,
      amount: Number(newPayment.amount),
      dayOfMonth: Number(newPayment.dayOfMonth),
      type: (newPayment.type as any) || 'Money Out',
      status: 'Active'
    };
    setPayments([...payments, payment]);
    setNewPayment({ type: 'Money Out', dayOfMonth: 1, amount: 0 });
    setShowAddPayment(false);
  };

  const deleteAccount = (id: string) => setAccounts(accounts.filter(a => a.id !== id));
  const deletePayment = (id: string) => setPayments(payments.filter(p => p.id !== id));
  
  const totalBalance = accounts.reduce((acc, a) => acc + a.value, 0);
  const monthlyIn = payments.filter(p => p.type === 'Money In' && p.status === 'Active').reduce((acc, p) => acc + p.amount, 0);
  const monthlyOut = payments.filter(p => p.type === 'Money Out' && p.status === 'Active').reduce((acc, p) => acc + p.amount, 0);
  const moneyLeftOver = monthlyIn - monthlyOut;

  const chartData = Array.from({ length: 6 }).map((_, i) => ({
    name: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'][i],
    balance: totalBalance + (moneyLeftOver * i)
  }));

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#1f1f1f] pb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Money & Budget</h1>
          <p className="text-gray-400 text-sm max-w-md">
            Manage your accounts, track monthly spending, and visualize your financial trajectory.
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-1">Total Balance</p>
          <p className="text-5xl font-bold text-white tracking-tighter">${totalBalance.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-imperium p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-full text-accent">
              <ArrowUpCircle size={20} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Income</p>
          </div>
          <p className="text-2xl font-bold text-white">+${monthlyIn.toLocaleString()}</p>
          <p className="text-[10px] text-gray-500 mt-2 italic">Scheduled money in.</p>
        </div>
        <div className="card-imperium p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-full text-red-500">
              <ArrowDownCircle size={20} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Expenses</p>
          </div>
          <p className="text-2xl font-bold text-white">-${monthlyOut.toLocaleString()}</p>
          <p className="text-[10px] text-gray-500 mt-2 italic">Scheduled money out.</p>
        </div>
        <div className="bg-accent/5 border border-accent/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/20 rounded-full text-accent">
              <TrendingUp size={20} />
            </div>
            <p className="text-xs font-bold text-accent uppercase">Net Surplus</p>
          </div>
          <p className="text-2xl font-bold text-white">${moneyLeftOver.toLocaleString()}</p>
          <p className="text-[10px] text-gray-400 mt-2 italic">Retained capital per cycle.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <section className="card-imperium p-8 rounded-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                  <TrendingUp size={16} className="text-accent" /> Growth Forecast
                </h3>
              </div>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                  <XAxis dataKey="name" stroke="#444" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #1f1f1f', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="balance" stroke="var(--accent)" fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                <Wallet size={16} /> Asset Inventory
              </h2>
              <button onClick={() => setShowAddAccount(!showAddAccount)} className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase rounded-lg hover:bg-accent hover:text-black transition-all">
                {showAddAccount ? <X size={14} /> : <Plus size={14} />} {showAddAccount ? 'Cancel' : 'New Account'}
              </button>
            </div>

            {showAddAccount && (
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg flex flex-wrap gap-6 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Name</label>
                  <input className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded outline-none" value={newAccount.name || ''} onChange={e => setNewAccount({...newAccount, name: e.target.value})} placeholder="Main Savings" />
                </div>
                <div className="w-40">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Category</label>
                  <select className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded outline-none" value={newAccount.category} onChange={e => setNewAccount({...newAccount, category: e.target.value as any})}>
                    <option value="Cash & Bank">Cash & Bank</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Property">Property</option>
                  </select>
                </div>
                <div className="w-40">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Value ($)</label>
                  <input type="number" className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded outline-none" value={newAccount.value || ''} onChange={e => setNewAccount({...newAccount, value: Number(e.target.value)})} />
                </div>
                <button onClick={addAccount} className="h-[38px] px-6 bg-accent text-black font-bold uppercase text-[10px] rounded"><Check size={18} /></button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map(a => (
                <div key={a.id} className="card-imperium p-5 flex justify-between items-center group rounded-lg hover:border-accent/30 transition-all">
                  <div className="flex items-center gap-4">
                    <DollarSign size={20} className="text-gray-600" />
                    <div>
                      <p className="text-sm font-bold text-white uppercase">{a.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{a.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-accent tracking-tighter">${a.value.toLocaleString()}</p>
                    <button onClick={() => deleteAccount(a.id)} className="text-gray-800 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                <Calendar size={16} /> Recurring Ledger
              </h2>
              <button onClick={() => setShowAddPayment(!showAddPayment)} className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase rounded-lg hover:bg-accent hover:text-black transition-all">
                {showAddPayment ? <X size={14} /> : <Plus size={14} />} {showAddPayment ? 'Cancel' : 'New Entry'}
              </button>
            </div>

            {showAddPayment && (
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg flex flex-wrap gap-6 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Label</label>
                  <input className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded outline-none" value={newPayment.label || ''} onChange={e => setNewPayment({...newPayment, label: e.target.value})} placeholder="Salary, Rent, etc." />
                </div>
                <div className="w-32">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Day</label>
                  <input type="number" min="1" max="31" className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded outline-none" value={newPayment.dayOfMonth || ''} onChange={e => setNewPayment({...newPayment, dayOfMonth: Number(e.target.value)})} />
                </div>
                <div className="w-40">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Type</label>
                  <select className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded outline-none" value={newPayment.type} onChange={e => setNewPayment({...newPayment, type: e.target.value as any})}>
                    <option value="Money Out">Money Out</option>
                    <option value="Money In">Money In</option>
                  </select>
                </div>
                <div className="w-32">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Amount</label>
                  <input type="number" className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded outline-none" value={newPayment.amount || ''} onChange={e => setNewPayment({...newPayment, amount: Number(e.target.value)})} />
                </div>
                <button onClick={addPayment} className="h-[38px] px-6 bg-accent text-black font-bold uppercase text-[10px] rounded"><Check size={18} /></button>
              </div>
            )}

            <div className="card-imperium rounded-lg overflow-hidden">
               <table className="w-full text-left">
                 <thead className="text-[10px] text-gray-600 border-b border-[#1f1f1f] uppercase font-bold tracking-widest bg-white/5">
                   <tr>
                     <th className="px-6 py-4">D-Day</th>
                     <th className="px-6 py-4">Description</th>
                     <th className="px-6 py-4">Flow</th>
                     <th className="px-6 py-4 text-right">Value</th>
                     <th className="px-6 py-4 text-right"></th>
                   </tr>
                 </thead>
                 <tbody className="text-sm divide-y divide-[#1f1f1f]">
                   {payments.map(p => (
                     <tr key={p.id} className="hover:bg-white/5 group transition-colors">
                        <td className="px-6 py-4 text-gray-500 font-bold uppercase">Day {p.dayOfMonth}</td>
                        <td className="px-6 py-4 font-bold text-white uppercase">{p.label}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 border text-[9px] font-bold rounded uppercase ${p.type === 'Money In' ? 'border-accent/30 text-accent' : 'border-red-900/30 text-red-500'}`}>
                            {p.type}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-right font-bold ${p.type === 'Money In' ? 'text-accent' : 'text-white'}`}>
                          {p.type === 'Money In' ? '+' : '-'}${p.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deletePayment(p.id)} className="text-gray-800 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </section>
        </div>

        <div className="space-y-6">
           <section className="card-imperium p-8 rounded-lg">
              <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2 mb-6">
                 <Target size={16} className="text-accent" /> Strategic Goals
              </h3>
              <div className="space-y-8">
                 {[
                   { label: 'Q3 Tax Reserve', target: 12000, current: 8400 },
                   { label: 'Infra Expansion', target: 25000, current: 4200 },
                 ].map((g, i) => {
                    const pct = Math.min(100, (g.current / g.target) * 100);
                    return (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{g.label}</span>
                          <span className="text-sm text-white font-bold">{pct.toFixed(0)}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                           <div className={`h-full bg-accent rounded-full`} style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    )
                 })}
              </div>
           </section>

           <section className="bg-accent/5 border border-accent/20 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="text-accent" size={20} />
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Financial Guidance</h3>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-tighter">
                Ensure recurring ledger entries are audited weekly. Forecasting accuracy depends on complete transaction histories.
              </p>
           </section>
        </div>
      </div>
    </div>
  );
};