
import React from 'react';

interface QuickLogButtonsProps {
  onQuickLog: (amount: string) => void;
}

const QuickLogButtons: React.FC<QuickLogButtonsProps> = ({ onQuickLog }) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">Quick Logs:</h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onQuickLog('1 glass')}
            className="text-sm bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            1 glass (250ml)
          </button>
          <button
            onClick={() => onQuickLog('2 glasses')}
            className="text-sm bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            2 glasses (500ml)
          </button>
          <button
            onClick={() => onQuickLog('500ml')}
            className="text-sm bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            500ml
          </button>
          <button
            onClick={() => onQuickLog('1 liter')}
            className="text-sm bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
          >
            1 liter
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickLogButtons;
