
import React from 'react';
import { Check, Droplet } from 'lucide-react';
import SuggestionCard from './SuggestionCard';
import { toast } from 'sonner';

interface HydrationCardProps {
  hydrationGoal: string;
  isHydrationComplete: boolean;
  setIsHydrationComplete: (value: boolean) => void;
}

const HydrationCard: React.FC<HydrationCardProps> = ({
  hydrationGoal,
  isHydrationComplete,
  setIsHydrationComplete
}) => {
  const handleHydrationCheck = () => {
    setIsHydrationComplete(true);
    toast.success('Great job on meeting your hydration goal!');
  };

  return (
    <SuggestionCard
      title="Hydration"
      icon={<Droplet size={20} />}
      actionButton={
        <button
          onClick={handleHydrationCheck}
          disabled={isHydrationComplete}
          className={`w-full button-glow rounded-lg px-4 py-2 text-white font-medium transition-all ${
            isHydrationComplete
              ? 'bg-green-500 hover:bg-green-600 cursor-not-allowed'
              : 'bg-supernova-dark border border-supernova-blue/30 hover:bg-white/5 hover:border-supernova-blue/50'
          }`}
        >
          {isHydrationComplete ? (
            <div className="flex items-center justify-center">
              <Check size={16} className="mr-2" />
              Completed
            </div>
          ) : (
            'Mark as Complete'
          )}
        </button>
      }
    >
      <p className="text-gray-400 mb-4">Goal: {hydrationGoal}</p>
    </SuggestionCard>
  );
};

export default HydrationCard;
