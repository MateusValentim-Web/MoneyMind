import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const SummaryCards = ({ income, expenses, balance, formatCurrency }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-slate-300 font-medium">Entradas</span>
        </div>
        <p className="text-2xl font-bold text-emerald-400">{formatCurrency(income)}</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <TrendingDown className="w-5 h-5 text-red-400" />
          </div>
          <span className="text-slate-300 font-medium">Saídas</span>
        </div>
        <p className="text-2xl font-bold text-red-400">{formatCurrency(expenses)}</p>
      </div>

      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 shadow-xl border border-emerald-500/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-white/90 font-medium">Saldo</span>
        </div>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-200'}`}>
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;