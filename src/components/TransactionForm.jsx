const TransactionForm = ({ 
  description, 
  setDescription, 
  amount, 
  setAmount, 
  type, 
  setType, 
  onSubmit 
}) => {
  return (
    <div className="mt-6 pt-6 border-t border-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 bg-slate-900 border border-slate-600 text-slate-200 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          min="0"
          className="px-4 py-2 bg-slate-900 border border-slate-600 text-slate-200 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="income"
            checked={type === 'income'}
            onChange={(e) => setType(e.target.value)}
            className="w-4 h-4 text-emerald-600"
          />
          <span className="text-slate-300">Entrada</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="expense"
            checked={type === 'expense'}
            onChange={(e) => setType(e.target.value)}
            className="w-4 h-4 text-red-600"
          />
          <span className="text-slate-300">Saída</span>
        </label>
      </div>

      <button
        onClick={onSubmit}
        className="mt-4 w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
      >
        Adicionar Transação
      </button>
    </div>
  );
};

export default TransactionForm;