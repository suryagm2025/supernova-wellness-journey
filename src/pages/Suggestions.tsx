import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Brain, Droplet, Utensils, Activity, Check, MoonStar, Sun } from 'lucide-react';
import { toast } from 'sonner';

const Suggestions = () => {
  const [hydrationGoal, setHydrationGoal] = useState('8 glasses');
  const [mealSuggestions, setMealSuggestions] = useState([
    'Grilled Chicken Salad',
    'Salmon with Roasted Vegetables',
  ]);
  const [activitySuggestions, setActivitySuggestions] = useState([
    '30-minute brisk walk',
    'Yoga session',
  ]);
  const [sleepHygiene, setSleepHygiene] = useState([
    'Maintain a consistent sleep schedule',
    'Create a relaxing bedtime routine',
  ]);
  const [mindfulnessPractices, setMindfulnessPractices] = useState([
    '5-minute meditation',
    'Deep breathing exercises',
  ]);
  const [isHydrationComplete, setIsHydrationComplete] = useState(false);
  const [isEveningMode, setIsEveningMode] = useState(false);

  const handleHydrationCheck = () => {
    setIsHydrationComplete(true);
    toast.success('Great job on meeting your hydration goal!');
  };

  const toggleEveningMode = () => {
    setIsEveningMode(!isEveningMode);
    toast.info(`Evening mode ${isEveningMode ? 'disabled' : 'enabled'}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-white/10 p-3 rounded-full mb-4">
              <Brain size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Wellness Suggestions</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              AI-powered personalized recommendations to optimize your wellness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <GlassMorphicCard className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center">
                <Droplet size={20} className="mr-2 text-supernova-blue" />
                Hydration
              </h3>
              <p className="text-gray-400 mb-4">Goal: {hydrationGoal}</p>
              <button
                onClick={handleHydrationCheck}
                disabled={isHydrationComplete}
                className={`w-full button-glow rounded-lg px-4 py-2 text-white font-medium transition-all ${
                  isHydrationComplete
                    ? 'bg-green-500 hover:bg-green-600 cursor-not-allowed'
                    : 'bg-supernova-dark border border-supernova-blue/30 hover:bg-white/5 hover:border-supernova-blue/50'
                }`}
              >
                {isHydrationComplete ? (
                  <div className="flex items-center justify-center">
                    <Check size={16} className="mr-2" />
                    Completed
                  </div>
                ) : (
                  'Mark as Complete'
                )}
              </button>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center">
                <Utensils size={20} className="mr-2 text-supernova-blue" />
                Meal Suggestions
              </h3>
              <ul className="list-disc list-inside text-gray-400">
                {mealSuggestions.map((meal, index) => (
                  <li key={index}>{meal}</li>
                ))}
              </ul>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center">
                <Activity size={20} className="mr-2 text-supernova-blue" />
                Activity
              </h3>
              <ul className="list-disc list-inside text-gray-400">
                {activitySuggestions.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center">
                <MoonStar size={20} className="mr-2 text-supernova-blue" />
                Sleep Hygiene
              </h3>
              <ul className="list-disc list-inside text-gray-400">
                {sleepHygiene.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
              
              <button
                onClick={toggleEveningMode}
                className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-4 py-2 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-blue/50 mt-4 flex items-center justify-center"
              >
                {isEveningMode ? (
                  <>
                    <Sun size={16} className="mr-2" /> Disable Evening Mode
                  </>
                ) : (
                  <>
                    <MoonStar size={16} className="mr-2" /> Enable Evening Mode
                  </>
                )}
              </button>
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center">
                <Brain size={20} className="mr-2 text-supernova-blue" />
                Mindfulness
              </h3>
              <ul className="list-disc list-inside text-gray-400">
                {mindfulnessPractices.map((practice, index) => (
                  <li key={index}>{practice}</li>
                ))}
              </ul>
            </GlassMorphicCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Custom icon component for the MoonIcon since it's used elsewhere
export const MoonIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => {
  return <MoonStar size={size} className={className} />;
};

// Custom icon component for the SunIcon
export const SunIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => {
  return <Sun size={size} className={className} />;
};

export default Suggestions;
