
import React, { useState } from 'react';
import { Brain, Utensils, Activity, MoonStar } from 'lucide-react';
import HydrationCard from './HydrationCard';
import ListSuggestionCard from './ListSuggestionCard';
import EveningModeToggle from './EveningModeToggle';

const WellnessSuggestions: React.FC = () => {
  const [hydrationGoal, setHydrationGoal] = useState('8 glasses');
  const [mealSuggestions, setMealSuggestions] = useState([
    'Grilled Chicken Salad',
    'Salmon with Roasted Vegetables',
  ]);
  const [activitySuggestions, setActivitySuggestions] = useState([
    '30-minute brisk walk',
    'Yoga session',
  ]);
  const [sleepHygiene, setSleepHygiene] = useState([
    'Maintain a consistent sleep schedule',
    'Create a relaxing bedtime routine',
  ]);
  const [mindfulnessPractices, setMindfulnessPractices] = useState([
    '5-minute meditation',
    'Deep breathing exercises',
  ]);
  const [isHydrationComplete, setIsHydrationComplete] = useState(false);
  const [isEveningMode, setIsEveningMode] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <HydrationCard 
        hydrationGoal={hydrationGoal}
        isHydrationComplete={isHydrationComplete}
        setIsHydrationComplete={setIsHydrationComplete}
      />
      
      <ListSuggestionCard
        title="Meal Suggestions"
        icon={<Utensils size={20} />}
        items={mealSuggestions}
      />
      
      <ListSuggestionCard
        title="Activity"
        icon={<Activity size={20} />}
        items={activitySuggestions}
      />
      
      <ListSuggestionCard
        title="Sleep Hygiene"
        icon={<MoonStar size={20} />}
        items={sleepHygiene}
        actionButton={
          <EveningModeToggle 
            isEveningMode={isEveningMode}
            setIsEveningMode={setIsEveningMode}
          />
        }
      />
      
      <ListSuggestionCard
        title="Mindfulness"
        icon={<Brain size={20} />}
        items={mindfulnessPractices}
      />
    </div>
  );
};

export default WellnessSuggestions;
