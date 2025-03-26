
import React from 'react';
import { Droplet, Moon, Smile, Activity } from 'lucide-react';
import { TimelineDataPoint } from '@/types/timeline';

interface TimelineStatsProps {
  data: TimelineDataPoint[];
}

const TimelineStats: React.FC<TimelineStatsProps> = ({ data }) => {
  // Calculate averages for each metric
  const validData = {
    hydration: data.filter(d => d.hydration !== null),
    sleep: data.filter(d => d.sleep !== null),
    mood: data.filter(d => d.mood !== null),
    movement: data.filter(d => d.movement !== null),
  };
  
  const averages = {
    hydration: validData.hydration.length > 0 
      ? validData.hydration.reduce((sum, d) => sum + (d.hydration || 0), 0) / validData.hydration.length 
      : 0,
    sleep: validData.sleep.length > 0 
      ? validData.sleep.reduce((sum, d) => sum + (d.sleep || 0), 0) / validData.sleep.length 
      : 0,
    mood: validData.mood.length > 0 
      ? validData.mood.reduce((sum, d) => sum + (d.mood || 0), 0) / validData.mood.length 
      : 0,
    movement: validData.movement.length > 0 
      ? validData.movement.reduce((sum, d) => sum + (d.movement || 0), 0) / validData.movement.length 
      : 0,
  };

  return (
    <div className="mt-8 mb-8">
      <h3 className="text-xl font-display font-semibold mb-4">Your Average Stats</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-lg bg-supernova-blue/20 mr-3">
              <Droplet size={20} className="text-supernova-blue" />
            </div>
            <h4 className="text-lg font-display">Hydration</h4>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-display font-semibold text-white">
              {averages.hydration.toFixed(1)} <span className="text-sm text-gray-400">L/day</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {averages.hydration >= 2.5 ? 'Great job staying hydrated!' : 'Try to increase your water intake'}
            </p>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-lg bg-supernova-purple/20 mr-3">
              <Moon size={20} className="text-supernova-purple" />
            </div>
            <h4 className="text-lg font-display">Sleep</h4>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-display font-semibold text-white">
              {averages.sleep.toFixed(1)} <span className="text-sm text-gray-400">hrs/night</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {averages.sleep >= 7 ? 'You\'re getting good rest!' : 'Aim for 7-8 hours of sleep'}
            </p>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-lg bg-supernova-pink/20 mr-3">
              <Smile size={20} className="text-supernova-pink" />
            </div>
            <h4 className="text-lg font-display">Mood</h4>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-display font-semibold text-white">
              {averages.mood.toFixed(1)} <span className="text-sm text-gray-400">/10</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {averages.mood >= 7 ? 'Your mood is quite positive!' : 'Looking for ways to boost your mood?'}
            </p>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-lg bg-supernova-gold/20 mr-3">
              <Activity size={20} className="text-supernova-gold" />
            </div>
            <h4 className="text-lg font-display">Movement</h4>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-display font-semibold text-white">
              {Math.round(averages.movement)} <span className="text-sm text-gray-400">min/day</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {averages.movement >= 30 ? 'You\'re staying active!' : 'Try to move at least 30 minutes daily'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineStats;
