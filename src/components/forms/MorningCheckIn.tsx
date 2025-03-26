
import React, { useState, useEffect } from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Clock, Droplet, StretchHorizontal, Mic } from 'lucide-react';
import { toast } from 'sonner';
import VoiceInput from '../VoiceInput';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router-dom';

const MorningCheckIn: React.FC = () => {
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
          const value = data.value as any;
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
      
      const checkInData = {
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

  return (
    <GlassMorphicCard className="p-6 w-full max-w-xl mx-auto">
      <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
        <span className="bg-supernova-blue/20 p-2 rounded-lg mr-3">
          <Clock size={20} className="text-supernova-blue" />
        </span>
        Morning Check-In
      </h3>
      
      {activeVoiceField && (
        <div className="mb-6">
          <VoiceInput 
            onTranscript={handleVoiceInput}
            placeholder={`Speak to fill the ${activeVoiceField === 'wakeUpTime' ? 'wake up time' : 
              activeVoiceField === 'waterIntake' ? 'water intake' : 'movement'} field`}
          />
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm text-gray-300 flex items-center">
              <Clock size={16} className="mr-2 text-gray-400" />
              What time did you wake up?
            </label>
            <button
              type="button"
              onClick={() => setActiveVoiceField('wakeUpTime')}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              aria-label="Use voice input for wake up time"
            >
              <Mic size={14} />
            </button>
          </div>
          <input
            type="text"
            value={wakeUpTime}
            onChange={(e) => setWakeUpTime(e.target.value)}
            placeholder="e.g. 6:30 AM"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm text-gray-300 flex items-center">
              <Droplet size={16} className="mr-2 text-gray-400" />
              Did you drink water?
            </label>
            <button
              type="button"
              onClick={() => setActiveVoiceField('waterIntake')}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              aria-label="Use voice input for water intake"
            >
              <Mic size={14} />
            </button>
          </div>
          <input
            type="text"
            value={waterIntake}
            onChange={(e) => setWaterIntake(e.target.value)}
            placeholder="e.g. 1 glass of water"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm text-gray-300 flex items-center">
              <StretchHorizontal size={16} className="mr-2 text-gray-400" />
              Any movement or meditation?
            </label>
            <button
              type="button"
              onClick={() => setActiveVoiceField('movement')}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              aria-label="Use voice input for movement"
            >
              <Mic size={14} />
            </button>
          </div>
          <input
            type="text"
            value={movement}
            onChange={(e) => setMovement(e.target.value)}
            placeholder="e.g. 5 mins yoga"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Spinner size="sm" className="mr-2" />
                Submitting...
              </span>
            ) : (
              'Submit Check-In'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
        <p className="text-gray-400 text-sm">
          <span className="text-supernova-blue">Tip:</span> Try using voice input by clicking the microphone icons next to each field.
        </p>
      </div>
    </GlassMorphicCard>
  );
};

export default MorningCheckIn;
