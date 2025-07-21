import React from 'react';
import { TrendingUp, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <TrendingUp className="h-8 w-8 text-neon-green animate-pulse" />
              <div className="absolute inset-0 h-8 w-8 text-neon-green blur-sm opacity-50">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold font-orbitron text-purple-400 tracking-wider">
              EXPENSIFY
            </h1>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:text-neon-green transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};