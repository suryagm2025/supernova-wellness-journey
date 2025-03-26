
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Sun, Clock, MoonStar, X } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useAuth } from '@/context/AuthContext';

type FlowType = 'morning' | 'midday' | 'evening' | null;

// Time ranges for different flows (in 24-hour format)
const TIME_RANGES = {
  morning: { start: 5, end: 10 }, // 5AM to 10AM
  midday: { start: 12, end: 14 }, // 12PM to 2PM
  evening: { start: 19, end: 23 }, // 7PM to 11PM
};

// Fake data for demo purposes - this would come from your app's state in a real app
const DEMO_DATA = {
  waterIntake: 6,
  meals: 2,
  sleepQuality: 'Good',
  steps: 5200,
  activities: ['Morning yoga', 'Walk with dog'],
};

const TimeBasedFlow: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<FlowType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState<string>('');
  const [energy, setEnergy] = useState<string>('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Only show flows for logged in users
    if (!user) {
      setCurrentFlow(null);
      return;
    }

    // Check the current time and set the appropriate flow
    const checkTimeForFlow = () => {
      const now = new Date();
      const currentHour = now.getHours();

      // Morning flow (5AM - 10AM)
      if (currentHour >= TIME_RANGES.morning.start && currentHour < TIME_RANGES.morning.end) {
        setCurrentFlow('morning');
      }
      // Midday flow (12PM - 2PM)
      else if (currentHour >= TIME_RANGES.midday.start && currentHour < TIME_RANGES.midday.end) {
        setCurrentFlow('midday');
      }
      // Evening flow (7PM - 11PM)
      else if (currentHour >= TIME_RANGES.evening.start && currentHour < TIME_RANGES.evening.end) {
        setCurrentFlow('evening');
      }
      else {
        setCurrentFlow(null);
      }
    };

    checkTimeForFlow();
    
    // Check for demonstration purposes in development
    const flowFromUrl = new URLSearchParams(window.location.search).get('flow');
    if (flowFromUrl === 'morning' || flowFromUrl === 'midday' || flowFromUrl === 'evening') {
      setCurrentFlow(flowFromUrl);
    }

    // Show flow dialog if we have an active flow
    if (currentFlow) {
      // Wait a moment before showing the flow to ensure the page has loaded
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentFlow, user]);

  const handleMorningSubmit = () => {
    if (!mood || !energy) {
      toast.error('Please complete both fields');
      return;
    }
    
    toast.success('Morning check-in completed!');
    setIsOpen(false);
    navigate('/checkin');
  };

  const handleMiddayAction = (action: 'water' | 'meals') => {
    setIsOpen(false);
    if (action === 'water') {
      navigate('/water');
    } else {
      navigate('/meals');
    }
  };

  const handleEveningAction = () => {
    setIsOpen(false);
    navigate('/evening');
  };

  const getFlowContent = () => {
    switch (currentFlow) {
      case 'morning':
        return (
          <>
            <DrawerHeader>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-supernova-blue/20 p-2 rounded-lg">
                  <Sun size={20} className="text-supernova-blue" />
                </span>
                <DrawerTitle>Good Morning!</DrawerTitle>
              </div>
              <DrawerDescription>
                How did you sleep? Ready to start your day?
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm text-gray-300">How's your mood this morning?</label>
                <select 
                  value={mood} 
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                >
                  <option value="">Select your mood</option>
                  <option value="great">Great</option>
                  <option value="good">Good</option>
                  <option value="okay">Okay</option>
                  <option value="tired">Tired</option>
                  <option value="stressed">Stressed</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm text-gray-300">Energy level?</label>
                <select 
                  value={energy} 
                  onChange={(e) => setEnergy(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                >
                  <option value="">Select energy level</option>
                  <option value="high">High Energy</option>
                  <option value="medium">Medium Energy</option>
                  <option value="low">Low Energy</option>
                  <option value="very-low">Very Low Energy</option>
                </select>
              </div>
            </div>
            
            <DrawerFooter>
              <button
                onClick={handleMorningSubmit}
                className="w-full button-glow bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5"
              >
                Start Morning Check-in
              </button>
              <DrawerClose asChild>
                <button className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  Maybe Later
                </button>
              </DrawerClose>
            </DrawerFooter>
          </>
        );
        
      case 'midday':
        return (
          <>
            <DrawerHeader>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-supernova-purple/20 p-2 rounded-lg">
                  <Clock size={20} className="text-supernova-purple" />
                </span>
                <DrawerTitle>Midday Check-in</DrawerTitle>
              </div>
              <DrawerDescription>
                How's your day going so far?
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4 space-y-4">
              <GlassMorphicCard className="p-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-300">Current water intake:</p>
                  <p className="text-supernova-blue font-semibold">{DEMO_DATA.waterIntake} glasses</p>
                </div>
                <div className="mt-2">
                  <div className="bg-white/10 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-supernova-blue h-full rounded-full" 
                      style={{width: `${(DEMO_DATA.waterIntake / 8) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Goal: 8 glasses</p>
                </div>
              </GlassMorphicCard>
              
              <p className="text-center text-gray-300 py-2">
                Need to track something?
              </p>
            </div>
            
            <DrawerFooter className="space-y-3">
              <button
                onClick={() => handleMiddayAction('water')}
                className="w-full bg-supernova-dark border border-supernova-blue/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5"
              >
                Log Water Intake
              </button>
              <button
                onClick={() => handleMiddayAction('meals')}
                className="w-full bg-supernova-dark border border-supernova-purple/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5"
              >
                Log Meal
              </button>
              <DrawerClose asChild>
                <button className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  I'm Good
                </button>
              </DrawerClose>
            </DrawerFooter>
          </>
        );
        
      case 'evening':
        return (
          <>
            <DrawerHeader>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-supernova-pink/20 p-2 rounded-lg">
                  <MoonStar size={20} className="text-supernova-pink" />
                </span>
                <DrawerTitle>Evening Summary</DrawerTitle>
              </div>
              <DrawerDescription>
                Here's how your day went
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4 space-y-4">
              <GlassMorphicCard className="p-4">
                <h4 className="text-white font-medium mb-2">Today's Overview</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Water intake:</span>
                    <span className="text-supernova-blue">{DEMO_DATA.waterIntake} glasses</span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Meals logged:</span>
                    <span className="text-supernova-purple">{DEMO_DATA.meals}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Steps:</span>
                    <span className="text-supernova-blue">{DEMO_DATA.steps}</span>
                  </li>
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">Activities:</span>
                    <span className="text-supernova-purple">{DEMO_DATA.activities.length}</span>
                  </li>
                </ul>
              </GlassMorphicCard>
              
              <GlassMorphicCard className="p-4">
                <h4 className="text-white font-medium mb-2">AI Insights</h4>
                <p className="text-gray-300 text-sm">
                  You completed {DEMO_DATA.waterIntake} glasses of water today. Try to reach 8 glasses tomorrow.
                  Get ready for a good night's sleep by avoiding screens 30 minutes before bed!
                </p>
              </GlassMorphicCard>
            </div>
            
            <DrawerFooter>
              <button
                onClick={handleEveningAction}
                className="w-full button-glow bg-supernova-dark border border-supernova-pink/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5"
              >
                Complete Evening Check-in
              </button>
              <DrawerClose asChild>
                <button className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  Later Tonight
                </button>
              </DrawerClose>
            </DrawerFooter>
          </>
        );
        
      default:
        return null;
    }
  };

  // Don't render anything if no flow is active
  if (!currentFlow) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        {getFlowContent()}
      </DrawerContent>
    </Drawer>
  );
};

export default TimeBasedFlow;
