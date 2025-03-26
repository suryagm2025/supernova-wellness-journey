
import React, { useState } from 'react';
import { Sparkles, Coffee, Wind, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import GlassMorphicCard from '../ui/GlassMorphicCard';

const SmartSuggestions: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    meal: string;
    breathwork: string;
    movement: string;
    hydrationTip?: string;
  } | null>(null);
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

  return (
    <GlassMorphicCard className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-display font-semibold mb-2 flex items-center">
          <Sparkles size={20} className="mr-2 text-supernova-blue" />
          AI-Powered Smart Suggestions
        </h3>
        <p className="text-gray-400 text-sm">
          Get personalized wellness recommendations based on your recent mood, hydration, and sleep data.
        </p>
      </div>

      {!suggestions && !isLoading && !error && (
        <div className="mb-6">
          <Button 
            onClick={fetchSmartSuggestions} 
            className="w-full"
          >
            <Sparkles size={16} className="mr-2" />
            Get Today's Wellness Suggestion
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="w-full h-16 bg-white/5" />
          <Skeleton className="w-full h-16 bg-white/5" />
          <Skeleton className="w-full h-16 bg-white/5" />
        </div>
      )}

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-4">
          <p className="text-sm text-white">{error}</p>
          <Button 
            variant="outline" 
            className="mt-3 w-full" 
            onClick={fetchSmartSuggestions}
          >
            Try Again
          </Button>
        </div>
      )}

      {suggestions && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-start mb-2">
              <Coffee size={18} className="mr-2 text-supernova-pink mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Meal Suggestion</h4>
                <p className="text-gray-300">{suggestions.meal}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-start mb-2">
              <Wind size={18} className="mr-2 text-supernova-blue mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Breathwork</h4>
                <p className="text-gray-300">{suggestions.breathwork}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-start mb-2">
              <Activity size={18} className="mr-2 text-supernova-purple mt-0.5" />
              <div>
                <h4 className="font-medium text-white">Movement</h4>
                <p className="text-gray-300">{suggestions.movement}</p>
              </div>
            </div>
          </div>
          
          {suggestions.hydrationTip && (
            <div className="p-4 rounded-lg bg-supernova-blue/10 border border-supernova-blue/30 mt-4">
              <h4 className="font-medium text-white mb-1">Bonus Hydration Tip</h4>
              <p className="text-gray-300">{suggestions.hydrationTip}</p>
            </div>
          )}
          
          <Button 
            onClick={fetchSmartSuggestions} 
            variant="outline" 
            className="w-full mt-2"
          >
            <Sparkles size={16} className="mr-2" />
            Refresh Suggestions
          </Button>
        </div>
      )}
    </GlassMorphicCard>
  );
};

export default SmartSuggestions;
