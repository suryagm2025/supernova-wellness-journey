
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MorningCheckInFormState, WellnessEntry, MorningCheckInValue } from './types';

export const useExistingCheckIn = (user: any, setFormState: (state: Partial<MorningCheckInFormState>) => void) => {
  const [hasSavedData, setHasSavedData] = useState(false);

  // Check if user has already completed a check-in today
  useEffect(() => {
    const checkExistingEntry = async () => {
      if (!user) return;
      
      try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
        
        const { data, error } = await supabase
          .from('wellness_entries')
          .select('*')
          .eq('user_id', user.id)
          .eq('type', 'morning_check_in')
          .gte('created_at', startOfDay)
          .lte('created_at', endOfDay)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking for existing entry:', error);
          return;
        }
        
        if (data) {
          // Pre-fill form with existing data
          const entryData = data as WellnessEntry;
          const value = entryData.value as unknown as MorningCheckInValue;
          
          setFormState({
            wakeUpTime: value.wake_up_time || '',
            waterIntake: value.water_intake || '',
            movement: value.movement || ''
          });
          
          setHasSavedData(true);
          
          toast.info('You already checked in today. You can update your entry if needed.');
        }
      } catch (error) {
        console.error('Error in checkExistingEntry:', error);
      }
    };
    
    checkExistingEntry();
  }, [user, setFormState]);

  return {
    hasSavedData,
    setHasSavedData
  };
};
