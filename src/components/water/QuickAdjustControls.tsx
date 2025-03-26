
import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

interface QuickAdjustControlsProps {
  onAdjust: (increment: number) => void;
  isSubmitting: boolean;
}

const QuickAdjustControls: React.FC<QuickAdjustControlsProps> = ({ 
  onAdjust, 
  isSubmitting 
}) => {
  return (
    <div>
      <div className="flex justify-center space-x-4 mb-6">
        <button 
          onClick={() => onAdjust(-250)}
          disabled={isSubmitting}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 transition-colors disabled:opacity-50"
        >
          <MinusCircle size={24} />
        </button>
        <button 
          onClick={() => onAdjust(250)}
          disabled={isSubmitting}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-supernova-blue transition-colors disabled:opacity-50"
        >
          {isSubmitting ? <Spinner size="sm" className="mx-auto" /> : <PlusCircle size={24} />}
        </button>
      </div>
      
      <p className="text-center text-gray-400 text-sm">
        Quick adjust: +/- one glass (250ml)
      </p>
    </div>
  );
};

export default QuickAdjustControls;
