
import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import WellnessSuggestions from '../components/suggestions/WellnessSuggestions';

const Suggestions = () => {
  return (
    <div className="min-h-screen">
      <main className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-white/10 p-3 rounded-full mb-4">
              <Brain size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">AI Wellness Suggestions</h1>
            <p className="text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-supernova-blue" />
              Personalized recommendations powered by AI to optimize your wellness journey
              <Sparkles size={16} className="text-supernova-pink" />
            </p>
          </div>
          
          <WellnessSuggestions />
        </div>
      </main>
    </div>
  );
};

export default Suggestions;
