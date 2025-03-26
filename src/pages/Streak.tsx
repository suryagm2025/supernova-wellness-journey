
import React from 'react';
import Header from '../components/layout/Header';
import StreakDashboard from '../components/streak/StreakDashboard';
import { Flame } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const Streak = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/streak' } });
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect, no need to render anything
  }
  
  return (
    <Layout>
      <div className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-blue/20 p-3 rounded-full mb-4">
              <Flame size={32} className="text-supernova-blue" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Wellness Streak</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your consistency and unlock achievements as you maintain your daily check-ins.
              Building habits is all about consistency!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <StreakDashboard />
          </div>
          
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-display font-semibold mb-4">Ready for Today's Wellness Activities?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => navigate('/check-in')}
                className="bg-supernova-blue hover:bg-supernova-blue/80"
              >
                Morning Check-In
              </Button>
              <Button 
                onClick={() => navigate('/water')}
                className="bg-supernova-blue/80 hover:bg-supernova-blue"
              >
                Track Water
              </Button>
              <Button 
                onClick={() => navigate('/suggestions')}
                className="bg-supernova-dark border border-supernova-blue/30 hover:bg-white/5"
              >
                View Suggestions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Streak;
