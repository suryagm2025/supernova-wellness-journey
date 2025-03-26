
import React from 'react';
import { EmotionType } from './EmotionPicker';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Smile, Meh, Frown } from 'lucide-react';

interface MoodBasedAffirmationProps {
  emotion: EmotionType;
}

const MoodBasedAffirmation: React.FC<MoodBasedAffirmationProps> = ({ emotion }) => {
  if (!emotion) return null;
  
  let affirmation = '';
  let icon = null;
  let gradientClass = '';
  
  switch (emotion) {
    case 'happy':
      affirmation = "I radiate energy, joy, and positivity. Today is mine to create. 🌟";
      icon = <Smile size={24} className="text-supernova-gold" />;
      gradientClass = "bg-gradient-to-r from-supernova-gold/20 to-supernova-blue/20";
      break;
    case 'neutral':
      affirmation = "I am grounded and calm. I honor where I am today. 🌿";
      icon = <Meh size={24} className="text-supernova-blue" />;
      gradientClass = "bg-gradient-to-r from-supernova-blue/20 to-supernova-purple/20";
      break;
    case 'sad':
      affirmation = "I am safe, I am loved, I am healing. One step at a time. 💕";
      icon = <Frown size={24} className="text-supernova-pink" />;
      gradientClass = "bg-gradient-to-r from-supernova-pink/20 to-supernova-purple/20";
      break;
    default:
      return null;
  }
  
  return (
    <GlassMorphicCard className={`p-6 ${gradientClass} animate-fade-in`}>
      <div className="flex items-center mb-3">
        {icon}
        <h3 className="font-display text-lg ml-2">Today's Affirmation</h3>
      </div>
      <p className="text-white text-lg font-medium">{affirmation}</p>
    </GlassMorphicCard>
  );
};

export default MoodBasedAffirmation;
