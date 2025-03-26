
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type SuggestionType = {
  type: 'hydration' | 'nutrition' | 'activity' | 'sleep' | 'mindfulness';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
};

export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

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
        setSuggestions(getDefaultSuggestions());
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: "Couldn't load suggestions",
        description: "We'll show you some general recommendations instead",
        duration: 3000,
      });
      
      // Fallback to default suggestions
      setSuggestions(getDefaultSuggestions());
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSuggestions();
  };

  return { suggestions, isLoading, refreshing, handleRefresh };
};

// Helper function to get default suggestions
const getDefaultSuggestions = (): SuggestionType[] => {
  return [
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
  ];
};
