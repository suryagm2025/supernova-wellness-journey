
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  BookText,
  HelpCircle,
  LineChart,
  Brain,
  Droplet,
  Moon,
  Activity,
  Calendar, 
  Mic,
  LogIn,
  UserPlus,
  LogOut,
  X
} from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | null;
  signOut: () => Promise<void>;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, setIsOpen, user, signOut }) => {

  return (
    <div 
      className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col h-full p-8">
        <div className="flex justify-end mb-8">
          {/* Close button */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white hover:text-supernova-blue transition"
          >
            <X className="h-8 w-8" />
          </button>
        </div>
        
        <div className="flex flex-col items-center space-y-8 text-lg text-center">
          <Link to="/" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
            <span className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Home
            </span>
          </Link>
          
          <Link to="/programs" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
            <span className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Programs
            </span>
          </Link>
          
          <Link to="/blog" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
            <span className="flex items-center gap-2">
              <BookText className="h-5 w-5" />
              Blog
            </span>
          </Link>
          
          <Link to="/faq" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
            <span className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              FAQ
            </span>
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
                <span className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </span>
              </Link>
              
              <Link to="/emotion-check" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
                <span className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Emotion Check
                </span>
              </Link>
              
              <Link to="/water" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
                <span className="flex items-center gap-2">
                  <Droplet className="h-5 w-5" />
                  Water Intake
                </span>
              </Link>
              
              <Link to="/evening-check" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
                <span className="flex items-center gap-2">
                  <Moon className="h-5 w-5" />
                  Evening Check
                </span>
              </Link>
              
              <Link to="/activity" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
                <span className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity
                </span>
              </Link>
              
              <Link to="/health-timeline" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Health Timeline
                </span>
              </Link>
              
              <Link to="/voice-companion" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
                <span className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Voice Assistant
                </span>
              </Link>
              
              <button 
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }} 
                className="text-white hover:text-supernova-blue transition"
              >
                <span className="flex items-center gap-2">
                  <LogOut className="h-5 w-5" />
                  Logout
                </span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
                <span className="flex items-center gap-2">
                  <LogIn className="h-5 w-5" />
                  Login
                </span>
              </Link>
              
              <Link to="/register" className="text-white hover:text-supernova-blue transition" onClick={() => setIsOpen(false)}>
                <span className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Register
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
