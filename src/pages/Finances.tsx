import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Trash } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'receita' | 'despesa';
  amount: number;
  description: string;
  date: number;
}

const Finances: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  
  const [newTransaction, setNewTransaction] = useState({
    type: 'receita' as 'receita' | 'despesa',
    amount: '',
    description: '',
  });
  
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // calculo balanço
    const newBalance = transactions.reduce((total, transaction) => {
      return transaction.type === 'receita' 
        ? total + transaction.amount 
        : total - transaction.amount;
    }, 0);
    
    setBalance(newBalance);
  }, [transactions]);

  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount),
      description: newTransaction.description,
      date: Date.now(),
    };
    
    setTransactions([transaction, ...transactions]);
    setNewTransaction({
      type: 'receita',
      amount: '',
      description: '',
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getBalanceStatus = () => {
    if (balance > 0) return { status: 'positive', text: 'Saudável' };
    if (balance === 0) return { status: 'neutral', text: 'Equilibrado' };
    return { status: 'negative', text: 'Negativo' };
  };

  const balanceStatus = getBalanceStatus();

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Gerenciador Financeiro</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* saldo atual */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Saldo Atual</h3>
          <div className={`text-3xl font-bold mb-2 ${
            balanceStatus.status === 'positive' ? 'text-green-600 dark:text-green-400' :
            balanceStatus.status === 'negative' ? 'text-red-600 dark:text-red-400' :
            'text-gray-600 dark:text-gray-400'
          }`}>
            {formatCurrency(balance)}
          </div>
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            balanceStatus.status === 'positive' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
            balanceStatus.status === 'negative' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            Status: {balanceStatus.text}
          </div>
        </div>
        
        {/* Formulario de nova transição*/}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Nova Transação</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo
              </label>
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'receita' | 'despesa'})}
                className="form-input"
              >
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Valor
              </label>
              <input
                type="number"
                step="0.01"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                placeholder="R$ 0,00"
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descrição
              </label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                placeholder="Descrição da transação"
                className="form-input"
              />
            </div>
            
            <button
              onClick={addTransaction}
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Transação
            </button>
          </div>
        </div>
        
        {/* rwsumo */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Resumo</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full mr-2">
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Receitas</span>
              </div>
              <span className="font-medium text-green-600 dark:text-green-400">
                {formatCurrency(transactions.reduce((total, t) => 
                  t.type === 'receita' ? total + t.amount : total, 0))}
              </span>
            </div>
            
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-full mr-2">
                  <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Despesas</span>
              </div>
              <span className="font-medium text-red-600 dark:text-red-400">
                {formatCurrency(transactions.reduce((total, t) => 
                  t.type === 'despesa' ? total + t.amount : total, 0))}
              </span>
            </div>
            
            <div className="pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-2">
                    <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Saldo</span>
                </div>
                <span className={`font-bold ${
                  balanceStatus.status === 'positive' ? 'text-green-600 dark:text-green-400' :
                  balanceStatus.status === 'negative' ? 'text-red-600 dark:text-red-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {formatCurrency(balance)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recente Transação */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Transações Recentes</h3>
        
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <Wallet className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Nenhuma transação registrada
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Adicione suas transações para começar a acompanhar suas finanças
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-1.5 rounded-full mr-2 ${
                          transaction.type === 'receita' 
                            ? 'bg-green-100 dark:bg-green-900/30' 
                            : 'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          {transaction.type === 'receita' ? (
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <span className={`font-medium ${
                          transaction.type === 'receita' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.type === 'receita' ? 'Receita' : 'Despesa'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      <span className={transaction.type === 'receita' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'}>
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Excluir transação"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Finances;