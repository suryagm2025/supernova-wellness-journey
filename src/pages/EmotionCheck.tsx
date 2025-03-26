
import React from 'react';
import EmotionBasedPersonalization from '../components/emotion/EmotionBasedPersonalization';
import { SmilePlus } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const EmotionCheck = () => {
  return (
    <Layout>
      <div className="pt-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-pink/20 p-3 rounded-full mb-4">
              <SmilePlus size={32} className="text-supernova-pink" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Mood Check-In</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Let us know how you're feeling today, and we'll provide personalized suggestions to support your wellness journey.
            </p>
          </div>
          
          <EmotionBasedPersonalization />
        </div>
      </div>
    </Layout>
  );
};

export default EmotionCheck;
