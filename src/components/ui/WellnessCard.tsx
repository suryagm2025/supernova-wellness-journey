
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import GlassMorphicCard from './GlassMorphicCard';
import { ArrowRight } from 'lucide-react';

interface WellnessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  glowColor?: 'blue' | 'purple' | 'pink' | 'none';
  className?: string;
}

const WellnessCard: React.FC<WellnessCardProps> = ({
  title,
  description,
  icon,
  to,
  glowColor = 'blue',
  className
}) => {
  return (
    <Link to={to} className="block w-full">
      <GlassMorphicCard
        glowColor={glowColor}
        className={cn('p-6 h-full', className)}
      >
        <div className="flex flex-col h-full">
          <div className="mb-4 text-supernova-blue">{icon}</div>
          <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-6 flex-grow">{description}</p>
          <div className="flex justify-end mt-auto">
            <span className="text-supernova-blue flex items-center text-sm font-medium">
              Track now <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </div>
        </div>
      </GlassMorphicCard>
    </Link>
  );
};

export default WellnessCard;
