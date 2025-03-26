
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Sun, Leaf, Moon, ChevronDown, Flower2 } from 'lucide-react';
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
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#F0F7F4] via-[#E6EEE9] to-[#F4F1E6] dark:from-[#1a1f1d] dark:via-[#1a1f1d] dark:to-[#1f1d1a]">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5" />
      <ParticleEffect />
      
      {/* Digital Mandala */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-96 h-96 rounded-full border border-green-200/20 animate-ripple" />
        <div className="w-96 h-96 rounded-full border border-green-200/20 animate-ripple" style={{ animationDelay: '1s' }} />
        <div className="w-96 h-96 rounded-full border border-green-200/20 animate-ripple" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Nature Icons Flow */}
      <div className="absolute top-[30%] left-0 right-0 flex justify-around opacity-30 parallax" data-speed="0.2">
        <Sun className="text-amber-400 w-10 h-10 md:w-14 md:h-14 animate-float-soft" />
        <Leaf className="text-green-400 w-10 h-10 md:w-14 md:h-14 animate-float-soft" style={{ animationDelay: '0.5s' }} />
        <Flower2 className="text-purple-400 w-10 h-10 md:w-14 md:h-14 animate-float-soft" style={{ animationDelay: '1s' }} />
        <Moon className="text-blue-400 w-10 h-10 md:w-14 md:h-14 animate-float-soft" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Wellness Metrics Cards */}
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[70%] opacity-20 parallax" data-speed="0.05">
        <GlassMorphicCard className="p-6 rounded-2xl backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-20 rounded-lg bg-green-500/20 animate-pulse-glow"></div>
            <div className="h-20 rounded-lg bg-amber-500/20 animate-pulse-glow" style={{ animationDelay: '0.7s' }}></div>
            <div className="h-20 rounded-lg bg-purple-500/20 animate-pulse-glow" style={{ animationDelay: '1.4s' }}></div>
            <div className="h-20 rounded-lg bg-blue-500/20 animate-pulse-glow" style={{ animationDelay: '0.3s' }}></div>
            <div className="h-20 rounded-lg bg-teal-500/20 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            <div className="h-20 rounded-lg bg-indigo-500/20 animate-pulse-glow" style={{ animationDelay: '1.7s' }}></div>
          </div>
        </GlassMorphicCard>
      </div>
    
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="animate-fade-in mb-6 font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-800 dark:text-white leading-tight">
            Where Inner Balance Meets <span className="text-gradient bg-gradient-to-r from-green-600 via-amber-500 to-purple-600 bg-clip-text text-transparent">Intelligent Design</span>
          </h1>
          
          <h2 className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in opacity-90 max-w-3xl mx-auto leading-relaxed font-light">
            A mindful AI-powered wellness tracker that flows with your day — from sunrise to starlight.
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 animate-fade-in mt-8">
            <Link to="/signup">
              <Button className="bg-green-600/90 hover:bg-green-600 text-white border border-green-500/30 hover:border-green-500/50 rounded-lg px-8 py-3 font-medium transition-all hover:shadow-lg min-w-[250px] md:min-w-0">
                🌿 Begin My Journey
              </Button>
            </Link>
            <Button variant="outline" className="border-purple-500/50 hover:border-purple-500 text-gray-700 dark:text-white hover:bg-purple-500/10 rounded-lg px-8 py-3 min-w-[250px] md:min-w-0 group">
              <span className="relative">
                ✨ See Wellness in Motion
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </span>
            </Button>
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
