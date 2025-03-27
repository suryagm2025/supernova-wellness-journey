
import React from 'react';
import { Calendar } from 'lucide-react';
import WellnessCard from '@/components/ui/WellnessCard';
import { useNavigate } from 'react-router-dom';

const WellnessFlowsSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="mb-10">
      <h2 className="text-xl font-display font-semibold mb-4">Weekly Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <WellnessCard
          title="Weekly Wellness Summary"
          description="View your personalized wellness insights and track your weekly progress."
          icon={<Calendar size={24} />}
          to="/weekly-summary"
          glowColor="gold"
        />
      </div>
    </section>
  );
};

export default WellnessFlowsSection;
