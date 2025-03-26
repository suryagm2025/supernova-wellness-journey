
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mic, BarChart, Activity, Droplet, TrendingUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import ParticleEffect from '@/components/ui/ParticleEffect';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const elements = heroRef.current.querySelectorAll('.parallax');
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        element.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-supernova-dark to-[#151826]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-cosmic-grid opacity-10" />
      <ParticleEffect />
      
      {/* Data Visualization Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full border border-supernova-blue/20 animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-supernova-purple/20 animate-pulse-glow" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-supernova-pink/20 animate-pulse-glow" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>
      
      {/* Floating Data Metrics */}
      <div className="absolute top-[30%] left-0 right-0 flex justify-around opacity-20 parallax" data-speed="0.2">
        <BarChart className="text-supernova-blue w-12 h-12 animate-float" />
        <Activity className="text-supernova-purple w-12 h-12 animate-float" style={{ animationDelay: '0.5s' }} />
        <Droplet className="text-supernova-blue w-12 h-12 animate-float" style={{ animationDelay: '1s' }} />
        <TrendingUp className="text-supernova-pink w-12 h-12 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Floating Dashboard Cards */}
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[60%] opacity-30 parallax" data-speed="0.05">
        <GlassMorphicCard className="p-4 rounded-2xl backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-16 rounded-lg bg-supernova-blue/20 animate-pulse-glow"></div>
            <div className="h-16 rounded-lg bg-supernova-purple/20 animate-pulse-glow" style={{ animationDelay: '0.7s' }}></div>
            <div className="h-16 rounded-lg bg-supernova-pink/20 animate-pulse-glow" style={{ animationDelay: '1.4s' }}></div>
            <div className="h-16 rounded-lg bg-supernova-blue/20 animate-pulse-glow" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </GlassMorphicCard>
      </div>
    
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="animate-fade-in mb-4 text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            Track. <span className="text-supernova-blue">Optimize.</span> <span className="text-supernova-purple">Thrive.</span>
          </h1>
          
          <h2 className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in opacity-90 max-w-2xl mx-auto leading-relaxed">
            From voice check-ins to emotion-based insights — your smart wellness dashboard evolves with you.
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 animate-fade-in mt-8">
            <Link to="/dashboard">
              <Button className="bg-supernova-blue hover:bg-supernova-blue/90 text-white rounded-lg px-8 py-3 font-medium transition-all hover:shadow-glow-blue min-w-[250px] md:min-w-0 flex gap-2 items-center">
                <BarChart className="w-5 h-5" /> See My Wellness Stats
              </Button>
            </Link>
            <Link to="/check-in">
              <Button variant="outline" className="border-supernova-purple hover:border-supernova-purple text-white hover:bg-supernova-purple/10 rounded-lg px-8 py-3 min-w-[250px] md:min-w-0 group flex gap-2 items-center hover:shadow-glow-purple">
                <Mic className="w-5 h-5" /> Try Smart Check-In
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-gray-400" />
      </div>
    </section>
  );
};

export default HeroSection;
