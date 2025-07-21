import React from 'react';
import { Trash2, Edit2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  filteredExpenses: Expense[];
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  onDeleteExpense, 
  filteredExpenses 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (filteredExpenses.length === 0) {
    return (
      <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-8 text-center">
        <div className="text-purple-400/50 mb-4">
          <ArrowUpCircle className="h-16 w-16 mx-auto" />
        </div>
        <p className="text-purple-300 font-poppins">No expenses found. Add your first expense above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-purple-400 font-orbitron mb-4">
        TRANSACTIONS ({filteredExpenses.length})
      </h2>
      
      <div className="space-y-3">
        {filteredExpenses.map((expense, index) => (
          <div
            key={expense.id}
            className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all duration-300 group relative overflow-hidden"
            style={{ 
              animationDelay: `${index * 50}ms`,
              animation: 'slideInUp 0.5s ease-out forwards'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  expense.type === 'income' 
                    ? 'bg-neon-green/10 text-neon-green' 
                    : 'bg-red-400/10 text-red-400'
                }`}>
                  {expense.type === 'income' ? (
                    <ArrowUpCircle className="h-5 w-5" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5" />
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-purple-200 font-poppins">
                    {expense.description}
                  </h3>
                  <div className="flex items-center space-x-3 text-sm text-purple-400">
                    <span>{expense.category}</span>
                    <span>•</span>
                    <span>{formatDate(expense.date)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`text-lg font-bold font-orbitron ${
                  expense.type === 'income' ? 'text-neon-green' : 'text-red-400'
                }`}>
                  {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toLocaleString()}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    className="p-2 text-purple-400 hover:text-neon-green hover:bg-neon-green/10 rounded-lg transition-all duration-300"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="p-2 text-purple-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};