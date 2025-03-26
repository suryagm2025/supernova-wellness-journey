
import React from 'react';
import GlassMorphicCard from '../ui/GlassMorphicCard';

interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  delay?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  delay = '0s'
}) => {
  return (
    <div className="animate-fade-in" style={{ animationDelay: delay }}>
      <GlassMorphicCard className="p-8 h-full">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <p className="text-xl italic mb-6">
              "{quote}"
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              <img src={author.image} alt={`${author.name} testimonial`} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-bold">{author.name}</h4>
              <p className="text-gray-400">{author.role}</p>
            </div>
          </div>
        </div>
      </GlassMorphicCard>
    </div>
  );
};

export default TestimonialCard;
