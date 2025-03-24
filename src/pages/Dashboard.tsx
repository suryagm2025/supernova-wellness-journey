
import React from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import ActivityTracker from '../components/dashboard/ActivityTracker';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import WellnessCard from '../components/ui/WellnessCard';
import { Clock, Droplet, Utensils, Activity, Moon } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <main className="pb-20">
        <div className="mb-12">
          <h1 className="text-3xl font-display font-semibold mb-2 animate-fade-in">Welcome Back, User!</h1>
          <p className="text-gray-400 animate-fade-in">Let's check in on your wellness journey today.</p>
        </div>
        
        {/* Stats Section */}
        <section className="mb-10 animate-fade-in">
          <h2 className="text-xl font-display font-semibold mb-4">Today's Overview</h2>
          <DashboardStats />
        </section>
        
        {/* Quick Actions */}
        <section className="mb-10 animate-fade-in">
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
        
        {/* Activity Chart */}
        <section className="mb-10 animate-fade-in">
          <h2 className="text-xl font-display font-semibold mb-4">Activity Tracking</h2>
          <ActivityTracker />
        </section>
        
        {/* Wellness Flows */}
        <section className="animate-fade-in">
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
      </main>
    </div>
  );
};

export default Dashboard;
