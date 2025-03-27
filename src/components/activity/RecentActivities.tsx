
import React from 'react';
import { Activity } from 'lucide-react';

interface RecentActivitiesProps {
  activities: any[];
  isLoading: boolean;
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities, isLoading }) => {
  if (isLoading) {
    return <div>Loading recent activities...</div>;
  }

  if (activities.length === 0) {
    return <div>No recent activities found.</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="bg-supernova-dark p-3 rounded-lg flex items-center">
            <div className="bg-supernova-blue/20 p-2 rounded-full mr-3">
              <Activity size={16} className="text-supernova-blue" />
            </div>
            <div>
              <p className="font-medium">{activity.type || 'Exercise'}</p>
              <p className="text-sm text-gray-400">
                {activity.duration || '30'} minutes - {activity.date || new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
