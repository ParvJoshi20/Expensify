import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Expense } from '../types';

interface SummaryProps {
  expenses: Expense[];
}

export const Summary: React.FC<SummaryProps> = ({ expenses }) => {
  const totalIncome = expenses
    .filter(expense => expense.type === 'income')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalExpenses = expenses
    .filter(expense => expense.type === 'expense')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const balance = totalIncome - totalExpenses;

  const summaryCards = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: DollarSign,
      color: balance >= 0 ? 'text-neon-green' : 'text-red-400',
      bgColor: balance >= 0 ? 'bg-neon-green/10' : 'bg-red-400/10',
      borderColor: balance >= 0 ? 'border-neon-green/30' : 'border-red-400/30'
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'text-neon-green',
      bgColor: 'bg-neon-green/10',
      borderColor: 'border-neon-green/30'
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`${card.bgColor} ${card.borderColor} border rounded-xl p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-purple-300 font-poppins uppercase tracking-wider">
                  {card.title}
                </h3>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <p className={`text-2xl font-bold font-orbitron ${card.color}`}>
                ₹{card.amount.toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};