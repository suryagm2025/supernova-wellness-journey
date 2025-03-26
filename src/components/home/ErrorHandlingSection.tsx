
import React from 'react';
import ErrorCard from './ErrorCard';

const ErrorHandlingSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-supernova-dark via-supernova-dark/90 to-supernova-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-4">
            User-Friendly <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We've designed Supernova to be helpful even when things don't go as planned.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <ErrorCard
            icon="🌐"
            title="Lost Connection"
            message="Looks like you're offline 🌐 – we'll sync your data once you're back!"
          />
          
          <ErrorCard
            icon="🎤"
            title="Voice Input"
            message="Hmm, I didn't catch that. Try again or tap to type instead. 🎤⌨️"
          />
          
          <ErrorCard
            icon="⏱️"
            title="AI Timeout"
            message="Something didn't go right on our side 😓 – retrying your suggestion now…"
          />
        </div>
      </div>
    </section>
  );
};

export default ErrorHandlingSection;
