
import React from 'react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Clock, Activity, Moon } from 'lucide-react';

const WellnessFlowsSection: React.FC = () => {
  return (
    <section className="mt-10 animate-fade-in">
      <h2 className="text-xl font-display font-semibold mb-4">Wellness Flows</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassMorphicCard className="p-6">
          <h3 className="font-display text-lg mb-3 flex items-center">
            <Clock size={20} className="mr-2 text-supernova-blue" />
            Morning Flow
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            Trigger Time: 6:30 AM
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mr-2"></span>
              Morning Check-In
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mr-2"></span>
              Water Intake
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mr-2"></span>
              Log Breakfast
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mr-2"></span>
              Activity Tracker
            </li>
          </ul>
        </GlassMorphicCard>
        
        <GlassMorphicCard className="p-6">
          <h3 className="font-display text-lg mb-3 flex items-center">
            <Activity size={20} className="mr-2 text-supernova-purple" />
            Midday Flow
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            Trigger Time: 12:30 PM
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-purple mr-2"></span>
              Midday Wellness Check
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-purple mr-2"></span>
              Log Lunch
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-purple mr-2"></span>
              Water Intake
            </li>
          </ul>
        </GlassMorphicCard>
        
        <GlassMorphicCard className="p-6">
          <h3 className="font-display text-lg mb-3 flex items-center">
            <Moon size={20} className="mr-2 text-supernova-pink" />
            Evening Flow
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            Trigger Time: 8:30 PM
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-pink mr-2"></span>
              Evening Check-In
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-pink mr-2"></span>
              Log Dinner
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-pink mr-2"></span>
              Water Intake
            </li>
            <li className="flex items-center text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-supernova-pink mr-2"></span>
              Daily Suggestions
            </li>
          </ul>
        </GlassMorphicCard>
      </div>
    </section>
  );
};

export default WellnessFlowsSection;
