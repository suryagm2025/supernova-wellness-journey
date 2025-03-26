
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, SmilePlus } from 'lucide-react';

interface NavigationProps {
  isPublicPage: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isPublicPage }) => {
  const location = useLocation();
  
  // Check if a nav link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (isPublicPage) {
    return null;
  }

  return (
    <nav className="hidden md:flex ml-10 space-x-6">
      <Link to="/" className={`nav-link ${isActive('/') ? 'text-supernova-blue font-medium' : 'text-gray-300 hover:text-white'}`}>
        Home
      </Link>
      <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'text-supernova-blue font-medium' : 'text-gray-300 hover:text-white'}`}>
        Dashboard
      </Link>
      <Link to="/programs" className={`nav-link ${isActive('/programs') ? 'text-supernova-blue font-medium' : 'text-gray-300 hover:text-white'}`}>
        Programs
      </Link>
      <Link to="/streak" className={`nav-link ${isActive('/streak') ? 'text-supernova-blue font-medium' : 'text-gray-300 hover:text-white'} flex items-center`}>
        Streak <Flame size={16} className="ml-1 text-supernova-blue" />
      </Link>
      <Link to="/emotion-check" className={`nav-link ${isActive('/emotion-check') ? 'text-supernova-blue font-medium' : 'text-gray-300 hover:text-white'} flex items-center`}>
        Mood <SmilePlus size={16} className="ml-1 text-supernova-pink" />
      </Link>
      <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'text-supernova-blue font-medium' : 'text-gray-300 hover:text-white'}`}>
        Blog
      </Link>
      <Link to="/faq" className={`nav-link ${isActive('/faq') ? 'text-supernova-blue font-medium' : 'text-gray-300 hover:text-white'}`}>
        FAQ
      </Link>
    </nav>
  );
};

export default Navigation;
