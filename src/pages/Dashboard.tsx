import React, { useState } from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import ActivityTracker from '../components/dashboard/ActivityTracker';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import WellnessCard from '../components/ui/WellnessCard';
import { Clock, Droplet, Utensils, Activity, Moon } from 'lucide-react';
import DashboardStyleSelector, { DashboardStyle } from '@/components/dashboard/DashboardStyleSelector';
import EmotionPicker, { EmotionType } from '@/components/emotion/EmotionPicker';
import MoodBasedAffirmation from '@/components/emotion/MoodBasedAffirmation';

const Dashboard = () => {
  const [dashboardStyle, setDashboardStyle] = useState<DashboardStyle>('coach');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(null);
  
  const renderDashboardContent = () => {
    switch (dashboardStyle) {
      case 'minimalist':
        return (
          <div className="animate-fade-in">
            <GlassMorphicCard className="p-6 mb-6">
              <h2 className="text-xl font-display font-semibold mb-4">Today's Focus</h2>
              <p className="text-lg text-gray-200">
                "The only way to do great work is to love what you do."
              </p>
              <p className="text-right text-gray-400 mt-2">— Steve Jobs</p>
            </GlassMorphicCard>
            
            {selectedEmotion && (
              <MoodBasedAffirmation emotion={selectedEmotion} />
            )}
          </div>
        );
      
      case 'coach':
        return (
          <div className="space-y-10 animate-fade-in">
            {/* Today's Overview */}
            <section className="mb-10">
              <h2 className="text-xl font-display font-semibold mb-4">Today's Overview</h2>
              <DashboardStats />
            </section>
            
            {/* Quick Actions */}
            <section className="mb-10">
              <h2 className="text-xl font-display font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <WellnessCard
                  title="Morning Check-In"
                  description="Start your day with intention and track your morning habits."
                  icon={<Clock size={24} />}
                  to="/checkin"
                  glowColor="blue"
                />
                
                <WellnessCard
                  title="Track Water"
                  description="Log your water intake to stay properly hydrated."
                  icon={<Droplet size={24} />}
                  to="/water"
                  glowColor="purple"
                />
                
                <WellnessCard
                  title="Log a Meal"
                  description="Keep track of your nutrition with easy meal logging."
                  icon={<Utensils size={24} />}
                  to="/meals"
                  glowColor="pink"
                />
              </div>
            </section>
            
            {selectedEmotion && (
              <MoodBasedAffirmation emotion={selectedEmotion} />
            )}
          </div>
        );
      
      case 'data-rich':
        return (
          <div className="space-y-10 animate-fade-in">
            {/* Activity Chart */}
            <section className="mb-10">
              <h2 className="text-xl font-display font-semibold mb-4">Activity Tracking</h2>
              <ActivityTracker />
            </section>
            
            {/* Stats Section */}
            <section className="mb-10">
              <h2 className="text-xl font-display font-semibold mb-4">Today's Overview</h2>
              <DashboardStats />
            </section>
            
            <div className="text-center">
              <a href="/timeline" className="text-supernova-blue hover:text-supernova-blue/80 transition-colors">
                View Full Timeline Analysis →
              </a>
            </div>
            
            {selectedEmotion && (
              <MoodBasedAffirmation emotion={selectedEmotion} />
            )}
          </div>
        );
      
      case 'journey':
        return (
          <div className="space-y-10 animate-fade-in">
            <GlassMorphicCard className="p-6 mb-6">
              <h2 className="text-xl font-display font-semibold mb-4">Today's Journal</h2>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-supernova-blue/50 min-h-[150px]" 
                placeholder="Write your thoughts for today..."
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="px-3 py-1.5 bg-supernova-blue/20 hover:bg-supernova-blue/30 rounded-md text-sm transition-colors">
                  🙏 Gratitude
                </button>
                <button className="px-3 py-1.5 bg-supernova-purple/20 hover:bg-supernova-purple/30 rounded-md text-sm transition-colors">
                  💡 Insight
                </button>
                <button className="px-3 py-1.5 bg-supernova-pink/20 hover:bg-supernova-pink/30 rounded-md text-sm transition-colors">
                  🎯 Goal
                </button>
                <button className="px-3 py-1.5 bg-supernova-gold/20 hover:bg-supernova-gold/30 rounded-md text-sm transition-colors">
                  💪 Achievement
                </button>
              </div>
            </GlassMorphicCard>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlassMorphicCard className="p-6">
                <h3 className="font-display text-lg mb-3">Past Mood Map</h3>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-gray-400 mb-1">{i === 0 ? 'Today' : `${i}d ago`}</div>
                      <div className="text-xl">{['😃', '😊', '😐', '😐', '😔', '😊', '😃'][i]}</div>
                    </div>
                  ))}
                </div>
              </GlassMorphicCard>
              
              {selectedEmotion && (
                <MoodBasedAffirmation emotion={selectedEmotion} />
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen">
      <main className="pb-20">
        <div className="mb-12">
          <h1 className="text-3xl font-display font-semibold mb-2 animate-fade-in">Welcome Back, User!</h1>
          <p className="text-gray-400 animate-fade-in">Let's check in on your wellness journey today.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2">
            <DashboardStyleSelector value={dashboardStyle} onChange={setDashboardStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">How are you feeling?</label>
            <div className="flex justify-between gap-4">
              <button 
                onClick={() => setSelectedEmotion('happy')} 
                className={`text-3xl p-2 rounded-full transition-all ${selectedEmotion === 'happy' ? 'bg-supernova-gold/20 scale-110' : 'opacity-70 hover:opacity-100'}`}
                aria-label="Happy"
              >
                😃
              </button>
              <button 
                onClick={() => setSelectedEmotion('neutral')} 
                className={`text-3xl p-2 rounded-full transition-all ${selectedEmotion === 'neutral' ? 'bg-supernova-blue/20 scale-110' : 'opacity-70 hover:opacity-100'}`}
                aria-label="Neutral"
              >
                😐
              </button>
              <button 
                onClick={() => setSelectedEmotion('sad')} 
                className={`text-3xl p-2 rounded-full transition-all ${selectedEmotion === 'sad' ? 'bg-supernova-pink/20 scale-110' : 'opacity-70 hover:opacity-100'}`}
                aria-label="Sad"
              >
                😔
              </button>
            </div>
            {!selectedEmotion && (
              <p className="text-sm text-gray-400 mt-2">Choose how you're feeling to receive your personalized affirmation.</p>
            )}
          </div>
        </div>
        
        {renderDashboardContent()}
        
        {dashboardStyle === 'coach' && (
          <section className="mt-10 animate-fade-in">
            <h2 className="text-xl font-display font-semibold mb-4">Wellness Flows</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassMorphicCard className="p-6">
              <h3 className="font-display text-lg mb-3 flex items-center">
                <Clock size={20} className="mr-2 text-supernova-blue" />
                Morning Flow
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Trigger Time: 6:30 AM
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mr-2"></span>
                  Morning Check-In
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mr-2"></span>
                  Water Intake
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mr-2"></span>
                  Log Breakfast
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mr-2"></span>
                  Activity Tracker
                </li>
              </ul>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <h3 className="font-display text-lg mb-3 flex items-center">
                <Activity size={20} className="mr-2 text-supernova-purple" />
                Midday Flow
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Trigger Time: 12:30 PM
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-purple mr-2"></span>
                  Midday Wellness Check
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-purple mr-2"></span>
                  Log Lunch
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-purple mr-2"></span>
                  Water Intake
                </li>
              </ul>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <h3 className="font-display text-lg mb-3 flex items-center">
                <Moon size={20} className="mr-2 text-supernova-pink" />
                Evening Flow
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Trigger Time: 8:30 PM
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-pink mr-2"></span>
                  Evening Check-In
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-pink mr-2"></span>
                  Log Dinner
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-pink mr-2"></span>
                  Water Intake
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-supernova-pink mr-2"></span>
                  Daily Suggestions
                </li>
              </ul>
            </GlassMorphicCard>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
