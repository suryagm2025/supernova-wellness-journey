
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Brain } from 'lucide-react';
import WellnessSuggestions from '../components/suggestions/WellnessSuggestions';

const Suggestions = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-white/10 p-3 rounded-full mb-4">
              <Brain size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Wellness Suggestions</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              AI-powered personalized recommendations to optimize your wellness journey
            </p>
          </div>
          
          <WellnessSuggestions />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Suggestions;
