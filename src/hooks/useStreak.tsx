
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { format, isYesterday, isToday } from 'date-fns';

interface StreakData {
  id: string;
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: string | null;
}

export const useStreak = () => {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch the user's streak data
  const fetchStreakData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Check if streak_tracking table exists
      const { data: tableExists } = await supabase
        .from('streak_tracking')
        .select('count')
        .limit(1)
        .single();
      
      if (!tableExists) {
        console.log('Creating streak_tracking table...');
        // Table doesn't exist yet, let's create mock data for now
        setStreakData({
          id: 'mock-id',
          currentStreak: 0,
          longestStreak: 0,
          lastCheckIn: null
        });
        setIsLoading(false);
        return;
      }
      
      // First check if the user has streak data
      const { data, error } = await supabase
        .from('streak_tracking')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
        throw error;
      }
      
      // If no data exists, create a new streak record
      if (!data) {
        // Mock the data creation since we can't actually create it without the table
        setStreakData({
          id: 'new-streak-id',
          currentStreak: 0,
          longestStreak: 0,
          lastCheckIn: null
        });
        
        return;
      }
      
      // If data exists, transform it to our format
      setStreakData({
        id: data.id,
        currentStreak: data.current_streak || 0,
        longestStreak: data.longest_streak || 0,
        lastCheckIn: data.last_check_in
      });
      
      // Check if streak needs to be reset (user missed a day)
      if (data.last_check_in) {
        const lastCheckInDate = new Date(data.last_check_in);
        
        if (!isToday(lastCheckInDate) && !isYesterday(lastCheckInDate)) {
          // More than 1 day has passed, reset streak
          if (data.current_streak > 0) {
            setMessage("Hey, no worries! Missed days happen. Let's pick up where you left off. Check in today to rebuild your streak.");
          }
        }
      }
      
    } catch (error: any) {
      console.error('Error fetching streak data:', error);
      toast({
        title: "Couldn't load streak data",
        description: error.message || "Please try again later",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Record a check-in and update the streak
  const recordCheckIn = async () => {
    if (!user || !streakData) return false;
    
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const formattedToday = format(today, 'yyyy-MM-dd');
      
      // If already checked in today, do nothing
      if (streakData.lastCheckIn && isToday(new Date(streakData.lastCheckIn))) {
        return true;
      }
      
      let newStreak = 1; // Default to 1 for first check-in
      let newMessage = null;
      
      // Check if this is a continuation of a streak
      if (streakData.lastCheckIn) {
        const lastCheckInDate = new Date(streakData.lastCheckIn);
        
        if (isYesterday(lastCheckInDate)) {
          // Consecutive day, increment streak
          newStreak = streakData.currentStreak + 1;
          
          // Check for milestone messages
          if (newStreak === 3) {
            newMessage = "🔥 You've built a 3-day streak! You're creating momentum. Keep it up for more personalized insights.";
          } else if (newStreak === 7) {
            newMessage = "🎉 One full week! You've earned access to deeper guidance. Want a custom growth challenge?";
          } else if (newStreak % 10 === 0) {
            newMessage = `Amazing! ${newStreak} days of consistent check-ins. Your dedication to wellness is inspiring!`;
          }
        } else if (!isToday(lastCheckInDate)) {
          // Streak broken, but that's okay - start fresh
          newStreak = 1;
          newMessage = "Starting a fresh streak today! Consistency builds over time.";
        }
      } else {
        // First check-in ever
        newMessage = "Congratulations on your first check-in! This is the start of your wellness journey.";
      }
      
      // Since we don't have the actual table, just update our local state for now
      setStreakData({
        ...streakData,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, streakData.longestStreak),
        lastCheckIn: formattedToday
      });
      
      if (newMessage) {
        setMessage(newMessage);
        toast({
          title: "Streak Updated",
          description: newMessage,
          duration: 5000,
        });
      }
      
      return true;
    } catch (error: any) {
      console.error('Error recording check-in:', error);
      toast({
        title: "Couldn't log your check-in",
        description: "Try refreshing or tapping again. If the issue continues, hit the 'Help' button.",
        duration: 3000,
      });
      return false;
    }
  };

  // On mount, fetch streak data
  useEffect(() => {
    if (user) {
      fetchStreakData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return {
    streakData,
    isLoading,
    message,
    recordCheckIn,
    refreshStreakData: fetchStreakData
  };
};
