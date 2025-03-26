
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MorningCheckInFormState, MorningCheckInValue } from './types';
import { Json } from '@/integrations/supabase/types';

export const useCheckInSubmission = (
  user: any,
  formState: MorningCheckInFormState,
  hasSavedData: boolean,
  setHasSavedData: (value: boolean) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.wakeUpTime || !formState.waterIntake || !formState.movement) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!user) {
      toast.error('You need to be logged in to save your check-in');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format the data for Supabase
      const checkInValue: MorningCheckInValue = {
        wake_up_time: formState.wakeUpTime,
        water_intake: formState.waterIntake,
        movement: formState.movement,
        date: new Date().toISOString().split('T')[0]
      };

      // Cast to Json type for Supabase
      const jsonValue = checkInValue as unknown as Json;

      // Check if an entry already exists for today
      if (hasSavedData) {
        // Update the existing entry
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
        
        const { data: existingEntries, error: fetchError } = await supabase
          .from('wellness_entries')
          .select('id')
          .eq('user_id', user.id)
          .eq('type', 'morning_check_in')
          .gte('created_at', startOfDay)
          .lte('created_at', endOfDay);
        
        if (fetchError) throw fetchError;
        
        if (existingEntries && existingEntries.length > 0) {
          const { error: updateError } = await supabase
            .from('wellness_entries')
            .update({ value: jsonValue })
            .eq('id', existingEntries[0].id);
          
          if (updateError) throw updateError;
          
          toast.success('Morning check-in updated successfully!');
        } else {
          // If we thought we had saved data but can't find it, create a new entry
          throw new Error('Could not find existing entry to update');
        }
      } else {
        // Create a new entry
        const { error: insertError } = await supabase
          .from('wellness_entries')
          .insert({
            user_id: user.id,
            type: 'morning_check_in',
            value: jsonValue
          });
        
        if (insertError) throw insertError;
        
        setHasSavedData(true);
        toast.success('Morning check-in saved successfully!');
      }
    } catch (error: any) {
      console.error('Error saving morning check-in:', error);
      toast.error(error.message || 'Failed to save morning check-in');
      
      // If there was an error updating, try inserting a new entry instead
      if (hasSavedData) {
        try {
          const checkInValue: MorningCheckInValue = {
            wake_up_time: formState.wakeUpTime,
            water_intake: formState.waterIntake,
            movement: formState.movement,
            date: new Date().toISOString().split('T')[0]
          };
          
          const jsonValue = checkInValue as unknown as Json;
          
          const { error: insertError } = await supabase
            .from('wellness_entries')
            .insert({
              user_id: user.id,
              type: 'morning_check_in',
              value: jsonValue
            });
          
          if (!insertError) {
            toast.success('Morning check-in saved as a new entry');
            setHasSavedData(true);
          }
        } catch (fallbackError) {
          console.error('Error during fallback insert:', fallbackError);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};
