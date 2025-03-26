
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import SellingPointsSection from '../components/home/SellingPointsSection';
import FeatureBreakdownSection from '../components/home/FeatureBreakdownSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ErrorHandlingSection from '../components/home/ErrorHandlingSection';
import PricingSection from '../components/home/PricingSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Homepage Sections */}
      <HeroSection />
      <SellingPointsSection />
      <FeatureBreakdownSection />
      <TestimonialsSection />
      <ErrorHandlingSection />
      <PricingSection />
    </div>
  );
};

export default Index;
