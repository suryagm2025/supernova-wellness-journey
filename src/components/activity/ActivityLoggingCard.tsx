
import React, { useState } from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import SuggestedActivities, { getDefaultSuggestedActivities } from './SuggestedActivities';
import ActivityForm from './ActivityForm';
import { toast } from 'sonner';

interface ActivityLoggingCardProps {
  activityDescription: string;
  setActivityDescription: (value: string) => void;
  suggestMode: boolean;
  setSuggestMode: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ActivityLoggingCard: React.FC<ActivityLoggingCardProps> = ({
  activityDescription,
  setActivityDescription,
  suggestMode,
  setSuggestMode,
  handleSubmit,
}) => {
  const suggestedActivities = getDefaultSuggestedActivities();
  const [showVoiceInput, setShowVoiceInput] = useState(false);

  const handleSelectActivity = (title: string) => {
    if (title) {
      setActivityDescription(title);
      setSuggestMode(false);
      toast.success(`Selected: ${title}`);
    } else {
      setSuggestMode(false);
    }
  };

  const toggleVoiceInput = () => {
    setShowVoiceInput(prev => !prev);
  };

  return (
    <GlassMorphicCard className="p-6 mb-8">
      {suggestMode ? (
        <SuggestedActivities 
          activities={suggestedActivities}
          onSelectActivity={handleSelectActivity}
        />
      ) : (
        <ActivityForm
          activityDescription={activityDescription}
          onDescriptionChange={setActivityDescription}
          onSubmit={handleSubmit}
          onSuggestMode={() => setSuggestMode(true)}
          showVoiceInput={showVoiceInput}
          onToggleVoiceInput={toggleVoiceInput}
        />
      )}
      
      <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
        <p className="text-gray-400 text-sm">
          <span className="text-supernova-blue">Example:</span> "Walked 4,000 steps" or "20 mins yoga"
        </p>
      </div>
    </GlassMorphicCard>
  );
};

export default ActivityLoggingCard;
