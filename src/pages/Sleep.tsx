
import React, { useState } from 'react';
import { Moon, ArrowRight } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Sleep = () => {
  const [sleepHours, setSleepHours] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();
  
  const handleSleepSelection = (hours: string) => {
    setSleepHours(hours);
    setShowFeedback(true);
    
    // In a real app, this would be saved to a database
    toast.success("Sleep data recorded!");
  };
  
  const handleFinish = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-purple/20 p-3 rounded-full mb-4">
              <Moon size={32} className="text-supernova-purple" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Sleep Tracker</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your sleep patterns to improve your rest quality and overall wellness.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <GlassMorphicCard className="p-6">
              {!showFeedback ? (
                <>
                  <h2 className="text-xl font-display font-semibold mb-6 text-center">
                    How many hours did you sleep last night?
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                      onClick={() => handleSleepSelection("less-than-5")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <p className="text-lg font-medium">Less than 5</p>
                    </button>
                    
                    <button 
                      onClick={() => handleSleepSelection("5-7")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <p className="text-lg font-medium">5–7 hours</p>
                    </button>
                    
                    <button 
                      onClick={() => handleSleepSelection("7-9")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <p className="text-lg font-medium">7–9 hours</p>
                    </button>
                    
                    <button 
                      onClick={() => handleSleepSelection("9-plus")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <p className="text-lg font-medium">9+ hours</p>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 animate-fade-in">
                  {sleepHours === "less-than-5" || sleepHours === "5-7" ? (
                    <>
                      <h2 className="text-xl font-display font-semibold mb-4">
                        Let's try a wind-down tip tonight.
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Would you like a calming bedtime audio suggestion?
                      </p>
                      <div className="flex justify-center gap-3">
                        <Button 
                          onClick={() => toast.success("Audio suggestion added to your evening routine")}
                          className="bg-supernova-purple hover:bg-supernova-purple/80"
                        >
                          Yes, suggest audio
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={handleFinish}
                        >
                          No thanks
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-display font-semibold mb-4">
                        Nice! You're getting quality rest.
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Keep the streak going 💤
                      </p>
                      <Button 
                        onClick={handleFinish}
                        className="bg-supernova-purple hover:bg-supernova-purple/80"
                      >
                        Continue to Dashboard <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </>
                  )}
                </div>
              )}
            </GlassMorphicCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sleep;
