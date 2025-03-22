
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Activity, Droplet, Clock, Moon, Utensils, Brain, ChevronRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const orbitRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the cosmic elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      const planets = orbitRef.current.querySelectorAll('.planet');
      planets.forEach((planet) => {
        const speed = parseFloat((planet as HTMLElement).dataset.speed || '1');
        (planet as HTMLElement).style.transform = `translate(${x * 30 * speed}px, ${y * 30 * speed}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div ref={orbitRef} className="absolute inset-0 overflow-hidden">
          <div className="planet absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-gradient-to-br from-supernova-blue to-supernova-purple opacity-20 blur-xl animate-pulse-glow" data-speed="1.5"></div>
          <div className="planet absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full bg-gradient-to-br from-supernova-purple to-supernova-pink opacity-20 blur-xl animate-pulse-glow" data-speed="2"></div>
          <div className="planet absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-gradient-to-br from-supernova-pink to-supernova-blue opacity-20 blur-xl animate-pulse-glow" data-speed="1"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="animate-fade-in mb-4 font-display">
              Elevate Your Wellness Journey with <span className="text-gradient">SuperinovaAI</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 animate-fade-in">
              The most advanced AI-powered wellness tracker designed to help you understand your body, optimize your health, and achieve your wellness goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link
                to="/dashboard"
                className="button-glow bg-supernova-dark border border-supernova-blue/30 hover:border-supernova-blue/50 rounded-lg px-8 py-3 text-white font-medium transition-all hover:bg-white/5"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border border-white/20 hover:border-white/40 rounded-lg text-white transition-all hover:bg-white/5"
              >
                Learn More
              </Link>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                <GlassMorphicCard className="p-6 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-supernova-blue/20 flex items-center justify-center mb-4">
                      <Activity size={24} className="text-supernova-blue" />
                    </div>
                    <h3 className="text-lg font-display mb-2">Smart Tracking</h3>
                    <p className="text-gray-400 text-sm">
                      Effortlessly track your daily activities, water intake, meals, and sleep patterns.
                    </p>
                  </div>
                </GlassMorphicCard>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <GlassMorphicCard className="p-6 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-supernova-purple/20 flex items-center justify-center mb-4">
                      <Brain size={24} className="text-supernova-purple" />
                    </div>
                    <h3 className="text-lg font-display mb-2">AI Insights</h3>
                    <p className="text-gray-400 text-sm">
                      Receive personalized recommendations based on your patterns and goals.
                    </p>
                  </div>
                </GlassMorphicCard>
              </div>
              
              <div className="animate-fade-in-right" style={{ animationDelay: '0.6s' }}>
                <GlassMorphicCard className="p-6 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-supernova-pink/20 flex items-center justify-center mb-4">
                      <CheckCircle size={24} className="text-supernova-pink" />
                    </div>
                    <h3 className="text-lg font-display mb-2">Daily Check-ins</h3>
                    <p className="text-gray-400 text-sm">
                      Start and end your day right with guided check-ins that build healthy habits.
                    </p>
                  </div>
                </GlassMorphicCard>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display mb-4">Advanced <span className="text-gradient">Wellness Tracking</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              SuperinovaAI offers a comprehensive suite of tools to monitor every aspect of your wellness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <GlassMorphicCard glowColor="blue" className="p-6 h-full">
                <div className="mb-4 text-supernova-blue">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Morning Check-In</h3>
                <p className="text-gray-400 mb-4">
                  Start your day strong with a quick morning check-in to set intentions and track your morning routine.
                </p>
                <Link to="/checkin" className="text-supernova-blue flex items-center text-sm font-medium">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </GlassMorphicCard>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <GlassMorphicCard glowColor="purple" className="p-6 h-full">
                <div className="mb-4 text-supernova-purple">
                  <Droplet size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Water Intake</h3>
                <p className="text-gray-400 mb-4">
                  Track your hydration levels throughout the day and receive reminders to drink more water.
                </p>
                <Link to="/water" className="text-supernova-purple flex items-center text-sm font-medium">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </GlassMorphicCard>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <GlassMorphicCard glowColor="pink" className="p-6 h-full">
                <div className="mb-4 text-supernova-pink">
                  <Utensils size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Meal Logging</h3>
                <p className="text-gray-400 mb-4">
                  Log your meals with ease and get nutritional insights and personalized recommendations.
                </p>
                <Link to="/meals" className="text-supernova-pink flex items-center text-sm font-medium">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </GlassMorphicCard>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <GlassMorphicCard glowColor="blue" className="p-6 h-full">
                <div className="mb-4 text-supernova-blue">
                  <Activity size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Activity Tracker</h3>
                <p className="text-gray-400 mb-4">
                  Monitor your daily movements, workouts, and get personalized activity suggestions.
                </p>
                <Link to="/activity" className="text-supernova-blue flex items-center text-sm font-medium">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </GlassMorphicCard>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <GlassMorphicCard glowColor="purple" className="p-6 h-full">
                <div className="mb-4 text-supernova-purple">
                  <Moon size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">Evening Check-In</h3>
                <p className="text-gray-400 mb-4">
                  Reflect on your day, plan for tomorrow, and set yourself up for a restful night's sleep.
                </p>
                <Link to="/evening" className="text-supernova-purple flex items-center text-sm font-medium">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </GlassMorphicCard>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <GlassMorphicCard glowColor="pink" className="p-6 h-full">
                <div className="mb-4 text-supernova-pink">
                  <Brain size={32} />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">AI Suggestions</h3>
                <p className="text-gray-400 mb-4">
                  Get personalized wellness suggestions based on your data and progress.
                </p>
                <Link to="/suggestions" className="text-supernova-pink flex items-center text-sm font-medium">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
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
