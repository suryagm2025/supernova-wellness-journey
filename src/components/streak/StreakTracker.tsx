
import React from 'react';
import { useStreak } from '@/hooks/useStreak';
import { Button } from '@/components/ui/button';
import { CircleCheck, Flame, Trophy, Calendar } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Spinner } from '@/components/ui/spinner';

interface StreakTrackerProps {
  onCheckIn?: () => void;
  showCheckInButton?: boolean;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ 
  onCheckIn,
  showCheckInButton = true
}) => {
  const { streakData, isLoading, message, recordCheckIn } = useStreak();
  
  const handleCheckIn = async () => {
    const success = await recordCheckIn();
    if (success && onCheckIn) {
      onCheckIn();
    }
  };
  
  if (isLoading) {
    return (
      <GlassMorphicCard className="p-4 text-center">
        <div className="flex items-center justify-center py-6">
          <Spinner size="md" />
          <span className="ml-3 text-gray-300">Loading streak data...</span>
        </div>
      </GlassMorphicCard>
    );
  }
  
  return (
    <GlassMorphicCard className="p-4">
      <div className="flex items-center mb-4">
        <div className="bg-supernova-blue/20 p-2 rounded-full mr-3">
          <Flame size={20} className="text-supernova-blue" />
        </div>
        <h3 className="text-lg font-display font-semibold">Your Streak</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center mb-1">
            <Calendar size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-400">Current</span>
          </div>
          <p className="text-2xl font-display font-semibold text-supernova-blue">
            {streakData?.currentStreak || 0}
            <span className="text-sm text-gray-400 ml-1">days</span>
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center mb-1">
            <Trophy size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-400">Best</span>
          </div>
          <p className="text-2xl font-display font-semibold text-supernova-pink">
            {streakData?.longestStreak || 0}
            <span className="text-sm text-gray-400 ml-1">days</span>
          </p>
        </div>
      </div>
      
      {message && (
        <div className="bg-white/5 rounded-lg p-4 mb-4 text-sm text-gray-300 border border-white/10">
          {message}
        </div>
      )}
      
      {showCheckInButton && (
        <Button 
          onClick={handleCheckIn}
          className="w-full bg-supernova-dark border border-supernova-blue/30 hover:bg-white/5 group"
          disabled={streakData?.lastCheckIn && new Date(streakData.lastCheckIn).toDateString() === new Date().toDateString()}
        >
          <CircleCheck className="mr-2 h-4 w-4 text-supernova-blue group-hover:text-white transition-colors" />
          {streakData?.lastCheckIn && new Date(streakData.lastCheckIn).toDateString() === new Date().toDateString() 
            ? "Already Checked In Today" 
            : "Check In Today"}
        </Button>
      )}
    </GlassMorphicCard>
  );
};

export default StreakTracker;
