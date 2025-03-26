
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { MorningCheckInFormState, MorningCheckInValue } from './types';

export const useCheckInSubmission = (
  user: any,
  formState: MorningCheckInFormState,
  hasSavedData: boolean,
  setHasSavedData: (value: boolean) => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { wakeUpTime, waterIntake, movement } = formState;
    
    if (!user) {
      toast.error('You need to be logged in to complete morning check-in');
      return;
    }

    if (!wakeUpTime || !waterIntake || !movement) {
      toast.error('Please fill out all fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const checkInData = {
        user_id: user.id,
        type: 'morning_check_in',
        value: {
          wake_up_time: wakeUpTime,
          water_intake: waterIntake,
          movement: movement,
          date: new Date().toISOString()
        } as Json
      };
      
      // Store check-in data in wellness_entries table
      let result;
      
      if (hasSavedData) {
        // Update existing entry
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
        
        const { data: existingEntry } = await supabase
          .from('wellness_entries')
          .select('id')
          .eq('user_id', user.id)
          .eq('type', 'morning_check_in')
          .gte('created_at', startOfDay)
          .lte('created_at', endOfDay)
          .single();
        
        if (existingEntry) {
          result = await supabase
            .from('wellness_entries')
            .update(checkInData)
            .eq('id', existingEntry.id);
        }
      } else {
        // Create new entry
        result = await supabase
          .from('wellness_entries')
          .insert(checkInData);
      }
      
      if (result?.error) throw result.error;
      
      // Also log water intake in water_intake table
      await logWaterIntake(waterIntake, user.id);
      
      // Log streak if needed
      const { error: streakError } = await supabase.rpc('record_user_streak', { 
        user_id: user.id 
      });
      
      if (streakError) console.error('Error updating streak:', streakError);
      
      toast.success(hasSavedData ? 'Morning check-in updated!' : 'Morning check-in completed!');
      
      // Wait a moment before redirecting
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error: any) {
      console.error('Morning check-in error:', error);
      toast.error(error.message || 'Error during check-in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};

// Helper function to parse and log water intake
const logWaterIntake = async (waterIntake: string, userId: string) => {
  let waterAmount = 0;
  // Try to extract amount from water intake text
  const waterRegex = /(\d+)\s*(ml|glass|glasses|oz|cup|cups)/i;
  const waterMatch = waterIntake.match(waterRegex);
  
  if (waterMatch) {
    const amount = parseInt(waterMatch[1]);
    const unit = waterMatch[2].toLowerCase();
    
    // Convert to ml
    if (unit.includes('glass') || unit.includes('cup')) {
      waterAmount = amount * 250; // Assume one glass/cup is 250ml
    } else if (unit.includes('oz')) {
      waterAmount = amount * 30; // Approximate conversion
    } else {
      waterAmount = amount; // Already in ml
    }
    
    // Log water intake if we could parse an amount
    if (waterAmount > 0) {
      const { error: waterError } = await supabase
        .from('water_intake')
        .insert({
          user_id: userId,
          amount_ml: waterAmount,
          notes: `From morning check-in: ${waterIntake}`
        });
      
      if (waterError) console.error('Error logging water intake:', waterError);
    }
  }
};
