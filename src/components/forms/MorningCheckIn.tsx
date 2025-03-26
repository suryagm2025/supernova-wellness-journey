
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Clock, Droplet, StretchHorizontal, Mic } from 'lucide-react';
import VoiceInput from '../VoiceInput';
import { useMorningCheckIn } from '@/hooks/morning-check-in/useMorningCheckIn';
import { Spinner } from '@/components/ui/spinner';
import MorningCheckInField from './MorningCheckInField';

const MorningCheckIn: React.FC = () => {
  const {
    wakeUpTime,
    setWakeUpTime,
    waterIntake,
    setWaterIntake,
    movement,
    setMovement,
    activeVoiceField,
    setActiveVoiceField,
    isSubmitting,
    handleSubmit,
    handleVoiceInput
  } = useMorningCheckIn();

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
        <MorningCheckInField
          label="What time did you wake up?"
          icon={<Clock size={16} className="mr-2 text-gray-400" />}
          value={wakeUpTime}
          onChange={(e) => setWakeUpTime(e.target.value)}
          placeholder="e.g. 6:30 AM"
          onVoiceClick={() => setActiveVoiceField('wakeUpTime')}
        />
        
        <MorningCheckInField
          label="Did you drink water?"
          icon={<Droplet size={16} className="mr-2 text-gray-400" />}
          value={waterIntake}
          onChange={(e) => setWaterIntake(e.target.value)}
          placeholder="e.g. 1 glass of water"
          onVoiceClick={() => setActiveVoiceField('waterIntake')}
        />
        
        <MorningCheckInField
          label="Any movement or meditation?"
          icon={<StretchHorizontal size={16} className="mr-2 text-gray-400" />}
          value={movement}
          onChange={(e) => setMovement(e.target.value)}
          placeholder="e.g. 5 mins yoga"
          onVoiceClick={() => setActiveVoiceField('movement')}
        />
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50 disabled:opacity-50"
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
          <span className="text-supernova-blue">Tip:</span> Try using voice input by clicking the microphone icons next to each field.
        </p>
      </div>
    </GlassMorphicCard>
  );
};

export default MorningCheckIn;
