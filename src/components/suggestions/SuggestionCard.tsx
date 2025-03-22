
import React, { ReactNode } from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';

interface SuggestionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  actionButton?: ReactNode;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ 
  title, 
  icon, 
  children, 
  actionButton 
}) => {
  return (
    <GlassMorphicCard className="p-6">
      <h3 className="text-lg font-display font-semibold mb-4 flex items-center">
        <span className="mr-2 text-supernova-blue">{icon}</span>
        {title}
      </h3>
      {children}
      {actionButton && (
        <div className="mt-4">
          {actionButton}
        </div>
      )}
    </GlassMorphicCard>
  );
};

export default SuggestionCard;
