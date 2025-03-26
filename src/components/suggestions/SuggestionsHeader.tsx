
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface SuggestionsHeaderProps {
  isLoading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
}

const SuggestionsHeader: React.FC<SuggestionsHeaderProps> = ({ 
  isLoading,
  refreshing,
  onRefresh
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-medium text-white">Your Personalized Suggestions</h2>
      <button 
        onClick={onRefresh} 
        disabled={refreshing || isLoading}
        className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition-colors disabled:opacity-50"
      >
        <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
        <span>Refresh</span>
      </button>
    </div>
  );
};

export default SuggestionsHeader;
