import React from 'react';
import { Brain, MoonStar, Activity, Utensils, Droplet } from 'lucide-react';
import HydrationCard from './HydrationCard';
import ListSuggestionCard from './ListSuggestionCard';
import EveningModeToggle from './EveningModeToggle';

type SuggestionType = {
  type: 'hydration' | 'nutrition' | 'activity' | 'sleep' | 'mindfulness';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
};

interface SuggestionsGridProps {
  suggestions: SuggestionType[];
  hydrationGoal: string;
  isHydrationComplete: boolean;
  setIsHydrationComplete: (value: boolean) => void;
  isEveningMode: boolean;
  setIsEveningMode: (value: boolean) => void;
}

const SuggestionsGrid: React.FC<SuggestionsGridProps> = ({
  suggestions,
  hydrationGoal,
  isHydrationComplete,
  setIsHydrationComplete,
  isEveningMode,
  setIsEveningMode
}) => {
  // Filter suggestions by type
  const nutritionSuggestions = suggestions.filter(s => s.type === 'nutrition');
  const activitySuggestions = suggestions.filter(s => s.type === 'activity');
  const sleepSuggestions = suggestions.filter(s => s.type === 'sleep');
  const mindfulnessSuggestions = suggestions.filter(s => s.type === 'mindfulness');
  
  // High priority suggestions that don't fit in the categories above
  const otherHighPrioritySuggestions = suggestions.filter(s => 
    s.priority === 'high' && 
    !['hydration', 'nutrition', 'activity', 'sleep', 'mindfulness'].includes(s.type)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Hydration card is special, so we keep it separate */}
      <HydrationCard 
        hydrationGoal={hydrationGoal}
        isHydrationComplete={isHydrationComplete}
        setIsHydrationComplete={setIsHydrationComplete}
      />
      
      {/* Other suggestion cards, grouped by type */}
      {nutritionSuggestions.length > 0 && (
        <ListSuggestionCard
          title="Nutrition"
          icon={<Utensils size={20} />}
          items={nutritionSuggestions.map(s => s.description)}
        />
      )}
      
      {activitySuggestions.length > 0 && (
        <ListSuggestionCard
          title="Activity"
          icon={<Activity size={20} />}
          items={activitySuggestions.map(s => s.description)}
        />
      )}
      
      {sleepSuggestions.length > 0 && (
        <ListSuggestionCard
          title="Sleep Hygiene"
          icon={<MoonStar size={20} />}
          items={sleepSuggestions.map(s => s.description)}
          actionButton={
            <EveningModeToggle 
              isEveningMode={isEveningMode}
              setIsEveningMode={setIsEveningMode}
            />
          }
        />
      )}
      
      {mindfulnessSuggestions.length > 0 && (
        <ListSuggestionCard
          title="Mindfulness"
          icon={<Brain size={20} />}
          items={mindfulnessSuggestions.map(s => s.description)}
        />
      )}
      
      {/* If we have any high priority suggestions that don't fit in the categories above, show them */}
      {otherHighPrioritySuggestions.length > 0 && (
        <ListSuggestionCard
          title="Important Recommendations"
          icon={<Brain size={20} />}
          items={otherHighPrioritySuggestions.map(s => s.description)}
        />
      )}
    </div>
  );
};

export default SuggestionsGrid;
