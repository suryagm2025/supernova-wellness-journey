
import React from 'react';
import DetailedFeatureCard from './DetailedFeatureCard';
import { Brain, Mic } from 'lucide-react';

const FeatureBreakdownSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-supernova-dark via-supernova-dark/90 to-supernova-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-4">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover how Supernova makes your wellness journey effortless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Routine Engine */}
          <DetailedFeatureCard 
            icon={<Brain className="text-supernova-blue" />}
            title="AI Routine Engine"
            description="Your personal wellness AI that learns and evolves with you each day."
            features={[
              "Adapts routines based on your progress and feedback",
              "Learns your preferences over time",
              "Suggests adjustments for optimal results"
            ]}
            testimonial={{
              quote: "The AI knows me better than I know myself at this point! It's like having a wellness coach who's always on call.",
              author: "Maria",
              role: "42"
            }}
            iconWrapperClass="bg-supernova-blue/20"
            iconClass="text-supernova-blue"
          />

          {/* Voice-First Logging */}
          <DetailedFeatureCard 
            icon={<Mic className="text-supernova-purple" />}
            title="Voice-First Logging"
            description="Simply speak to log your hydration, mood, and meals — no typing needed."
            features={[
              "Natural conversation interface",
              "Works hands-free while cooking or exercising",
              "Perfect for seniors or those with mobility issues"
            ]}
            testimonial={{
              quote: "At 72, typing on my phone is difficult. Being able to just talk to Supernova has been a game-changer.",
              author: "Robert",
              role: "72"
            }}
            iconWrapperClass="bg-supernova-purple/20"
            iconClass="text-supernova-purple"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureBreakdownSection;
