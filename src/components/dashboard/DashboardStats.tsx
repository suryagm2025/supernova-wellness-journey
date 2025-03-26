
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import WellnessMetric from './WellnessMetric';
import { Droplet, Moon, Activity, Brain, Flame } from 'lucide-react';
import StreakTracker from '../streak/StreakTracker';
import { useNavigate } from 'react-router-dom';

const DashboardStats = () => {
  const navigate = useNavigate();
  
  // Stats would typically come from API/database in a real app
  const waterDrank = 5; // glasses
  const waterGoal = 8; // glasses
  const sleepHours = 7.5; // hours
  const sleepGoal = 8; // hours
  const activityMinutes = 45; // minutes
  const activityGoal = 60; // minutes
  const mindfulnessMinutes = 10; // minutes
  const mindfulnessGoal = 15; // minutes
  
  const handleCheckIn = () => {
    navigate('/check-in');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <WellnessMetric
        icon={<Droplet className="text-supernova-blue" />}
        title="Water Intake"
        current={waterDrank}
        goal={waterGoal}
        unit="glasses"
        href="/water"
      />
      
      <WellnessMetric
        icon={<Moon className="text-supernova-purple" />}
        title="Sleep"
        current={sleepHours}
        goal={sleepGoal}
        unit="hours"
        href="/evening-check"
      />
      
      <WellnessMetric
        icon={<Activity className="text-supernova-pink" />}
        title="Physical Activity"
        current={activityMinutes}
        goal={activityGoal}
        unit="minutes"
        href="/activity"
      />
      
      <WellnessMetric
        icon={<Brain className="text-supernova-gold" />}
        title="Mindfulness"
        current={mindfulnessMinutes}
        goal={mindfulnessGoal}
        unit="minutes"
        href="/suggestions"
      />
      
      <div className="md:col-span-2 lg:col-span-4">
        <StreakTracker onCheckIn={handleCheckIn} />
      </div>
    </div>
  );
};

export default DashboardStats;
