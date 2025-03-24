
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Bell } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Check if we're on public pages like login/signup
  const isPublicPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if a nav link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
            
            {!isPublicPage && (
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
                <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
                  Blog
                </Link>
                <Link to="/faq" className={`nav-link ${isActive('/faq') ? 'active' : ''}`}>
                  FAQ
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isOnDashboard ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-white">
                      <Bell className="h-5 w-5" />
                      {hasUnread && (
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 bg-[#1A1A20] border border-[#2A2A30]">
                    <div className="p-2 text-xs font-medium text-[#B0B0C3]">
                      Notifications
                    </div>
                    <DropdownMenuItem className="p-3 cursor-pointer hover:bg-white/5 flex flex-col items-start font-normal border-b border-[#2A2A30]" onClick={() => setHasUnread(false)}>
                      <div className="flex items-center w-full">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supernova-blue/20 flex items-center justify-center mr-3">
                          <span className="text-supernova-blue text-sm">AI</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">AI Suggestion</p>
                          <p className="text-[#B0B0C3] text-xs">Take a 5-minute walk</p>
                        </div>
                        <div className="text-xs text-[#B0B0C3]">now</div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 cursor-pointer hover:bg-white/5 flex flex-col items-start font-normal border-b border-[#2A2A30]">
                      <div className="flex items-center w-full">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                          <span className="text-yellow-400 text-sm">R</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">Reminder</p>
                          <p className="text-[#B0B0C3] text-xs">You haven't logged lunch</p>
                        </div>
                        <div className="text-xs text-[#B0B0C3]">2h ago</div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 cursor-pointer hover:bg-white/5 flex flex-col items-start font-normal">
                      <div className="flex items-center w-full">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                          <span className="text-green-400 text-sm">I</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">New Insight</p>
                          <p className="text-[#B0B0C3] text-xs">You slept 2hrs better this week</p>
                        </div>
                        <div className="text-xs text-[#B0B0C3]">1d ago</div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border border-[#2A2A30] text-white">
                    <span className="sr-only">User account</span>
                    <span className="text-sm font-medium">LS</span>
                  </Button>
                </Link>
              </>
            ) : isPublicPage ? (
              <>
                {location.pathname !== '/login' && (
                  <Link to="/login">
                    <Button variant="ghost" className="text-white hover:text-white">Log In</Button>
                  </Link>
                )}
                {location.pathname !== '/signup' && (
                  <Link to="/signup">
                    <Button className="bg-[#6C63FF] hover:bg-[#2CD4D9] text-white font-bold min-h-[44px]">Sign Up</Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-white">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6C63FF] hover:bg-[#2CD4D9] text-white font-bold min-h-[44px]">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
