
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import NavigationHeader from './navigation/NavigationHeader';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';

interface NavigationProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isPublicPage?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  isMobileMenuOpen, 
  setMobileMenuOpen, 
  isPublicPage = false 
}) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <nav className="bg-background/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-border">
      <NavigationHeader 
        isMobileMenuOpen={isMobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      <DesktopNavigation 
        user={user} 
        signOut={signOut} 
      />
      
      <MobileNavigation 
        isOpen={isMobileMenuOpen} 
        setIsOpen={setMobileMenuOpen} 
        user={user} 
        signOut={signOut} 
      />
    </nav>
  );
};

export default Navigation;
