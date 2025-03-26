
import React, { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import VoiceInput from '@/components/VoiceInput';

interface WaterIntakeFormProps {
  waterAmount: string;
  onWaterAmountChange: (amount: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const WaterIntakeForm: React.FC<WaterIntakeFormProps> = ({
  waterAmount,
  onWaterAmountChange,
  onSubmit,
  isSubmitting
}) => {
  const handleVoiceInput = (transcript: string) => {
    // Process voice input to extract water amount
    onWaterAmountChange(transcript);
    // Auto-submit after a short delay if we have a voice input
    setTimeout(() => {
      const form = document.getElementById('water-form') as HTMLFormElement;
      if (form && transcript) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }, 1000);
  };

  return (
    <div>
      {/* Voice Input */}
      <div className="mb-6">
        <VoiceInput 
          onTranscript={handleVoiceInput} 
          placeholder="Click the mic and say 'I drank 2 glasses of water'"
        />
      </div>
      
      <form id="water-form" onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm text-gray-300">
            How much water have you had?
          </label>
          <input
            type="text"
            value={waterAmount}
            onChange={(e) => onWaterAmountChange(e.target.value)}
            placeholder="e.g. 2 glasses or 500ml"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Spinner size="sm" className="mr-2" />
                Logging...
              </span>
            ) : (
              'Log Water Intake'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WaterIntakeForm;
