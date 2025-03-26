
import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, LayoutDashboard, ListChecks, Flame, Calendar, Mic } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | null;
  signOut: () => Promise<void>;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, setIsOpen, user, signOut }) => {
  return (
    <div className={`fixed top-16 right-0 w-64 bg-background border-l border-border h-full transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-50 p-4`}>
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
        onClick={() => setIsOpen(false)}
      >
        <X size={24} />
      </button>
      
      <div className="space-y-4 mt-8">
        <NavLink 
          to="/"
          className={({ isActive }) => 
            `flex items-center py-2 text-gray-400 hover:text-white transition ${isActive ? 'text-white' : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <Home size={20} className="mr-2" />
          <span>Home</span>
        </NavLink>
        
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => 
            `flex items-center py-2 text-gray-400 hover:text-white transition ${isActive ? 'text-white' : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <LayoutDashboard size={20} className="mr-2" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/check-in"
          className={({ isActive }) => 
            `flex items-center py-2 text-gray-400 hover:text-white transition ${isActive ? 'text-white' : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <ListChecks size={20} className="mr-2" />
          <span>Check-in</span>
        </NavLink>
        
        <NavLink 
          to="/suggestions"
          className={({ isActive }) => 
            `flex items-center py-2 text-gray-400 hover:text-white transition ${isActive ? 'text-white' : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <Flame size={20} className="mr-2" />
          <span>Suggestions</span>
        </NavLink>
        
        <NavLink 
          to="/health-timeline"
          className={({ isActive }) => 
            `flex items-center py-2 text-gray-400 hover:text-white transition ${isActive ? 'text-white' : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <Calendar size={20} className="mr-2" />
          <span>Health Timeline</span>
        </NavLink>
        
        <NavLink 
          to="/voice-companion"
          className={({ isActive }) => 
            `flex items-center py-2 text-gray-400 hover:text-white transition ${isActive ? 'text-white' : ''}`
          }
          onClick={() => setIsOpen(false)}
        >
          <Mic size={20} className="mr-2" />
          <span>Voice Assistant</span>
        </NavLink>
        
        {user ? (
          <button 
            onClick={signOut} 
            className="flex items-center w-full py-2 text-gray-400 hover:text-white transition"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                `flex items-center py-2 text-gray-400 hover:text-white transition ${isActive ? 'text-white' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
            <NavLink 
              to="/register" 
              className={({ isActive }) => 
                `flex items-center py-2 text-gray-400 hover:text-white transition ${isActive ? 'text-white' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNavigation;
