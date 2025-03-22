
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Play } from 'lucide-react';

const QuickStartWorkouts: React.FC = () => {
  return (
    <GlassMorphicCard className="p-6">
      <h3 className="text-lg font-display font-semibold mb-4">Quick Start Workouts</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-full bg-supernova-blue/20 mr-3">
              <Play size={16} className="text-supernova-blue" />
            </div>
            <h4 className="font-medium">10-Min Stretch</h4>
          </div>
          <p className="text-gray-400 text-xs">Perfect morning routine to improve flexibility</p>
        </div>
        
        <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-full bg-supernova-blue/20 mr-3">
              <Play size={16} className="text-supernova-blue" />
            </div>
            <h4 className="font-medium">15-Min Core</h4>
          </div>
          <p className="text-gray-400 text-xs">Strengthen your core with this quick workout</p>
        </div>
        
        <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-full bg-supernova-blue/20 mr-3">
              <Play size={16} className="text-supernova-blue" />
            </div>
            <h4 className="font-medium">5-Min Meditation</h4>
          </div>
          <p className="text-gray-400 text-xs">Quick mindfulness practice for stress relief</p>
        </div>
        
        <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-full bg-supernova-blue/20 mr-3">
              <Play size={16} className="text-supernova-blue" />
            </div>
            <h4 className="font-medium">20-Min Full Body</h4>
          </div>
          <p className="text-gray-400 text-xs">Complete workout targeting all major muscle groups</p>
        </div>
      </div>
    </GlassMorphicCard>
  );
};

export default QuickStartWorkouts;
