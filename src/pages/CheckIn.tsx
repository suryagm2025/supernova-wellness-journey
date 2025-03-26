
import React from 'react';
import MorningCheckIn from '../components/forms/MorningCheckIn';
import { Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const CheckIn = () => {
  return (
    <Layout>
      <div className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-blue/20 p-3 rounded-full mb-4">
              <Clock size={32} className="text-supernova-blue" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Morning Check-In</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Start your day strong by checking in. This helps build healthy habits and gives SuperinovaAI data to provide personalized recommendations.
            </p>
          </div>
          
          <MorningCheckIn />
        </div>
      </div>
    </Layout>
  );
};

export default CheckIn;
