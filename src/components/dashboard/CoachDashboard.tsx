
import React from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import WellnessCard from '@/components/ui/WellnessCard';
import { Clock, Droplet, Utensils } from 'lucide-react';
import MoodBasedAffirmation from '@/components/emotion/MoodBasedAffirmation';
import MicroJournal from '@/components/journal/MicroJournal';
import PremiumLock from '@/components/premium/PremiumLock';
import { EmotionType } from '@/components/emotion/EmotionPicker';
import WellnessFlowsSection from './WellnessFlowsSection';

interface CoachDashboardProps {
  selectedEmotion: EmotionType;
}

const CoachDashboard: React.FC<CoachDashboardProps> = ({ selectedEmotion }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Today's Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-display font-semibold mb-4">Today's Overview</h2>
        <DashboardStats />
      </section>
      
      {/* Quick Actions */}
      <section className="mb-10">
        <h2 className="text-xl font-display font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <WellnessCard
            title="Morning Check-In"
            description="Start your day with intention and track your morning habits."
            icon={<Clock size={24} />}
            to="/checkin"
            glowColor="blue"
          />
          
          <WellnessCard
            title="Track Water"
            description="Log your water intake to stay properly hydrated."
            icon={<Droplet size={24} />}
            to="/water"
            glowColor="purple"
          />
          
          <WellnessCard
            title="Log a Meal"
            description="Keep track of your nutrition with easy meal logging."
            icon={<Utensils size={24} />}
            to="/meals"
            glowColor="pink"
          />
        </div>
      </section>
      
      {selectedEmotion && (
        <MoodBasedAffirmation emotion={selectedEmotion} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <MicroJournal />
        <PremiumLock 
          featureName="Advanced Journal Analytics" 
          description="Unlock AI-powered insights from your journal entries and track your emotional patterns over time."
        />
      </div>
      
      <WellnessFlowsSection />
    </div>
  );
};

export default CoachDashboard;
