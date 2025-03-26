
import React from 'react';
import { useWaterIntake } from '@/hooks/water/useWaterIntake';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Droplet } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import WaterVisualization from '@/components/water/WaterVisualization';
import QuickAdjustControls from '@/components/water/QuickAdjustControls';
import WaterIntakeForm from '@/components/water/WaterIntakeForm';
import QuickLogButtons from '@/components/water/QuickLogButtons';
import WaterIntakeHistory from '@/components/water/WaterIntakeHistory';

const WaterIntake = () => {
  const { 
    waterAmount, 
    setWaterAmount, 
    totalWater, 
    setTotalWater, 
    isSubmitting, 
    handleSubmit, 
    adjustWater 
  } = useWaterIntake();
  
  const { user } = useAuth();

  const updateTotalWater = (newTotal: number) => {
    setTotalWater(newTotal);
  };

  return (
    <div className="min-h-screen">
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-blue/20 p-3 rounded-full mb-4">
              <Droplet size={32} className="text-supernova-blue" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Water Intake</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your hydration throughout the day to ensure you're getting enough water for optimal health.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <GlassMorphicCard className="p-6">
              <h3 className="text-xl font-display font-semibold mb-6">Today's Hydration</h3>
              
              <WaterVisualization totalWater={totalWater} />
              
              <QuickAdjustControls 
                onAdjust={adjustWater}
                isSubmitting={isSubmitting}
              />
            </GlassMorphicCard>
            
            <GlassMorphicCard className="p-6">
              <h3 className="text-xl font-display font-semibold mb-6">Log Water Intake</h3>
              
              <WaterIntakeForm 
                waterAmount={waterAmount}
                onWaterAmountChange={setWaterAmount}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
              
              <QuickLogButtons 
                onQuickLog={setWaterAmount}
              />
            </GlassMorphicCard>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <GlassMorphicCard className="p-6">
              <WaterIntakeHistory 
                userId={user?.id}
                onTotalUpdate={updateTotalWater}
              />
            </GlassMorphicCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WaterIntake;
