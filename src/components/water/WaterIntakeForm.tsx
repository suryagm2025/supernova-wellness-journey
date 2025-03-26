
import React from 'react';
import VoiceInput from '@/components/VoiceInput';
import WaterInputField from './WaterInputField';
import SubmitButton from './SubmitButton';

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
        <WaterInputField 
          waterAmount={waterAmount} 
          onWaterAmountChange={onWaterAmountChange} 
        />
        
        <div>
          <SubmitButton 
            isSubmitting={isSubmitting} 
            label="Log Water Intake" 
            loadingLabel="Logging..." 
          />
        </div>
      </form>
    </div>
  );
};

export default WaterIntakeForm;
