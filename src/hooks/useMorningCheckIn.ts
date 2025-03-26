
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { MorningCheckInValue, WellnessEntry } from '@/types/wellness';

export const useMorningCheckIn = () => {
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [movement, setMovement] = useState('');
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
          const value = entryData.value as MorningCheckInValue;
          
          setWakeUpTime(value.wake_up_time || '');
          setWaterIntake(value.water_intake || '');
          setMovement(value.movement || '');
          setHasSavedData(true);
          
          toast.info('You already checked in today. You can update your entry if needed.');
        }
      } catch (error) {
        console.error('Error in checkExistingEntry:', error);
      }
    };
    
    checkExistingEntry();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      
      const checkInData: Omit<WellnessEntry, 'id' | 'created_at'> = {
        user_id: user.id,
        type: 'morning_check_in',
        value: {
          wake_up_time: wakeUpTime,
          water_intake: waterIntake,
          movement: movement,
          date: new Date().toISOString()
        }
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
              user_id: user.id,
              amount_ml: waterAmount,
              notes: `From morning check-in: ${waterIntake}`
            });
          
          if (waterError) console.error('Error logging water intake:', waterError);
        }
      }
      
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

  const handleVoiceInput = (transcript: string) => {
    if (activeVoiceField === 'wakeUpTime') {
      setWakeUpTime(transcript);
    } else if (activeVoiceField === 'waterIntake') {
      setWaterIntake(transcript);
    } else if (activeVoiceField === 'movement') {
      setMovement(transcript);
    }
    
    // Reset after receiving input
    setActiveVoiceField(null);
  };

  return {
    wakeUpTime,
    setWakeUpTime,
    waterIntake,
    setWaterIntake,
    movement,
    setMovement,
    activeVoiceField,
    setActiveVoiceField,
    isSubmitting,
    handleSubmit,
    handleVoiceInput
  };
};
