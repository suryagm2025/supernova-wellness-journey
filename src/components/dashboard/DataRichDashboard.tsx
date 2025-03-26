
import React from 'react';
import ActivityTracker from '@/components/dashboard/ActivityTracker';
import DashboardStats from '@/components/dashboard/DashboardStats';
import MoodBasedAffirmation from '@/components/emotion/MoodBasedAffirmation';
import PremiumLock from '@/components/premium/PremiumLock';
import { EmotionType } from '@/components/emotion/EmotionPicker';

interface DataRichDashboardProps {
  selectedEmotion: EmotionType;
}

const DataRichDashboard: React.FC<DataRichDashboardProps> = ({ selectedEmotion }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Activity Chart */}
      <section className="mb-10">
        <h2 className="text-xl font-display font-semibold mb-4">Activity Tracking</h2>
        <ActivityTracker />
      </section>
      
      {/* Stats Section */}
      <section className="mb-10">
        <h2 className="text-xl font-display font-semibold mb-4">Today's Overview</h2>
        <DashboardStats />
      </section>
      
      <div className="text-center">
        <a href="/timeline" className="text-supernova-blue hover:text-supernova-blue/80 transition-colors">
          View Full Timeline Analysis →
        </a>
      </div>
      
      {selectedEmotion && (
        <MoodBasedAffirmation emotion={selectedEmotion} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PremiumLock 
          featureName="Advanced Data Insights" 
          description="Unlock detailed analytics, trend forecasting, and personalized recommendations based on your data patterns."
        />
      </div>
    </div>
  );
};

export default DataRichDashboard;
