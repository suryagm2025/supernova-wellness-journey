
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Moon, Clock, Smartphone, Heart } from 'lucide-react';
import { toast } from 'sonner';

const EveningCheck = () => {
  const [sleepTime, setSleepTime] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [gratitude, setGratitude] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sleepTime || !screenTime || !gratitude) {
      toast.error('Please fill out all fields');
      return;
    }
    
    toast.success('Evening check-in completed!');
    
    // Reset form
    setSleepTime('');
    setScreenTime('');
    setGratitude('');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-pink/20 p-3 rounded-full mb-4">
              <Moon size={32} className="text-supernova-pink" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Evening Check-In</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Wrap up your day with reflection and gratitude. This helps improve sleep quality and prepares your mind for tomorrow.
            </p>
          </div>
          
          <GlassMorphicCard className="p-6 w-full max-w-xl mx-auto">
            <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
              <span className="bg-supernova-pink/20 p-2 rounded-lg mr-3">
                <Moon size={20} className="text-supernova-pink" />
              </span>
              Evening Reflection
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm text-gray-300 flex items-center">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  What time do you plan to sleep?
                </label>
                <input
                  type="text"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  placeholder="e.g. 10:30 PM"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-pink/50 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm text-gray-300 flex items-center">
                  <Smartphone size={16} className="mr-2 text-gray-400" />
                  Any screen time or late snacking?
                </label>
                <input
                  type="text"
                  value={screenTime}
                  onChange={(e) => setScreenTime(e.target.value)}
                  placeholder="e.g. No phone after 9 PM"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-pink/50 transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm text-gray-300 flex items-center">
                  <Heart size={16} className="mr-2 text-gray-400" />
                  One thing you're grateful for today?
                </label>
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
                  className="w-full button-glow bg-supernova-dark border border-supernova-pink/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-pink/50"
                >
                  Submit Check-In
                </button>
              </div>
            </form>
            
            <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-gray-400 text-sm">
                <span className="text-supernova-pink">Example:</span> "Sleep at 10:30, no phone after 9, grateful for good weather."
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
