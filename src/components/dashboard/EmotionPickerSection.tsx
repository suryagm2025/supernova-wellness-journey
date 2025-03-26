
import React from 'react';
import { EmotionType } from '@/components/emotion/EmotionPicker';

interface EmotionPickerSectionProps {
  selectedEmotion: EmotionType;
  setSelectedEmotion: (emotion: EmotionType) => void;
}

const EmotionPickerSection: React.FC<EmotionPickerSectionProps> = ({
  selectedEmotion,
  setSelectedEmotion
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">How are you feeling?</label>
      <div className="flex justify-between gap-4">
        <button 
          onClick={() => setSelectedEmotion('happy')} 
          className={`text-3xl p-2 rounded-full transition-all ${selectedEmotion === 'happy' ? 'bg-supernova-gold/20 scale-110' : 'opacity-70 hover:opacity-100'}`}
          aria-label="Happy"
        >
          😃
        </button>
        <button 
          onClick={() => setSelectedEmotion('neutral')} 
          className={`text-3xl p-2 rounded-full transition-all ${selectedEmotion === 'neutral' ? 'bg-supernova-blue/20 scale-110' : 'opacity-70 hover:opacity-100'}`}
          aria-label="Neutral"
        >
          😐
        </button>
        <button 
          onClick={() => setSelectedEmotion('sad')} 
          className={`text-3xl p-2 rounded-full transition-all ${selectedEmotion === 'sad' ? 'bg-supernova-pink/20 scale-110' : 'opacity-70 hover:opacity-100'}`}
          aria-label="Sad"
        >
          😔
        </button>
      </div>
      {!selectedEmotion && (
        <p className="text-sm text-gray-400 mt-2">Choose how you're feeling to receive your personalized affirmation.</p>
      )}
    </div>
  );
};

export default EmotionPickerSection;
