
import React from 'react';
import { cn } from '@/lib/utils';
import GlassMorphicCard from '../ui/GlassMorphicCard';

interface WellnessMetricProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  glowColor?: 'blue' | 'purple' | 'pink' | 'none';
}

const WellnessMetric: React.FC<WellnessMetricProps> = ({
  title,
  value,
  icon,
  change,
  className,
  glowColor = 'blue'
}) => {
  return (
    <GlassMorphicCard className={cn('p-6', className)} glowColor={glowColor}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h4 className="text-2xl font-display font-semibold mt-1">{value}</h4>
          
          {change && (
            <div className={`flex items-center mt-2 ${change.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <span className="text-xs font-medium">
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="text-xs text-gray-400 ml-1">vs. yesterday</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-lg bg-white/5">
          {icon}
        </div>
      </div>
    </GlassMorphicCard>
  );
};

export default WellnessMetric;
