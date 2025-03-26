
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import SellingPointsSection from '../components/home/SellingPointsSection';
import FeatureBreakdownSection from '../components/home/FeatureBreakdownSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ErrorHandlingSection from '../components/home/ErrorHandlingSection';
import PricingSection from '../components/home/PricingSection';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Homepage Sections */}
        <HeroSection />
        <SellingPointsSection />
        <FeatureBreakdownSection />
        <TestimonialsSection />
        <ErrorHandlingSection />
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
