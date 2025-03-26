
import React from 'react';
import { useAuth } from '@/context/AuthContext';
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

  return (
    <nav>
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
