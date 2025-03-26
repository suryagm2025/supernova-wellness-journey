
import React from 'react';

interface WaterVisualizationProps {
  totalWater: number;
  goal?: number;
}

const WaterVisualization: React.FC<WaterVisualizationProps> = ({ 
  totalWater, 
  goal = 3000 
}) => {
  // Calculate percentage for the water visualization
  const waterPercentage = Math.min(100, (totalWater / goal) * 100);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-gray-400 text-sm">Current intake</span>
        <span className="text-white font-medium">{(totalWater / 1000).toFixed(1)}L</span>
      </div>
      
      <div className="h-6 bg-white/5 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-supernova-blue to-supernova-purple transition-all duration-500 relative"
          style={{ width: `${waterPercentage}%` }}
        >
          <div className="absolute top-0 right-0 h-full w-full bg-white/20 animate-shimmer bg-[length:200%_100%]"></div>
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <span className="text-gray-400 text-sm">0L</span>
        <span className="text-gray-400 text-sm">Goal: {(goal / 1000).toFixed(1)}L</span>
      </div>
    </div>
  );
};

export default WaterVisualization;
