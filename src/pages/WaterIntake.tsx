
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Droplet, PlusCircle, MinusCircle } from 'lucide-react';
import { toast } from 'sonner';
import VoiceInput from '../components/VoiceInput';

const WaterIntake = () => {
  const [waterAmount, setWaterAmount] = useState('');
  const [totalWater, setTotalWater] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!waterAmount) {
      toast.error('Please enter how much water you drank');
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
    
    if (amount > 0) {
      setTotalWater(prev => prev + amount);
      toast.success(`Added ${amount}ml of water!`);
      setWaterAmount('');
    } else {
      toast.error('Unable to understand the amount. Try "2 glasses" or "500ml"');
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

  const adjustWater = (increment: number) => {
    // Add or remove 250ml (one glass)
    const newTotal = Math.max(0, totalWater + increment);
    setTotalWater(newTotal);
    toast.success(increment > 0 ? 'Added a glass of water!' : 'Removed a glass of water');
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
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                >
                  <MinusCircle size={24} />
                </button>
                <button 
                  onClick={() => adjustWater(250)}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-supernova-blue transition-colors"
                >
                  <PlusCircle size={24} />
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
                    className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50"
                  >
                    Log Water Intake
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
