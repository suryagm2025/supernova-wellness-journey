
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';
import { CheckCircle } from 'lucide-react';

interface DetailedFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  iconWrapperClass?: string;
  iconClass?: string;
}

const DetailedFeatureCard: React.FC<DetailedFeatureCardProps> = ({
  icon,
  title,
  description,
  features,
  testimonial,
  iconWrapperClass = "bg-supernova-blue/20",
  iconClass = "text-supernova-blue"
}) => {
  return (
    <GlassMorphicCard className="p-8">
      <div className="flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full ${iconWrapperClass} flex items-center justify-center`}>
            {icon}
          </div>
          <h3 className="text-xl font-display">{title}</h3>
        </div>
        <p className="text-gray-300 mb-4">
          {description}
        </p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className={`h-5 w-5 ${iconClass} shrink-0 mt-0.5 mr-2`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="bg-white/5 p-4 rounded-lg italic text-sm">
          "{testimonial.quote}" — {testimonial.author}, {testimonial.role}
        </div>
      </div>
    </GlassMorphicCard>
  );
};

export default DetailedFeatureCard;
