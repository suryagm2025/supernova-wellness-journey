
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import GlassMorphicCard from '../ui/GlassMorphicCard';

export type PricingTier = {
  name: string;
  description: string;
  price: {
    monthly: string;
    yearly: string;
  };
  features: string[];
  cta: string;
  ctaAction?: 'trial' | 'demo' | 'team';
  highlighted?: boolean;
  glowColor: 'blue' | 'purple' | 'pink';
  badge?: string;
};

const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const pricingTiers: PricingTier[] = [
    {
      name: "Free Trial",
      description: "Experience the future of wellness for 7 days",
      price: { 
        monthly: "$0", 
        yearly: "$0" 
      },
      features: [
        "Daily wellness tracking",
        "Morning and evening check-ins",
        "Basic AI recommendations",
        "Voice-first interface",
        "Limited history (7 days)"
      ],
      cta: "Start Free Trial",
      ctaAction: "trial",
      highlighted: false,
      glowColor: "blue",
      badge: "7 Days"
    },
    {
      name: "Individual",
      description: "Your journey, your rhythm, your plan",
      price: { 
        monthly: "$19", 
        yearly: "$190" 
      },
      features: [
        "Everything in Free Trial",
        "Unlimited history",
        "Daily AI wellness coach",
        "Weekly wellness reports",
        "Wellness Circles (up to 5 people)",
        "Premium integrations",
        "Priority support"
      ],
      cta: "Choose Plan",
      highlighted: true,
      glowColor: "purple"
    },
    {
      name: "Team",
      description: "Perfect for coaches and small teams",
      price: { 
        monthly: "$49", 
        yearly: "$490" 
      },
      features: [
        "Everything in Individual",
        "Team dashboard",
        "Group challenges",
        "Progress tracking for teams",
        "Coach/admin controls",
        "Custom reporting",
        "Team onboarding support"
      ],
      cta: "See Team Plans",
      ctaAction: "team",
      highlighted: false,
      glowColor: "pink"
    },
    {
      name: "Enterprise",
      description: "HIPAA-ready solution for organizations",
      price: { 
        monthly: "Custom", 
        yearly: "Custom" 
      },
      features: [
        "Everything in Team plan",
        "HIPAA compliance",
        "Custom integrations",
        "White labeling options",
        "Dedicated account manager",
        "Enterprise API access",
        "On-site training available"
      ],
      cta: "Book a Demo",
      ctaAction: "demo",
      highlighted: false,
      glowColor: "blue"
    }
  ];
  
  const handlePlanAction = (action?: 'trial' | 'demo' | 'team') => {
    // In a real app, these would navigate or open modals
    console.log(`Selected action: ${action || 'default'}`);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl mb-4">
            Choose Your <span className="text-gradient">Wellness Journey</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Built for one—you. And also your team, if you want them on board.
          </p>
          
          <div className="flex items-center justify-center mt-8 space-x-4">
            <span className={`text-lg ${!isYearly ? 'text-white font-semibold' : 'text-gray-400'}`}>Monthly</span>
            <Switch 
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={`text-lg flex items-center ${isYearly ? 'text-white font-semibold' : 'text-gray-400'}`}>
              Yearly
              <span className="ml-2 text-xs font-normal bg-supernova-blue/20 text-supernova-blue px-2 py-1 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`flex ${tier.highlighted ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              <GlassMorphicCard 
                className={`p-6 flex flex-col h-full w-full ${tier.highlighted ? 'border-supernova-purple/50' : ''}`}
                glowColor={tier.glowColor}
                hoverEffect={true}
              >
                {tier.badge && (
                  <Badge className="self-start mb-2 bg-supernova-blue/10 text-supernova-blue border-supernova-blue/20">
                    {tier.badge}
                  </Badge>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-display mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-display font-bold">
                      {isYearly ? tier.price.yearly : tier.price.monthly}
                    </span>
                    {tier.price.monthly !== "Custom" && (
                      <span className="text-gray-400 ml-2">
                        {isYearly ? '/year' : '/month'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-supernova-blue mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full ${tier.highlighted ? 'bg-supernova-purple hover:bg-supernova-purple/90' : ''}`}
                  variant={tier.highlighted ? 'default' : 'outline'}
                  onClick={() => handlePlanAction(tier.ctaAction)}
                >
                  {tier.cta}
                </Button>
                
                {tier.highlighted && (
                  <p className="text-center text-supernova-purple text-xs mt-4">
                    Most popular choice
                  </p>
                )}
              </GlassMorphicCard>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-display mb-4">Have Questions?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our wellness experts are ready to help you find the perfect plan for your wellness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="px-8">
              Contact Sales
            </Button>
            <Button variant="outline" className="px-8">
              View FAQ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
