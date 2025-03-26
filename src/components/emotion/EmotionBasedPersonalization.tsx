
import React, { useState } from 'react';
import EmotionPicker, { EmotionType } from './EmotionPicker';
import EmotionSuggestion from './EmotionSuggestion';

const EmotionBasedPersonalization: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(null);
  
  const handleEmotionSelected = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };
  
  const handleReset = () => {
    setSelectedEmotion(null);
  };
  
  return (
    <div className="max-w-md mx-auto">
      {!selectedEmotion ? (
        <EmotionPicker onEmotionSelected={handleEmotionSelected} />
      ) : (
        <EmotionSuggestion emotion={selectedEmotion} onReset={handleReset} />
      )}
    </div>
  );
};

export default EmotionBasedPersonalization;
