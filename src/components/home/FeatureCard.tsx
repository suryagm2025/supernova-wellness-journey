
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: string;
  iconBgClass?: string;
  iconTextClass?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay = '0.1s',
  iconBgClass = 'bg-supernova-blue/10',
  iconTextClass = 'text-supernova-blue'
}) => {
  return (
    <div className="animate-fade-in" style={{ animationDelay: delay }}>
      <GlassMorphicCard className="p-8 h-full transition-transform hover:scale-105 duration-300">
        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-full ${iconBgClass} flex items-center justify-center mb-6`}>
            {icon}
          </div>
          <h3 className="text-xl font-display mb-4">{title}</h3>
          <p className="text-gray-400 mb-6">
            {description}
          </p>
        </div>
      </GlassMorphicCard>
    </div>
  );
};

export default FeatureCard;
