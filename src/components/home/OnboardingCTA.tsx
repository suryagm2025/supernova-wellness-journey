
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const OnboardingCTA: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };
  
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h2 className="text-3xl font-display font-semibold mb-4">Start Your Personalized Wellness Journey</h2>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
        In just a few simple steps, we'll customize your SuperiNova experience 
        to fit your unique wellness goals and preferences.
      </p>
      
      <Button 
        onClick={handleStartOnboarding}
        className="bg-supernova-blue hover:bg-supernova-blue/80 text-lg px-8 py-6 h-auto group"
        size="lg"
      >
        <span>Begin Onboarding</span>
        <ArrowUp className="ml-2 h-5 w-5 transform rotate-45 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default OnboardingCTA;
