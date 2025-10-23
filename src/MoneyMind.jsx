import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import ControlPanel from './components/ControlPanel';
import TransactionList from './components/TransactionList';

const MoneyMind = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar transações do localStorage ao iniciar
  useEffect(() => {
    console.log('🔄 Carregando transações...');
    const saved = localStorage.getItem('moneymind_transactions');
    console.log('📦 Dados salvos:', saved);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log('✅ Transações carregadas:', parsed);
      setTransactions(parsed);
    }
    setIsLoaded(true);
  }, []);

  // Salvar transações sempre que mudarem (mas só depois de carregar)
  useEffect(() => {
    if (isLoaded) {
      console.log('💾 Salvando transações:', transactions);
      localStorage.setItem('moneymind_transactions', JSON.stringify(transactions));
      console.log('✅ Salvo!');
    }
  }, [transactions, isLoaded]);

  const addTransaction = () => {
    if (!description.trim() || !amount || parseFloat(amount) <= 0) return;

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);
    setDescription('');
    setAmount('');
    setShowForm(false);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Filtrar transações por mês
  const filteredTransactions = useMemo(() => {
    if (selectedMonth === 'all') return transactions;
    
    return transactions.filter(t => {
      const date = new Date(t.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return month === selectedMonth;
    });
  }, [transactions, selectedMonth]);

  // Calcular saldos
  const { income, expenses, balance } = useMemo(() => {
    const inc = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const exp = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      income: inc,
      expenses: exp,
      balance: inc - exp
    };
  }, [filteredTransactions]);

  // Obter meses disponíveis
  const availableMonths = useMemo(() => {
    const months = new Set();
    transactions.forEach(t => {
      const date = new Date(t.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(month);
    });
    return Array.from(months).sort().reverse();
  }, [transactions]);

  // Exportar para CSV
  const exportToCSV = () => {
    const headers = ['Data', 'Descrição', 'Tipo', 'Valor'];
    const rows = filteredTransactions.map(t => [
      new Date(t.date).toLocaleDateString('pt-BR'),
      t.description,
      t.type === 'income' ? 'Entrada' : 'Saída',
      t.amount.toFixed(2)
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `moneymind_${selectedMonth === 'all' ? 'todas' : selectedMonth}.csv`;
    link.click();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getMonthName = (monthStr) => {
    if (monthStr === 'all') return 'Todas as transações';
    const [year, month] = monthStr.split('-');
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <SummaryCards
          income={income}
          expenses={expenses}
          balance={balance}
          formatCurrency={formatCurrency}
        />

        <ControlPanel
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          availableMonths={availableMonths}
          getMonthName={getMonthName}
          onExportCSV={exportToCSV}
          canExport={filteredTransactions.length > 0}
          showForm={showForm}
          setShowForm={setShowForm}
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
          type={type}
          setType={setType}
          onAddTransaction={addTransaction}
        />

        <TransactionList
          transactions={filteredTransactions}
          getMonthName={getMonthName}
          selectedMonth={selectedMonth}
          formatCurrency={formatCurrency}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default MoneyMind;