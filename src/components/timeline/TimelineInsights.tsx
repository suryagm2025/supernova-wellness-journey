
import React, { useState } from 'react';
import { Lightbulb, Bell } from 'lucide-react';
import { TimelineDataPoint } from '@/types/timeline';

interface TimelineInsightsProps {
  data: TimelineDataPoint[];
}

const TimelineInsights: React.FC<TimelineInsightsProps> = ({ data }) => {
  const [subscribed, setSubscribed] = useState(false);
  
  // Generate insights based on data
  const insights = generateInsights(data);
  
  const handleSubscribe = () => {
    setSubscribed(!subscribed);
  };
  
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-display font-semibold">Wellness Insights</h3>
        <button
          onClick={handleSubscribe}
          className={`flex items-center text-sm px-3 py-1.5 rounded-full transition-colors ${
            subscribed 
              ? 'bg-supernova-purple text-white' 
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <Bell size={14} className="mr-1.5" />
          {subscribed ? 'Subscribed to Weekly' : 'Get Weekly Insights'}
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-supernova-blue/20 to-supernova-purple/20 rounded-xl p-5 border border-white/10">
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-white/10 mr-4">
            <Lightbulb size={24} className="text-supernova-gold" />
          </div>
          <div>
            <h4 className="text-lg font-display mb-2">AI Insight</h4>
            <p className="text-gray-300">
              {insights.length > 0 
                ? insights[0].text 
                : "We need more data to generate personalized insights. Keep logging your wellness activities!"}
            </p>
            
            {insights.length > 0 && (
              <div className="mt-4">
                <p className="text-gray-400 text-sm">Want more insights like this weekly?</p>
                {!subscribed && (
                  <button
                    onClick={handleSubscribe}
                    className="mt-2 px-4 py-2 bg-supernova-purple/30 hover:bg-supernova-purple/50 rounded-lg text-sm transition-colors"
                  >
                    Subscribe to Weekly Insights
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate insights based on the data
function generateInsights(data: TimelineDataPoint[]) {
  const insights: { text: string; type: string }[] = [];
  
  // Check if we have enough data for sleep-mood correlation
  const sleepMoodData = data.filter(d => d.sleep !== null && d.mood !== null);
  if (sleepMoodData.length >= 3) {
    const goodSleepDays = sleepMoodData.filter(d => (d.sleep || 0) >= 7);
    const poorSleepDays = sleepMoodData.filter(d => (d.sleep || 0) < 7);
    
    if (goodSleepDays.length > 0 && poorSleepDays.length > 0) {
      const avgMoodGoodSleep = goodSleepDays.reduce((sum, d) => sum + (d.mood || 0), 0) / goodSleepDays.length;
      const avgMoodPoorSleep = poorSleepDays.reduce((sum, d) => sum + (d.mood || 0), 0) / poorSleepDays.length;
      
      const percentImprovement = ((avgMoodGoodSleep - avgMoodPoorSleep) / avgMoodPoorSleep) * 100;
      
      if (percentImprovement >= 15) {
        insights.push({
          text: `Interesting! On days when you slept over 7 hours, your mood tracked ${Math.round(percentImprovement)}% higher. Want more insights like this weekly?`,
          type: 'sleep-mood'
        });
      }
    }
  }
  
  // Check for hydration-activity correlation
  const hydrationActivityData = data.filter(d => d.hydration !== null && d.movement !== null);
  if (hydrationActivityData.length >= 3 && insights.length === 0) {
    const goodHydrationDays = hydrationActivityData.filter(d => (d.hydration || 0) >= 2.5);
    const poorHydrationDays = hydrationActivityData.filter(d => (d.hydration || 0) < 2.5);
    
    if (goodHydrationDays.length > 0 && poorHydrationDays.length > 0) {
      const avgActivityGoodHydration = goodHydrationDays.reduce((sum, d) => sum + (d.movement || 0), 0) / goodHydrationDays.length;
      const avgActivityPoorHydration = poorHydrationDays.reduce((sum, d) => sum + (d.movement || 0), 0) / poorHydrationDays.length;
      
      if (avgActivityGoodHydration > avgActivityPoorHydration) {
        insights.push({
          text: `We noticed you tend to be more active (${Math.round(avgActivityGoodHydration)} min vs ${Math.round(avgActivityPoorHydration)} min) on days when you drink more water. Staying hydrated may help boost your energy levels!`,
          type: 'hydration-activity'
        });
      }
    }
  }
  
  return insights;
}

export default TimelineInsights;
