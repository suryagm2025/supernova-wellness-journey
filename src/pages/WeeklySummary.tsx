
import React from 'react';
import { ChartLine, ArrowRight, Share, Target } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const WeeklySummary = () => {
  const navigate = useNavigate();
  
  // Example data - in a real app this would come from an API
  const mockData = {
    moodTrend: [3, 4, 3, 5, 4, 4, 5], // 1-5 scale
    sleepAverage: 7.2, // hours
    activityStreak: 3, // days
    checkInRate: 85, // percent
    insight: "You've been more focused on mid-week! Let's build on that momentum.",
    quote: "Small steps every day lead to big change."
  };
  
  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-blue/20 p-3 rounded-full mb-4">
              <ChartLine size={32} className="text-supernova-blue" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Weekly Wellness Summary</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here's your personalized weekly wellness summary
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Mood Trend */}
            <GlassMorphicCard className="p-6">
              <h2 className="text-xl font-display font-semibold mb-4">Mood Trend 📈</h2>
              <div className="h-40 mb-2 bg-white/5 rounded-lg flex items-end p-4">
                {mockData.moodTrend.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-supernova-blue/80 rounded-t-sm" 
                      style={{ height: `${value * 15}px` }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </GlassMorphicCard>
            
            {/* Sleep and Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassMorphicCard className="p-6">
                <h2 className="text-xl font-display font-semibold mb-4">Sleep Score 🌙</h2>
                <div className="flex items-center justify-center py-8">
                  <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32">
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="60" 
                        fill="none" 
                        stroke="#2A2A30" 
                        strokeWidth="8" 
                      />
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="60" 
                        fill="none" 
                        stroke="#9b87f5" 
                        strokeWidth="8" 
                        strokeDasharray="377"
                        strokeDashoffset={377 - (377 * (mockData.sleepAverage / 9))}
                        transform="rotate(-90 64 64)"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <p className="text-3xl font-bold">{mockData.sleepAverage}</p>
                      <p className="text-xs text-gray-400">hrs/night</p>
                    </div>
                  </div>
                </div>
              </GlassMorphicCard>
              
              <GlassMorphicCard className="p-6">
                <h2 className="text-xl font-display font-semibold mb-4">Activity & Check-ins 💪</h2>
                <div className="space-y-4 py-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Activity Streak</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-2">{mockData.activityStreak}</span>
                      <span className="text-sm">days</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Check-in Rate</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-2">{mockData.checkInRate}%</span>
                      <span className="text-sm">completed</span>
                    </div>
                  </div>
                </div>
              </GlassMorphicCard>
            </div>
            
            {/* AI Insight */}
            <GlassMorphicCard className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-display font-semibold mb-2">AI Insight</h2>
                  <p className="text-gray-300">{mockData.insight}</p>
                </div>
                
                <div className="w-full md:w-64 bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-300 italic">{mockData.quote}</p>
                </div>
              </div>
            </GlassMorphicCard>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button 
                onClick={() => toast.success("Detailed graphs will be available in the next update!")}
                variant="outline"
                className="bg-supernova-dark border-white/10"
              >
                <ChartLine size={16} className="mr-2" /> View Detailed Graphs
              </Button>
              
              <Button 
                onClick={() => toast.success("Share feature coming soon!")}
                variant="outline"
                className="bg-supernova-dark border-white/10"
              >
                <Share size={16} className="mr-2" /> Share Your Progress
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-supernova-blue hover:bg-supernova-blue/80"
              >
                <Target size={16} className="mr-2" /> Set Next Week's Focus
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeeklySummary;
