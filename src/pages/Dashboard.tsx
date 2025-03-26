
import React, { useState } from 'react';
import { DashboardStyle } from '@/components/dashboard/DashboardStyleSelector';
import { EmotionType } from '@/components/emotion/EmotionPicker';
import DashboardStyleSelector from '@/components/dashboard/DashboardStyleSelector';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import EmotionPickerSection from '@/components/dashboard/EmotionPickerSection';
import MinimalistDashboard from '@/components/dashboard/MinimalistDashboard';
import CoachDashboard from '@/components/dashboard/CoachDashboard';
import DataRichDashboard from '@/components/dashboard/DataRichDashboard';
import JourneyDashboard from '@/components/dashboard/JourneyDashboard';

const Dashboard = () => {
  const [dashboardStyle, setDashboardStyle] = useState<DashboardStyle>('coach');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(null);
  
  const renderDashboardContent = () => {
    switch (dashboardStyle) {
      case 'minimalist':
        return <MinimalistDashboard selectedEmotion={selectedEmotion} />;
      case 'coach':
        return <CoachDashboard selectedEmotion={selectedEmotion} />;
      case 'data-rich':
        return <DataRichDashboard selectedEmotion={selectedEmotion} />;
      case 'journey':
        return <JourneyDashboard selectedEmotion={selectedEmotion} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen">
      <main className="pb-20">
        <WelcomeHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2">
            <DashboardStyleSelector value={dashboardStyle} onChange={setDashboardStyle} />
          </div>
          <div>
            <EmotionPickerSection 
              selectedEmotion={selectedEmotion} 
              setSelectedEmotion={setSelectedEmotion} 
            />
          </div>
        </div>
        
        {renderDashboardContent()}
      </main>
    </div>
  );
};

export default Dashboard;
