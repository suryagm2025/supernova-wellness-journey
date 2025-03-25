import React, { useState, useEffect } from 'react';
import { Brain, Utensils, Activity, MoonStar, Droplet, RefreshCw } from 'lucide-react';
import HydrationCard from './HydrationCard';
import ListSuggestionCard from './ListSuggestionCard';
import EveningModeToggle from './EveningModeToggle';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import GlassMorphicCard from '../ui/GlassMorphicCard';

type SuggestionType = {
  type: 'hydration' | 'nutrition' | 'activity' | 'sleep' | 'mindfulness';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
};

const WellnessSuggestions: React.FC = () => {
  const [hydrationGoal, setHydrationGoal] = useState('8 glasses');
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const [isHydrationComplete, setIsHydrationComplete] = useState(false);
  const [isEveningMode, setIsEveningMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      setIsLoading(true);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No user logged in');
      }
      
      // Call our edge function to get AI-powered suggestions
      const { data, error } = await supabase.functions.invoke('generate-suggestions', {
        body: { userId: user.id },
      });
      
      if (error) {
        throw error;
      }
      
      // Use AI suggestions if available, otherwise use fallback
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      } else {
        // Fallback to default suggestions
        setSuggestions([
          {
            type: 'hydration',
            title: 'Stay hydrated',
            description: 'Aim to drink 8 glasses of water throughout the day',
            priority: 'high',
          },
          {
            type: 'nutrition',
            title: 'Add more vegetables',
            description: 'Try to include vegetables in at least two meals today',
            priority: 'medium',
          },
          {
            type: 'activity',
            title: 'Take a short walk',
            description: '15-minute walks can boost your energy and mood',
            priority: 'medium',
          },
          {
            type: 'sleep',
            title: 'Consistent sleep schedule',
            description: 'Try to go to bed and wake up at the same time daily',
            priority: 'high',
          },
          {
            type: 'mindfulness',
            title: 'Practice deep breathing',
            description: '5 minutes of deep breathing can reduce stress',
            priority: 'low',
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: "Couldn't load suggestions",
        description: "We'll show you some general recommendations instead",
        duration: 3000,
      });
      
      // Fallback to default suggestions (same as above)
      setSuggestions([
        {
          type: 'hydration',
          title: 'Stay hydrated',
          description: 'Aim to drink 8 glasses of water throughout the day',
          priority: 'high',
        },
        {
          type: 'nutrition',
          title: 'Add more vegetables',
          description: 'Try to include vegetables in at least two meals today',
          priority: 'medium',
        },
        {
          type: 'activity',
          title: 'Take a short walk',
          description: '15-minute walks can boost your energy and mood',
          priority: 'medium',
        },
        {
          type: 'sleep',
          title: 'Consistent sleep schedule',
          description: 'Try to go to bed and wake up at the same time daily',
          priority: 'high',
        },
        {
          type: 'mindfulness',
          title: 'Practice deep breathing',
          description: '5 minutes of deep breathing can reduce stress',
          priority: 'low',
        },
      ]);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSuggestions();
  };

  // Helper function to get the icon for a suggestion type
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'hydration':
        return <Droplet size={20} />;
      case 'nutrition':
        return <Utensils size={20} />;
      case 'activity':
        return <Activity size={20} />;
      case 'sleep':
        return <MoonStar size={20} />;
      case 'mindfulness':
      default:
        return <Brain size={20} />;
    }
  };

  // Filter suggestions by type
  const hydrationSuggestions = suggestions.filter(s => s.type === 'hydration');
  const nutritionSuggestions = suggestions.filter(s => s.type === 'nutrition');
  const activitySuggestions = suggestions.filter(s => s.type === 'activity');
  const sleepSuggestions = suggestions.filter(s => s.type === 'sleep');
  const mindfulnessSuggestions = suggestions.filter(s => s.type === 'mindfulness');

  return (
    <div className="space-y-8">
      {/* Header with refresh button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Your Personalized Suggestions</h2>
        <button 
          onClick={handleRefresh} 
          disabled={refreshing || isLoading}
          className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <GlassMorphicCard key={i} className="p-6 h-64 animate-pulse">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500">Loading suggestions...</span>
              </div>
            </GlassMorphicCard>
          ))}
        </div>
      ) : (
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
          {suggestions.filter(s => 
            s.priority === 'high' && 
            !['hydration', 'nutrition', 'activity', 'sleep', 'mindfulness'].includes(s.type)
          ).length > 0 && (
            <ListSuggestionCard
              title="Important Recommendations"
              icon={<Brain size={20} />}
              items={suggestions
                .filter(s => 
                  s.priority === 'high' && 
                  !['hydration', 'nutrition', 'activity', 'sleep', 'mindfulness'].includes(s.type)
                )
                .map(s => s.description)
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WellnessSuggestions;
