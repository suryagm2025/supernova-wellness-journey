
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import GlassMorphicCard from '../ui/GlassMorphicCard';

const PricingTable: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const pricingTiers = [
    {
      name: "Free",
      price: { monthly: "$0", yearly: "$0" },
      description: "Basic tracking for wellness essentials",
      features: [
        "Daily wellness tracking",
        "Basic hydration reminders",
        "Simple meal logging",
        "Community access"
      ],
      cta: "Get Started",
      glowColor: "blue" as const,
      highlighted: false
    },
    {
      name: "Pro",
      price: { monthly: "$9.99", yearly: "$99" },
      description: "Smart suggestions for improved wellness",
      features: [
        "Everything in Free",
        "AI wellness suggestions",
        "Advanced analytics",
        "Unlimited history",
        "Priority support"
      ],
      cta: "Upgrade to Pro",
      glowColor: "purple" as const,
      highlighted: true
    },
    {
      name: "Elite",
      price: { monthly: "$19.99", yearly: "$199" },
      description: "Full AI coaching and premium features",
      features: [
        "Everything in Pro",
        "Personalized AI coaching",
        "Custom wellness plans",
        "Wellness research insights",
        "Integration with all health apps",
        "1-on-1 support"
      ],
      cta: "Go Elite",
      glowColor: "pink" as const,
      highlighted: false
    }
  ];

  return (
    <div className="py-12">
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center space-x-4 mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {pricingTiers.map((tier, index) => (
          <div key={index} className={`flex ${tier.highlighted ? 'md:-mt-4' : ''}`}>
            <GlassMorphicCard 
              className={`p-8 flex flex-col h-full w-full ${tier.highlighted ? 'border-supernova-purple/50' : ''}`}
              glowColor={tier.glowColor}
              hoverEffect={true}
            >
              <div className="mb-6">
                <h3 className="text-xl font-display mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-display font-bold">
                    {isYearly ? tier.price.yearly : tier.price.monthly}
                  </span>
                  <span className="text-gray-400 ml-2">
                    {isYearly ? '/year' : '/month'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{tier.description}</p>
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
    </div>
  );
};

export default PricingTable;
