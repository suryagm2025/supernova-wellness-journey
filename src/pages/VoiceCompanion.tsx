
import React from 'react';
import { Mic } from 'lucide-react';
import VoiceWellnessCompanion from '../components/voice/VoiceWellnessCompanion';

const VoiceCompanion = () => {
  return (
    <div className="min-h-screen">
      <main className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-white/10 p-3 rounded-full mb-4">
              <Mic size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Voice-AI Wellness Companion</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Speak naturally with your AI wellness assistant. Get personalized suggestions, emotional support, and wellness tips through simple voice interactions.
            </p>
          </div>
          
          <VoiceWellnessCompanion />
          
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                <h3 className="text-lg font-medium mb-2">Try asking about:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• How to manage anxiety or stress</li>
                  <li>• Quick healthy snack ideas</li>
                  <li>• Simple breathing exercises</li>
                  <li>• Sleep improvement tips</li>
                </ul>
              </div>
              
              <div className="bg-white/5 p-5 rounded-lg border border-white/10">
                <h3 className="text-lg font-medium mb-2">Benefits:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Hands-free wellness support</li>
                  <li>• Personalized recommendations</li>
                  <li>• Emotional check-ins anytime</li>
                  <li>• Private and secure interactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VoiceCompanion;
