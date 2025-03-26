
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Droplet, PlusCircle, MinusCircle } from 'lucide-react';
import { toast } from 'sonner';
import VoiceInput from '../components/VoiceInput';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Spinner } from '@/components/ui/spinner';

const WaterIntake = () => {
  const [waterAmount, setWaterAmount] = useState('');
  const [totalWater, setTotalWater] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

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

  const handleVoiceInput = (transcript: string) => {
    // Process voice input to extract water amount
    setWaterAmount(transcript);
    // Auto-submit after a short delay if we have a voice input
    setTimeout(() => {
      const form = document.getElementById('water-form') as HTMLFormElement;
      if (form && transcript) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }, 1000);
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

  // Calculate percentage for the water visualization (max 3000ml)
  const waterPercentage = Math.min(100, (totalWater / 3000) * 100);

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
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassMorphicCard className="p-6">
              <h3 className="text-xl font-display font-semibold mb-6">Today's Hydration</h3>
              
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">Current intake</span>
                  <span className="text-white font-medium">{(totalWater / 1000).toFixed(1)}L</span>
                </div>
                
                <div className="h-6 bg-white/5 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-supernova-blue to-supernova-purple transition-all duration-500 relative"
                    style={{ width: `${waterPercentage}%` }}
                  >
                    <div className="absolute top-0 right-0 h-full w-full bg-white/20 animate-shimmer bg-[length:200%_100%]"></div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-2">
                  <span className="text-gray-400 text-sm">0L</span>
                  <span className="text-gray-400 text-sm">Goal: 3.0L</span>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mb-6">
                <button 
                  onClick={() => adjustWater(-250)}
                  disabled={isSubmitting}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors disabled:opacity-50"
                >
                  <MinusCircle size={24} />
                </button>
                <button 
                  onClick={() => adjustWater(250)}
                  disabled={isSubmitting}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-supernova-blue transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? <Spinner size="sm" className="mx-auto" /> : <PlusCircle size={24} />}
                </button>
              </div>
              
              <p className="text-center text-gray-400 text-sm">
                Quick adjust: +/- one glass (250ml)
              </p>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <h3 className="text-xl font-display font-semibold mb-6">Log Water Intake</h3>
              
              {/* Voice Input */}
              <div className="mb-6">
                <VoiceInput 
                  onTranscript={handleVoiceInput} 
                  placeholder="Click the mic and say 'I drank 2 glasses of water'"
                />
              </div>
              
              <form id="water-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-300">
                    How much water have you had?
                  </label>
                  <input
                    type="text"
                    value={waterAmount}
                    onChange={(e) => setWaterAmount(e.target.value)}
                    placeholder="e.g. 2 glasses or 500ml"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Spinner size="sm" className="mr-2" />
                        Logging...
                      </span>
                    ) : (
                      'Log Water Intake'
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white text-sm font-medium mb-2">Quick Logs:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setWaterAmount('1 glass');
                      }}
                      className="text-sm bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                    >
                      1 glass (250ml)
                    </button>
                    <button
                      onClick={() => {
                        setWaterAmount('2 glasses');
                      }}
                      className="text-sm bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                    >
                      2 glasses (500ml)
                    </button>
                    <button
                      onClick={() => {
                        setWaterAmount('500ml');
                      }}
                      className="text-sm bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                    >
                      500ml
                    </button>
                    <button
                      onClick={() => {
                        setWaterAmount('1 liter');
                      }}
                      className="text-sm bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                    >
                      1 liter
                    </button>
                  </div>
                </div>
              </div>
            </GlassMorphicCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WaterIntake;
