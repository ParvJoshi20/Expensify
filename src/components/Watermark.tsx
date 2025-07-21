import React from 'react';

export const Watermark: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-10 pointer-events-none">
      <div className="text-neon-green/20 font-orbitron font-bold text-lg tracking-wider rotate-12 select-none">
        EXPENSIFY
      </div>
    </div>
  );
};