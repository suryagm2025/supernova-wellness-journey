
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Chart } from 'lucide-react';
import TimelineHeader from '@/components/timeline/TimelineHeader';
import TimelineStats from '@/components/timeline/TimelineStats';
import TimelineInsights from '@/components/timeline/TimelineInsights';
import TimelineChart from '@/components/timeline/TimelineChart';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import useTimelineData from '@/hooks/useTimelineData';

const TimelineDashboard = () => {
  const { user } = useAuth();
  const { 
    timelineData, 
    isLoading, 
    error, 
    hasIncompleteData,
    fetchTimelineData 
  } = useTimelineData();

  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <TimelineHeader />
          
          <div className="max-w-5xl mx-auto mb-10">
            <GlassMorphicCard className="p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-80">
                  <div className="animate-pulse flex flex-col items-center">
                    <Chart size={48} className="text-supernova-blue/50 mb-4" />
                    <p className="text-gray-400">Loading your wellness timeline...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-display text-red-500 mb-2">Unable to load timeline data</h3>
                  <p className="text-gray-400 mb-4">{error.message}</p>
                  <button 
                    onClick={() => fetchTimelineData()}
                    className="px-4 py-2 bg-supernova-blue/20 hover:bg-supernova-blue/30 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <TimelineChart data={timelineData} />
                  
                  {hasIncompleteData && (
                    <div className="mt-4 p-4 bg-supernova-blue/10 border border-supernova-blue/20 rounded-lg">
                      <p className="text-gray-300">
                        Some entries are missing from your timeline. Tap below to fill in what you can — even partial logs help us paint your wellness picture.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button className="px-3 py-1.5 bg-supernova-blue/20 hover:bg-supernova-blue/30 rounded-md text-sm transition-colors">
                          Log Water
                        </button>
                        <button className="px-3 py-1.5 bg-supernova-purple/20 hover:bg-supernova-purple/30 rounded-md text-sm transition-colors">
                          Log Sleep
                        </button>
                        <button className="px-3 py-1.5 bg-supernova-pink/20 hover:bg-supernova-pink/30 rounded-md text-sm transition-colors">
                          Log Mood
                        </button>
                        <button className="px-3 py-1.5 bg-supernova-gold/20 hover:bg-supernova-gold/30 rounded-md text-sm transition-colors">
                          Log Activity
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <TimelineStats data={timelineData} />
                  
                  <TimelineInsights data={timelineData} />
                </>
              )}
            </GlassMorphicCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimelineDashboard;
