
import React from 'react';
import { Button } from '@/components/ui/button';

interface SmartSuggestionsErrorProps {
  error: string;
  onRetry: () => void;
}

const SmartSuggestionsError: React.FC<SmartSuggestionsErrorProps> = ({ 
  error, 
  onRetry 
}) => {
  return (
    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mb-4">
      <p className="text-sm text-white">{error}</p>
      <Button 
        variant="outline" 
        className="mt-3 w-full" 
        onClick={onRetry}
      >
        Try Again
      </Button>
    </div>
  );
};

export default SmartSuggestionsError;
