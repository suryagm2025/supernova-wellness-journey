
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GlassMorphicCard from '../components/ui/GlassMorphicCard';
import { Utensils, Upload, Clock, Check } from 'lucide-react';
import { toast } from 'sonner';

const MealLog = () => {
  const [mealDescription, setMealDescription] = useState('');
  const [selectedMealTime, setSelectedMealTime] = useState('breakfast');
  const [uploadMode, setUploadMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadMode) {
      toast.success('Photo upload simulated for meal analysis!');
    } else if (!mealDescription) {
      toast.error('Please describe your meal');
      return;
    } else {
      toast.success(`${selectedMealTime.charAt(0).toUpperCase() + selectedMealTime.slice(1)} logged successfully!`);
    }
    
    setMealDescription('');
    setUploadMode(false);
  };

  const mealTimes = [
    { id: 'breakfast', label: 'Breakfast', icon: <Clock size={16} /> },
    { id: 'lunch', label: 'Lunch', icon: <Clock size={16} /> },
    { id: 'dinner', label: 'Dinner', icon: <Clock size={16} /> },
    { id: 'snack', label: 'Snack', icon: <Clock size={16} /> },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center bg-supernova-purple/20 p-3 rounded-full mb-4">
              <Utensils size={32} className="text-supernova-purple" />
            </div>
            <h1 className="text-3xl font-display font-semibold mb-2">Log a Meal</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track your meals easily to maintain nutritional awareness and receive personalized recommendations.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <GlassMorphicCard className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-300">Meal Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {mealTimes.map((meal) => (
                      <button
                        key={meal.id}
                        type="button"
                        onClick={() => setSelectedMealTime(meal.id)}
                        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                          selectedMealTime === meal.id
                            ? 'bg-supernova-purple/20 border border-supernova-purple/40 text-white'
                            : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {meal.icon}
                        <span>{meal.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="block text-sm text-gray-300">
                      What did you have for {selectedMealTime}?
                    </label>
                    <button
                      type="button"
                      onClick={() => setUploadMode(!uploadMode)}
                      className={`text-xs px-2 py-1 rounded-full transition-colors ${
                        uploadMode
                          ? 'bg-supernova-purple/20 text-supernova-purple'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {uploadMode ? (
                        <span className="flex items-center">
                          <Check size={12} className="mr-1" /> Photo Mode
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Upload size={12} className="mr-1" /> Upload Photo
                        </span>
                      )}
                    </button>
                  </div>
                  
                  {uploadMode ? (
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center bg-white/5">
                      <Upload size={36} className="mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-300 text-sm mb-2">Upload a photo of your meal</p>
                      <p className="text-gray-400 text-xs">Our AI will analyze your food and provide nutritional information</p>
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 bg-supernova-purple/20 hover:bg-supernova-purple/30 text-supernova-purple rounded-lg text-sm transition-colors"
                      >
                        Select Image
                      </button>
                    </div>
                  ) : (
                    <textarea
                      value={mealDescription}
                      onChange={(e) => setMealDescription(e.target.value)}
                      placeholder="e.g. 2 boiled eggs and toast"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-supernova-purple/50 transition-all min-h-[120px]"
                    />
                  )}
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full button-glow bg-supernova-dark border border-supernova-purple/30 rounded-lg px-6 py-3 text-white font-medium transition-all hover:bg-white/5 hover:border-supernova-purple/50"
                  >
                    {uploadMode ? 'Analyze & Log Meal' : 'Log Meal'}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-gray-400 text-sm">
                  <span className="text-supernova-purple">Example:</span> "2 boiled eggs and toast"
                </p>
              </div>
            </GlassMorphicCard>
            
            <div className="mt-8">
              <GlassMorphicCard className="p-6">
                <h3 className="text-lg font-display font-semibold mb-4">Today's Meals</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 pb-4 border-b border-white/10">
                    <div className="p-2 rounded-lg bg-white/5 text-supernova-purple">
                      <Utensils size={20} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-white font-medium">Breakfast</h4>
                        <span className="ml-2 text-xs bg-supernova-purple/20 text-supernova-purple px-2 py-0.5 rounded-full">
                          7:30 AM
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">Oatmeal with berries and honey</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-white/5 text-supernova-purple">
                      <Utensils size={20} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-white font-medium">Lunch</h4>
                        <span className="ml-2 text-xs bg-supernova-purple/20 text-supernova-purple px-2 py-0.5 rounded-full">
                          12:15 PM
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">Chicken salad with avocado</p>
                    </div>
                  </div>
                </div>
              </GlassMorphicCard>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MealLog;
