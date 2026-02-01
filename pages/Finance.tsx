
import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Plus, 
  Trash2, 
  X, 
  Check, 
  Zap, 
  PlayCircle, 
  PauseCircle, 
  Target, 
  Info,
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

const Finance: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [payments, setPayments] = useState<ScheduledPayment[]>([]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  
  const [newAccount, setNewAccount] = useState<Partial<Account>>({ category: 'Cash & Bank', value: 0 });
  const [newPayment, setNewPayment] = useState<Partial<ScheduledPayment>>({ type: 'Money Out', dayOfMonth: 1, amount: 0 });

  useEffect(() => {
    const savedAccounts = localStorage.getItem('metalab_assets');
    const savedPayments = localStorage.getItem('metalab_automations');
    
    if (savedAccounts) {
      // Mapping old data names to new simple names if necessary
      const parsed = JSON.parse(savedAccounts);
      setAccounts(parsed.map((a: any) => ({
        ...a,
        category: a.category === 'CASH' ? 'Cash & Bank' : 
                  a.category === 'REAL_ESTATE' ? 'Property' : a.category
      })));
    } else {
      const initial = [{ id: '1', name: 'Main Savings Account', category: 'Cash & Bank', value: 54200 }];
      setAccounts(initial as Account[]);
      localStorage.setItem('metalab_assets', JSON.stringify(initial));
    }

    if (savedPayments) {
      const parsed = JSON.parse(savedPayments);
      setPayments(parsed.map((p: any) => ({
        ...p,
        type: p.type === 'INCOMING' ? 'Money In' : 'Money Out'
      })));
    } else {
      const initial = [
        { id: '1', label: 'Internet & Utilities', amount: 150, dayOfMonth: 1, type: 'Money Out', status: 'Active' },
        { id: '2', label: 'Project Salary', amount: 2400, dayOfMonth: 15, type: 'Money In', status: 'Active' }
      ];
      setPayments(initial as ScheduledPayment[]);
      localStorage.setItem('metalab_automations', JSON.stringify(initial));
    }
  }, []);

  const persist = (accData: Account[], payData: ScheduledPayment[]) => {
    setAccounts(accData);
    setPayments(payData);
    localStorage.setItem('metalab_assets', JSON.stringify(accData));
    localStorage.setItem('metalab_automations', JSON.stringify(payData));
  };

  const addAccount = () => {
    if (!newAccount.name || !newAccount.value) return;
    const account: Account = {
      id: Date.now().toString(),
      name: newAccount.name,
      category: (newAccount.category as any) || 'Cash & Bank',
      value: Number(newAccount.value)
    };
    persist([...accounts, account], payments);
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
    persist(accounts, [...payments, payment]);
    setNewPayment({ type: 'Money Out', dayOfMonth: 1, amount: 0 });
    setShowAddPayment(false);
  };

  const deleteAccount = (id: string) => persist(accounts.filter(a => a.id !== id), payments);
  const deletePayment = (id: string) => persist(accounts, payments.filter(p => p.id !== id));
  
  const totalBalance = accounts.reduce((acc, a) => acc + a.value, 0);
  const monthlyIn = payments.filter(p => p.type === 'Money In' && p.status === 'Active').reduce((acc, p) => acc + p.amount, 0);
  const monthlyOut = payments.filter(p => p.type === 'Money Out' && p.status === 'Active').reduce((acc, p) => acc + p.amount, 0);
  const moneyLeftOver = monthlyIn - monthlyOut;

  // Simple projection for the chart
  const chartData = Array.from({ length: 6 }).map((_, i) => ({
    name: ['This Month', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'][i],
    balance: totalBalance + (moneyLeftOver * i)
  }));

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header & Main Total */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#1f1f1f] pb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Money & Budget</h1>
          <p className="text-gray-400 text-sm max-w-md">
            Easily manage your accounts, track your monthly spending, and see how your savings will grow over time.
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-1">Your Total Balance</p>
          <p className="text-5xl font-bold text-white tracking-tighter">${totalBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 border border-[#1f1f1f] p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-full text-accent">
              <ArrowUpCircle size={20} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Income</p>
          </div>
          <p className="text-2xl font-bold text-white">+${monthlyIn.toLocaleString()}</p>
          <p className="text-[10px] text-gray-500 mt-2 italic">Total money coming in this month.</p>
        </div>
        <div className="bg-black/40 border border-[#1f1f1f] p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-full text-red-500">
              <ArrowDownCircle size={20} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Expenses</p>
          </div>
          <p className="text-2xl font-bold text-white">-${monthlyOut.toLocaleString()}</p>
          <p className="text-[10px] text-gray-500 mt-2 italic">Total money leaving your accounts.</p>
        </div>
        <div className="bg-accent/5 border border-accent/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/20 rounded-full text-accent">
              <TrendingUp size={20} />
            </div>
            <p className="text-xs font-bold text-accent uppercase">Money Left Over</p>
          </div>
          <p className="text-2xl font-bold text-white">${moneyLeftOver.toLocaleString()}</p>
          <p className="text-[10px] text-gray-400 mt-2 italic">Your surplus after all bills are paid.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Balance Forecast Chart */}
          <section className="bg-black/20 border border-[#1f1f1f] p-8 rounded-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                  <TrendingUp size={16} className="text-accent" /> Your 6-Month Projection
                </h3>
                <p className="text-[10px] text-gray-500 mt-1 uppercase">Estimated balance growth based on current profit</p>
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

          {/* Accounts Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                  <Wallet size={16} /> My Accounts & Savings
                </h2>
                <p className="text-[10px] text-gray-600 mt-1">Add your bank accounts, properties, or other assets here.</p>
              </div>
              <button 
                onClick={() => setShowAddAccount(!showAddAccount)} 
                className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase rounded-lg hover:bg-accent hover:text-black transition-all flex items-center gap-2"
              >
                {showAddAccount ? <X size={14} /> : <Plus size={14} />} {showAddAccount ? 'Cancel' : 'Add New Account'}
              </button>
            </div>

            {showAddAccount && (
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg flex flex-wrap gap-6 items-end animate-in fade-in slide-in-from-top-2">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Account Name</label>
                  <input className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded focus:border-accent outline-none" value={newAccount.name || ''} onChange={e => setNewAccount({...newAccount, name: e.target.value})} placeholder="e.g. Main Bank, Rental Property" />
                </div>
                <div className="w-40">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Category</label>
                  <select className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded focus:border-accent outline-none" value={newAccount.category} onChange={e => setNewAccount({...newAccount, category: e.target.value as any})}>
                    <option value="Cash & Bank">Cash & Bank</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Property">Property</option>
                  </select>
                </div>
                <div className="w-40">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Current Value ($)</label>
                  <input type="number" className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded focus:border-accent outline-none" value={newAccount.value || ''} onChange={e => setNewAccount({...newAccount, value: Number(e.target.value)})} />
                </div>
                <button onClick={addAccount} className="h-[38px] px-6 bg-accent text-black font-bold uppercase text-[10px] rounded hover:bg-white transition-all"><Check size={18} /></button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map(a => (
                <div key={a.id} className="bg-black/40 border border-[#1f1f1f] p-5 flex justify-between items-center group rounded-lg hover:border-accent/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 border border-white/5 flex items-center justify-center text-gray-600 rounded-lg group-hover:text-accent transition-colors">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{a.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{a.category}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <p className="text-lg font-bold text-accent tracking-tighter">${a.value.toLocaleString()}</p>
                    <button onClick={() => deleteAccount(a.id)} className="text-gray-800 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Payments Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                  <Calendar size={16} /> Scheduled Payments
                </h2>
                <p className="text-[10px] text-gray-600 mt-1">Track bills or income that happen every month automatically.</p>
              </div>
              <button 
                onClick={() => setShowAddPayment(!showAddPayment)} 
                className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase rounded-lg hover:bg-accent hover:text-black transition-all flex items-center gap-2"
              >
                {showAddPayment ? <X size={14} /> : <Plus size={14} />} {showAddPayment ? 'Cancel' : 'Add New Payment'}
              </button>
            </div>

            {showAddPayment && (
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg flex flex-wrap gap-6 items-end animate-in fade-in slide-in-from-top-2">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Description</label>
                  <input className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded focus:border-accent outline-none" value={newPayment.label || ''} onChange={e => setNewPayment({...newPayment, label: e.target.value})} placeholder="e.g. Netflix, Client Fee" />
                </div>
                <div className="w-32">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Day of Month</label>
                  <input type="number" min="1" max="31" className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded focus:border-accent outline-none" value={newPayment.dayOfMonth || ''} onChange={e => setNewPayment({...newPayment, dayOfMonth: Number(e.target.value)})} />
                </div>
                <div className="w-40">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Type</label>
                  <select className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded focus:border-accent outline-none" value={newPayment.type} onChange={e => setNewPayment({...newPayment, type: e.target.value as any})}>
                    <option value="Money Out">Money Out (Bill)</option>
                    <option value="Money In">Money In (Income)</option>
                  </select>
                </div>
                <div className="w-32">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Amount ($)</label>
                  <input type="number" className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded focus:border-accent outline-none" value={newPayment.amount || ''} onChange={e => setNewPayment({...newPayment, amount: Number(e.target.value)})} />
                </div>
                <button onClick={addPayment} className="h-[38px] px-6 bg-accent text-black font-bold uppercase text-[10px] rounded hover:bg-white transition-all"><Check size={18} /></button>
              </div>
            )}

            <div className="bg-black/20 border border-[#1f1f1f] rounded-lg overflow-hidden">
               <table className="w-full text-left">
                 <thead className="text-[10px] text-gray-500 border-b border-[#1f1f1f] uppercase font-bold tracking-widest bg-white/5">
                   <tr>
                     <th className="px-6 py-4">Day</th>
                     <th className="px-6 py-4">What for?</th>
                     <th className="px-6 py-4">Type</th>
                     <th className="px-6 py-4 text-right">Amount</th>
                     <th className="px-6 py-4 text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm divide-y divide-[#1f1f1f]">
                   {payments.map(p => (
                     <tr key={p.id} className="hover:bg-white/5 group transition-colors">
                        <td className="px-6 py-4 text-gray-400 font-bold">D{p.dayOfMonth}</td>
                        <td className="px-6 py-4 font-bold text-white">{p.label}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 border text-[9px] font-bold rounded uppercase ${p.type === 'Money In' ? 'border-accent/50 text-accent' : 'border-red-900/50 text-red-500'}`}>
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
                   {payments.length === 0 && (
                     <tr>
                       <td colSpan={5} className="px-6 py-10 text-center text-gray-600 text-[10px] uppercase tracking-[0.2em]">No payments detected.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <section className="bg-black/40 border border-[#1f1f1f] p-8 rounded-lg">
              <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2 mb-6">
                 <Target size={16} className="text-accent" /> My Saving Goals
              </h3>
              <div className="space-y-8">
                 {[
                   { label: 'Annual Holiday', target: 8000, current: 2400 },
                   { label: 'Property Tax Reserve', target: 12000, current: totalBalance > 12000 ? 12000 : totalBalance },
                 ].map((g, i) => {
                    const pct = Math.min(100, (g.current / g.target) * 100);
                    return (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{g.label}</span>
                          <span className="text-sm text-white font-bold">{pct.toFixed(0)}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
                           <div className={`h-full bg-accent rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 uppercase font-medium">
                          <span>${g.current.toLocaleString()} saved</span>
                          <span>Target: ${g.target.toLocaleString()}</span>
                        </div>
                      </div>
                    )
                 })}
              </div>
              <button className="w-full mt-10 py-3 border border-dashed border-[#1f1f1f] text-[10px] text-gray-500 font-bold uppercase hover:border-accent hover:text-accent transition-all rounded-lg">
                + Create New Goal
              </button>
           </section>

           <section className="bg-accent/5 border border-accent/20 p-8 rounded-lg flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <HelpCircle className="text-accent" size={20} />
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Need Help?</h3>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Management of your finances is vital. Always ensure your <b>Scheduled Payments</b> are accurate so the forecast can show you the correct future growth.
              </p>
              <a href="#" className="text-[10px] text-accent font-bold uppercase hover:underline">Read the Finance Guide &rarr;</a>
           </section>
        </div>
      </div>
    </div>
  );
};

export default Finance;
