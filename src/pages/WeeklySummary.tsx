
import React, { useState } from 'react';
import { Calendar, Award, TrendingUp, Quote, Share2, ArrowRight, Moon } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import useTimelineData from '@/hooks/useTimelineData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const WeeklySummary = () => {
  const { timelineData, isLoading } = useTimelineData();
  const [showDetailedGraphs, setShowDetailedGraphs] = useState(false);
  const navigate = useNavigate();
  
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
  
  const handleShareProgress = () => {
    toast.success("Share feature coming soon!");
  };
  
  const handleSetFocus = () => {
    toast.success("Focus setting will be available soon!");
  };
  
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-supernova-dark border border-white/10 rounded-lg">
                  <h3 className="flex items-center text-lg font-medium mb-2">
                    <Award className="mr-2 text-supernova-blue" size={20} />
                    Check-in Rate
                  </h3>
                  <div className="text-3xl font-semibold mb-1">{checkInRate}%</div>
                  <p className="text-gray-400 text-sm">Daily wellness tracking</p>
                </div>
                
                <div className="p-4 bg-supernova-dark border border-white/10 rounded-lg">
                  <h3 className="flex items-center text-lg font-medium mb-2">
                    <Moon className="mr-2 text-supernova-purple" size={20} />
                    Sleep Average
                  </h3>
                  <div className="text-3xl font-semibold mb-1">{sleepAverage.toFixed(1)} hrs</div>
                  <p className="text-gray-400 text-sm">Weekly sleep score</p>
                </div>
                
                <div className="p-4 bg-supernova-dark border border-white/10 rounded-lg">
                  <h3 className="flex items-center text-lg font-medium mb-2">
                    <TrendingUp className="mr-2 text-supernova-pink" size={20} />
                    Activity Streak
                  </h3>
                  <div className="text-3xl font-semibold mb-1">5 days</div>
                  <p className="text-gray-400 text-sm">Consistent movement</p>
                </div>
              </div>
              
              {/* Mood Chart */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Mood Trend (Mon-Sun)</h3>
                <div className="h-[250px] w-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <span>Loading data...</span>
                    </div>
                  ) : (
                    <ChartContainer 
                      className="h-full w-full" 
                      config={{
                        mood: { color: "#FF6B95" }
                      }}
                    >
                      <LineChart data={moodData}>
                        <XAxis 
                          dataKey="date" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#9ca3af', fontSize: 12 }}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', { weekday: 'short' });
                          }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#9ca3af', fontSize: 12 }}
                          domain={[0, 10]}
                        />
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <Line 
                          type="monotone" 
                          dataKey="mood" 
                          stroke="var(--color-mood)" 
                          strokeWidth={2}
                          dot={{ r: 4, fill: '#111827', strokeWidth: 2, stroke: "var(--color-mood)" }}
                        />
                        <ChartTooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <ChartTooltipContent 
                                  payload={payload} 
                                  formatter={(value, name) => (
                                    <span>{value.toFixed(1)}/10</span>
                                  )}
                                  labelFormatter={(label) => {
                                    const date = new Date(label);
                                    return date.toLocaleDateString('en-US', { 
                                      weekday: 'long', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    });
                                  }}
                                />
                              );
                            }
                            return null;
                          }}
                        />
                      </LineChart>
                    </ChartContainer>
                  )}
                </div>
              </div>
              
              {/* AI Insight */}
              <div className="p-5 bg-supernova-dark/50 border border-white/10 rounded-lg mb-8">
                <h3 className="text-lg font-medium mb-3">Personalized AI Insight:</h3>
                <p>You've been more focused on mid-week! Let's build on that momentum.</p>
              </div>
              
              {/* Quote */}
              <div className="flex items-start gap-4 p-5 bg-white/5 rounded-lg mb-8">
                <Quote className="text-supernova-gold flex-shrink-0" size={24} />
                <div>
                  <p className="italic text-lg">"Small steps every day lead to big change."</p>
                </div>
              </div>
              
              {showDetailedGraphs && (
                <div className="mt-8 space-y-6 animate-fade-in">
                  <h3 className="text-xl font-medium mb-4">Detailed Analytics</h3>
                  
                  {/* Additional detailed charts would go here */}
                  <div className="p-6 bg-supernova-dark/50 border border-white/10 rounded-lg text-center">
                    <p>Detailed analytics dashboard coming soon!</p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Button 
                  onClick={() => setShowDetailedGraphs(!showDetailedGraphs)}
                  variant="outline"
                  className="min-w-[180px]"
                >
                  {showDetailedGraphs ? 'Hide Detailed Graphs' : 'View Detailed Graphs'}
                </Button>
                
                <Button 
                  onClick={handleShareProgress}
                  variant="outline"
                  className="min-w-[180px]"
                >
                  <Share2 className="mr-2" size={16} />
                  Share Your Progress
                </Button>
                
                <Button 
                  onClick={handleSetFocus}
                  className="bg-supernova-gold hover:bg-supernova-gold/80 min-w-[180px]"
                >
                  Set Next Week's Focus <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </GlassMorphicCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeeklySummary;
