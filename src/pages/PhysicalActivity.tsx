
import React, { useState } from 'react';
import { Activity, ArrowRight, Clock, BarChart } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PhysicalActivity = () => {
  const [activity, setActivity] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const navigate = useNavigate();
  
  const handleActivitySelection = (selectedActivity: string) => {
    setActivity(selectedActivity);
    setShowFeedback(true);
    
    // In a real app, this would be saved to a database
    toast.success("Activity data recorded!");
  };
  
  const handleSetReminder = (timing: string) => {
    setReminderSet(true);
    setShowReminderOptions(false);
    
    // In a real app, this would schedule a notification
    toast.success(`Stretch reminder scheduled for ${timing}`);
  };
  
  const handleFinish = () => {
    navigate('/dashboard');
  };

  const navigateToTracking = () => {
    navigate('/activity-tracking');
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
              ) : showReminderOptions ? (
                <div className="text-center py-6 animate-fade-in">
                  <h2 className="text-xl font-display font-semibold mb-4">
                    When would you like the reminder?
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                      onClick={() => handleSetReminder("in 15 minutes")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                    >
                      <Clock size={24} className="text-supernova-pink mb-2" />
                      <p className="text-lg font-medium">In 15 minutes</p>
                    </button>
                    
                    <button 
                      onClick={() => handleSetReminder("in 30 minutes")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                    >
                      <Clock size={24} className="text-supernova-pink mb-2" />
                      <p className="text-lg font-medium">In 30 minutes</p>
                    </button>
                    
                    <button 
                      onClick={() => handleSetReminder("in 1 hour")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                    >
                      <Clock size={24} className="text-supernova-pink mb-2" />
                      <p className="text-lg font-medium">In 1 hour</p>
                    </button>
                    
                    <button 
                      onClick={() => handleSetReminder("later today")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                    >
                      <Clock size={24} className="text-supernova-pink mb-2" />
                      <p className="text-lg font-medium">Later today</p>
                    </button>
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setShowReminderOptions(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : reminderSet ? (
                <div className="text-center py-6 animate-fade-in">
                  <h2 className="text-xl font-display font-semibold mb-4">
                    Reminder set! We'll nudge you with a gentle 2-minute stretch suggestion.
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Even small movements make a difference.
                  </p>
                  <div className="space-y-4">
                    <Button 
                      onClick={handleFinish}
                      className="w-full bg-supernova-pink hover:bg-supernova-pink/80"
                    >
                      Continue to Dashboard <ArrowRight size={16} className="ml-2" />
                    </Button>
                    <Button
                      onClick={navigateToTracking}
                      variant="outline"
                      className="w-full"
                    >
                      <BarChart size={16} className="mr-2" /> View Activity Tracking
                    </Button>
                  </div>
                </div>
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
                      <div className="space-y-4">
                        <div className="flex justify-center gap-3">
                          <Button 
                            onClick={() => setShowReminderOptions(true)}
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
                        <Button
                          onClick={navigateToTracking}
                          variant="link"
                          className="text-supernova-blue"
                        >
                          <BarChart size={16} className="mr-2" /> View Activity Tracking
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
                      <div className="space-y-4">
                        <Button 
                          onClick={handleFinish}
                          className="w-full bg-supernova-pink hover:bg-supernova-pink/80"
                        >
                          Continue to Dashboard <ArrowRight size={16} className="ml-2" />
                        </Button>
                        <Button
                          onClick={navigateToTracking}
                          variant="outline"
                          className="w-full"
                        >
                          <BarChart size={16} className="mr-2" /> View Activity Tracking
                        </Button>
                      </div>
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
