
import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Droplet } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import WaterVisualization from '@/components/water/WaterVisualization';
import QuickAdjustControls from '@/components/water/QuickAdjustControls';
import WaterIntakeForm from '@/components/water/WaterIntakeForm';
import QuickLogButtons from '@/components/water/QuickLogButtons';
import WaterIntakeHistory from '@/components/water/WaterIntakeHistory';

const WaterIntake = () => {
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
    
    // Simple parsing - in a real app, we'd have more robust parsing
    let amount = 0;
    if (waterAmount.includes('glass') || waterAmount.includes('glasses')) {
      // Assume 1 glass = 250ml
      const matches = waterAmount.match(/(\d+)/);
      amount = matches ? parseInt(matches[0]) * 250 : 0;
    } else if (waterAmount.includes('l') || waterAmount.includes('liter') || waterAmount.includes('litre')) {
      // Convert liters to ml
      const matches = waterAmount.match(/(\d+(\.\d+)?)/);
      amount = matches ? parseFloat(matches[0]) * 1000 : 0;
    } else if (waterAmount.includes('ml')) {
      const matches = waterAmount.match(/(\d+)/);
      amount = matches ? parseInt(matches[0]) : 0;
    } else {
      // Try to parse as a plain number (assumed ml)
      amount = parseInt(waterAmount) || 0;
    }
    
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

  const updateTotalWater = (newTotal: number) => {
    setTotalWater(newTotal);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-blue/20 p-3 rounded-full mb-4">
              <Droplet size={32} className="text-supernova-blue" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Water Intake</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your hydration throughout the day to ensure you're getting enough water for optimal health.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <GlassMorphicCard className="p-6">
              <h3 className="text-xl font-display font-semibold mb-6">Today's Hydration</h3>
              
              <WaterVisualization totalWater={totalWater} />
              
              <QuickAdjustControls 
                onAdjust={adjustWater}
                isSubmitting={isSubmitting}
              />
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <h3 className="text-xl font-display font-semibold mb-6">Log Water Intake</h3>
              
              <WaterIntakeForm 
                waterAmount={waterAmount}
                onWaterAmountChange={setWaterAmount}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
              
              <QuickLogButtons 
                onQuickLog={setWaterAmount}
              />
            </GlassMorphicCard>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <GlassMorphicCard className="p-6">
              <WaterIntakeHistory 
                userId={user?.id}
                onTotalUpdate={updateTotalWater}
              />
            </GlassMorphicCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WaterIntake;
