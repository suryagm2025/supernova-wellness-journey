
import React from 'react';

interface SleepHourSelectorProps {
  onSelectHours: (hours: string) => void;
}

const SleepHourSelector: React.FC<SleepHourSelectorProps> = ({ onSelectHours }) => {
  return (
    <>
      <h2 className="text-xl font-display font-semibold mb-6 text-center">
        How many hours did you sleep last night?
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={() => onSelectHours("less-than-5")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
        >
          <p className="text-lg font-medium">Less than 5</p>
        </button>
        
        <button 
          onClick={() => onSelectHours("5-7")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
        >
          <p className="text-lg font-medium">5–7 hours</p>
        </button>
        
        <button 
          onClick={() => onSelectHours("7-9")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
        >
          <p className="text-lg font-medium">7–9 hours</p>
        </button>
        
        <button 
          onClick={() => onSelectHours("9-plus")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
        >
          <p className="text-lg font-medium">9+ hours</p>
        </button>
      </div>
    </>
  );
};

export default SleepHourSelector;
