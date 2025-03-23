
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Activity, Brain, Smile, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with smooth gradient background */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="animate-fade-in mb-4 font-display">
              Elevate Your Wellness, <span className="text-gradient">Daily.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in">
              Smart routines. Real results. Personalized for your life.
            </p>
            
            <div className="flex justify-center animate-fade-in">
              <Link
                to="/dashboard"
                className="button-glow bg-supernova-dark border border-supernova-blue/30 hover:border-supernova-blue/50 rounded-lg px-8 py-3 text-white font-medium transition-all hover:bg-white/5"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3-Column Feature Section */}
      <section className="py-20 bg-white dark:bg-supernova-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <GlassMorphicCard className="p-8 h-full transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-supernova-blue/10 flex items-center justify-center mb-6">
                    <Activity size={32} className="text-supernova-blue" />
                  </div>
                  <h3 className="text-xl font-display mb-4">Track Wellness</h3>
                  <p className="text-gray-400 mb-6">
                    Monitor your daily habits, nutrition, and activity with intuitive tracking tools.
                  </p>
                  <Link to="/dashboard" className="text-supernova-blue flex items-center text-sm font-medium group">
                    Start tracking <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </GlassMorphicCard>
            </div>
            
            {/* Feature 2 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <GlassMorphicCard className="p-8 h-full transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-supernova-purple/10 flex items-center justify-center mb-6">
                    <Brain size={32} className="text-supernova-purple" />
                  </div>
                  <h3 className="text-xl font-display mb-4">Get AI Insights</h3>
                  <p className="text-gray-400 mb-6">
                    Receive personalized recommendations based on your unique patterns and goals.
                  </p>
                  <Link to="/suggestions" className="text-supernova-purple flex items-center text-sm font-medium group">
                    View insights <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </GlassMorphicCard>
            </div>
            
            {/* Feature 3 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <GlassMorphicCard className="p-8 h-full transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-supernova-pink/10 flex items-center justify-center mb-6">
                    <Smile size={32} className="text-supernova-pink" />
                  </div>
                  <h3 className="text-xl font-display mb-4">Feel Better Daily</h3>
                  <p className="text-gray-400 mb-6">
                    Build healthy habits that compound over time for sustainable wellness improvements.
                  </p>
                  <Link to="/checkin" className="text-supernova-pink flex items-center text-sm font-medium group">
                    Get started <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </GlassMorphicCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-supernova-gradient opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display mb-6">
              Ready to Transform Your <span className="text-gradient">Wellness Journey</span>?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of users who have elevated their wellness with SuperinovaAI's cutting-edge tracking and insights.
            </p>
            <Link
              to="/dashboard"
              className="button-glow inline-block bg-supernova-dark border border-supernova-blue/30 hover:border-supernova-blue/50 rounded-lg px-10 py-4 text-white font-medium transition-all hover:bg-white/5"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
