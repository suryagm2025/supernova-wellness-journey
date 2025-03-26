
import React from 'react';
import FeatureCard from './FeatureCard';
import { Clock, Brain, Mic, BarChart4, LockKeyhole, Users } from 'lucide-react';

const SellingPointsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-supernova-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-4">
            Why Choose <span className="text-gradient">Supernova</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform makes wellness simple, personalized, and effective.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <FeatureCard
            icon={<Clock size={32} className="text-supernova-blue" />}
            title="Morning–Midday–Evening Flows"
            description="Personalized daily routines that adapt to your schedule and needs."
            delay="0.1s"
          />
          
          {/* Feature 2 */}
          <FeatureCard
            icon={<Brain size={32} className="text-supernova-purple" />}
            title="AI-Powered Suggestions"
            description="Get personalized recommendations based on your mood, sleep, and activity."
            delay="0.2s"
            iconBgClass="bg-supernova-purple/10"
            iconTextClass="text-supernova-purple"
          />
          
          {/* Feature 3 */}
          <FeatureCard
            icon={<Mic size={32} className="text-supernova-pink" />}
            title="Voice-First Interface"
            description="Age-adaptive interface that's perfect for seniors and busy professionals alike."
            delay="0.3s"
            iconBgClass="bg-supernova-pink/10"
            iconTextClass="text-supernova-pink"
          />
          
          {/* Feature 4 */}
          <FeatureCard
            icon={<BarChart4 size={32} className="text-supernova-blue" />}
            title="Smart Progress Reports"
            description="Weekly and monthly insights that help you track your wellness journey."
            delay="0.4s"
          />
          
          {/* Feature 5 */}
          <FeatureCard
            icon={<LockKeyhole size={32} className="text-supernova-purple" />}
            title="HIPAA-Level Privacy"
            description="You own your data with our enterprise-grade security standards."
            delay="0.5s"
            iconBgClass="bg-supernova-purple/10"
            iconTextClass="text-supernova-purple"
          />
          
          {/* Feature 6 */}
          <FeatureCard
            icon={<Users size={32} className="text-supernova-pink" />}
            title="Wellness Circles"
            description="Invite-only communities for friends, family, and clients to journey together."
            delay="0.6s"
            iconBgClass="bg-supernova-pink/10"
            iconTextClass="text-supernova-pink"
          />
        </div>
      </div>
    </section>
  );
};

export default SellingPointsSection;
