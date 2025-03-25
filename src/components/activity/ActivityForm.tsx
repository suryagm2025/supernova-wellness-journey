
import React from 'react';
import { Lightbulb, Mic } from 'lucide-react';
import VoiceInput from '../VoiceInput';

interface ActivityFormProps {
  activityDescription: string;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSuggestMode: () => void;
  showVoiceInput?: boolean;
  onToggleVoiceInput?: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  activityDescription,
  onDescriptionChange,
  onSubmit,
  onSuggestMode,
  showVoiceInput = false,
  onToggleVoiceInput,
}) => {
  const handleVoiceInput = (transcript: string) => {
    onDescriptionChange(transcript);
    if (onToggleVoiceInput) {
      onToggleVoiceInput();
    }
  };

  return (
    <>
      {showVoiceInput && (
        <div className="mb-4">
          <VoiceInput 
            onTranscript={handleVoiceInput}
            placeholder="Describe your activity..."
          />
        </div>
      )}
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="block text-sm text-gray-300">
              Tell us about your activity today:
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onToggleVoiceInput}
                className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex items-center"
              >
                <Mic size={12} className="mr-1" /> Voice Input
              </button>
              <button
                type="button"
                onClick={onSuggestMode}
                className="text-xs px-3 py-1 bg-supernova-blue/20 hover:bg-supernova-blue/30 rounded-full text-supernova-blue transition-colors flex items-center"
              >
                <Lightbulb size={12} className="mr-1" /> Suggest One
              </button>
            </div>
          </div>
          <textarea
            value={activityDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="e.g. Walked 4,000 steps"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all min-h-[120px]"
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50"
          >
            Log Activity
          </button>
        </div>
      </form>
    </>
  );
};

export default ActivityForm;
