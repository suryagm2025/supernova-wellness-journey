
import React, { useState, useEffect } from 'react';
import { Sun, Flame } from 'lucide-react';
import { toast } from 'sonner';
import { 
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useStreak } from '@/hooks/useStreak';

interface MorningFlowProps {
  onAction: () => void;
  onClose: () => void;
}

const MorningFlow: React.FC<MorningFlowProps> = ({ onAction, onClose }) => {
  const [mood, setMood] = useState<string>('');
  const [energy, setEnergy] = useState<string>('');
  const { streakData, message, recordCheckIn } = useStreak();

  const handleSubmit = async () => {
    if (!mood || !energy) {
      toast.error('Please complete both fields');
      return;
    }
    
    // Record check-in for streak
    await recordCheckIn();
    
    toast.success('Morning check-in started!');
    onAction();
  };

  return (
    <>
      <DrawerHeader>
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-supernova-blue/20 p-2 rounded-lg">
            <Sun size={20} className="text-supernova-blue" />
          </span>
          <DrawerTitle>Good Morning!</DrawerTitle>
        </div>
        <DrawerDescription>
          How did you sleep? Ready to start your day?
        </DrawerDescription>
      </DrawerHeader>
      
      {streakData && (
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-2">
            <div className="flex items-center">
              <Flame size={16} className="text-supernova-blue mr-1" />
              <span className="text-sm">Current Streak:</span>
            </div>
            <span className="text-sm font-semibold text-supernova-blue">
              {streakData.currentStreak} {streakData.currentStreak === 1 ? 'day' : 'days'}
            </span>
          </div>
          
          {message && (
            <div className="mt-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-lg p-2">
              {message}
            </div>
          )}
        </div>
      )}
      
      <div className="px-4 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">How's your mood this morning?</label>
          <select 
            value={mood} 
            onChange={(e) => setMood(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3"
          >
            <option value="">Select your mood</option>
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="okay">Okay</option>
            <option value="tired">Tired</option>
            <option value="stressed">Stressed</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">Energy level?</label>
          <select 
            value={energy} 
            onChange={(e) => setEnergy(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3"
          >
            <option value="">Select energy level</option>
            <option value="high">High Energy</option>
            <option value="medium">Medium Energy</option>
            <option value="low">Low Energy</option>
            <option value="very-low">Very Low Energy</option>
          </select>
        </div>
      </div>
      
      <DrawerFooter>
        <button
          onClick={handleSubmit}
          className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5"
        >
          Start Morning Check-in
        </button>
        <DrawerClose asChild>
          <button 
            onClick={onClose}
            className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Maybe Later
          </button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
};

export default MorningFlow;
