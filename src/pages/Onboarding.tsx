
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import { useAuth } from '@/context/AuthContext';

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if onboarding is already completed
    const isOnboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    
    if (isOnboardingComplete) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  return (
    <Layout hideFooter={true}>
      <div className="container mx-auto px-4">
        <OnboardingFlow />
      </div>
    </Layout>
  );
};

export default Onboarding;
