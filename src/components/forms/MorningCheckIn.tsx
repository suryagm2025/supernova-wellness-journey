
import React, { useState } from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Clock, Droplet, StretchHorizontal } from 'lucide-react';
import { toast } from 'sonner';

const MorningCheckIn: React.FC = () => {
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [movement, setMovement] = useState('');

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

  return (
    <GlassMorphicCard className="p-6 w-full max-w-xl mx-auto">
      <h3 className="text-xl font-display font-semibold mb-6 flex items-center">
        <span className="bg-supernova-blue/20 p-2 rounded-lg mr-3">
          <Clock size={20} className="text-supernova-blue" />
        </span>
        Morning Check-In
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm text-gray-300 flex items-center">
            <Clock size={16} className="mr-2 text-gray-400" />
            What time did you wake up?
          </label>
          <input
            type="text"
            value={wakeUpTime}
            onChange={(e) => setWakeUpTime(e.target.value)}
            placeholder="e.g. 6:30 AM"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-300 flex items-center">
            <Droplet size={16} className="mr-2 text-gray-400" />
            Did you drink water?
          </label>
          <input
            type="text"
            value={waterIntake}
            onChange={(e) => setWaterIntake(e.target.value)}
            placeholder="e.g. 1 glass of water"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-300 flex items-center">
            <StretchHorizontal size={16} className="mr-2 text-gray-400" />
            Any movement or meditation?
          </label>
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
          <span className="text-supernova-blue">Example:</span> "Woke up at 6:30 AM, drank 2 glasses of water, did 5 mins yoga."
        </p>
      </div>
    </GlassMorphicCard>
  );
};

export default MorningCheckIn;
