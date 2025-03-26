
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useAuth } from '@/context/AuthContext';
import Navigation from './Navigation';
import UserMenu from './UserMenu';
import NotificationMenu from './NotificationMenu';
import AuthButtons from './AuthButtons';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Check if we're on public pages like login/signup
  const isPublicPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show auth status and notification bell on dashboard pages
  const isOnDashboard = !isHomePage && !isPublicPage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'bg-[#0E0E12]/90 backdrop-blur-md border-b border-[#2A2A30] py-2 shadow-md' 
          : 'bg-gradient-to-b from-[rgba(14,14,18,0.6)] to-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Logo size="md" />
            </div>
            <div className="hidden md:block">
              <Logo size="md" withText={true} />
            </div>
            
            <Navigation 
              isPublicPage={isPublicPage}
              isMobileMenuOpen={isMobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>

          <div className="flex items-center space-x-4">
            {user && isOnDashboard ? (
              <>
                <NotificationMenu />
                <UserMenu user={user} />
              </>
            ) : (
              <AuthButtons 
                isPublicPage={isPublicPage} 
                isOnDashboard={isOnDashboard} 
                currentPath={location.pathname} 
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
