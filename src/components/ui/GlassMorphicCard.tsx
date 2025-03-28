
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphicCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'pink' | 'none';
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GlassMorphicCard: React.FC<GlassMorphicCardProps> = ({
  children,
  className,
  glowColor = 'blue',
  hoverEffect = true,
  onClick
}) => {
  const glowClasses = {
    blue: 'hover:shadow-glow-blue',
    purple: 'hover:shadow-glow-purple',
    pink: 'hover:shadow-glow-pink',
    none: ''
  };

  return (
    <div
      className={cn(
        'glass-card',
        hoverEffect && 'hover:scale-[1.02] hover:bg-white/10',
        hoverEffect && glowClasses[glowColor],
        'transition-all duration-300',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassMorphicCard;
