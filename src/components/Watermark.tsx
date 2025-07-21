import React from 'react';

export const Watermark: React.FC = () => {
  return (
    <div className="fixed bottom-3 right-6 z-10 pointer-events-none">
      <div className="text-neon-green/75 font-orbitron font-bold text-lg tracking-wider select-none">
        EXPENSIFY
      </div>
    </div>
  );
};