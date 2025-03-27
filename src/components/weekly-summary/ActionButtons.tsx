
import React from 'react';
import { Share2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ActionButtonsProps {
  showDetailedGraphs: boolean;
  setShowDetailedGraphs: (show: boolean) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ showDetailedGraphs, setShowDetailedGraphs }) => {
  const handleShareProgress = () => {
    toast.success("Share feature coming soon!");
  };
  
  const handleSetFocus = () => {
    toast.success("Focus setting will be available soon!");
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-8">
      <Button 
        onClick={() => setShowDetailedGraphs(!showDetailedGraphs)}
        variant="outline"
        className="min-w-[180px]"
      >
        {showDetailedGraphs ? 'Hide Detailed Graphs' : 'View Detailed Graphs'}
      </Button>
      
      <Button 
        onClick={handleShareProgress}
        variant="outline"
        className="min-w-[180px]"
      >
        <Share2 className="mr-2" size={16} />
        Share Your Progress
      </Button>
      
      <Button 
        onClick={handleSetFocus}
        className="bg-supernova-gold hover:bg-supernova-gold/80 min-w-[180px]"
      >
        Set Next Week's Focus <ArrowRight size={16} className="ml-2" />
      </Button>
    </div>
  );
};

export default ActionButtons;
