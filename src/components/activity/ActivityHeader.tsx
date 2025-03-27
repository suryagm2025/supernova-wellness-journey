
import React from 'react';
import { Activity } from 'lucide-react';

const ActivityHeader: React.FC = () => {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center justify-center bg-supernova-pink/20 p-3 rounded-full mb-4">
        <Activity size={32} className="text-supernova-pink" />
      </div>
      <h1 className="text-3xl font-display font-semibold mb-2">Physical Activity</h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Track your daily movement to build healthy habits and boost your energy.
      </p>
    </div>
  );
};

export default ActivityHeader;
