
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
    >
      <img 
        src="/lovable-uploads/ca833c22-f00c-4c1c-8afb-04cb6dacfe6f.png" 
        alt="SuperinovaAI" 
        className={`${sizeClasses[size]} w-auto object-contain`} 
      />
      {withText && (
        <span className="font-display font-bold text-white text-xl tracking-wider">
          SUPERNOVA<span className="text-supernova-blue">AI</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
