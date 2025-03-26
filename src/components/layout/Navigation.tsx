
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame } from 'lucide-react';

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
      <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
        Home
      </Link>
      <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
        Dashboard
      </Link>
      <Link to="/programs" className={`nav-link ${isActive('/programs') ? 'active' : ''}`}>
        Programs
      </Link>
      <Link to="/streak" className={`nav-link ${isActive('/streak') ? 'active' : ''} flex items-center`}>
        Streak <Flame size={16} className="ml-1 text-supernova-blue" />
      </Link>
      <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
        Blog
      </Link>
      <Link to="/faq" className={`nav-link ${isActive('/faq') ? 'active' : ''}`}>
        FAQ
      </Link>
    </nav>
  );
};

export default Navigation;
