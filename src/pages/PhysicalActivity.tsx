
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import ActivityHeader from '@/components/activity/ActivityHeader';
import ActivitySelectionCard from '@/components/activity/ActivitySelectionCard';
import ReminderTimeSelector from '@/components/activity/ReminderTimeSelector';
import ReminderSetConfirmation from '@/components/activity/ReminderSetConfirmation';
import NoActivityFeedback from '@/components/activity/NoActivityFeedback';
import ActivityFeedback from '@/components/activity/ActivityFeedback';

const PhysicalActivity = () => {
  const [activity, setActivity] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const navigate = useNavigate();
  
  const handleActivitySelection = (selectedActivity: string) => {
    setActivity(selectedActivity);
    setShowFeedback(true);
    
    // In a real app, this would be saved to a database
    toast.success("Activity data recorded!");
  };
  
  const handleSetReminder = (timing: string) => {
    setReminderSet(true);
    setShowReminderOptions(false);
    
    // In a real app, this would schedule a notification
    toast.success(`Stretch reminder scheduled for ${timing}`);
  };
  
  const handleFinish = () => {
    navigate('/dashboard');
  };

  const navigateToTracking = () => {
    navigate('/activity-tracking');
  };
  
  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <ActivityHeader />
          
          <div className="max-w-3xl mx-auto">
            <GlassMorphicCard className="p-6">
              {!showFeedback ? (
                <ActivitySelectionCard onSelectActivity={handleActivitySelection} />
              ) : showReminderOptions ? (
                <ReminderTimeSelector 
                  onSetReminder={handleSetReminder}
                  onCancel={() => setShowReminderOptions(false)}
                />
              ) : reminderSet ? (
                <ReminderSetConfirmation
                  onFinish={handleFinish}
                  onViewTracking={navigateToTracking}
                />
              ) : (
                <>
                  {activity === "none" ? (
                    <NoActivityFeedback
                      onSetReminderClick={() => setShowReminderOptions(true)}
                      onFinish={handleFinish}
                      onViewTracking={navigateToTracking}
                    />
                  ) : (
                    <ActivityFeedback
                      onFinish={handleFinish}
                      onViewTracking={navigateToTracking}
                    />
                  )}
                </>
              )}
            </GlassMorphicCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhysicalActivity;
