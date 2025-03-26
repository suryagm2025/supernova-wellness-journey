
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MorningCheckInFormState, WellnessEntryValue } from './types';

export const useCheckInSubmission = (
  user: any,
  formState: MorningCheckInFormState,
  hasSavedData: boolean,
  setHasSavedData: (value: boolean) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to submit a check-in.');
      return;
    }
    
    if (!formState.wakeUpTime) {
      toast.error('Please enter your wake-up time');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format the data for submission
      const entryData = {
        type: 'morning_check_in',
        user_id: user.id,
        value: {
          wake_up_time: formState.wakeUpTime,
          water_intake: formState.waterIntake,
          movement: formState.movement
        } as WellnessEntryValue
      };
      
      let response;
      
      if (hasSavedData) {
        // Update existing entry
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
        
        response = await supabase
          .from('wellness_entries')
          .update({ value: entryData.value })
          .eq('user_id', user.id)
          .eq('type', 'morning_check_in')
          .gte('created_at', startOfDay)
          .lte('created_at', endOfDay);
      } else {
        // Create new entry
        response = await supabase
          .from('wellness_entries')
          .insert(entryData);
      }
      
      if (response.error) throw response.error;
      
      setHasSavedData(true);
      toast.success('Morning check-in saved!');
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      toast.error(error.message || 'Failed to save morning check-in');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    isSubmitting,
    handleSubmit
  };
};
