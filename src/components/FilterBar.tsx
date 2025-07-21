import React from 'react';
import { Filter, Calendar, Tag } from 'lucide-react';
import { CATEGORIES } from '../types';

interface FilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedMonth,
  setSelectedMonth,
  selectedType,
  setSelectedType
}) => {
  const months = [
    'All Months', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-neon-green" />
        <h3 className="text-lg font-semibold text-purple-400 font-orbitron">FILTERS</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-purple-300 mb-2 font-poppins">
            <Tag className="h-4 w-4" />
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-purple-200 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all duration-300"
          >
            <option className='bg-black/75 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200' value="">All Categories</option>
            {CATEGORIES.map(category => (
              <option className='bg-black/75 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200' key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-purple-300 mb-2 font-poppins">
            <Calendar className="h-4 w-4" />
            Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-purple-200 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all duration-300"
          >
            {months.map(month => (
              <option className='bg-black/75 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200' key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-purple-300 mb-2 font-poppins">
            Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-black/50 border border-purple-500/30 rounded-lg px-3 py-2 text-purple-200 focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all duration-300"
          >
            <option className='bg-black/75 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200' value="">All Types</option>
            <option className='bg-black/75 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200' value="expense">Expenses</option>
            <option className='bg-black/75 border border-purple-500/50 rounded-lg px-4 py-3 text-purple-200' value="income">Income</option>
          </select>
        </div>
      </div>
    </div>
  );
};