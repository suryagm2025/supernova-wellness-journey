
import React, { useState } from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Clock, Droplet, StretchHorizontal, Mic } from 'lucide-react';
import { toast } from 'sonner';
import VoiceInput from '../VoiceInput';

const MorningCheckIn: React.FC = () => {
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [movement, setMovement] = useState('');
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wakeUpTime || !waterIntake || !movement) {
      toast.error('Please fill out all fields');
      return;
    }
    
    toast.success('Morning check-in completed!');
    
    // Reset form
    setWakeUpTime('');
    setWaterIntake('');
    setMovement('');
  };

  const handleVoiceInput = (transcript: string) => {
    if (activeVoiceField === 'wakeUpTime') {
      setWakeUpTime(transcript);
    } else if (activeVoiceField === 'waterIntake') {
      setWaterIntake(transcript);
    } else if (activeVoiceField === 'movement') {
      setMovement(transcript);
    }
    
    // Reset after receiving input
    setActiveVoiceField(null);
  };

  return (
    <GlassMorphicCard className="p-6 w-full max-w-xl mx-auto">
      <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
        <span className="bg-supernova-blue/20 p-2 rounded-lg mr-3">
          <Clock size={20} className="text-supernova-blue" />
        </span>
        Morning Check-In
      </h3>
      
      {activeVoiceField && (
        <div className="mb-6">
          <VoiceInput 
            onTranscript={handleVoiceInput}
            placeholder={`Speak to fill the ${activeVoiceField === 'wakeUpTime' ? 'wake up time' : 
              activeVoiceField === 'waterIntake' ? 'water intake' : 'movement'} field`}
          />
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm text-gray-300 flex items-center">
              <Clock size={16} className="mr-2 text-gray-400" />
              What time did you wake up?
            </label>
            <button
              type="button"
              onClick={() => setActiveVoiceField('wakeUpTime')}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              aria-label="Use voice input for wake up time"
            >
              <Mic size={14} />
            </button>
          </div>
          <input
            type="text"
            value={wakeUpTime}
            onChange={(e) => setWakeUpTime(e.target.value)}
            placeholder="e.g. 6:30 AM"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm text-gray-300 flex items-center">
              <Droplet size={16} className="mr-2 text-gray-400" />
              Did you drink water?
            </label>
            <button
              type="button"
              onClick={() => setActiveVoiceField('waterIntake')}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              aria-label="Use voice input for water intake"
            >
              <Mic size={14} />
            </button>
          </div>
          <input
            type="text"
            value={waterIntake}
            onChange={(e) => setWaterIntake(e.target.value)}
            placeholder="e.g. 1 glass of water"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm text-gray-300 flex items-center">
              <StretchHorizontal size={16} className="mr-2 text-gray-400" />
              Any movement or meditation?
            </label>
            <button
              type="button"
              onClick={() => setActiveVoiceField('movement')}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              aria-label="Use voice input for movement"
            >
              <Mic size={14} />
            </button>
          </div>
          <input
            type="text"
            value={movement}
            onChange={(e) => setMovement(e.target.value)}
            placeholder="e.g. 5 mins yoga"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50"
          >
            Submit Check-In
          </button>
        </div>
      </form>
      
      <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
        <p className="text-gray-400 text-sm">
          <span className="text-supernova-blue">Tip:</span> Try using voice input by clicking the microphone icons next to each field.
        </p>
      </div>
    </GlassMorphicCard>
  );
};

export default MorningCheckIn;
