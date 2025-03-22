
import React from 'react';
import WellnessMetric from './WellnessMetric';
import { Droplet, Activity, Utensils, Moon } from 'lucide-react';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <WellnessMetric
        title="Hydration"
        value="2.1L"
        icon={<Droplet size={24} className="text-supernova-blue" />}
        change={{ value: 5, isPositive: true }}
        glowColor="blue"
      />
      
      <WellnessMetric
        title="Activity"
        value="6,452 steps"
        icon={<Activity size={24} className="text-supernova-purple" />}
        change={{ value: 12, isPositive: true }}
        glowColor="purple"
      />
      
      <WellnessMetric
        title="Nutrition"
        value="3 meals logged"
        icon={<Utensils size={24} className="text-supernova-pink" />}
        change={{ value: 0, isPositive: true }}
        glowColor="pink"
      />
      
      <WellnessMetric
        title="Sleep"
        value="7.5 hrs"
        icon={<Moon size={24} className="text-supernova-blue" />}
        change={{ value: 3, isPositive: false }}
        glowColor="blue"
      />
    </div>
  );
};

export default DashboardStats;
