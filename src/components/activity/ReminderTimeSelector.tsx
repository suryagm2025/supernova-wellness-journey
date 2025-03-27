
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReminderTimeSelectorProps {
  onSetReminder: (timing: string) => void;
  onCancel: () => void;
}

const ReminderTimeSelector: React.FC<ReminderTimeSelectorProps> = ({ onSetReminder, onCancel }) => {
  return (
    <div className="text-center py-6 animate-fade-in">
      <h2 className="text-xl font-display font-semibold mb-4">
        When would you like the reminder?
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={() => onSetReminder("in 15 minutes")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
        >
          <Clock size={24} className="text-supernova-pink mb-2" />
          <p className="text-lg font-medium">In 15 minutes</p>
        </button>
        
        <button 
          onClick={() => onSetReminder("in 30 minutes")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
        >
          <Clock size={24} className="text-supernova-pink mb-2" />
          <p className="text-lg font-medium">In 30 minutes</p>
        </button>
        
        <button 
          onClick={() => onSetReminder("in 1 hour")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
        >
          <Clock size={24} className="text-supernova-pink mb-2" />
          <p className="text-lg font-medium">In 1 hour</p>
        </button>
        
        <button 
          onClick={() => onSetReminder("later today")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all flex flex-col items-center justify-center"
        >
          <Clock size={24} className="text-supernova-pink mb-2" />
          <p className="text-lg font-medium">Later today</p>
        </button>
      </div>
      
      <Button 
        variant="outline"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
};

export default ReminderTimeSelector;
