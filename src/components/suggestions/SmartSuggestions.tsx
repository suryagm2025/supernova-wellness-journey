
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import SmartSuggestionsError from './SmartSuggestionsError';
import SmartSuggestionsContent from './SmartSuggestionsContent';
import { useSmartSuggestions } from '@/hooks/useSmartSuggestions';

const SmartSuggestions: React.FC = () => {
  const { isLoading, suggestions, error, fetchSmartSuggestions } = useSmartSuggestions();

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
        <SmartSuggestionsError 
          error={error} 
          onRetry={fetchSmartSuggestions} 
        />
      )}

      {suggestions && (
        <SmartSuggestionsContent 
          suggestions={suggestions} 
          onRefresh={fetchSmartSuggestions} 
        />
      )}
    </GlassMorphicCard>
  );
};

export default SmartSuggestions;
