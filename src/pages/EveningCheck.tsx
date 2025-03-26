
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { MoonStar, Clock, Smartphone, Heart, Mic } from 'lucide-react';
import { toast } from 'sonner';
import VoiceInput from '../components/VoiceInput';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Spinner } from '@/components/ui/spinner';

const EveningCheck = () => {
  const [sleepTime, setSleepTime] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You need to be logged in to complete evening check-in');
      return;
    }
    
    if (!sleepTime || !screenTime || !gratitude) {
      toast.error('Please fill out all fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('evening_check')
        .insert({
          user_id: user.id,
          sleep_time: sleepTime,
          screen_time: screenTime,
          gratitude: gratitude
        });
      
      if (error) throw error;
      
      toast.success('Evening check-in completed!');
      
      // Reset form
      setSleepTime('');
      setScreenTime('');
      setGratitude('');
    } catch (error: any) {
      console.error('Error submitting evening check:', error);
      toast.error(error.message || 'Failed to submit evening check-in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    if (activeVoiceField === 'sleepTime') {
      setSleepTime(transcript);
    } else if (activeVoiceField === 'screenTime') {
      setScreenTime(transcript);
    } else if (activeVoiceField === 'gratitude') {
      setGratitude(transcript);
    }
    
    // Reset after receiving input
    setActiveVoiceField(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-pink/20 p-3 rounded-full mb-4">
              <MoonStar size={32} className="text-supernova-pink" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Evening Check-In</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Wrap up your day with reflection and gratitude. This helps improve sleep quality and prepares your mind for tomorrow.
            </p>
          </div>
          
          <GlassMorphicCard className="p-6 w-full max-w-xl mx-auto">
            <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
              <span className="bg-supernova-pink/20 p-2 rounded-lg mr-3">
                <MoonStar size={20} className="text-supernova-pink" />
              </span>
              Evening Reflection
            </h3>
            
            {activeVoiceField && (
              <div className="mb-6">
                <VoiceInput 
                  onTranscript={handleVoiceInput}
                  placeholder={`Speak to fill the ${activeVoiceField === 'sleepTime' ? 'sleep time' : 
                    activeVoiceField === 'screenTime' ? 'screen time' : 'gratitude'} field`}
                />
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm text-gray-300 flex items-center">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    What time do you plan to sleep?
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveVoiceField('sleepTime')}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                    aria-label="Use voice input for sleep time"
                  >
                    <Mic size={14} />
                  </button>
                </div>
                <input
                  type="text"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  placeholder="e.g. 10:30 PM"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-pink/50 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm text-gray-300 flex items-center">
                    <Smartphone size={16} className="mr-2 text-gray-400" />
                    Any screen time or late snacking?
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveVoiceField('screenTime')}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                    aria-label="Use voice input for screen time"
                  >
                    <Mic size={14} />
                  </button>
                </div>
                <input
                  type="text"
                  value={screenTime}
                  onChange={(e) => setScreenTime(e.target.value)}
                  placeholder="e.g. No phone after 9 PM"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-pink/50 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm text-gray-300 flex items-center">
                    <Heart size={16} className="mr-2 text-gray-400" />
                    One thing you're grateful for today?
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveVoiceField('gratitude')}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                    aria-label="Use voice input for gratitude"
                  >
                    <Mic size={14} />
                  </button>
                </div>
                <textarea
                  value={gratitude}
                  onChange={(e) => setGratitude(e.target.value)}
                  placeholder="e.g. Grateful for the good weather today"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-pink/50 transition-all min-h-[100px]"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full button-glow bg-supernova-dark border border-supernova-pink/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-pink/50 disabled:opacity-50"
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
                <span className="text-supernova-pink">Tip:</span> Try using voice input by clicking the microphone icons next to each field.
              </p>
            </div>
          </GlassMorphicCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EveningCheck;
