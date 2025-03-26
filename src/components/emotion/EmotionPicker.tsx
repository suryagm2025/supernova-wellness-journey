
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export type EmotionType = 'happy' | 'neutral' | 'sad' | null;

interface EmotionPickerProps {
  onEmotionSelected: (emotion: EmotionType) => void;
}

const EmotionPicker: React.FC<EmotionPickerProps> = ({ onEmotionSelected }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEmotion) {
      toast.error("Hmm... your emotion didn't come through. Mind tapping it again? Or you can type how you feel if you prefer.");
      return;
    }
    
    onEmotionSelected(selectedEmotion);
  };

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
      <h3 className="text-xl font-display mb-4">How are you feeling right now?</h3>
      <p className="text-gray-400 mb-6">Tap an emoji that best represents your current mood.</p>
      
      <form onSubmit={handleSubmit}>
        <RadioGroup 
          value={selectedEmotion || ''} 
          onValueChange={(value) => setSelectedEmotion(value as EmotionType)}
          className="flex justify-center gap-8 mb-6"
        >
          <div className="flex flex-col items-center">
            <RadioGroupItem value="happy" id="happy" className="sr-only" />
            <Label 
              htmlFor="happy" 
              className={`text-5xl cursor-pointer transition-transform ${selectedEmotion === 'happy' ? 'scale-125' : 'opacity-70 hover:opacity-100'}`}
            >
              😃
            </Label>
            <span className="mt-2 text-sm text-gray-400">Happy</span>
          </div>
          
          <div className="flex flex-col items-center">
            <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
            <Label 
              htmlFor="neutral" 
              className={`text-5xl cursor-pointer transition-transform ${selectedEmotion === 'neutral' ? 'scale-125' : 'opacity-70 hover:opacity-100'}`}
            >
              😐
            </Label>
            <span className="mt-2 text-sm text-gray-400">Neutral</span>
          </div>
          
          <div className="flex flex-col items-center">
            <RadioGroupItem value="sad" id="sad" className="sr-only" />
            <Label 
              htmlFor="sad" 
              className={`text-5xl cursor-pointer transition-transform ${selectedEmotion === 'sad' ? 'scale-125' : 'opacity-70 hover:opacity-100'}`}
            >
              😔
            </Label>
            <span className="mt-2 text-sm text-gray-400">Sad</span>
          </div>
        </RadioGroup>
        
        <Button 
          type="submit" 
          className="w-full button-glow"
          disabled={!selectedEmotion}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EmotionPicker;
