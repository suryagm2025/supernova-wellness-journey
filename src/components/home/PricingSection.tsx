
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PricingSection = () => {
  const [pricingPlan, setPricingPlan] = useState<'individual' | 'team'>('individual');

  return (
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
  );
};

export default PricingSection;
