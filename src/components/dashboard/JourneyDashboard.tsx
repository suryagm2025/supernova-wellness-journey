
import React from 'react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import MicroJournal from '@/components/journal/MicroJournal';
import MoodBasedAffirmation from '@/components/emotion/MoodBasedAffirmation';
import { EmotionType } from '@/components/emotion/EmotionPicker';

interface JourneyDashboardProps {
  selectedEmotion: EmotionType;
}

const JourneyDashboard: React.FC<JourneyDashboardProps> = ({ selectedEmotion }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MicroJournal />
        
        <GlassMorphicCard className="p-6">
          <h3 className="font-display text-lg mb-3">Past Mood Map</h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="text-xs text-gray-400 mb-1">{i === 0 ? 'Today' : `${i}d ago`}</div>
                <div className="text-xl">{['😃', '😊', '😐', '😐', '😔', '😊', '😃'][i]}</div>
              </div>
            ))}
          </div>
        </GlassMorphicCard>
        
        {selectedEmotion && (
          <MoodBasedAffirmation emotion={selectedEmotion} />
        )}
      </div>
    </div>
  );
};

export default JourneyDashboard;
