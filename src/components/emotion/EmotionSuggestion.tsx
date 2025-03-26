
import React from 'react';
import { EmotionType } from './EmotionPicker';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Button } from '../ui/button';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface EmotionSuggestionProps {
  emotion: EmotionType;
  onReset: () => void;
}

const getSuggestionForEmotion = (emotion: EmotionType): string => {
  switch (emotion) {
    case 'happy':
      const happySuggestions = [
        "Channel that positive energy into a 10-minute dance session to your favorite upbeat song!",
        "Share your good mood by reaching out to someone who might need a lift today.",
        "Use this positive momentum to tackle that one thing you've been putting off.",
        "Try a new walking route today and notice three beautiful things along the way.",
        "Write down three things you're grateful for right now to amplify your good feelings."
      ];
      return happySuggestions[Math.floor(Math.random() * happySuggestions.length)];
    
    case 'neutral':
      const neutralSuggestions = [
        "Take a mindful minute: Close your eyes and just notice three full breaths.",
        "Step outside for a quick 5-minute nature break, no phone needed.",
        "Drink a glass of water slowly and mindfully, feeling the sensation of hydration.",
        "Stretch your body gently for 2 minutes, focusing on where you feel tension.",
        "Tidy one small space in your environment - even just a desk corner can feel refreshing."
      ];
      return neutralSuggestions[Math.floor(Math.random() * neutralSuggestions.length)];
    
    case 'sad':
      const sadSuggestions = [
        "Place one hand on your heart, take three deep breaths, and say 'This feeling will pass'.",
        "Try this 4-7-8 breathing exercise: Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 3 times.",
        "Write down what you're feeling without judgment, then close the notebook. It's okay to feel this way.",
        "Give yourself permission to do something gentle today - a warm shower, a quiet walk, or just rest.",
        "Listen to a song that matches your mood, then gradually transition to something a bit more uplifting."
      ];
      return sadSuggestions[Math.floor(Math.random() * sadSuggestions.length)];
    
    default:
      return "I'm here to support your wellness journey, whatever you're feeling today.";
  }
};

const getEmotionMessage = (emotion: EmotionType): string => {
  switch (emotion) {
    case 'happy':
      return "You're feeling bright today! Let's channel that energy into something uplifting.";
    case 'neutral':
      return "Feeling neutral is okay. Sometimes it's a space of calm. Let's keep it light today.";
    case 'sad':
      return "Not your best day? I'm here for you. Here's a grounding practice tailored to lift your energy gently:";
    default:
      return "How are you feeling today?";
  }
};

const EmotionSuggestion: React.FC<EmotionSuggestionProps> = ({ emotion, onReset }) => {
  if (!emotion) return null;
  
  const message = getEmotionMessage(emotion);
  const suggestion = getSuggestionForEmotion(emotion);
  
  return (
    <GlassMorphicCard className="p-6 animate-fade-in">
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">
          {emotion === 'happy' ? '😃' : emotion === 'neutral' ? '😐' : '😔'}
        </div>
        <div>
          <h3 className="text-xl font-display">{message}</h3>
        </div>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
        <div className="flex">
          <Sparkles className="text-supernova-blue mr-3 mt-1 flex-shrink-0" size={16} />
          <p className="text-gray-200">{suggestion}</p>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        onClick={onReset}
        className="flex items-center"
      >
        <ArrowLeft size={16} className="mr-2" />
        Select another emotion
      </Button>
    </GlassMorphicCard>
  );
};

export default EmotionSuggestion;
