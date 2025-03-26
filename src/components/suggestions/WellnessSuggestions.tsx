
import React, { useState } from 'react';
import SuggestionsHeader from './SuggestionsHeader';
import SuggestionsLoader from './SuggestionsLoader';
import SuggestionsGrid from './SuggestionsGrid';
import { useSuggestions } from './useSuggestions';

const WellnessSuggestions: React.FC = () => {
  const [hydrationGoal] = useState('8 glasses');
  const [isHydrationComplete, setIsHydrationComplete] = useState(false);
  const [isEveningMode, setIsEveningMode] = useState(false);
  const { suggestions, isLoading, refreshing, handleRefresh } = useSuggestions();

  return (
    <div className="space-y-8">
      {/* Header with refresh button */}
      <SuggestionsHeader 
        isLoading={isLoading} 
        refreshing={refreshing} 
        onRefresh={handleRefresh} 
      />

      {isLoading ? (
        <SuggestionsLoader />
      ) : (
        <SuggestionsGrid 
          suggestions={suggestions}
          hydrationGoal={hydrationGoal}
          isHydrationComplete={isHydrationComplete}
          setIsHydrationComplete={setIsHydrationComplete}
          isEveningMode={isEveningMode}
          setIsEveningMode={setIsEveningMode}
        />
      )}
    </div>
  );
};

export default WellnessSuggestions;
