
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type SuggestionData = {
  meal: string;
  breathwork: string;
  movement: string;
  hydrationTip?: string;
};

export function useSmartSuggestions() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSmartSuggestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError("Please log in to get personalized suggestions");
        return;
      }

      // Get the latest data for the user
      const latestData = await fetchUserWellnessData(user.id);
      
      // Check if we have enough data
      if (!latestData.hasSufficientData) {
        setError("We're missing some data to give you smart advice. Please log your sleep, hydration, or mood for better personalization.");
        return;
      }

      // Get AI-powered suggestions from our edge function
      const { data, error: functionError } = await supabase.functions.invoke('generate-suggestions', {
        body: { 
          userId: user.id,
          wellnessData: latestData
        },
      });
      
      if (functionError) throw functionError;
      
      // Set the suggestions from the AI
      if (data.smartSuggestions) {
        setSuggestions(data.smartSuggestions);
        toast({
          title: "Personalized suggestions ready!",
          description: "We've created recommendations just for you.",
        });
      } else {
        throw new Error("Couldn't generate personalized suggestions");
      }
    } catch (err: any) {
      console.error('Error fetching smart suggestions:', err);
      toast({
        title: "Couldn't generate personalized suggestions",
        description: "We'll try to do better next time",
        variant: "destructive",
      });
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    suggestions,
    error,
    fetchSmartSuggestions
  };
}

// Helper function to fetch user wellness data
const fetchUserWellnessData = async (userId: string) => {
  try {
    // Get recent mood entries
    const { data: moodEntries } = await supabase
      .from('wellness_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'mood')
      .order('created_at', { ascending: false })
      .limit(5);

    // Get recent water entries
    const { data: waterEntries } = await supabase
      .from('water_intake')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get recent sleep entries
    const { data: sleepEntries } = await supabase
      .from('wellness_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'sleep')
      .order('created_at', { ascending: false })
      .limit(5);

    // Determine if we have enough data to make smart suggestions
    const hasSufficientData = !!(moodEntries?.length || waterEntries?.length || sleepEntries?.length);

    return {
      mood: moodEntries || [],
      water: waterEntries || [],
      sleep: sleepEntries || [],
      hasSufficientData
    };
  } catch (error) {
    console.error('Error fetching wellness data:', error);
    return {
      mood: [],
      water: [],
      sleep: [],
      hasSufficientData: false
    };
  }
};

export type { SuggestionData };
