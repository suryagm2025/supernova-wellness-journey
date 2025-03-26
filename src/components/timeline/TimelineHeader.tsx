
import React from 'react';
import { Chart } from 'lucide-react';

const TimelineHeader = () => {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center justify-center bg-supernova-blue/20 p-3 rounded-full mb-4">
        <Chart size={32} className="text-supernova-blue" />
      </div>
      <h1 className="text-3xl font-display font-semibold mb-2">Health Timeline</h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Your wellness journey, visualized. Track your hydration, sleep, mood, and movement over time to spot patterns and improve your health habits.
      </p>
    </div>
  );
};

export default TimelineHeader;
