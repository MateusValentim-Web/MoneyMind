import { TrendingUp, TrendingDown, Wallet, X } from 'lucide-react';

const TransactionList = ({ 
  transactions, 
  getMonthName, 
  selectedMonth, 
  formatCurrency,
  onDelete 
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">
          {getMonthName(selectedMonth)}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          {transactions.length} {transactions.length === 1 ? 'transação' : 'transações'}
        </p>
      </div>

      <div className="divide-y divide-slate-700">
        {transactions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Wallet className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>Nenhuma transação encontrada</p>
            <p className="text-sm mt-2">Adicione sua primeira transação para começar</p>
          </div>
        ) : (
          transactions.map(transaction => (
            <div
              key={transaction.id}
              className="p-4 hover:bg-slate-700/30 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-200">{transaction.description}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(transaction.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-bold text-lg ${
                  transaction.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </span>
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;