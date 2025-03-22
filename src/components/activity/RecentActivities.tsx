
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Activity as ActivityIcon } from 'lucide-react';

const RecentActivities: React.FC = () => {
  return (
    <GlassMorphicCard className="p-6">
      <h3 className="text-lg font-display font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-4 pb-4 border-b border-white/10">
          <div className="p-2 rounded-lg bg-white/5 text-supernova-blue">
            <ActivityIcon size={20} />
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="text-white font-medium">Morning Jog</h4>
              <span className="ml-2 text-xs bg-supernova-blue/20 text-supernova-blue px-2 py-0.5 rounded-full">
                Today
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">3.2 km in 22 minutes</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 pb-4 border-b border-white/10">
          <div className="p-2 rounded-lg bg-white/5 text-supernova-blue">
            <ActivityIcon size={20} />
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="text-white font-medium">Yoga Session</h4>
              <span className="ml-2 text-xs bg-supernova-blue/20 text-supernova-blue px-2 py-0.5 rounded-full">
                Yesterday
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">30 minutes of flow yoga</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg bg-white/5 text-supernova-blue">
            <ActivityIcon size={20} />
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="text-white font-medium">Walking</h4>
              <span className="ml-2 text-xs bg-supernova-blue/20 text-supernova-blue px-2 py-0.5 rounded-full">
                2 days ago
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">8,452 steps throughout the day</p>
          </div>
        </div>
      </div>
    </GlassMorphicCard>
  );
};

export default RecentActivities;
