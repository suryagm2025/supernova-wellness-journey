
import React from 'react';
import { Award, Moon, TrendingUp } from 'lucide-react';

interface SummaryCardsProps {
  checkInRate: number;
  sleepAverage: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ checkInRate, sleepAverage }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="p-4 bg-supernova-dark border border-white/10 rounded-lg">
        <h3 className="flex items-center text-lg font-medium mb-2">
          <Award className="mr-2 text-supernova-blue" size={20} />
          Check-in Rate
        </h3>
        <div className="text-3xl font-semibold mb-1">{checkInRate}%</div>
        <p className="text-gray-400 text-sm">Daily wellness tracking</p>
      </div>
      
      <div className="p-4 bg-supernova-dark border border-white/10 rounded-lg">
        <h3 className="flex items-center text-lg font-medium mb-2">
          <Moon className="mr-2 text-supernova-purple" size={20} />
          Sleep Average
        </h3>
        <div className="text-3xl font-semibold mb-1">{sleepAverage.toFixed(1)} hrs</div>
        <p className="text-gray-400 text-sm">Weekly sleep score</p>
      </div>
      
      <div className="p-4 bg-supernova-dark border border-white/10 rounded-lg">
        <h3 className="flex items-center text-lg font-medium mb-2">
          <TrendingUp className="mr-2 text-supernova-pink" size={20} />
          Activity Streak
        </h3>
        <div className="text-3xl font-semibold mb-1">5 days</div>
        <p className="text-gray-400 text-sm">Consistent movement</p>
      </div>
    </div>
  );
};

export default SummaryCards;
