
import React from 'react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import MoodBasedAffirmation from '@/components/emotion/MoodBasedAffirmation';
import MicroJournal from '@/components/journal/MicroJournal';
import { EmotionType } from '@/components/emotion/EmotionPicker';

interface MinimalistDashboardProps {
  selectedEmotion: EmotionType;
}

const MinimalistDashboard: React.FC<MinimalistDashboardProps> = ({ selectedEmotion }) => {
  return (
    <div className="animate-fade-in">
      <GlassMorphicCard className="p-6 mb-6">
        <h2 className="text-xl font-display font-semibold mb-4">Today's Focus</h2>
        <p className="text-lg text-gray-200">
          "The only way to do great work is to love what you do."
        </p>
        <p className="text-right text-gray-400 mt-2">— Steve Jobs</p>
      </GlassMorphicCard>
      
      {selectedEmotion && (
        <MoodBasedAffirmation emotion={selectedEmotion} />
      )}

      <div className="mt-6">
        <MicroJournal />
      </div>
    </div>
  );
};

export default MinimalistDashboard;
