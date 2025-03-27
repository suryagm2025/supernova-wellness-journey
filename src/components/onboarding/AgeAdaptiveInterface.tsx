
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { Clock, VolumeUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AgeAdaptiveInterfaceProps {
  onAgeRangeSelected?: (isSenior: boolean) => void;
  standalone?: boolean;
}

const AgeAdaptiveInterface: React.FC<AgeAdaptiveInterfaceProps> = ({
  onAgeRangeSelected,
  standalone = true
}) => {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectAgeRange = (range: string) => {
    setSelectedRange(range);
  };

  const handleContinue = () => {
    if (!selectedRange) {
      toast({
        title: "Please select an age range",
        description: "This helps us customize your experience",
        variant: "destructive",
      });
      return;
    }

    const isSenior = selectedRange === '60+';
    
    // Store preference in localStorage
    localStorage.setItem('useSeniorMode', isSenior ? 'true' : 'false');
    
    // If callback provided, use it
    if (onAgeRangeSelected) {
      onAgeRangeSelected(isSenior);
      return;
    }

    // Apply UI changes based on age
    if (isSenior) {
      document.documentElement.classList.add('senior-mode');
      toast({
        title: "Senior-friendly mode activated",
        description: "We've adjusted the interface with larger text and simpler navigation",
      });
    }

    // Navigate to next step or home
    navigate('/dashboard');
  };

  return (
    <div className={`max-w-2xl mx-auto ${standalone ? 'py-8' : ''}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold mb-2">One last step to personalize your experience</h2>
        <p className="text-gray-400">Please select your age range:</p>
      </div>

      <div className="space-y-4 mb-8">
        <GlassMorphicCard 
          className={`p-4 cursor-pointer transition-all ${
            selectedRange === 'under60' 
              ? 'ring-2 ring-supernova-blue' 
              : 'hover:bg-white/10'
          }`}
          onClick={() => handleSelectAgeRange('under60')}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${
              selectedRange === 'under60' 
                ? 'bg-supernova-blue/20 text-supernova-blue' 
                : 'bg-white/10 text-gray-300'
            }`}>
              <Clock size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">Under 60</h3>
              <p className="text-sm text-gray-400">Standard interface optimized for your wellness journey</p>
            </div>
          </div>
        </GlassMorphicCard>

        <GlassMorphicCard 
          className={`p-4 cursor-pointer transition-all ${
            selectedRange === '60+' 
              ? 'ring-2 ring-supernova-blue' 
              : 'hover:bg-white/10'
          }`}
          onClick={() => handleSelectAgeRange('60+')}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${
              selectedRange === '60+' 
                ? 'bg-supernova-blue/20 text-supernova-blue' 
                : 'bg-white/10 text-gray-300'
            }`}>
              <VolumeUp size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">60 and above</h3>
              <p className="text-sm text-gray-400">Enhanced accessibility with larger fonts, simpler navigation, and voice features</p>
            </div>
          </div>
        </GlassMorphicCard>
      </div>

      <Button 
        onClick={handleContinue}
        disabled={!selectedRange}
        className="w-full bg-supernova-blue hover:bg-supernova-blue/80"
        size="lg"
      >
        Continue
      </Button>
    </div>
  );
};

export default AgeAdaptiveInterface;
