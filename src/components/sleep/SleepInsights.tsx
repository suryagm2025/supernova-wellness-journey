
import React from 'react';
import { Calendar, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SleepInsights: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex items-center mb-4">
        <Calendar className="text-supernova-pink mr-3" size={24} />
        <h2 className="text-xl font-display font-semibold">Sleep Insights</h2>
      </div>
      
      <div className="space-y-6">
        <p className="text-gray-300">
          Track your sleep patterns to see personalized insights about your rest quality.
        </p>
        
        <div className="bg-supernova-dark/50 rounded-lg p-4">
          <p className="text-sm text-gray-300 mb-2">Your recent sleep average:</p>
          <div className="flex items-baseline">
            <span className="text-3xl font-display mr-2">7.2</span>
            <span className="text-gray-400">hours per night</span>
          </div>
        </div>
        
        <Button
          onClick={() => navigate('/sleep')}
          className="w-full bg-supernova-gold/80 hover:bg-supernova-gold"
        >
          <Bed size={16} className="mr-2" /> Log Tonight's Sleep
        </Button>
      </div>
    </div>
  );
};

export default SleepInsights;
