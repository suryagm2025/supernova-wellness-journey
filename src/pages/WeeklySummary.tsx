
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import useTimelineData from '@/hooks/useTimelineData';
import SummaryCards from '@/components/weekly-summary/SummaryCards';
import MoodChart from '@/components/weekly-summary/MoodChart';
import InsightsAndQuotes from '@/components/weekly-summary/InsightsAndQuotes';
import ActionButtons from '@/components/weekly-summary/ActionButtons';
import DetailedGraphs from '@/components/weekly-summary/DetailedGraphs';

const WeeklySummary = () => {
  const { timelineData, isLoading } = useTimelineData();
  const [showDetailedGraphs, setShowDetailedGraphs] = useState(false);
  
  // Calculate averages and stats from timeline data
  const sleepAverage = timelineData.length > 0 
    ? timelineData.reduce((sum, day) => sum + (day.sleep || 0), 0) / timelineData.filter(day => day.sleep !== null).length 
    : 0;
  
  const checkInRate = Math.round((timelineData.filter(day => 
    day.sleep !== null || day.hydration !== null || day.mood !== null || day.movement !== null
  ).length / timelineData.length) * 100);
  
  const moodData = timelineData.map(day => ({
    date: day.date,
    mood: day.mood || 0
  }));
  
  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-gold/20 p-3 rounded-full mb-4">
              <Calendar size={32} className="text-supernova-gold" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Weekly Wellness Summary</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here's your personalized overview of this week's wellness journey.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Summary Card */}
            <GlassMorphicCard className="p-6">
              <h2 className="text-xl font-display font-semibold mb-6 text-center">
                Your Week at a Glance
              </h2>
              
              <SummaryCards 
                checkInRate={checkInRate} 
                sleepAverage={sleepAverage} 
              />
              
              <MoodChart 
                moodData={moodData} 
                isLoading={isLoading} 
              />
              
              <InsightsAndQuotes />
              
              <DetailedGraphs show={showDetailedGraphs} />
              
              <ActionButtons 
                showDetailedGraphs={showDetailedGraphs}
                setShowDetailedGraphs={setShowDetailedGraphs}
              />
            </GlassMorphicCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeeklySummary;
