
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';

interface ErrorCardProps {
  icon: string;
  title: string;
  message: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ icon, title, message }) => {
  return (
    <GlassMorphicCard className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <span className="text-xl">{icon}</span>
        </div>
        <h3 className="font-display">{title}</h3>
      </div>
      <p className="text-gray-300">
        {message}
      </p>
    </GlassMorphicCard>
  );
};

export default ErrorCard;
