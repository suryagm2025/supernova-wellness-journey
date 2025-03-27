
import React from 'react';
import { Calendar, Moon, Activity, Tool } from 'lucide-react';
import WellnessCard from '@/components/ui/WellnessCard';
import { useNavigate } from 'react-router-dom';

const WellnessFlowsSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="mb-10">
      <h2 className="text-xl font-display font-semibold mb-4">Wellness Tracking</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <WellnessCard
          title="Weekly Wellness Summary"
          description="View your personalized wellness insights and track your weekly progress."
          icon={<Calendar size={24} />}
          to="/weekly-summary"
          glowColor="pink"
        />
        <WellnessCard
          title="Sleep Tracker"
          description="Track your sleep patterns to improve your rest quality and wellness."
          icon={<Moon size={24} />}
          to="/sleep"
          glowColor="purple"
        />
        <WellnessCard
          title="Sleep Tools"
          description="Access calming playlists, routines, and sleep aids for better rest."
          icon={<Tool size={24} />}
          to="/sleep-tools"
          glowColor="blue"
        />
        <WellnessCard
          title="Physical Activity"
          description="Track your daily movement to build healthy habits and boost your energy."
          icon={<Activity size={24} />}
          to="/activity"
          glowColor="blue"
        />
      </div>
    </section>
  );
};

export default WellnessFlowsSection;
