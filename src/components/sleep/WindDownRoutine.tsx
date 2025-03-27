
import React from 'react';
import { Bed } from 'lucide-react';

const WindDownRoutine: React.FC = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Bed className="text-supernova-purple mr-3" size={24} />
        <h2 className="text-xl font-display font-semibold">Wind-down Routine</h2>
      </div>
      
      <ul className="space-y-4">
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-supernova-purple/20 flex items-center justify-center mr-3 mt-0.5">
            <span className="text-sm">1</span>
          </div>
          <div>
            <p className="font-medium">Dim the lights 30 minutes before bed</p>
            <p className="text-sm text-gray-400">Signals to your body it's time to produce melatonin</p>
          </div>
        </li>
        
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-supernova-purple/20 flex items-center justify-center mr-3 mt-0.5">
            <span className="text-sm">2</span>
          </div>
          <div>
            <p className="font-medium">Stop screen time 1 hour before sleep</p>
            <p className="text-sm text-gray-400">Blue light suppresses melatonin production</p>
          </div>
        </li>
        
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-supernova-purple/20 flex items-center justify-center mr-3 mt-0.5">
            <span className="text-sm">3</span>
          </div>
          <div>
            <p className="font-medium">Do a 5-minute breathing exercise</p>
            <p className="text-sm text-gray-400">Try the 4-7-8 method: inhale for 4s, hold for 7s, exhale for 8s</p>
          </div>
        </li>
        
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-supernova-purple/20 flex items-center justify-center mr-3 mt-0.5">
            <span className="text-sm">4</span>
          </div>
          <div>
            <p className="font-medium">Keep your bedroom cool (65-68°F / 18-20°C)</p>
            <p className="text-sm text-gray-400">Optimal temperature for quality sleep</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default WindDownRoutine;
