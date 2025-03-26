
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Sun, Salad, Moon, ChevronDown, Flower } from 'lucide-react';
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
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-blue-900/20">
      {/* Particle Background */}
      <ParticleEffect />
      
      {/* Daily Routine Flow Icons */}
      <div className="absolute top-[30%] left-0 right-0 flex justify-around opacity-20 parallax" data-speed="0.2">
        <Sun className="text-yellow-400 w-10 h-10 md:w-14 md:h-14 animate-float" />
        <Salad className="text-green-400 w-10 h-10 md:w-14 md:h-14 animate-float" style={{ animationDelay: '0.5s' }} />
        <Flower className="text-purple-400 w-10 h-10 md:w-14 md:h-14 animate-float" style={{ animationDelay: '1s' }} />
        <Moon className="text-blue-400 w-10 h-10 md:w-14 md:h-14 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Futuristic Dashboard in Background */}
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] opacity-20 parallax" data-speed="0.05">
        <GlassMorphicCard className="p-6 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-20 rounded-lg bg-supernova-blue/30 animate-pulse-glow"></div>
            <div className="h-20 rounded-lg bg-supernova-purple/30 animate-pulse-glow" style={{ animationDelay: '0.7s' }}></div>
            <div className="h-20 rounded-lg bg-supernova-pink/30 animate-pulse-glow" style={{ animationDelay: '1.4s' }}></div>
            <div className="h-20 rounded-lg bg-purple-500/30 animate-pulse-glow" style={{ animationDelay: '0.3s' }}></div>
            <div className="h-20 rounded-lg bg-blue-500/30 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            <div className="h-20 rounded-lg bg-teal-500/30 animate-pulse-glow" style={{ animationDelay: '1.7s' }}></div>
          </div>
        </GlassMorphicCard>
      </div>
    
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="animate-fade-in mb-4 font-display text-4xl md:text-5xl lg:text-6xl drop-shadow-lg">
            Wellness, <span className="text-gradient">Reimagined.</span> AI-Powered. <span className="text-supernova-blue">You-Centered.</span>
          </h1>
          
          <h2 className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in opacity-90 max-w-3xl mx-auto leading-relaxed">
            Track habits, manage moods, and receive personalized suggestions — all with a voice-first, age-friendly design that evolves with you.
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 animate-fade-in mt-8">
            <Link to="/signup">
              <Button className="bg-supernova-dark border border-supernova-blue/30 hover:border-supernova-blue/50 rounded-lg px-8 py-3 text-white font-medium transition-all hover:bg-white/5 min-w-[250px] md:min-w-0">
                🚀 Launch Your Wellness Journey
              </Button>
            </Link>
            <Button variant="outline" className="border-supernova-purple/50 hover:border-supernova-purple text-white hover:bg-supernova-purple/10 rounded-lg px-8 py-3 min-w-[250px] md:min-w-0">
              <Mic className="mr-2 h-5 w-5" /> Try Voice Mode
            </Button>
          </div>
          
          <div className="mt-6 animate-fade-in">
            <p className="text-supernova-blue/80 italic mt-4">
              The Future of Whole-Person Health
            </p>
          </div>
        </div>
      </div>
      
      {/* Avatars representing users */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 opacity-20 mb-24">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500/30 animate-float"></div>
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-500/30 animate-float" style={{ animationDelay: '0.7s' }}></div>
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-teal-500/30 animate-float" style={{ animationDelay: '1.4s' }}></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-white/50" />
      </div>
    </section>
  );
};

export default HeroSection;
