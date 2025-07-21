import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Expense } from '../types';

interface ExpenseChartProps {
  expenses: Expense[];
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  // Separate income and expenses
  const expenseData = expenses.filter(expense => expense.type === 'expense');
  const incomeData = expenses.filter(expense => expense.type === 'income');
  
  const totalIncome = incomeData.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenseData.reduce((sum, expense) => sum + expense.amount, 0);
  const availableBalance = totalIncome - totalExpenses;
  
  const categoryTotals = expenseData.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Create chart data with available balance first, then expense categories
  const expenseCategoryData = Object.entries(categoryTotals).map(([category, amount]) => ({
    name: category,
    value: amount,
    type: 'expense',
    percentage: ((amount / totalIncome) * 100).toFixed(1)
  }));

  const chartData = [
    ...(availableBalance > 0 ? [{
      name: 'Available Balance',
      value: availableBalance,
      type: 'balance',
      percentage: ((availableBalance / totalIncome) * 100).toFixed(1)
    }] : []),
    ...expenseCategoryData
  ];

  // Cyber-themed color palette
  const COLORS = [
    '#39FF14', // neon-green for available balance
    '#9B59B6', // purple for primary expense category
    '#00FFFF', // aqua/cyan
    '#1E90FF', // electric blue
    '#FF1493', // deep pink
    '#00FF7F', // spring green
    '#FF69B4', // hot pink
    '#7B68EE', // medium slate blue
    '#00CED1', // dark turquoise
    '#FF6347'  // tomato
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/95 backdrop-blur-sm border border-neon-green/50 rounded-lg p-3 shadow-2xl relative">
          <div className="absolute inset-0 bg-neon-green/5 rounded-lg blur-sm" />
          <div className="relative z-10">
            <p className="text-white font-poppins text-sm font-medium" style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
              {data.name}
            </p>
            <p className="text-neon-green font-orbitron font-bold text-lg" style={{ textShadow: '0 0 15px #39FF14' }}>
              ₹{data.value.toLocaleString()}
            </p>
            <p className="text-purple-300 text-xs" style={{ textShadow: '0 0 8px rgba(155,89,182,0.8)' }}>
              {data.percentage}% of total income
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-xs group">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ 
                backgroundColor: entry.color,
                boxShadow: `0 0 8px ${entry.color}40`
              }}
            />
            <span 
              className="text-gray-300 font-poppins transition-all duration-300 group-hover:text-white" 
              style={{ textShadow: '0 0 5px rgba(255,255,255,0.3)' }}
            >
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (chartData.length === 0 || totalIncome === 0) {
    return (
      <div className="bg-black border border-purple-500/30 rounded-xl p-6 h-80 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-neon-green/5" />
        <div className="text-center">
          <div className="w-32 h-32 border-2 border-dashed border-purple-500/40 rounded-full mx-auto mb-4 flex items-center justify-center relative">
            <div className="absolute inset-0 border-2 border-dashed border-neon-green/20 rounded-full animate-pulse" />
            <span className="text-purple-400/60 font-orbitron text-sm font-bold" style={{ textShadow: '0 0 10px rgba(155,89,182,0.5)' }}>
              NO DATA
            </span>
          </div>
          <p className="text-gray-400 font-poppins" style={{ textShadow: '0 0 5px rgba(255,255,255,0.2)' }}>
            Add income and expenses to see breakdown
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-purple-500/30 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/3 via-transparent to-purple-500/3" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/5 to-transparent opacity-50" />
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-white font-orbitron mb-6 text-center tracking-wider" style={{ textShadow: '0 0 15px rgba(255,255,255,0.5)' }}>
          FINANCIAL BREAKDOWN
        </h3>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={1}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-in-out"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    stroke="rgba(0,0,0,0.9)"
                    strokeWidth={0.5}
                    style={{
                      filter: `drop-shadow(0 0 8px ${COLORS[index % COLORS.length]}40)`,
                      transition: 'all 0.3s ease-in-out'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};