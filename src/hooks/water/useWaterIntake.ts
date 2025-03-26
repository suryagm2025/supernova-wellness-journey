
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export interface WaterIntakeEntry {
  id: string;
  amount_ml: number;
  notes: string | null;
  created_at: string;
  user_id: string;
}

export const useWaterIntake = () => {
  const [waterAmount, setWaterAmount] = useState('');
  const [totalWater, setTotalWater] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  // Fetch existing water intake data when component loads
  useEffect(() => {
    if (user) {
      fetchTodayWaterIntake();
    }
  }, [user]);

  const fetchTodayWaterIntake = async () => {
    if (!user) return;

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('water_intake')
        .select('amount_ml')
        .eq('user_id', user.id)
        .gte('created_at', today.toISOString());
      
      if (error) throw error;
      
      const total = data.reduce((sum, entry) => sum + entry.amount_ml, 0);
      setTotalWater(total);
    } catch (error: any) {
      console.error('Error fetching water intake:', error);
    }
  };

  const parseWaterAmount = (input: string): number => {
    // Simple parsing - in a real app, we'd have more robust parsing
    let amount = 0;
    if (input.includes('glass') || input.includes('glasses')) {
      // Assume 1 glass = 250ml
      const matches = input.match(/(\d+)/);
      amount = matches ? parseInt(matches[0]) * 250 : 0;
    } else if (input.includes('l') || input.includes('liter') || input.includes('litre')) {
      // Convert liters to ml
      const matches = input.match(/(\d+(\.\d+)?)/);
      amount = matches ? parseFloat(matches[0]) * 1000 : 0;
    } else if (input.includes('ml')) {
      const matches = input.match(/(\d+)/);
      amount = matches ? parseInt(matches[0]) : 0;
    } else {
      // Try to parse as a plain number (assumed ml)
      amount = parseInt(input) || 0;
    }
    
    return amount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!waterAmount) {
      toast.error('Please enter how much water you drank');
      return;
    }

    if (!user) {
      toast.error('You need to be logged in to track water intake');
      return;
    }
    
    const amount = parseWaterAmount(waterAmount);
    
    if (amount <= 0) {
      toast.error('Unable to understand the amount. Try "2 glasses" or "500ml"');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('water_intake')
        .insert({
          user_id: user.id,
          amount_ml: amount,
          notes: waterAmount // Store the original input as a note
        });
      
      if (error) throw error;
      
      setTotalWater(prev => prev + amount);
      toast.success(`Added ${amount}ml of water!`);
      setWaterAmount('');
    } catch (error: any) {
      console.error('Error logging water:', error);
      toast.error(error.message || 'Failed to log water intake');
    } finally {
      setIsSubmitting(false);
    }
  };

  const adjustWater = async (increment: number) => {
    if (!user) {
      toast.error('You need to be logged in to track water intake');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Add or remove 250ml (one glass)
      const newAmount = Math.max(0, increment);
      
      if (increment > 0) {
        const { error } = await supabase
          .from('water_intake')
          .insert({
            user_id: user.id,
            amount_ml: newAmount,
            notes: increment > 0 ? 'Quick add: 1 glass' : 'Quick remove: 1 glass'
          });
        
        if (error) throw error;
      }
      
      const newTotal = Math.max(0, totalWater + increment);
      setTotalWater(newTotal);
      toast.success(increment > 0 ? 'Added a glass of water!' : 'Removed a glass of water');
    } catch (error: any) {
      console.error('Error adjusting water:', error);
      toast.error(error.message || 'Failed to adjust water intake');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    waterAmount,
    setWaterAmount,
    totalWater,
    setTotalWater,
    isSubmitting,
    handleSubmit,
    adjustWater,
    fetchTodayWaterIntake
  };
};
