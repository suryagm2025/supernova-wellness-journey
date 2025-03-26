
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationHeaderProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ 
  isMobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  return (
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <NavLink to="/" className="text-xl font-semibold text-white">
        Supernova
      </NavLink>
      
      <button
        className="md:hidden text-gray-400 hover:text-white focus:outline-none"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default NavigationHeader;
