
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';

interface SuggestionsLoaderProps {
  count?: number;
}

const SuggestionsLoader: React.FC<SuggestionsLoaderProps> = ({ count = 5 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <GlassMorphicCard key={i} className="p-6 h-64 animate-pulse">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Loading suggestions...</span>
          </div>
        </GlassMorphicCard>
      ))}
    </div>
  );
};

export default SuggestionsLoader;
