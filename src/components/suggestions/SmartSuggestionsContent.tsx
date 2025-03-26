
import React from 'react';
import { Coffee, Wind, Activity, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type SuggestionData } from '@/hooks/useSmartSuggestions';

interface SmartSuggestionsContentProps {
  suggestions: SuggestionData;
  onRefresh: () => void;
}

const SmartSuggestionsContent: React.FC<SmartSuggestionsContentProps> = ({
  suggestions,
  onRefresh
}) => {
  return (
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
        onClick={onRefresh} 
        variant="outline" 
        className="w-full mt-2"
      >
        <Sparkles size={16} className="mr-2" />
        Refresh Suggestions
      </Button>
    </div>
  );
};

export default SmartSuggestionsContent;
