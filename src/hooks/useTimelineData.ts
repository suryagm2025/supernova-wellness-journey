
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { TimelineDataPoint } from '@/types/timeline';
import { addDays, subDays, format } from 'date-fns';

const useTimelineData = () => {
  const [timelineData, setTimelineData] = useState<TimelineDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasIncompleteData, setHasIncompleteData] = useState(false);
  const { user } = useAuth();
  
  // Generate dates for the past 5 days
  const generateDateRange = () => {
    const today = new Date();
    const dates = [];
    
    for (let i = 4; i >= 0; i--) {
      dates.push(format(subDays(today, i), 'yyyy-MM-dd'));
    }
    
    return dates;
  };
  
  const fetchTimelineData = useCallback(async () => {
    if (!user) {
      setTimelineData([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Generate dates for the past 5 days
      const dateRange = generateDateRange();
      
      // Create initial timeline data structure with empty values
      const initialTimelineData = dateRange.map(date => ({
        date,
        hydration: null,
        sleep: null,
        mood: null,
        movement: null
      }));
      
      // Fetch hydration data
      const { data: hydrationData, error: hydrationError } = await supabase
        .from('water_intake')
        .select('created_at, amount_ml')
        .eq('user_id', user.id)
        .gte('created_at', dateRange[0])
        .lte('created_at', `${dateRange[dateRange.length - 1]}T23:59:59`);
      
      if (hydrationError) throw hydrationError;
      
      // Fetch sleep data (from evening_check table)
      const { data: sleepData, error: sleepError } = await supabase
        .from('evening_check')
        .select('created_at, sleep_time')
        .eq('user_id', user.id)
        .gte('created_at', dateRange[0])
        .lte('created_at', `${dateRange[dateRange.length - 1]}T23:59:59`);
      
      if (sleepError) throw sleepError;
      
      // Fetch wellness entries for mood and activity
      const { data: wellnessData, error: wellnessError } = await supabase
        .from('wellness_entries')
        .select('created_at, type, value')
        .eq('user_id', user.id)
        .gte('created_at', dateRange[0])
        .lte('created_at', `${dateRange[dateRange.length - 1]}T23:59:59`);
      
      if (wellnessError) throw wellnessError;
      
      // Process the data and fill in the timeline
      const processedData = initialTimelineData.map(dataPoint => {
        const date = dataPoint.date;
        
        // Sum up hydration for the day (in ml, convert to L)
        const dayHydration = hydrationData
          ?.filter(h => h.created_at.startsWith(date))
          .reduce((sum, h) => sum + h.amount_ml, 0) || 0;
        
        // Get sleep hours (would need parsing from the sleep_time string)
        const sleepEntry = sleepData?.find(s => s.created_at.startsWith(date));
        let sleepHours = null;
        if (sleepEntry?.sleep_time) {
          // Simple parsing - in a real app we'd have more robust parsing
          const sleepMatch = sleepEntry.sleep_time.match(/(\d+)/);
          sleepHours = sleepMatch ? parseFloat(sleepMatch[0]) : null;
        }
        
        // Get mood from wellness entries
        const moodEntry = wellnessData?.find(w => 
          w.created_at.startsWith(date) && w.type === 'mood'
        );
        const mood = moodEntry?.value?.rating || null;
        
        // Get movement/activity from wellness entries
        const activityEntry = wellnessData?.find(w => 
          w.created_at.startsWith(date) && w.type === 'activity'
        );
        const movement = activityEntry?.value?.duration || null;
        
        return {
          date,
          hydration: dayHydration > 0 ? dayHydration / 1000 : null, // Convert ml to L
          sleep: sleepHours,
          mood,
          movement
        };
      });
      
      // Check if we have incomplete data
      const incomplete = processedData.some(data => 
        data.hydration === null || data.sleep === null || 
        data.mood === null || data.movement === null
      );
      
      setHasIncompleteData(incomplete);
      setTimelineData(processedData);
      
      // For demo purposes, if we don't have real data, generate some
      if (processedData.every(d => 
        d.hydration === null && d.sleep === null && 
        d.mood === null && d.movement === null
      )) {
        generateDemoData(dateRange);
      }
      
    } catch (err) {
      console.error('Error fetching timeline data:', err);
      setError(err instanceof Error ? err : new Error('Failed to load timeline data'));
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  // Generate demo data for initial view
  const generateDemoData = (dateRange: string[]) => {
    const demoData = dateRange.map((date, index) => {
      // Create some realistic patterns for demo data
      const dayOfWeek = new Date(date).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      return {
        date,
        hydration: 1.5 + Math.random() * 1.5, // Between 1.5 and 3L
        sleep: isWeekend ? 7 + Math.random() * 1.5 : 6 + Math.random(), // More sleep on weekends
        mood: isWeekend ? 7 + Math.random() * 3 : 5 + Math.random() * 3, // Better mood on weekends
        movement: isWeekend ? 30 + Math.random() * 40 : 20 + Math.random() * 25 // More active on weekends
      };
    });
    
    // Add a pattern where good sleep correlates with better mood
    const goodSleepDayIndex = Math.floor(Math.random() * 3) + 1;
    demoData[goodSleepDayIndex].sleep = 8.2;
    demoData[goodSleepDayIndex].mood = 9.2;
    
    setTimelineData(demoData);
    setHasIncompleteData(true); // Set to true for demo purposes
  };
  
  useEffect(() => {
    fetchTimelineData();
  }, [fetchTimelineData]);
  
  return {
    timelineData,
    isLoading,
    error,
    hasIncompleteData,
    fetchTimelineData
  };
};

export default useTimelineData;
