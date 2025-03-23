
import React from 'react';
import { Sun, Droplet, Utensils, Moon } from 'lucide-react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Link } from 'react-router-dom';

interface WellnessBlockProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  glowColor: 'blue' | 'purple' | 'pink' | 'none';
  to: string;
}

const WellnessBlock: React.FC<WellnessBlockProps> = ({ icon, title, description, glowColor, to }) => {
  return (
    <Link to={to} className="block w-full">
      <GlassMorphicCard className="p-6 h-full transition-transform hover:scale-105" glowColor={glowColor}>
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-display mb-3">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </GlassMorphicCard>
    </Link>
  );
};

const WellnessBlocks: React.FC = () => {
  const blocks = [
    {
      icon: <Sun size={28} className="text-supernova-blue" />,
      title: "Morning Mindfulness",
      description: "Start your day with purpose using guided meditations tailored to your energy levels.",
      glowColor: 'blue' as const,
      to: "/checkin"
    },
    {
      icon: <Droplet size={28} className="text-supernova-purple" />,
      title: "Hydration Tracker",
      description: "Smart reminders to keep you hydrated throughout the day based on your activity.",
      glowColor: 'purple' as const,
      to: "/waterintake"
    },
    {
      icon: <Utensils size={28} className="text-supernova-pink" />,
      title: "Smart Meal Logging",
      description: "Effortlessly log meals with AI that learns your preferences and nutritional needs.",
      glowColor: 'pink' as const,
      to: "/meallog"
    },
    {
      icon: <Moon size={28} className="text-supernova-blue" />,
      title: "Evening Wind-down",
      description: "Personalized evening routines to optimize your sleep and prepare for tomorrow.",
      glowColor: 'blue' as const,
      to: "/eveningcheck"
    }
  ];

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {blocks.map((block, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <WellnessBlock {...block} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessBlocks;
