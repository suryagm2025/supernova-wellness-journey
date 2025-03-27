
import React from 'react';
import { Quote } from 'lucide-react';

const InsightsAndQuotes: React.FC = () => {
  return (
    <>
      {/* AI Insight */}
      <div className="p-5 bg-supernova-dark/50 border border-white/10 rounded-lg mb-8">
        <h3 className="text-lg font-medium mb-3">Personalized AI Insight:</h3>
        <p>You've been more focused on mid-week! Let's build on that momentum.</p>
      </div>
      
      {/* Quote */}
      <div className="flex items-start gap-4 p-5 bg-white/5 rounded-lg mb-8">
        <Quote className="text-supernova-gold flex-shrink-0" size={24} />
        <div>
          <p className="italic text-lg">"Small steps every day lead to big change."</p>
        </div>
      </div>
    </>
  );
};

export default InsightsAndQuotes;
