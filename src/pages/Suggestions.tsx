
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Brain, Droplet, Utensils, Activity, Check } from 'lucide-react';
import { toast } from 'sonner';

const Suggestions = () => {
  const [showFullPlan, setShowFullPlan] = useState(false);

  const handleGetFullPlan = () => {
    setShowFullPlan(true);
    toast.success('Tomorrow\'s wellness plan generated!');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-purple/20 p-3 rounded-full mb-4">
              <Brain size={32} className="text-supernova-purple" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Wellness Insights</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              AI-generated suggestions and insights based on your wellness data to help optimize your health journey.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <GlassMorphicCard className="p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-semibold flex items-center">
                  <Brain size={24} className="mr-3 text-supernova-purple" />
                  Today's Smart Suggestions
                </h3>
                <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                  Based on today's data
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-supernova-blue/10 mr-3">
                      <Utensils size={20} className="text-supernova-blue" />
                    </div>
                    <h4 className="font-medium">Nutrition Tip</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Add more fiber-rich foods to your diet today. Consider adding a serving of berries to your breakfast or snacks.
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-supernova-purple/10 mr-3">
                      <Activity size={20} className="text-supernova-purple" />
                    </div>
                    <h4 className="font-medium">Movement Tip</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Try a 10-minute walk after dinner to aid digestion and boost your daily step count.
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-supernova-pink/10 mr-3">
                      <Brain size={20} className="text-supernova-pink" />
                    </div>
                    <h4 className="font-medium">Mindset Tip</h4>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Write one line of gratitude before bed tonight to improve sleep quality and overall well-being.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={handleGetFullPlan}
                  className="px-6 py-3 button-glow bg-supernova-dark border border-supernova-purple/30 hover:border-supernova-purple/50 rounded-lg text-white font-medium transition-all hover:bg-white/5"
                >
                  Generate Full Plan for Tomorrow
                </button>
              </div>
            </GlassMorphicCard>
            
            {showFullPlan && (
              <GlassMorphicCard className="p-8 animate-fade-in">
                <h3 className="text-xl font-display font-semibold mb-6">
                  Tomorrow's Wellness Plan
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                    <h4 className="text-lg font-medium mb-4 flex items-center">
                      <Clock size={18} className="mr-2 text-supernova-blue" />
                      Morning Routine (6:30 AM - 9:00 AM)
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-blue" />
                        <div>
                          <p className="text-white font-medium text-sm">Wake up at 6:30 AM</p>
                          <p className="text-gray-400 text-xs">Consistent wake times help regulate your circadian rhythm</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-blue" />
                        <div>
                          <p className="text-white font-medium text-sm">Drink 500ml of water</p>
                          <p className="text-gray-400 text-xs">Rehydrate after sleep to kickstart metabolism</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-blue" />
                        <div>
                          <p className="text-white font-medium text-sm">5-minute stretching routine</p>
                          <p className="text-gray-400 text-xs">Gentle movement to wake up your body</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-blue" />
                        <div>
                          <p className="text-white font-medium text-sm">Protein-rich breakfast</p>
                          <p className="text-gray-400 text-xs">Suggested: Greek yogurt with berries and nuts</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                    <h4 className="text-lg font-medium mb-4 flex items-center">
                      <Sun size={18} className="mr-2 text-supernova-purple" />
                      Daytime Focus (9:00 AM - 5:00 PM)
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-purple" />
                        <div>
                          <p className="text-white font-medium text-sm">Hydration reminder every 2 hours</p>
                          <p className="text-gray-400 text-xs">Aim for 2L total during working hours</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-purple" />
                        <div>
                          <p className="text-white font-medium text-sm">Mindful lunch break</p>
                          <p className="text-gray-400 text-xs">Suggested: Salad with lean protein and whole grains</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-purple" />
                        <div>
                          <p className="text-white font-medium text-sm">5-minute movement break every 2 hours</p>
                          <p className="text-gray-400 text-xs">Stand up, stretch, or take a short walk</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-purple" />
                        <div>
                          <p className="text-white font-medium text-sm">Afternoon fruit snack</p>
                          <p className="text-gray-400 text-xs">Natural sugars for energy without crashing</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                    <h4 className="text-lg font-medium mb-4 flex items-center">
                      <Moon size={18} className="mr-2 text-supernova-pink" />
                      Evening Unwinding (5:00 PM - 10:30 PM)
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-pink" />
                        <div>
                          <p className="text-white font-medium text-sm">30-minute workout</p>
                          <p className="text-gray-400 text-xs">Moderate intensity cardio or strength training</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-pink" />
                        <div>
                          <p className="text-white font-medium text-sm">Balanced dinner</p>
                          <p className="text-gray-400 text-xs">Suggested: Grilled fish with vegetables and quinoa</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-pink" />
                        <div>
                          <p className="text-white font-medium text-sm">No screens after 9:30 PM</p>
                          <p className="text-gray-400 text-xs">Blue light reduction for better sleep quality</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="mt-1 mr-2 text-supernova-pink" />
                        <div>
                          <p className="text-white font-medium text-sm">Bedtime relaxation routine</p>
                          <p className="text-gray-400 text-xs">10 minutes of reading or meditation before sleep</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </GlassMorphicCard>
            )}
            
            <div className="mt-8">
              <h3 className="text-xl font-display font-semibold mb-6">Weekly Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassMorphicCard className="p-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center">
                    <Droplet size={20} className="mr-2 text-supernova-blue" />
                    Hydration Analysis
                  </h4>
                  <div className="space-y-4">
                    <p className="text-gray-300 text-sm">
                      Your average daily water intake this week was 1.8L, which is below your 2.5L goal.
                    </p>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h5 className="text-white text-sm font-medium mb-2">Recommendations:</h5>
                      <ul className="text-gray-400 text-xs space-y-2">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mt-1 mr-2"></span>
                          Set reminders to drink water every 2 hours
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mt-1 mr-2"></span>
                          Keep a water bottle visible on your desk
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-supernova-blue mt-1 mr-2"></span>
                          Increase intake by 250ml each day until you reach your goal
                        </li>
                      </ul>
                    </div>
                  </div>
                </GlassMorphicCard>
                
                <GlassMorphicCard className="p-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center">
                    <Activity size={20} className="mr-2 text-supernova-purple" />
                    Activity Progress
                  </h4>
                  <div className="space-y-4">
                    <p className="text-gray-300 text-sm">
                      You've increased your daily step count by 18% compared to last week. Great improvement!
                    </p>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h5 className="text-white text-sm font-medium mb-2">Recommendations:</h5>
                      <ul className="text-gray-400 text-xs space-y-2">
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-supernova-purple mt-1 mr-2"></span>
                          Add 500 more steps to your daily goal next week
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-supernova-purple mt-1 mr-2"></span>
                          Try a new 20-minute workout routine twice this week
                        </li>
                        <li className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-supernova-purple mt-1 mr-2"></span>
                          Schedule a longer activity session on the weekend
                        </li>
                      </ul>
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

export default Suggestions;

function Clock({ size, className }: { size: number; className?: string }) {
  return <span className={className}><svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>;
}

function Sun({ size, className }: { size: number; className?: string }) {
  return <span className={className}><svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>;
}
