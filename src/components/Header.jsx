import { Wallet } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Wallet className="w-10 h-10 text-emerald-400" />
        <h1 className="text-4xl font-bold text-white">MoneyMind</h1>
      </div>
      <p className="text-slate-400">Controle financeiro simples e eficiente</p>
    </div>
  );
};

export default Header;