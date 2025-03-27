
import React, { useState, useEffect } from 'react';
import { Activity, ArrowRight, Clock, Dumbbell, BarChart, Heart, History } from 'lucide-react';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ActivityTracker from '@/components/dashboard/ActivityTracker';
import ActivityLoggingCard from '@/components/activity/ActivityLoggingCard';
import RecentActivities from '@/components/activity/RecentActivities';
import QuickStartWorkouts from '@/components/activity/QuickStartWorkouts';

interface ActivityFormValues {
  duration: string;
  activityType: string;
  intensity: string;
}

const ActivityTracking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activityDescription, setActivityDescription] = useState('');
  const [suggestMode, setSuggestMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  
  const form = useForm<ActivityFormValues>({
    defaultValues: {
      duration: '',
      activityType: '',
      intensity: 'moderate',
    },
  });
  
  useEffect(() => {
    if (user) {
      fetchUserActivities();
    }
  }, [user]);
  
  const fetchUserActivities = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wellness_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'activity')
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to log activity");
      return;
    }
    
    if (!activityDescription.trim()) {
      toast.error("Please enter an activity description");
      return;
    }
    
    try {
      setLoading(true);
      
      // Save to database
      const { error } = await supabase
        .from('wellness_entries')
        .insert({
          user_id: user.id,
          type: 'activity',
          value: { description: activityDescription, logged_at: new Date().toISOString() }
        });
        
      if (error) throw error;
      
      toast.success("Activity logged successfully");
      setActivityDescription('');
      fetchUserActivities();
      
    } catch (error) {
      console.error('Error logging activity:', error);
      toast.error("Failed to log activity");
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmitDetailedActivity = async (values: ActivityFormValues) => {
    if (!user) {
      toast.error("You must be logged in to log activity");
      return;
    }
    
    try {
      setLoading(true);
      
      // Save to database
      const { error } = await supabase
        .from('wellness_entries')
        .insert({
          user_id: user.id,
          type: 'activity',
          value: { 
            description: `${values.activityType} for ${values.duration} minutes`,
            duration: parseInt(values.duration),
            activity_type: values.activityType,
            intensity: values.intensity,
            logged_at: new Date().toISOString()
          }
        });
        
      if (error) throw error;
      
      toast.success("Activity logged successfully");
      form.reset();
      fetchUserActivities();
      
    } catch (error) {
      console.error('Error logging activity:', error);
      toast.error("Failed to log activity");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-pink/20 p-3 rounded-full mb-4">
              <Activity size={32} className="text-supernova-pink" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Physical Activity</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your movement, set goals, and build healthy habits to boost your energy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2">
              <Tabs defaultValue="quick-log" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="quick-log" className="flex-1">Quick Log</TabsTrigger>
                  <TabsTrigger value="detailed" className="flex-1">Detailed Entry</TabsTrigger>
                  <TabsTrigger value="stats" className="flex-1">Activity Stats</TabsTrigger>
                </TabsList>
                
                <TabsContent value="quick-log">
                  <ActivityLoggingCard 
                    activityDescription={activityDescription}
                    setActivityDescription={setActivityDescription}
                    suggestMode={suggestMode}
                    setSuggestMode={setSuggestMode}
                    handleSubmit={handleActivitySubmit}
                  />
                </TabsContent>
                
                <TabsContent value="detailed">
                  <GlassMorphicCard className="p-6 mb-8">
                    <h2 className="text-xl font-display font-semibold mb-6">Detailed Activity Log</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitDetailedActivity)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="activityType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Activity Type</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Walking, Running, Yoga..." 
                                    {...field} 
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration (minutes)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="30" 
                                    type="number"
                                    {...field} 
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="intensity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Intensity</FormLabel>
                              <div className="flex space-x-4">
                                <Button
                                  type="button"
                                  variant={field.value === 'light' ? "default" : "outline"}
                                  className={field.value === 'light' ? "bg-supernova-blue" : ""}
                                  onClick={() => form.setValue('intensity', 'light')}
                                >
                                  Light
                                </Button>
                                <Button
                                  type="button"
                                  variant={field.value === 'moderate' ? "default" : "outline"}
                                  className={field.value === 'moderate' ? "bg-supernova-purple" : ""}
                                  onClick={() => form.setValue('intensity', 'moderate')}
                                >
                                  Moderate
                                </Button>
                                <Button
                                  type="button"
                                  variant={field.value === 'intense' ? "default" : "outline"}
                                  className={field.value === 'intense' ? "bg-supernova-pink" : ""}
                                  onClick={() => form.setValue('intensity', 'intense')}
                                >
                                  Intense
                                </Button>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-supernova-pink hover:bg-supernova-pink/80"
                          disabled={loading}
                        >
                          {loading ? (
                            <>Logging Activity...</>
                          ) : (
                            <>
                              <Dumbbell className="mr-2 h-4 w-4" />
                              Log Activity
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </GlassMorphicCard>
                </TabsContent>
                
                <TabsContent value="stats">
                  <div className="space-y-6">
                    <ActivityTracker />
                    
                    <GlassMorphicCard className="p-6">
                      <h2 className="text-lg font-display font-semibold mb-4">Activity Insights</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-supernova-dark/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">This Week</span>
                            <Heart size={16} className="text-supernova-pink" />
                          </div>
                          <div className="text-2xl font-display">157 min</div>
                          <div className="text-xs text-gray-400">+23% from last week</div>
                        </div>
                        
                        <div className="p-4 bg-supernova-dark/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Consistency</span>
                            <Clock size={16} className="text-supernova-blue" />
                          </div>
                          <div className="text-2xl font-display">4/7 days</div>
                          <div className="text-xs text-gray-400">Strong consistency!</div>
                        </div>
                        
                        <div className="p-4 bg-supernova-dark/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Top Activity</span>
                            <Dumbbell size={16} className="text-supernova-purple" />
                          </div>
                          <div className="text-2xl font-display">Walking</div>
                          <div className="text-xs text-gray-400">82 minutes this week</div>
                        </div>
                      </div>
                    </GlassMorphicCard>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <div className="space-y-6">
                <GlassMorphicCard className="p-6">
                  <div className="flex items-center mb-4">
                    <History className="text-supernova-purple mr-3" size={20} />
                    <h2 className="text-lg font-display font-semibold">Recent Activities</h2>
                  </div>
                  
                  <RecentActivities activities={activities} isLoading={loading} />
                </GlassMorphicCard>
                
                <GlassMorphicCard className="p-6">
                  <div className="flex items-center mb-4">
                    <BarChart className="text-supernova-gold mr-3" size={20} />
                    <h2 className="text-lg font-display font-semibold">Weekly Goal</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-end justify-between">
                      <span className="text-sm text-gray-400">Current Progress</span>
                      <span className="text-sm">157 / 150 min</span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                      <div className="bg-supernova-gold h-full rounded-full" style={{ width: '105%' }}></div>
                    </div>
                    <p className="text-sm text-gray-400">
                      You've reached your goal this week! Great job staying active.
                    </p>
                  </div>
                </GlassMorphicCard>
                
                <QuickStartWorkouts />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-supernova-pink hover:bg-supernova-pink/80"
            >
              Return to Dashboard <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivityTracking;
