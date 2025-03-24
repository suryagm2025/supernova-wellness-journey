
import React from 'react';
import Layout from '@/components/layout/Layout';
import PricingSection from '@/components/sections/PricingSection';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Programs = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Supernova <span className="text-gradient">Wellness Programs</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Discover personalized wellness programs designed to fit your unique needs and lifestyle.
            Whether you're focused on energy, sleep, calm, movement, or nutrition, we have a program for you.
          </p>
          <Button className="px-6 group">
            Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="mb-20">
          <PricingSection />
        </div>
        
        <div className="glass-panel p-8 text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-2xl font-display mb-4">Coming Soon: Specialized Programs</h2>
          <p className="text-gray-300 mb-6">
            We're developing targeted wellness programs for specific needs and goals. 
            Sign up to be notified when they launch.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-display mb-2">Sleep Optimization</h3>
              <p className="text-sm text-gray-400">
                AI-powered sleep tracking and recommendations for better rest.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-display mb-2">Stress Management</h3>
              <p className="text-sm text-gray-400">
                Personalized techniques to reduce stress and improve mental wellness.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-display mb-2">Active Aging</h3>
              <p className="text-sm text-gray-400">
                Specially designed for seniors to maintain vitality and independence.
              </p>
            </div>
          </div>
          <Button variant="outline">
            Join Waitlist
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Programs;
