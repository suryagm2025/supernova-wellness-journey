
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Activity as ActivityIcon } from 'lucide-react';
import { toast } from 'sonner';
import ActivityTracker from '../components/dashboard/ActivityTracker';
import ActivityLoggingCard from '../components/activity/ActivityLoggingCard';
import QuickStartWorkouts from '../components/activity/QuickStartWorkouts';
import RecentActivities from '../components/activity/RecentActivities';

const Activity = () => {
  const [activityDescription, setActivityDescription] = useState('');
  const [suggestMode, setSuggestMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activityDescription && !suggestMode) {
      toast.error('Please describe your activity');
      return;
    }
    
    if (suggestMode) {
      // In a real app, we'd generate personalized suggestions
      setSuggestMode(false);
      toast.success('Here are some activities just for you!');
    } else {
      toast.success('Activity logged successfully!');
      setActivityDescription('');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-blue/20 p-3 rounded-full mb-4">
              <ActivityIcon size={32} className="text-supernova-blue" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Activity Tracker</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Log your daily physical activities and get suggestions for maintaining an active lifestyle.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <ActivityLoggingCard
                  activityDescription={activityDescription}
                  setActivityDescription={setActivityDescription}
                  suggestMode={suggestMode}
                  setSuggestMode={setSuggestMode}
                  handleSubmit={handleSubmit}
                />
                
                <QuickStartWorkouts />
              </div>
              
              <div className="space-y-8">
                <ActivityTracker />
                <RecentActivities />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Activity;
