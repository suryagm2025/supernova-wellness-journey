
import React, { useState } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PhysicalActivity = () => {
  const [activity, setActivity] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();
  
  const handleActivitySelection = (selectedActivity: string) => {
    setActivity(selectedActivity);
    setShowFeedback(true);
    
    // In a real app, this would be saved to a database
    toast.success("Activity data recorded!");
  };
  
  const handleFinish = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-pink/20 p-3 rounded-full mb-4">
              <Activity size={32} className="text-supernova-pink" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Physical Activity</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your daily movement to build healthy habits and boost your energy.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <GlassMorphicCard className="p-6">
              {!showFeedback ? (
                <>
                  <h2 className="text-xl font-display font-semibold mb-6 text-center">
                    What kind of movement did you do today?
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                      onClick={() => handleActivitySelection("walk")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <p className="text-lg font-medium">Walk</p>
                    </button>
                    
                    <button 
                      onClick={() => handleActivitySelection("yoga")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <p className="text-lg font-medium">Yoga</p>
                    </button>
                    
                    <button 
                      onClick={() => handleActivitySelection("workout")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <p className="text-lg font-medium">Workout</p>
                    </button>
                    
                    <button 
                      onClick={() => handleActivitySelection("none")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <p className="text-lg font-medium">None</p>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 animate-fade-in">
                  {activity === "none" ? (
                    <>
                      <h2 className="text-xl font-display font-semibold mb-4">
                        No worries. Everyone needs rest days too.
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Would you like a 2-minute stretch reminder for later?
                      </p>
                      <div className="flex justify-center gap-3">
                        <Button 
                          onClick={() => toast.success("Stretch reminder set for later today")}
                          className="bg-supernova-pink hover:bg-supernova-pink/80"
                        >
                          Yes, set reminder
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
                        Great job staying active!
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Consistency counts 💪
                      </p>
                      <Button 
                        onClick={handleFinish}
                        className="bg-supernova-pink hover:bg-supernova-pink/80"
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

export default PhysicalActivity;
