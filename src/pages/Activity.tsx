import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Activity as ActivityIcon, Play, Lightbulb, Dumbbell, PersonStanding, Bike } from 'lucide-react';
import { toast } from 'sonner';
import ActivityTracker from '../components/dashboard/ActivityTracker';

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

  const suggestedActivities = [
    {
      title: 'Quick HIIT Workout',
      description: '20 minutes of high-intensity interval training to boost metabolism',
      icon: <Dumbbell size={24} className="text-supernova-blue" />,
    },
    {
      title: 'Evening Walk',
      description: '30-minute brisk walk to clear your mind and boost your step count',
      icon: <PersonStanding size={24} className="text-supernova-blue" />,
    },
    {
      title: 'Bike Ride',
      description: '45-minute bike ride around your neighborhood for cardio',
      icon: <Bike size={24} className="text-supernova-blue" />,
    },
  ];

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
                <GlassMorphicCard className="p-6 mb-8">
                  {suggestMode ? (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-display font-semibold">Suggested Activities</h3>
                        <button
                          onClick={() => setSuggestMode(false)}
                          className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 transition-colors"
                        >
                          Back to Logging
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {suggestedActivities.map((activity, index) => (
                          <div 
                            key={index}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors cursor-pointer"
                            onClick={() => {
                              setActivityDescription(activity.title);
                              setSuggestMode(false);
                              toast.success(`Selected: ${activity.title}`);
                            }}
                          >
                            <div className="flex items-start">
                              <div className="p-2 rounded-lg bg-supernova-blue/10 mr-4">
                                {activity.icon}
                              </div>
                              <div>
                                <h4 className="text-white font-medium">{activity.title}</h4>
                                <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="block text-sm text-gray-300">
                            Tell us about your activity today:
                          </label>
                          <button
                            type="button"
                            onClick={() => setSuggestMode(true)}
                            className="text-xs px-3 py-1 bg-supernova-blue/20 hover:bg-supernova-blue/30 rounded-full text-supernova-blue transition-colors flex items-center"
                          >
                            <Lightbulb size={12} className="mr-1" /> Suggest One
                          </button>
                        </div>
                        <textarea
                          value={activityDescription}
                          onChange={(e) => setActivityDescription(e.target.value)}
                          placeholder="e.g. Walked 4,000 steps"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 transition-all min-h-[120px]"
                        />
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50"
                        >
                          Log Activity
                        </button>
                      </div>
                    </form>
                  )}
                  
                  <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-gray-400 text-sm">
                      <span className="text-supernova-blue">Example:</span> "Walked 4,000 steps" or "20 mins yoga"
                    </p>
                  </div>
                </GlassMorphicCard>
                
                <GlassMorphicCard className="p-6">
                  <h3 className="text-lg font-display font-semibold mb-4">Quick Start Workouts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-supernova-blue/20 mr-3">
                          <Play size={16} className="text-supernova-blue" />
                        </div>
                        <h4 className="font-medium">10-Min Stretch</h4>
                      </div>
                      <p className="text-gray-400 text-xs">Perfect morning routine to improve flexibility</p>
                    </div>
                    
                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-supernova-blue/20 mr-3">
                          <Play size={16} className="text-supernova-blue" />
                        </div>
                        <h4 className="font-medium">15-Min Core</h4>
                      </div>
                      <p className="text-gray-400 text-xs">Strengthen your core with this quick workout</p>
                    </div>
                    
                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-supernova-blue/20 mr-3">
                          <Play size={16} className="text-supernova-blue" />
                        </div>
                        <h4 className="font-medium">5-Min Meditation</h4>
                      </div>
                      <p className="text-gray-400 text-xs">Quick mindfulness practice for stress relief</p>
                    </div>
                    
                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-4 transition-colors">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-supernova-blue/20 mr-3">
                          <Play size={16} className="text-supernova-blue" />
                        </div>
                        <h4 className="font-medium">20-Min Full Body</h4>
                      </div>
                      <p className="text-gray-400 text-xs">Complete workout targeting all major muscle groups</p>
                    </div>
                  </div>
                </GlassMorphicCard>
              </div>
              
              <div className="space-y-8">
                <ActivityTracker />
                
                <GlassMorphicCard className="p-6">
                  <h3 className="text-lg font-display font-semibold mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 pb-4 border-b border-white/10">
                      <div className="p-2 rounded-lg bg-white/5 text-supernova-blue">
                        <ActivityIcon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-white font-medium">Morning Jog</h4>
                          <span className="ml-2 text-xs bg-supernova-blue/20 text-supernova-blue px-2 py-0.5 rounded-full">
                            Today
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">3.2 km in 22 minutes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 pb-4 border-b border-white/10">
                      <div className="p-2 rounded-lg bg-white/5 text-supernova-blue">
                        <ActivityIcon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-white font-medium">Yoga Session</h4>
                          <span className="ml-2 text-xs bg-supernova-blue/20 text-supernova-blue px-2 py-0.5 rounded-full">
                            Yesterday
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">30 minutes of flow yoga</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-white/5 text-supernova-blue">
                        <ActivityIcon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="text-white font-medium">Walking</h4>
                          <span className="ml-2 text-xs bg-supernova-blue/20 text-supernova-blue px-2 py-0.5 rounded-full">
                            2 days ago
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">8,452 steps throughout the day</p>
                      </div>
                    </div>
                  </div>
                </GlassMorphicCard>
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
