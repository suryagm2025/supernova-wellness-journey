
import React from 'react';
import { useStreak } from '@/hooks/useStreak';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Flame, Calendar, Trophy, Award, ArrowUp, AlertCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const StreakDashboard: React.FC = () => {
  const { streakData, isLoading, message, recordCheckIn } = useStreak();
  
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
  
  const canCheckInToday = !streakData?.lastCheckIn || 
    new Date(streakData.lastCheckIn).toDateString() !== new Date().toDateString();
  
  return (
    <GlassMorphicCard className="p-6">
      <div className="flex items-center mb-6">
        <div className="bg-supernova-blue/20 p-2 rounded-full mr-3">
          <Flame size={24} className="text-supernova-blue" />
        </div>
        <h2 className="text-2xl font-display font-semibold">Streak Dashboard</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Flame size={20} className="text-supernova-blue mr-2" />
            <span className="text-gray-300">Current Streak</span>
          </div>
          <p className="text-3xl font-display font-semibold text-supernova-blue">
            {streakData?.currentStreak || 0}
            <span className="text-sm text-gray-400 ml-1">days</span>
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy size={20} className="text-supernova-pink mr-2" />
            <span className="text-gray-300">Longest Streak</span>
          </div>
          <p className="text-3xl font-display font-semibold text-supernova-pink">
            {streakData?.longestStreak || 0}
            <span className="text-sm text-gray-400 ml-1">days</span>
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Calendar size={20} className="text-supernova-purple mr-2" />
            <span className="text-gray-300">Last Check-in</span>
          </div>
          <p className="text-md font-display font-semibold text-supernova-purple">
            {streakData?.lastCheckIn 
              ? formatDistanceToNow(new Date(streakData.lastCheckIn), { addSuffix: true })
              : "Never checked in"}
          </p>
        </div>
      </div>
      
      {/* Motivational message */}
      {message && (
        <div className="bg-white/5 rounded-lg p-4 mb-6 text-gray-300 border border-white/10">
          <p className="flex items-start">
            <Award className="text-supernova-blue mr-2 mt-1 flex-shrink-0" size={16} />
            <span>{message}</span>
          </p>
        </div>
      )}
      
      {/* Streak Milestones */}
      <div className="mb-6">
        <h3 className="text-lg font-display font-semibold mb-3 flex items-center">
          <ArrowUp className="text-supernova-blue mr-2" size={16} />
          Upcoming Milestones
        </h3>
        
        <div className="space-y-2">
          {streakData?.currentStreak !== undefined && (
            <>
              {streakData.currentStreak < 3 && (
                <div className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-gray-300">3-Day Streak</span>
                  <span className="text-supernova-blue">{3 - streakData.currentStreak} days to go</span>
                </div>
              )}
              
              {streakData.currentStreak < 7 && (
                <div className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-gray-300">7-Day Streak</span>
                  <span className="text-supernova-blue">{7 - streakData.currentStreak} days to go</span>
                </div>
              )}
              
              {streakData.currentStreak < 14 && (
                <div className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-gray-300">14-Day Streak</span>
                  <span className="text-supernova-blue">{14 - streakData.currentStreak} days to go</span>
                </div>
              )}
              
              {streakData.currentStreak < 30 && (
                <div className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-gray-300">30-Day Streak</span>
                  <span className="text-supernova-blue">{30 - streakData.currentStreak} days to go</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Check-in button */}
      <div className="text-center">
        {canCheckInToday ? (
          <Button 
            onClick={recordCheckIn}
            className="w-full bg-supernova-dark border border-supernova-blue/30 hover:bg-white/5 group"
            size="lg"
          >
            <Flame className="mr-2 h-5 w-5 text-supernova-blue group-hover:text-white transition-colors" />
            Check In to Continue Your Streak
          </Button>
        ) : (
          <div className="bg-white/5 rounded-lg p-4 flex items-center justify-center">
            <AlertCircle className="mr-2 h-5 w-5 text-supernova-blue" />
            <span className="text-gray-300">You've already checked in today. Come back tomorrow!</span>
          </div>
        )}
      </div>
    </GlassMorphicCard>
  );
};

export default StreakDashboard;
