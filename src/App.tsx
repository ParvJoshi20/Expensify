import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { ExpenseForm } from './components/ExpenseForm';
import { FilterBar } from './components/FilterBar';
import { ExpenseList } from './components/ExpenseList';
import { Watermark } from './components/Watermark';
import { ExpenseChart } from './components/ExpenseChart';
import { Expense } from './types';
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);
  // {
    //   id: '1',
    //   amount: 2500,
    //   description: 'Salary Credit',
    //   category: 'Other',
    //   date: '2025-01-15',
    //   type: 'income'
    // },
    // {
    //   id: '2',
    //   amount: 250,
    //   description: 'Coffee and breakfast',
    //   category: 'Food & Dining',
    //   date: '2025-01-15',
    //   type: 'expense'
    // },
    // {
    //   id: '3',
    //   amount: 180,
    //   description: 'Uber ride to office',
    //   category: 'Transportation',
    //   date: '2025-01-14',
    //   type: 'expense'
    // } // Add these into the [] of the array for testing purposes

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedType, setSelectedType] = useState('');

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const categoryMatch = !selectedCategory || expense.category === selectedCategory;
      
      const monthMatch = selectedMonth === 'All Months' || 
        new Date(expense.date).toLocaleString('default', { month: 'long' }) === selectedMonth;
      
      const typeMatch = !selectedType || expense.type === selectedType;

      return categoryMatch && monthMatch && typeMatch;
    });
  }, [expenses, selectedCategory, selectedMonth, selectedType]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsDismissed(false); // Reset dismissal when online again
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-neon-green/10 animate-pulse" />
      
      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="relative z-10">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Summary expenses={expenses} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <ExpenseChart expenses={expenses} />
          </div>
          
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={handleDeleteExpense}
            filteredExpenses={filteredExpenses}
          />
        </main>

        {!isOnline && <div className="h-12" />}

        {!isOnline && !isDismissed && (
        <div className="fixed bottom-0 sm:bottom-0 mb-12 sm:mb-0 left-0 w-full bg-[#FF073A] text-white text-sm sm:text-base text-center py-3 px-4 font-medium font-poppins z-50 shadow-md">
          <button
            className="absolute top-1 right-2 text-white text-xl font-bold leading-none hover:text-gray-300 transition"
            onClick={() => setIsDismissed(true)}
          >
            &times;
          </button>
          ⚠️ You’re offline. Voice Commands will not be available and changes will be saved locally.
        </div>
      )}
      </div>

      <Watermark />
    </div>
    
  );
}

export default App;