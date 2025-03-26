import React from 'react';
import { Link } from 'react-router-dom';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Brain, Mic, BarChart4, LockKeyhole, Users, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const [pricingPlan, setPricingPlan] = useState<'individual' | 'team'>('individual');

  return (
    <div className="min-h-screen">
      {/* Hero Section with smooth gradient background */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="animate-fade-in mb-4 font-display">
              Your Wellness, <span className="text-gradient">Reinvented by AI.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in">
              Supernova adapts to your body, your rhythm, and your life—in just 3 check-ins a day.
            </p>
            
            <div className="flex justify-center animate-fade-in">
              <Link
                to="/signup"
                className="button-glow bg-supernova-dark border border-supernova-blue/30 hover:border-supernova-blue/50 rounded-lg px-8 py-3 text-white font-medium transition-all hover:bg-white/5"
              >
                Try Supernova Free for 7 Days
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Selling Points Section */}
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
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <GlassMorphicCard className="p-8 h-full transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-supernova-blue/10 flex items-center justify-center mb-6">
                    <Clock size={32} className="text-supernova-blue" />
                  </div>
                  <h3 className="text-xl font-display mb-4">Morning–Midday–Evening Flows</h3>
                  <p className="text-gray-400 mb-6">
                    Personalized daily routines that adapt to your schedule and needs.
                  </p>
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
                  <h3 className="text-xl font-display mb-4">AI-Powered Suggestions</h3>
                  <p className="text-gray-400 mb-6">
                    Get personalized recommendations based on your mood, sleep, and activity.
                  </p>
                </div>
              </GlassMorphicCard>
            </div>
            
            {/* Feature 3 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <GlassMorphicCard className="p-8 h-full transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-supernova-pink/10 flex items-center justify-center mb-6">
                    <Mic size={32} className="text-supernova-pink" />
                  </div>
                  <h3 className="text-xl font-display mb-4">Voice-First Interface</h3>
                  <p className="text-gray-400 mb-6">
                    Age-adaptive interface that's perfect for seniors and busy professionals alike.
                  </p>
                </div>
              </GlassMorphicCard>
            </div>
            
            {/* Feature 4 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <GlassMorphicCard className="p-8 h-full transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-supernova-blue/10 flex items-center justify-center mb-6">
                    <BarChart4 size={32} className="text-supernova-blue" />
                  </div>
                  <h3 className="text-xl font-display mb-4">Smart Progress Reports</h3>
                  <p className="text-gray-400 mb-6">
                    Weekly and monthly insights that help you track your wellness journey.
                  </p>
                </div>
              </GlassMorphicCard>
            </div>
            
            {/* Feature 5 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <GlassMorphicCard className="p-8 h-full transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-supernova-purple/10 flex items-center justify-center mb-6">
                    <LockKeyhole size={32} className="text-supernova-purple" />
                  </div>
                  <h3 className="text-xl font-display mb-4">HIPAA-Level Privacy</h3>
                  <p className="text-gray-400 mb-6">
                    You own your data with our enterprise-grade security standards.
                  </p>
                </div>
              </GlassMorphicCard>
            </div>
            
            {/* Feature 6 */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <GlassMorphicCard className="p-8 h-full transition-transform hover:scale-105 duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-supernova-pink/10 flex items-center justify-center mb-6">
                    <Users size={32} className="text-supernova-pink" />
                  </div>
                  <h3 className="text-xl font-display mb-4">Wellness Circles</h3>
                  <p className="text-gray-400 mb-6">
                    Invite-only communities for friends, family, and clients to journey together.
                  </p>
                </div>
              </GlassMorphicCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Breakdown Section */}
      <section className="py-20 bg-gradient-to-br from-supernova-dark via-supernova-dark/90 to-supernova-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4">
              Powerful <span className="text-gradient">Features</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover how Supernova makes your wellness journey effortless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Routine Engine */}
            <GlassMorphicCard className="p-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-supernova-blue/20 flex items-center justify-center">
                    <Brain className="text-supernova-blue" />
                  </div>
                  <h3 className="text-xl font-display">AI Routine Engine</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Your personal wellness AI that learns and evolves with you each day.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-supernova-blue shrink-0 mt-0.5 mr-2" />
                    <span>Adapts routines based on your progress and feedback</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-supernova-blue shrink-0 mt-0.5 mr-2" />
                    <span>Learns your preferences over time</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-supernova-blue shrink-0 mt-0.5 mr-2" />
                    <span>Suggests adjustments for optimal results</span>
                  </li>
                </ul>
                <div className="bg-white/5 p-4 rounded-lg italic text-sm">
                  "The AI knows me better than I know myself at this point! It's like having a wellness coach who's always on call." — Maria, 42
                </div>
              </div>
            </GlassMorphicCard>

            {/* Voice-First Logging */}
            <GlassMorphicCard className="p-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-supernova-purple/20 flex items-center justify-center">
                    <Mic className="text-supernova-purple" />
                  </div>
                  <h3 className="text-xl font-display">Voice-First Logging</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Simply speak to log your hydration, mood, and meals — no typing needed.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-supernova-purple shrink-0 mt-0.5 mr-2" />
                    <span>Natural conversation interface</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-supernova-purple shrink-0 mt-0.5 mr-2" />
                    <span>Works hands-free while cooking or exercising</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-supernova-purple shrink-0 mt-0.5 mr-2" />
                    <span>Perfect for seniors or those with mobility issues</span>
                  </li>
                </ul>
                <div className="bg-white/5 p-4 rounded-lg italic text-sm">
                  "At 72, typing on my phone is difficult. Being able to just talk to Supernova has been a game-changer." — Robert, 72
                </div>
              </div>
            </GlassMorphicCard>

            {/* More features would go here */}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-supernova-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4">
              Real <span className="text-gradient">Results</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hear from our community of wellness enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 - Senior */}
            <div className="animate-fade-in">
              <GlassMorphicCard className="p-8 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <p className="text-xl italic mb-6">
                      "I never thought technology could help with my health at my age. Supernova's voice features make it easy for me to track my medications and stay active without struggling with complicated apps."
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" alt="Senior testimonial" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold">Eleanor, 78</h4>
                      <p className="text-gray-400">Retired Teacher</p>
                    </div>
                  </div>
                </div>
              </GlassMorphicCard>
            </div>
            
            {/* Testimonial 2 - Busy Mom */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <GlassMorphicCard className="p-8 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <p className="text-xl italic mb-6">
                      "Between my kids and my career, I never had time for self-care. Supernova's quick check-ins and personalized recommendations help me stay healthy even on my busiest days."
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" alt="Busy mom testimonial" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold">Jessica, 42</h4>
                      <p className="text-gray-400">Marketing Director & Mom of 3</p>
                    </div>
                  </div>
                </div>
              </GlassMorphicCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* Error Handling Showcase */}
      <section className="py-20 bg-gradient-to-br from-supernova-dark via-supernova-dark/90 to-supernova-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl mb-4">
              User-Friendly <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We've designed Supernova to be helpful even when things don't go as planned.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Error Card 1 */}
            <GlassMorphicCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xl">🌐</span>
                </div>
                <h3 className="font-display">Lost Connection</h3>
              </div>
              <p className="text-gray-300">
                "Looks like you're offline 🌐 – we'll sync your data once you're back!"
              </p>
            </GlassMorphicCard>
            
            {/* Error Card 2 */}
            <GlassMorphicCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xl">🎤</span>
                </div>
                <h3 className="font-display">Voice Input</h3>
              </div>
              <p className="text-gray-300">
                "Hmm, I didn't catch that. Try again or tap to type instead. 🎤⌨️"
              </p>
            </GlassMorphicCard>
            
            {/* Error Card 3 */}
            <GlassMorphicCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-xl">⏱️</span>
                </div>
                <h3 className="font-display">AI Timeout</h3>
              </div>
              <p className="text-gray-300">
                "Something didn't go right on our side 😓 – retrying your suggestion now…"
              </p>
            </GlassMorphicCard>
          </div>
        </div>
      </section>
      
      {/* CTA Section with Plan Toggle */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-supernova-gradient opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display mb-6">
              Ready to Transform Your <span className="text-gradient">Wellness Journey</span>?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of users who have elevated their wellness with Supernova's cutting-edge AI guidance.
            </p>
            
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center bg-white/5 rounded-full p-1">
                <button
                  className={`px-6 py-2 rounded-full transition ${pricingPlan === 'individual' ? 'bg-supernova-blue text-white' : 'text-gray-300'}`}
                  onClick={() => setPricingPlan('individual')}
                >
                  Individual
                </button>
                <button
                  className={`px-6 py-2 rounded-full transition ${pricingPlan === 'team' ? 'bg-supernova-blue text-white' : 'text-gray-300'}`}
                  onClick={() => setPricingPlan('team')}
                >
                  Team License
                </button>
              </div>
            </div>
            
            <div className="glass-panel p-8 mb-8">
              <h3 className="text-2xl font-display mb-4">
                {pricingPlan === 'individual' ? 'Personal Wellness Journey' : 'Team Wellness Program'}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${pricingPlan === 'individual' ? '29' : '49'}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-supernova-blue shrink-0 mt-0.5 mr-2" />
                  <span>Full access to AI-powered wellness routines</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-supernova-blue shrink-0 mt-0.5 mr-2" />
                  <span>Voice-first interface with adaptive UI</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-supernova-blue shrink-0 mt-0.5 mr-2" />
                  <span>Weekly and monthly wellness reports</span>
                </li>
                {pricingPlan === 'team' && (
                  <>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-supernova-blue shrink-0 mt-0.5 mr-2" />
                      <span>Team management dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-supernova-blue shrink-0 mt-0.5 mr-2" />
                      <span>Group challenges and leaderboards</span>
                    </li>
                  </>
                )}
              </ul>
              <Link
                to="/signup"
                className="button-glow inline-block bg-supernova-dark border border-supernova-blue/30 hover:border-supernova-blue/50 rounded-lg px-10 py-4 text-white font-medium transition-all hover:bg-white/5"
              >
                Try Supernova Free for 7 Days
              </Link>
              <p className="text-gray-400 text-sm mt-4">No credit card required</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Removed Footer component from here */}
    </div>
  );
};

export default Index;
