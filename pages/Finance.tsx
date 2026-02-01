
import { useState, useEffect } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Trash2, 
  X, 
  Check, 
  Zap, 
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

type Account = {
  id: string;
  name: string;
  category: 'Cash & Bank' | 'Crypto' | 'Stocks' | 'Property';
  value: number;
};

type ScheduledPayment = {
  id: string;
  label: string;
  amount: number;
  dayOfMonth: number;
  type: 'Money In' | 'Money Out';
  status: 'Active' | 'Paused';
};

export const Finance = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [payments, setPayments] = useState<ScheduledPayment[]>([]);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  
  const [newAccount, setNewAccount] = useState<Partial<Account>>({ category: 'Cash & Bank', value: 0 });
  const [newPayment, setNewPayment] = useState<Partial<ScheduledPayment>>({ type: 'Money Out', dayOfMonth: 1, amount: 0 });

  useEffect(() => {
    // localStorage removal. Initializing with mock data only.
    setAccounts([{ id: '1', name: 'Main Savings Account', category: 'Cash & Bank', value: 54200 }]);
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
    name: ['This Month', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'][i],
    balance: totalBalance + (moneyLeftOver * i)
  }));

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 border border-[#1f1f1f] p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/10 rounded-full text-accent">
              <ArrowUpCircle size={20} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Income</p>
          </div>
          <p className="text-2xl font-bold text-white">+${monthlyIn.toLocaleString()}</p>
        </div>
        <div className="bg-black/40 border border-[#1f1f1f] p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-full text-red-500">
              <ArrowDownCircle size={20} />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Expenses</p>
          </div>
          <p className="text-2xl font-bold text-white">-${monthlyOut.toLocaleString()}</p>
        </div>
        <div className="bg-accent/5 border border-accent/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-accent/20 rounded-full text-accent">
              <TrendingUp size={20} />
            </div>
            <p className="text-xs font-bold text-accent uppercase">Money Left Over</p>
          </div>
          <p className="text-2xl font-bold text-white">${moneyLeftOver.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-black/20 border border-[#1f1f1f] p-8 rounded-lg">
            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2 mb-8">
              <TrendingUp size={16} className="text-accent" /> Your 6-Month Projection
            </h3>
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
                <Wallet size={16} /> My Accounts & Savings
              </h2>
              <button onClick={() => setShowAddAccount(!showAddAccount)} className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase rounded-lg">
                {showAddAccount ? <X size={14} /> : <Plus size={14} />} {showAddAccount ? 'Cancel' : 'Add New Account'}
              </button>
            </div>

            {showAddAccount && (
              <div className="p-6 bg-accent/5 border border-accent/20 rounded-lg flex flex-wrap gap-6 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block tracking-widest">Account Name</label>
                  <input className="w-full bg-black border border-[#1f1f1f] px-4 py-2 text-sm text-white rounded outline-none" value={newAccount.name || ''} onChange={e => setNewAccount({...newAccount, name: e.target.value})} placeholder="e.g. Main Bank" />
                </div>
                <button onClick={addAccount} className="h-[38px] px-6 bg-accent text-black font-bold uppercase text-[10px] rounded"><Check size={18} /></button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map(a => (
                <div key={a.id} className="bg-black/40 border border-[#1f1f1f] p-5 flex justify-between items-center group rounded-lg">
                  <div className="flex items-center gap-4">
                    <DollarSign size={20} className="text-gray-600" />
                    <div>
                      <p className="text-sm font-bold text-white">{a.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{a.category}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-accent tracking-tighter">${a.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
