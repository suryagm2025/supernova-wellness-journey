
import React from 'react';
import { ArrowRight, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivityFeedbackProps {
  onFinish: () => void;
  onViewTracking: () => void;
}

const ActivityFeedback: React.FC<ActivityFeedbackProps> = ({ 
  onFinish,
  onViewTracking 
}) => {
  return (
    <div className="text-center py-6 animate-fade-in">
      <h2 className="text-xl font-display font-semibold mb-4">
        Great job staying active!
      </h2>
      <p className="text-gray-300 mb-6">
        Consistency counts 💪
      </p>
      <div className="space-y-4">
        <Button 
          onClick={onFinish}
          className="w-full bg-supernova-pink hover:bg-supernova-pink/80"
        >
          Continue to Dashboard <ArrowRight size={16} className="ml-2" />
        </Button>
        <Button
          onClick={onViewTracking}
          variant="outline"
          className="w-full"
        >
          <BarChart size={16} className="mr-2" /> View Activity Tracking
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeedback;
