
import React from 'react';
import { ArrowRight, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReminderSetConfirmationProps {
  onFinish: () => void;
  onViewTracking: () => void;
}

const ReminderSetConfirmation: React.FC<ReminderSetConfirmationProps> = ({ 
  onFinish, 
  onViewTracking 
}) => {
  return (
    <div className="text-center py-6 animate-fade-in">
      <h2 className="text-xl font-display font-semibold mb-4">
        Reminder set! We'll nudge you with a gentle 2-minute stretch suggestion.
      </h2>
      <p className="text-gray-300 mb-6">
        Even small movements make a difference.
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

export default ReminderSetConfirmation;
