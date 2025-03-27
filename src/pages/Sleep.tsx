import React, { useState } from 'react';
import { Moon, ArrowRight, Music, Cloud, Leaf, Wrench } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Sleep = () => {
  const [sleepHours, setSleepHours] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAudioOptions, setShowAudioOptions] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleSleepSelection = (hours: string) => {
    setSleepHours(hours);
    setShowFeedback(true);
    
    // In a real app, this would be saved to a database
    toast.success("Sleep data recorded!");
  };
  
  const handleAudioSelection = (audio: string) => {
    setSelectedAudio(audio);
    setShowAudioOptions(false);
    
    // In a real app, this would trigger an audio player
    toast.success(`Playing: ${audio} - 10 minutes`);
  };
  
  const handleFinish = () => {
    navigate('/dashboard');
  };

  const navigateToSleepTools = () => {
    navigate('/sleep-tools');
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
              ) : showAudioOptions ? (
                <div className="text-center py-6 animate-fade-in">
                  <h2 className="text-xl font-display font-semibold mb-4">
                    Choose a calming audio to help you wind down:
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button 
                      onClick={() => handleAudioSelection("Calming Rainfall")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                    >
                      <Cloud size={32} className="text-supernova-blue mb-2" />
                      <p className="text-lg font-medium">🌧️ Calming Rainfall</p>
                    </button>
                    
                    <button 
                      onClick={() => handleAudioSelection("LoFi Sleep Music")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                    >
                      <Music size={32} className="text-supernova-purple mb-2" />
                      <p className="text-lg font-medium">🎵 LoFi Sleep Music</p>
                    </button>
                    
                    <button 
                      onClick={() => handleAudioSelection("Nature Night Sounds")}
                      className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
                    >
                      <Leaf size={32} className="text-supernova-gold mb-2" />
                      <p className="text-lg font-medium">🍃 Nature Night Sounds</p>
                    </button>
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setShowAudioOptions(false)}
                  >
                    No thanks
                  </Button>
                </div>
              ) : selectedAudio ? (
                <div className="text-center py-6 animate-fade-in">
                  <h2 className="text-xl font-display font-semibold mb-4">
                    Playing: {selectedAudio} - 10 minutes
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Find a comfortable position and relax as you listen.
                  </p>
                  <div className="space-y-4">
                    <Button 
                      onClick={handleFinish}
                      className="bg-supernova-purple hover:bg-supernova-purple/80 w-full"
                    >
                      Continue to Dashboard <ArrowRight size={16} className="ml-2" />
                    </Button>
                    <Button
                      onClick={navigateToSleepTools}
                      variant="outline"
                      className="w-full"
                    >
                      <Wrench size={16} className="mr-2" /> Access Sleep Tools
                    </Button>
                  </div>
                </div>
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
                      <div className="flex flex-col space-y-4">
                        <Button 
                          onClick={() => setShowAudioOptions(true)}
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
                        <Button
                          onClick={navigateToSleepTools}
                          variant="link"
                          className="text-supernova-blue"
                        >
                          <Wrench size={16} className="mr-2" /> Access Sleep Tools
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
                      <div className="space-y-4">
                        <Button 
                          onClick={handleFinish}
                          className="bg-supernova-purple hover:bg-supernova-purple/80 w-full"
                        >
                          Continue to Dashboard <ArrowRight size={16} className="ml-2" />
                        </Button>
                        <Button
                          onClick={navigateToSleepTools}
                          variant="outline"
                          className="w-full"
                        >
                          <Wrench size={16} className="mr-2" /> Access Sleep Tools
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

export default Sleep;
