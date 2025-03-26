
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Droplet, Moon, Smile, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format, subDays, isAfter } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';

import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

interface TimelineDataPoint {
  date: string;
  hydration?: number; // in ml
  sleep?: number; // in hours
  mood?: number; // 1-5 scale
  movement?: number; // in minutes
}

interface InsightData {
  type: 'sleep-mood' | 'hydration-movement' | 'general';
  description: string;
}

const HealthTimeline = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [timelineData, setTimelineData] = useState<TimelineDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [timeRange, setTimeRange] = useState(5); // Default to 5 days
  const [insights, setInsights] = useState<InsightData[]>([]);

  useEffect(() => {
    if (user) {
      fetchTimelineData();
    } else {
      setIsLoading(false);
    }
  }, [user, timeRange]);

  const fetchTimelineData = async () => {
    setIsLoading(true);
    
    try {
      // Get the date range for the query
      const endDate = new Date();
      const startDate = subDays(endDate, timeRange);
      
      // Initial empty data structure with dates
      const initialData: TimelineDataPoint[] = [];
      for (let i = 0; i < timeRange; i++) {
        const date = subDays(endDate, i);
        initialData.unshift({
          date: format(date, 'MMM dd')
        });
      }

      if (!user) {
        setTimelineData(initialData);
        setIsLoading(false);
        return;
      }

      // Fetch water intake data
      const { data: waterData, error: waterError } = await supabase
        .from('water_intake')
        .select('created_at, amount_ml')
        .eq('user_id', user.id)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());
      
      if (waterError) throw waterError;

      // Fetch wellness entries (mood & sleep)
      const { data: wellnessData, error: wellnessError } = await supabase
        .from('wellness_entries')
        .select('created_at, type, value')
        .eq('user_id', user.id)
        .in('type', ['mood', 'sleep'])
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());
      
      if (wellnessError) throw wellnessError;

      // Fetch activities data for movement
      const { data: activityData, error: activityError } = await supabase
        .from('wellness_activities')
        .select('created_at, duration, activity_type')
        .eq('user_id', user.id)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());
      
      if (activityError) throw activityError;

      // Process the data and merge it with the initial structure
      const processedData = processTimelineData(initialData, waterData, wellnessData, activityData);
      setTimelineData(processedData.data);
      setHasData(processedData.hasData);
      
      // Generate insights if there's data
      if (processedData.hasData) {
        generateInsights(processedData.data);
      }
    } catch (error: any) {
      console.error('Error fetching timeline data:', error);
      toast.error('Failed to load timeline data');
    } finally {
      setIsLoading(false);
    }
  };

  const processTimelineData = (
    initialData: TimelineDataPoint[],
    waterData: any[] | null,
    wellnessData: any[] | null,
    activityData: any[] | null
  ) => {
    let hasAnyData = false;
    
    // Process water data
    if (waterData && waterData.length > 0) {
      hasAnyData = true;
      
      // Group by day
      const waterByDay = waterData.reduce((acc: Record<string, number>, entry) => {
        const day = format(new Date(entry.created_at), 'MMM dd');
        acc[day] = (acc[day] || 0) + entry.amount_ml;
        return acc;
      }, {});
      
      // Add to timeline data
      initialData.forEach(dataPoint => {
        if (waterByDay[dataPoint.date]) {
          dataPoint.hydration = waterByDay[dataPoint.date];
        }
      });
    }
    
    // Process mood and sleep data
    if (wellnessData && wellnessData.length > 0) {
      hasAnyData = true;
      
      // Group by day and type
      const wellnessByDayAndType = wellnessData.reduce((acc: Record<string, Record<string, number>>, entry) => {
        const day = format(new Date(entry.created_at), 'MMM dd');
        
        if (!acc[day]) acc[day] = {};
        
        if (entry.type === 'mood' && typeof entry.value.level === 'number') {
          // Mood is typically stored as a level from 1-5
          acc[day].mood = entry.value.level;
        } else if (entry.type === 'sleep' && typeof entry.value.hours === 'number') {
          // Sleep is stored as hours
          acc[day].sleep = entry.value.hours;
        }
        
        return acc;
      }, {});
      
      // Add to timeline data
      initialData.forEach(dataPoint => {
        if (wellnessByDayAndType[dataPoint.date]) {
          if (wellnessByDayAndType[dataPoint.date].mood) {
            dataPoint.mood = wellnessByDayAndType[dataPoint.date].mood;
          }
          if (wellnessByDayAndType[dataPoint.date].sleep) {
            dataPoint.sleep = wellnessByDayAndType[dataPoint.date].sleep;
          }
        }
      });
    }
    
    // Process activity data
    if (activityData && activityData.length > 0) {
      hasAnyData = true;
      
      // Group by day
      const activityByDay = activityData.reduce((acc: Record<string, number>, entry) => {
        const day = format(new Date(entry.created_at), 'MMM dd');
        acc[day] = (acc[day] || 0) + (entry.duration || 0);
        return acc;
      }, {});
      
      // Add to timeline data
      initialData.forEach(dataPoint => {
        if (activityByDay[dataPoint.date]) {
          dataPoint.movement = activityByDay[dataPoint.date];
        }
      });
    }
    
    return {
      data: initialData,
      hasData: hasAnyData
    };
  };

  const generateInsights = (data: TimelineDataPoint[]) => {
    const newInsights: InsightData[] = [];
    
    // Check if we have enough data for sleep-mood correlation
    const sleepMoodData = data.filter(day => day.sleep !== undefined && day.mood !== undefined);
    
    if (sleepMoodData.length >= 2) {
      // Split data between good sleep (7+ hrs) and less sleep
      const goodSleepDays = sleepMoodData.filter(day => (day.sleep || 0) >= 7);
      const lessSleepDays = sleepMoodData.filter(day => (day.sleep || 0) < 7);
      
      if (goodSleepDays.length > 0 && lessSleepDays.length > 0) {
        // Calculate average mood for each group
        const goodSleepMoodAvg = goodSleepDays.reduce((sum, day) => sum + (day.mood || 0), 0) / goodSleepDays.length;
        const lessSleepMoodAvg = lessSleepDays.reduce((sum, day) => sum + (day.mood || 0), 0) / lessSleepDays.length;
        
        // Calculate percentage difference
        const percentDiff = Math.round(((goodSleepMoodAvg - lessSleepMoodAvg) / lessSleepMoodAvg) * 100);
        
        if (percentDiff > 0) {
          newInsights.push({
            type: 'sleep-mood',
            description: `Interesting! On days when you slept over 7 hours, your mood tracked ${percentDiff}% higher. Want more insights like this weekly?`
          });
        }
      }
    }
    
    // If we don't have sleep-mood correlation, check hydration-movement
    if (newInsights.length === 0) {
      const hydrationMovementData = data.filter(day => day.hydration !== undefined && day.movement !== undefined);
      
      if (hydrationMovementData.length >= 2) {
        const goodHydrationDays = hydrationMovementData.filter(day => (day.hydration || 0) >= 2000);
        const lessHydrationDays = hydrationMovementData.filter(day => (day.hydration || 0) < 2000);
        
        if (goodHydrationDays.length > 0 && lessHydrationDays.length > 0) {
          const goodHydrationMovementAvg = goodHydrationDays.reduce((sum, day) => sum + (day.movement || 0), 0) / goodHydrationDays.length;
          const lessHydrationMovementAvg = lessHydrationDays.reduce((sum, day) => sum + (day.movement || 0), 0) / lessHydrationDays.length;
          
          if (goodHydrationMovementAvg > lessHydrationMovementAvg) {
            newInsights.push({
              type: 'hydration-movement',
              description: `On well-hydrated days, you tend to move ${Math.round(goodHydrationMovementAvg - lessHydrationMovementAvg)} minutes more. Hydration and activity go hand-in-hand!`
            });
          }
        }
      }
    }
    
    // If we still don't have insights, provide a general one
    if (newInsights.length === 0) {
      newInsights.push({
        type: 'general',
        description: 'Keep logging your wellness data to see personalized insights about your health patterns!'
      });
    }
    
    setInsights(newInsights);
  };

  const handleTimeRangeChange = (days: number) => {
    setTimeRange(days);
  };

  const getCompleteness = () => {
    if (!hasData) return 0;
    
    const totalPossibleDataPoints = timelineData.length * 4; // 4 metrics per day
    let actualDataPoints = 0;
    
    timelineData.forEach(day => {
      if (day.hydration !== undefined) actualDataPoints++;
      if (day.sleep !== undefined) actualDataPoints++;
      if (day.mood !== undefined) actualDataPoints++;
      if (day.movement !== undefined) actualDataPoints++;
    });
    
    return Math.round((actualDataPoints / totalPossibleDataPoints) * 100);
  };

  const determineColor = (type: string) => {
    switch (type) {
      case 'hydration':
        return '#3B82F6'; // blue
      case 'sleep':
        return '#8B5CF6'; // purple
      case 'mood':
        return '#EC4899'; // pink
      case 'movement':
        return '#10B981'; // green
      default:
        return '#6B7280'; // gray
    }
  };

  const renderMissingDataPrompt = () => {
    const missingMetrics: string[] = [];
    
    // Check each metric across all days
    const hasHydration = timelineData.some(day => day.hydration !== undefined);
    const hasSleep = timelineData.some(day => day.sleep !== undefined);
    const hasMood = timelineData.some(day => day.mood !== undefined);
    const hasMovement = timelineData.some(day => day.movement !== undefined);
    
    if (!hasHydration) missingMetrics.push('hydration');
    if (!hasSleep) missingMetrics.push('sleep');
    if (!hasMood) missingMetrics.push('mood');
    if (!hasMovement) missingMetrics.push('movement');
    
    if (missingMetrics.length === 0) return null;
    
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
        <p className="text-gray-300 mb-3">
          Some entries are missing from your timeline. Tap below to fill in what you can — even partial logs help us paint your wellness picture.
        </p>
        <div className="flex flex-wrap gap-2">
          {!hasHydration && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/water')}
              className="flex items-center gap-1"
            >
              <Droplet size={16} className="text-supernova-blue" />
              Log Hydration
            </Button>
          )}
          {!hasSleep && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/evening-check')}
              className="flex items-center gap-1"
            >
              <Moon size={16} className="text-supernova-purple" />
              Log Sleep
            </Button>
          )}
          {!hasMood && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/emotion-check')}
              className="flex items-center gap-1"
            >
              <Smile size={16} className="text-supernova-pink" />
              Log Mood
            </Button>
          )}
          {!hasMovement && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/activity')}
              className="flex items-center gap-1"
            >
              <Activity size={16} className="text-supernova-gold" />
              Log Activity
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderInsights = () => {
    if (!hasData || insights.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3 className="text-xl font-display mb-4 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-supernova-gold mr-2"></span>
          AI Insights
        </h3>
        <GlassMorphicCard className="p-4">
          <p className="text-white">{insights[0].description}</p>
          
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" size="sm">
              Get Weekly Insights
            </Button>
          </div>
        </GlassMorphicCard>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-3xl font-display font-semibold mb-4">Health Timeline</h1>
              <p className="text-gray-400 mb-6">
                Please log in to view your health timeline dashboard.
              </p>
              <Button onClick={() => navigate('/login')}>
                Log In to Continue
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-white/10 p-3 rounded-full mb-4">
              <Calendar size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Health Timeline</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here's your wellness timeline over the past {timeRange} days. Notice any trends?
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-2">View:</span>
                <div className="flex gap-2">
                  <Button 
                    variant={timeRange === 5 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleTimeRangeChange(5)}
                  >
                    5 Days
                  </Button>
                  <Button 
                    variant={timeRange === 7 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleTimeRangeChange(7)}
                  >
                    Week
                  </Button>
                  <Button 
                    variant={timeRange === 14 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleTimeRangeChange(14)}
                  >
                    2 Weeks
                  </Button>
                  <Button 
                    variant={timeRange === 30 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => handleTimeRangeChange(30)}
                  >
                    Month
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                Completeness: {getCompleteness()}%
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                {renderMissingDataPrompt()}
                
                {hasData ? (
                  <GlassMorphicCard className="p-6 mb-8">
                    <div className="h-80">
                      <ChartContainer 
                        className="h-full w-full"
                        config={{
                          hydration: { 
                            color: determineColor('hydration'),
                            label: 'Hydration (ml)'
                          },
                          sleep: { 
                            color: determineColor('sleep'),
                            label: 'Sleep (hrs)'
                          },
                          mood: { 
                            color: determineColor('mood'),
                            label: 'Mood (1-5)'
                          },
                          movement: { 
                            color: determineColor('movement'),
                            label: 'Activity (min)'
                          }
                        }}
                      >
                        <LineChart
                          data={timelineData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis 
                            dataKey="date" 
                            stroke="rgba(255,255,255,0.5)"
                          />
                          <YAxis 
                            yAxisId="left"
                            stroke="rgba(255,255,255,0.5)"
                          />
                          <YAxis 
                            yAxisId="right"
                            orientation="right"
                            stroke="rgba(255,255,255,0.5)"
                          />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <ChartTooltipContent
                                    active={active}
                                    payload={payload}
                                    label={label}
                                  />
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="hydration" 
                            stroke={determineColor('hydration')}
                            activeDot={{ r: 8 }}
                            name="Hydration"
                            dot={{ strokeWidth: 2 }}
                          />
                          <Line 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="sleep" 
                            stroke={determineColor('sleep')}
                            name="Sleep"
                            dot={{ strokeWidth: 2 }}
                          />
                          <Line 
                            yAxisId="left"
                            type="monotone" 
                            dataKey="mood" 
                            stroke={determineColor('mood')}
                            name="Mood"
                            dot={{ strokeWidth: 2 }}
                          />
                          <Line 
                            yAxisId="right"
                            type="monotone" 
                            dataKey="movement" 
                            stroke={determineColor('movement')} 
                            name="Activity"
                            dot={{ strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </GlassMorphicCard>
                ) : (
                  <GlassMorphicCard className="p-6 mb-8 flex flex-col items-center justify-center text-center h-64">
                    <p className="text-gray-400 mb-4">No health data available for the selected time period.</p>
                    <p className="text-sm text-gray-500 mb-6">Start logging your wellness data to see your health timeline.</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/water')}
                        className="flex items-center gap-1"
                      >
                        <Droplet size={16} className="text-supernova-blue" />
                        Log Hydration
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/evening-check')}
                        className="flex items-center gap-1"
                      >
                        <Moon size={16} className="text-supernova-purple" />
                        Log Sleep
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/emotion-check')}
                        className="flex items-center gap-1"
                      >
                        <Smile size={16} className="text-supernova-pink" />
                        Log Mood
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/activity')}
                        className="flex items-center gap-1"
                      >
                        <Activity size={16} className="text-supernova-gold" />
                        Log Activity
                      </Button>
                    </div>
                  </GlassMorphicCard>
                )}
                
                {renderInsights()}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <GlassMorphicCard className="p-4">
                    <div className="flex items-center mb-2">
                      <Droplet size={18} className="text-supernova-blue mr-2" />
                      <h3 className="font-medium">Hydration</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {timelineData.filter(d => d.hydration !== undefined).length} of {timelineData.length} days logged
                    </p>
                    {hasData && timelineData.some(d => d.hydration !== undefined) ? (
                      <p className="text-white">
                        Avg: {Math.round(timelineData.reduce((sum, day) => sum + (day.hydration || 0), 0) / 
                        timelineData.filter(d => d.hydration !== undefined).length)} ml/day
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No hydration data</p>
                    )}
                  </GlassMorphicCard>
                  
                  <GlassMorphicCard className="p-4">
                    <div className="flex items-center mb-2">
                      <Moon size={18} className="text-supernova-purple mr-2" />
                      <h3 className="font-medium">Sleep</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {timelineData.filter(d => d.sleep !== undefined).length} of {timelineData.length} days logged
                    </p>
                    {hasData && timelineData.some(d => d.sleep !== undefined) ? (
                      <p className="text-white">
                        Avg: {(timelineData.reduce((sum, day) => sum + (day.sleep || 0), 0) / 
                        timelineData.filter(d => d.sleep !== undefined).length).toFixed(1)} hrs/night
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No sleep data</p>
                    )}
                  </GlassMorphicCard>
                  
                  <GlassMorphicCard className="p-4">
                    <div className="flex items-center mb-2">
                      <Smile size={18} className="text-supernova-pink mr-2" />
                      <h3 className="font-medium">Mood</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {timelineData.filter(d => d.mood !== undefined).length} of {timelineData.length} days logged
                    </p>
                    {hasData && timelineData.some(d => d.mood !== undefined) ? (
                      <p className="text-white">
                        Avg: {(timelineData.reduce((sum, day) => sum + (day.mood || 0), 0) / 
                        timelineData.filter(d => d.mood !== undefined).length).toFixed(1)} / 5
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No mood data</p>
                    )}
                  </GlassMorphicCard>
                  
                  <GlassMorphicCard className="p-4">
                    <div className="flex items-center mb-2">
                      <Activity size={18} className="text-supernova-gold mr-2" />
                      <h3 className="font-medium">Activity</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {timelineData.filter(d => d.movement !== undefined).length} of {timelineData.length} days logged
                    </p>
                    {hasData && timelineData.some(d => d.movement !== undefined) ? (
                      <p className="text-white">
                        Avg: {Math.round(timelineData.reduce((sum, day) => sum + (day.movement || 0), 0) / 
                        timelineData.filter(d => d.movement !== undefined).length)} min/day
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">No activity data</p>
                    )}
                  </GlassMorphicCard>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthTimeline;
