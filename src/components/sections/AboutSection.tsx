
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';

const AboutSection: React.FC = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="font-display text-4xl mb-8 leading-tight">
              About <span className="text-gradient">SuperNova</span>
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif mb-4 text-supernova-blue">Our Mission</h3>
                <p className="text-gray-300 font-serif leading-relaxed">
                  At SuperNova, we're dedicated to empowering individuals on their journey toward holistic wellness. 
                  We combine cutting-edge AI technology with evidence-based wellness practices to create personalized 
                  experiences that adapt to your unique needs and goals.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-serif mb-4 text-supernova-purple">Our Vision</h3>
                <p className="text-gray-300 font-serif leading-relaxed">
                  We envision a world where technology enhances human wellness rather than detracting from it. 
                  SuperNova aims to be the bridge between technological innovation and natural well-being, 
                  helping you create sustainable habits that lead to lasting health and happiness.
                </p>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <GlassMorphicCard className="p-4 h-full">
              <img 
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80" 
                alt="Person meditating in nature" 
                className="w-full h-full object-cover rounded-lg" 
              />
            </GlassMorphicCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
