
import React from 'react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

interface ActivitySelectionCardProps {
  onSelectActivity: (activity: string) => void;
}

const ActivitySelectionCard: React.FC<ActivitySelectionCardProps> = ({ onSelectActivity }) => {
  return (
    <>
      <h2 className="text-xl font-display font-semibold mb-6 text-center">
        What kind of movement did you do today?
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={() => onSelectActivity("walk")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
        >
          <p className="text-lg font-medium">Walk</p>
        </button>
        
        <button 
          onClick={() => onSelectActivity("yoga")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
        >
          <p className="text-lg font-medium">Yoga</p>
        </button>
        
        <button 
          onClick={() => onSelectActivity("workout")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
        >
          <p className="text-lg font-medium">Workout</p>
        </button>
        
        <button 
          onClick={() => onSelectActivity("none")}
          className="p-4 bg-supernova-dark border border-white/10 rounded-lg hover:bg-white/5 transition-all"
        >
          <p className="text-lg font-medium">None</p>
        </button>
      </div>
    </>
  );
};

export default ActivitySelectionCard;
