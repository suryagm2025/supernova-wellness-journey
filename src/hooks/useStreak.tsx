
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
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
  const { user } = useAuth();

  // Fetch the user's streak data
  const fetchStreakData = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Get streak data for the current user
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
        const { data: newStreak, error: insertError } = await supabase
          .from('streak_tracking')
          .insert({
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0,
            last_check_in: null
          })
          .select()
          .single();
        
        if (insertError) throw insertError;
        
        // Transform the data to our format
        setStreakData({
          id: newStreak.id,
          currentStreak: newStreak.current_streak,
          longestStreak: newStreak.longest_streak,
          lastCheckIn: newStreak.last_check_in
        });
        
        return;
      }
      
      // If data exists, transform it to our format
      setStreakData({
        id: data.id,
        currentStreak: data.current_streak,
        longestStreak: data.longest_streak,
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
      toast.error("Couldn't load streak data. Please try again later.");
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
      
      // Update the streak in the database
      const { error } = await supabase
        .from('streak_tracking')
        .update({
          current_streak: newStreak,
          longest_streak: Math.max(newStreak, streakData.longestStreak),
          last_check_in: formattedToday,
          updated_at: new Date().toISOString()
        })
        .eq('id', streakData.id);
      
      if (error) throw error;
      
      // Update local state
      setStreakData({
        ...streakData,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, streakData.longestStreak),
        lastCheckIn: formattedToday
      });
      
      if (newMessage) {
        setMessage(newMessage);
        toast.success(newMessage);
      }
      
      return true;
    } catch (error: any) {
      console.error('Error recording check-in:', error);
      toast.error("Couldn't log your check-in. Please try again later.");
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
