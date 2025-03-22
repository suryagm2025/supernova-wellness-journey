
import React from 'react';
import { Dumbbell, PersonStanding, Bike } from 'lucide-react';

export type SuggestedActivity = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

interface SuggestedActivitiesProps {
  activities: SuggestedActivity[];
  onSelectActivity: (title: string) => void;
}

const SuggestedActivities: React.FC<SuggestedActivitiesProps> = ({ 
  activities, 
  onSelectActivity 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-display font-semibold">Suggested Activities</h3>
        <button
          onClick={() => onSelectActivity('')}
          className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 transition-colors"
        >
          Back to Logging
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={index}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors cursor-pointer"
            onClick={() => onSelectActivity(activity.title)}
          >
            <div className="flex items-start">
              <div className="p-2 rounded-lg bg-supernova-blue/10 mr-4">
                {activity.icon}
              </div>
              <div>
                <h4 className="text-white font-medium">{activity.title}</h4>
                <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getDefaultSuggestedActivities = (): SuggestedActivity[] => {
  return [
    {
      title: 'Quick HIIT Workout',
      description: '20 minutes of high-intensity interval training to boost metabolism',
      icon: <Dumbbell size={24} className="text-supernova-blue" />,
    },
    {
      title: 'Evening Walk',
      description: '30-minute brisk walk to clear your mind and boost your step count',
      icon: <PersonStanding size={24} className="text-supernova-blue" />,
    },
    {
      title: 'Bike Ride',
      description: '45-minute bike ride around your neighborhood for cardio',
      icon: <Bike size={24} className="text-supernova-blue" />,
    },
  ];
};

export default SuggestedActivities;
