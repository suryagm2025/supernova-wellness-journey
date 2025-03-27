
import React, { useState } from 'react';
import { UserType } from '@/types/userTypes';
import UserTypeSelector from './UserTypeSelector';
import AgeAdaptiveInterface from './AgeAdaptiveInterface';

type OnboardingStep = 'user-type' | 'age-range' | 'complete';

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('user-type');
  const [userType, setUserType] = useState<UserType | null>(null);
  
  const handleUserTypeSelected = (type: UserType) => {
    setUserType(type);
    setCurrentStep('age-range');
  };
  
  const handleAgeRangeSelected = (isSenior: boolean) => {
    // Save complete onboarding flag
    localStorage.setItem('onboardingComplete', 'true');
    setCurrentStep('complete');
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      {currentStep === 'user-type' && (
        <UserTypeSelector 
          onUserTypeSelected={handleUserTypeSelected} 
          standalone={false}
        />
      )}
      
      {currentStep === 'age-range' && (
        <AgeAdaptiveInterface 
          onAgeRangeSelected={handleAgeRangeSelected}
          standalone={false}
        />
      )}
      
      {currentStep === 'complete' && (
        <div className="text-center">
          <h2 className="text-2xl font-display font-semibold mb-4">You're all set!</h2>
          <p className="text-gray-400 mb-6">
            Your personalized wellness journey is ready. Let's get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;
