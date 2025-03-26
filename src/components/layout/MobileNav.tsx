
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Flame, Menu, SmilePlus, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Logo from '../ui/Logo';

interface MobileNavProps {
  isPublicPage: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ isPublicPage }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-[#0E0E12] text-white border-r border-[#2A2A30]">
        <div className="flex justify-between items-center mb-6 pt-2">
          <Logo size="md" />
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {!isPublicPage && (
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`mobile-nav-link ${isActive('/') ? 'text-supernova-blue' : ''}`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className={`mobile-nav-link ${isActive('/dashboard') ? 'text-supernova-blue' : ''}`}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/programs" 
              className={`mobile-nav-link ${isActive('/programs') ? 'text-supernova-blue' : ''}`}
              onClick={() => setOpen(false)}
            >
              Programs
            </Link>
            <Link 
              to="/streak" 
              className={`mobile-nav-link flex items-center ${isActive('/streak') ? 'text-supernova-blue' : ''}`}
              onClick={() => setOpen(false)}
            >
              Streak <Flame size={16} className="ml-1 text-supernova-blue" />
            </Link>
            <Link 
              to="/emotion-check" 
              className={`mobile-nav-link flex items-center ${isActive('/emotion-check') ? 'text-supernova-blue' : ''}`}
              onClick={() => setOpen(false)}
            >
              Mood <SmilePlus size={16} className="ml-1 text-supernova-pink" />
            </Link>
            <Link 
              to="/blog" 
              className={`mobile-nav-link ${isActive('/blog') ? 'text-supernova-blue' : ''}`}
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/faq" 
              className={`mobile-nav-link ${isActive('/faq') ? 'text-supernova-blue' : ''}`}
              onClick={() => setOpen(false)}
            >
              FAQ
            </Link>
          </div>
        )}
        
        <div className="absolute bottom-8 w-full pr-6">
          <div className="border-t border-[#2A2A30] pt-4 mt-4">
            {user ? (
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/account" 
                  className="mobile-nav-link"
                  onClick={() => setOpen(false)}
                >
                  My Account
                </Link>
                <Link 
                  to="/settings" 
                  className="mobile-nav-link"
                  onClick={() => setOpen(false)}
                >
                  Settings
                </Link>
                <Button 
                  variant="ghost"
                  className="justify-start px-1 py-2 h-auto text-red-400 hover:text-red-300 hover:bg-transparent"
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-supernova-blue hover:bg-opacity-80">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
