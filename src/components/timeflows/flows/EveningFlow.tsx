
import React from 'react';
import { MoonStar } from 'lucide-react';
import GlassMorphicCard from '../../ui/GlassMorphicCard';
import { 
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

// Fake data for demo purposes - this would come from your app's state in a real app
const DEMO_DATA = {
  waterIntake: 6,
  meals: 2,
  sleepQuality: 'Good',
  steps: 5200,
  activities: ['Morning yoga', 'Walk with dog'],
};

interface EveningFlowProps {
  onAction: () => void;
  onClose: () => void;
}

const EveningFlow: React.FC<EveningFlowProps> = ({ onAction, onClose }) => {
  return (
    <>
      <DrawerHeader>
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-supernova-pink/20 p-2 rounded-lg">
            <MoonStar size={20} className="text-supernova-pink" />
          </span>
          <DrawerTitle>Evening Summary</DrawerTitle>
        </div>
        <DrawerDescription>
          Here's how your day went
        </DrawerDescription>
      </DrawerHeader>
      
      <div className="px-4 space-y-4">
        <GlassMorphicCard className="p-4">
          <h4 className="text-white font-medium mb-2">Today's Overview</h4>
          <ul className="space-y-2">
            <li className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Water intake:</span>
              <span className="text-supernova-blue">{DEMO_DATA.waterIntake} glasses</span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Meals logged:</span>
              <span className="text-supernova-purple">{DEMO_DATA.meals}</span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Steps:</span>
              <span className="text-supernova-blue">{DEMO_DATA.steps}</span>
            </li>
            <li className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Activities:</span>
              <span className="text-supernova-purple">{DEMO_DATA.activities.length}</span>
            </li>
          </ul>
        </GlassMorphicCard>
        
        <GlassMorphicCard className="p-4">
          <h4 className="text-white font-medium mb-2">AI Insights</h4>
          <p className="text-gray-300 text-sm">
            You completed {DEMO_DATA.waterIntake} glasses of water today. Try to reach 8 glasses tomorrow.
            Get ready for a good night's sleep by avoiding screens 30 minutes before bed!
          </p>
        </GlassMorphicCard>
      </div>
      
      <DrawerFooter>
        <button
          onClick={onAction}
          className="w-full button-glow bg-supernova-dark border border-supernova-pink/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5"
        >
          Complete Evening Check-in
        </button>
        <DrawerClose asChild>
          <button 
            onClick={onClose}
            className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Later Tonight
          </button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
};

export default EveningFlow;
