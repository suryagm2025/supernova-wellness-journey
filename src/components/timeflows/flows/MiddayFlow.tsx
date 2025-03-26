
import React from 'react';
import { Clock } from 'lucide-react';
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

interface MiddayFlowProps {
  onAction: (route: string) => void;
  onClose: () => void;
}

const MiddayFlow: React.FC<MiddayFlowProps> = ({ onAction, onClose }) => {
  return (
    <>
      <DrawerHeader>
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-supernova-purple/20 p-2 rounded-lg">
            <Clock size={20} className="text-supernova-purple" />
          </span>
          <DrawerTitle>Midday Check-in</DrawerTitle>
        </div>
        <DrawerDescription>
          How's your day going so far?
        </DrawerDescription>
      </DrawerHeader>
      
      <div className="px-4 space-y-4">
        <GlassMorphicCard className="p-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-300">Current water intake:</p>
            <p className="text-supernova-blue font-semibold">{DEMO_DATA.waterIntake} glasses</p>
          </div>
          <div className="mt-2">
            <div className="bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-supernova-blue h-full rounded-full" 
                style={{width: `${(DEMO_DATA.waterIntake / 8) * 100}%`}}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Goal: 8 glasses</p>
          </div>
        </GlassMorphicCard>
        
        <p className="text-center text-gray-300 py-2">
          Need to track something?
        </p>
      </div>
      
      <DrawerFooter className="space-y-3">
        <button
          onClick={() => onAction('/water')}
          className="w-full bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5"
        >
          Log Water Intake
        </button>
        <button
          onClick={() => onAction('/meals')}
          className="w-full bg-supernova-dark border border-supernova-purple/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5"
        >
          Log Meal
        </button>
        <DrawerClose asChild>
          <button 
            onClick={onClose}
            className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            I'm Good
          </button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
};

export default MiddayFlow;
