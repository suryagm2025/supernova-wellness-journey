
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import SellingPointsSection from '../components/home/SellingPointsSection';
import FeatureBreakdownSection from '../components/home/FeatureBreakdownSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ErrorHandlingSection from '../components/home/ErrorHandlingSection';
import PricingSection from '../components/home/PricingSection';
import OnboardingCTA from '../components/home/OnboardingCTA';
import Layout from '@/components/layout/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen pt-20">
        {/* Homepage Sections */}
        <HeroSection />
        <OnboardingCTA />
        <SellingPointsSection />
        <FeatureBreakdownSection />
        <TestimonialsSection />
        <ErrorHandlingSection />
        <PricingSection />
      </div>
    </Layout>
  );
};

export default Home;
