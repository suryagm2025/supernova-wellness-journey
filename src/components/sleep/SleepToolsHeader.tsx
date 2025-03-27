
import React from 'react';
import { Moon } from 'lucide-react';

const SleepToolsHeader: React.FC = () => {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center justify-center bg-supernova-purple/20 p-3 rounded-full mb-4">
        <Moon size={32} className="text-supernova-purple" />
      </div>
      <h1 className="text-3xl font-display font-semibold mb-2">Sleep Tools</h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Access resources and tools to improve your sleep quality and build better rest habits.
      </p>
    </div>
  );
};

export default SleepToolsHeader;
