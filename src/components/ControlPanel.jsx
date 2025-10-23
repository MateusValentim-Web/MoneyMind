import { Download, Filter, Plus, X } from 'lucide-react';
import TransactionForm from './TransactionForm';

const ControlPanel = ({ 
  selectedMonth, 
  setSelectedMonth, 
  availableMonths, 
  getMonthName,
  onExportCSV,
  canExport,
  showForm,
  setShowForm,
  description,
  setDescription,
  amount,
  setAmount,
  type,
  setType,
  onAddTransaction
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700 mb-6">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-400" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-600 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Todos os meses</option>
            {availableMonths.map(month => (
              <option key={month} value={month}>
                {getMonthName(month)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onExportCSV}
            disabled={!canExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span className="hidden sm:inline">{showForm ? 'Fechar' : 'Nova Transação'}</span>
          </button>
        </div>
      </div>

      {showForm && (
        <TransactionForm
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          type={type}
          setType={setType}
          onSubmit={onAddTransaction}
        />
      )}
    </div>
  );
};

export default ControlPanel;