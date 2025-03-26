
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';
import VoiceInput from '../VoiceInput';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { toast } from 'sonner';

type ResponseType = {
  message: string;
  suggestions?: string[];
};

const VoiceWellnessCompanion: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');

  // Process the user's query and generate a response
  const processQuery = (query: string) => {
    setIsProcessing(true);
    setUserInput(query);
    
    // Simple logic to determine the response based on the query
    const lowerQuery = query.toLowerCase();
    
    // Determine response based on query content
    let newResponse: ResponseType;
    
    if (lowerQuery.includes('anxious') || lowerQuery.includes('anxiety') || 
        lowerQuery.includes('stress') || lowerQuery.includes('worried')) {
      newResponse = {
        message: "Thanks for sharing that. You're not alone. Would you like a breathing exercise, a grounding tip, or a motivational message?",
        suggestions: ["Breathing exercise", "Grounding tip", "Motivational message"]
      };
    } 
    else if (lowerQuery.includes('snack') || lowerQuery.includes('food') || 
             lowerQuery.includes('hungry') || lowerQuery.includes('eat')) {
      newResponse = {
        message: "Try a mix of protein and calm carbs! How about hummus with carrots or a boiled egg with fruit?",
        suggestions: ["More snack ideas", "Healthy meal options", "Hydration tips"]
      };
    }
    else if (lowerQuery.includes('sad') || lowerQuery.includes('depressed') || 
             lowerQuery.includes('down') || lowerQuery.includes('unhappy')) {
      newResponse = {
        message: "I'm sorry to hear you're feeling down. Remember that it's okay to feel this way sometimes. Would you like some gentle mood-lifting suggestions?",
        suggestions: ["Mood-lifting activities", "Self-care reminder", "Journal prompt"]
      };
    }
    else if (lowerQuery.includes('tired') || lowerQuery.includes('exhausted') || 
             lowerQuery.includes('sleep') || lowerQuery.includes('rest')) {
      newResponse = {
        message: "Sounds like you could use some rest. Quality sleep is so important for your wellbeing. Would you like some tips for better sleep tonight?",
        suggestions: ["Sleep hygiene tips", "Evening wind-down routine", "Relaxation technique"]
      };
    }
    else if (lowerQuery.includes('exercise') || lowerQuery.includes('workout') || 
             lowerQuery.includes('active') || lowerQuery.includes('move')) {
      newResponse = {
        message: "Movement is a great way to boost your wellbeing! Would you prefer a quick energizing workout or something more gentle?",
        suggestions: ["Quick energy boost", "Gentle stretching", "Walking meditation"]
      };
    }
    else if (lowerQuery.includes('water') || lowerQuery.includes('drink') || 
             lowerQuery.includes('thirsty') || lowerQuery.includes('hydration')) {
      newResponse = {
        message: "Staying hydrated is essential for your physical and mental wellbeing. Have you tried infusing your water with fruits or herbs for added benefits?",
        suggestions: ["Water infusion ideas", "Hydration reminder", "Benefits of hydration"]
      };
    }
    else if (query.trim() === '') {
      newResponse = {
        message: "Hmm, I didn't catch that clearly. Mind repeating or typing it out?",
      };
    }
    else {
      newResponse = {
        message: "I hear you. What specifically about your wellness journey would you like to focus on today?",
        suggestions: ["Stress management", "Nutrition", "Sleep", "Exercise", "Mindfulness"]
      };
    }
    
    // Simulate AI processing time
    setTimeout(() => {
      setResponse(newResponse);
      setIsProcessing(false);
    }, 1000);
  };

  const handleVoiceInput = (transcript: string) => {
    if (transcript.trim()) {
      processQuery(transcript);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    processQuery(`I want ${suggestion.toLowerCase()}`);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      processQuery(textInput);
      setTextInput('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <GlassMorphicCard className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-supernova-blue/10">
              <Mic className="text-supernova-blue" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Wellness Voice Assistant</h2>
          </div>
          
          {!userInput && !response && (
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
              <p className="text-gray-300">What would you like to check in about today?</p>
              <p className="text-gray-400 text-sm mt-2">Try saying "I feel anxious" or "Give me a healthy snack idea"</p>
            </div>
          )}
          
          {userInput && (
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400">You said:</p>
              <p className="text-white">{userInput}</p>
            </div>
          )}
          
          {isProcessing && (
            <div className="flex justify-center items-center py-4">
              <Loader className="animate-spin text-supernova-blue" size={32} />
            </div>
          )}
          
          {response && !isProcessing && (
            <div className="bg-supernova-blue/10 p-4 rounded-lg border border-supernova-blue/20">
              <p className="text-sm text-supernova-blue mb-2">Assistant:</p>
              <p className="text-white">{response.message}</p>
              
              {response.suggestions && response.suggestions.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {response.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="pt-4 border-t border-white/10">
            <VoiceInput 
              onTranscript={handleVoiceInput}
              placeholder="Click the microphone to speak to your wellness assistant"
            />
            
            <div className="mt-4">
              <form onSubmit={handleTextSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Or type your question here..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-supernova-dark border border-supernova-blue/30 rounded-lg text-white font-medium hover:bg-white/5 hover:border-supernova-blue/50 transition-all"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <p className="text-gray-400 text-sm">
              Your voice assistant uses on-device processing for your privacy. No data is stored unless you explicitly save your wellness insights.
            </p>
          </div>
        </div>
      </GlassMorphicCard>
    </div>
  );
};

export default VoiceWellnessCompanion;
