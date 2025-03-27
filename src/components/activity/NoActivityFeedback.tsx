
import React from 'react';
import { BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoActivityFeedbackProps {
  onSetReminderClick: () => void;
  onFinish: () => void;
  onViewTracking: () => void;
}

const NoActivityFeedback: React.FC<NoActivityFeedbackProps> = ({ 
  onSetReminderClick,
  onFinish,
  onViewTracking
}) => {
  return (
    <div className="text-center py-6 animate-fade-in">
      <h2 className="text-xl font-display font-semibold mb-4">
        No worries. Everyone needs rest days too.
      </h2>
      <p className="text-gray-300 mb-6">
        Would you like a 2-minute stretch reminder for later?
      </p>
      <div className="space-y-4">
        <div className="flex justify-center gap-3">
          <Button 
            onClick={onSetReminderClick}
            className="bg-supernova-pink hover:bg-supernova-pink/80"
          >
            Yes, set reminder
          </Button>
          <Button 
            variant="outline"
            onClick={onFinish}
          >
            No thanks
          </Button>
        </div>
        <Button
          onClick={onViewTracking}
          variant="link"
          className="text-supernova-blue"
        >
          <BarChart size={16} className="mr-2" /> View Activity Tracking
        </Button>
      </div>
    </div>
  );
};

export default NoActivityFeedback;
