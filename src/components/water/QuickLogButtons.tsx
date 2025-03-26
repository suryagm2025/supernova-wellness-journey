
import React from 'react';

interface QuickLogButtonProps {
  label: string;
  onClick: () => void;
}

const QuickLogButton: React.FC<QuickLogButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-sm bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
  >
    {label}
  </button>
);

interface QuickLogButtonsProps {
  onQuickLog: (amount: string) => void;
}

const QuickLogButtons: React.FC<QuickLogButtonsProps> = ({ onQuickLog }) => {
  const presetOptions = [
    { label: '1 glass (250ml)', value: '1 glass' },
    { label: '2 glasses (500ml)', value: '2 glasses' },
    { label: '500ml', value: '500ml' },
    { label: '1 liter', value: '1 liter' }
  ];

  return (
    <div className="mt-6 space-y-4">
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <h4 className="text-white text-sm font-medium mb-2">Quick Logs:</h4>
        <div className="grid grid-cols-2 gap-2">
          {presetOptions.map((option) => (
            <QuickLogButton
              key={option.value}
              label={option.label}
              onClick={() => onQuickLog(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLogButtons;
