
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { ArrowUpRight } from 'lucide-react';

export interface WellnessMetricProps {
  icon: React.ReactNode;
  title: string;
  current: number;
  goal: number;
  unit: string;
  href: string;
}

const WellnessMetric: React.FC<WellnessMetricProps> = ({
  icon,
  title,
  current,
  goal,
  unit,
  href
}) => {
  const navigate = useNavigate();
  const percentage = Math.min(Math.round((current / goal) * 100), 100);
  
  return (
    <GlassMorphicCard className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-display text-lg">{title}</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full hover:bg-white/10"
          onClick={() => navigate(href)}
        >
          <ArrowUpRight size={16} />
        </Button>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-end mb-1.5">
          <div className="text-2xl font-display">
            {current} <span className="text-sm text-gray-400">{unit}</span>
          </div>
          <div className="text-sm text-gray-400">
            Goal: {goal} {unit}
          </div>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
    </GlassMorphicCard>
  );
};

export default WellnessMetric;
