
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, MessageSquareText, Loader } from 'lucide-react';
import VoiceInput from '@/components/VoiceInput';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { useToast } from '@/hooks/use-toast';

const VoiceWellnessCompanion: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [textInput, setTextInput] = useState('');
  const { toast } = useToast();

  const handleVoiceTranscript = (transcript: string) => {
    processUserInput(transcript);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      processUserInput(textInput);
      setTextInput('');
    }
  };

  const processUserInput = (input: string) => {
    const normalizedInput = input.toLowerCase().trim();
    setIsThinking(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      let aiResponse = '';

      // Check for anxiety-related keywords
      if (normalizedInput.includes('anxious') || 
          normalizedInput.includes('anxiety') || 
          normalizedInput.includes('nervous') || 
          normalizedInput.includes('stressed') || 
          normalizedInput.includes('worry')) {
        aiResponse = "Thanks for sharing that. You're not alone. Would you like a breathing exercise, a grounding tip, or a motivational message?";
      } 
      // Check for food/snack related keywords
      else if (normalizedInput.includes('food') || 
               normalizedInput.includes('snack') || 
               normalizedInput.includes('eat') || 
               normalizedInput.includes('hungry') || 
               normalizedInput.includes('meal')) {
        aiResponse = "Try a mix of protein and calm carbs! How about hummus with carrots or a boiled egg with fruit?";
      }
      // Check for sleep related keywords
      else if (normalizedInput.includes('sleep') || 
               normalizedInput.includes('tired') || 
               normalizedInput.includes('insomnia') || 
               normalizedInput.includes('rest')) {
        aiResponse = "Sleep is crucial for wellness. Try to maintain a consistent sleep schedule and avoid screens an hour before bed. Would you like more sleep tips?";
      }
      // Check for hydration related keywords
      else if (normalizedInput.includes('water') || 
               normalizedInput.includes('hydrate') || 
               normalizedInput.includes('thirsty') || 
               normalizedInput.includes('drink')) {
        aiResponse = "Staying hydrated is essential! Aim for 8 glasses of water daily. Adding a slice of lemon or cucumber can make it more enjoyable.";
      }
      // Check for exercise related keywords
      else if (normalizedInput.includes('exercise') || 
               normalizedInput.includes('workout') || 
               normalizedInput.includes('active') || 
               normalizedInput.includes('move')) {
        aiResponse = "Movement is medicine! Even a 10-minute walk can boost your mood and energy. What type of activity do you enjoy most?";
      }
      // If no keywords match or the input is too short/unclear
      else if (normalizedInput.length < 3 || normalizedInput === 'hi' || normalizedInput === 'hey') {
        aiResponse = "Hello! What would you like to check in about today? You can ask me about anxiety management, healthy snacks, sleep, hydration, or exercise.";
      }
      else {
        aiResponse = "Hmm, I didn't catch that clearly. Mind repeating or typing it out? You can ask me about anxiety management, healthy snacks, sleep, hydration, or exercise.";
      }

      setResponse(aiResponse);
      setIsThinking(false);
      
      // Show toast notification when response is ready
      toast({
        title: "Wellness AI",
        description: "Response ready!",
      });
    }, 1500);
  };

  const toggleInputMode = () => {
    setIsVoiceMode(!isVoiceMode);
  };

  // Default prompt on component mount
  useEffect(() => {
    setResponse("What would you like to check in about today?");
  }, []);

  return (
    <GlassMorphicCard className="p-6 max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-display">
            Voice Wellness Companion
          </h3>
          <button 
            onClick={toggleInputMode}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label={isVoiceMode ? "Switch to text input" : "Switch to voice input"}
          >
            {isVoiceMode ? <MessageSquareText size={18} /> : <Mic size={18} />}
          </button>
        </div>
        
        <div className="bg-supernova-blue/10 rounded-lg p-4 min-h-[100px] flex items-center justify-center">
          {isThinking ? (
            <div className="animate-pulse flex flex-col items-center">
              <Loader size={24} className="text-supernova-blue/50 mb-2 animate-spin" />
              <p className="text-gray-400">Thinking...</p>
            </div>
          ) : (
            <p className="text-white">{response}</p>
          )}
        </div>
        
        {isVoiceMode ? (
          <VoiceInput 
            onTranscript={handleVoiceTranscript} 
            placeholder="Talk to your wellness companion..."
          />
        ) : (
          <form onSubmit={handleTextSubmit} className="flex space-x-2">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your wellness question..."
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-supernova-blue/50"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-supernova-blue/20 hover:bg-supernova-blue/30 rounded-lg transition-colors"
            >
              Send
            </button>
          </form>
        )}

        {!isVoiceMode && (
          <div className="text-xs text-gray-400">
            <p>Try asking about:</p>
            <ul className="flex flex-wrap gap-2 mt-1">
              <li className="px-2 py-1 bg-white/5 rounded-md">Anxiety tips</li>
              <li className="px-2 py-1 bg-white/5 rounded-md">Healthy snacks</li>
              <li className="px-2 py-1 bg-white/5 rounded-md">Sleep advice</li>
              <li className="px-2 py-1 bg-white/5 rounded-md">Hydration</li>
              <li className="px-2 py-1 bg-white/5 rounded-md">Exercise ideas</li>
            </ul>
          </div>
        )}
      </div>
    </GlassMorphicCard>
  );
};

export default VoiceWellnessCompanion;
