
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="animate-fade-in mb-4 font-display">
            Your Wellness, <span className="text-gradient">Reinvented by AI.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in">
            Supernova adapts to your body, your rhythm, and your life—in just 3 check-ins a day.
          </p>
          
          <div className="flex justify-center animate-fade-in">
            <Link
              to="/signup"
              className="button-glow bg-supernova-dark border border-supernova-blue/30 hover:border-supernova-blue/50 rounded-lg px-8 py-3 text-white font-medium transition-all hover:bg-white/5"
            >
              Try Supernova Free for 7 Days
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
