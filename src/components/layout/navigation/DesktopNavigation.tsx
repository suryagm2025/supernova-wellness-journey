
import React from 'react';
import NavLink from './NavLink';
import { 
  Home, 
  LayoutDashboard, 
  ListChecks, 
  Flame,
  Calendar, 
  Mic,
  LogIn,
  UserPlus
} from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface DesktopNavigationProps {
  user: User | null;
  signOut: () => Promise<void>;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ user, signOut }) => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <NavLink to="/" icon={Home}>
        Home
      </NavLink>
      
      <NavLink to="/dashboard" icon={LayoutDashboard}>
        Dashboard
      </NavLink>
      
      <NavLink to="/check-in" icon={ListChecks}>
        Check-in
      </NavLink>
      
      <NavLink to="/suggestions" icon={Flame}>
        Suggestions
      </NavLink>
      
      <NavLink to="/health-timeline" icon={Calendar}>
        Health Timeline
      </NavLink>
      
      <NavLink to="/voice-companion" icon={Mic}>
        Voice Assistant
      </NavLink>
      
      {user ? (
        <button onClick={signOut} className="text-gray-400 hover:text-white transition">
          Logout
        </button>
      ) : (
        <>
          <NavLink to="/login" icon={LogIn}>
            Login
          </NavLink>
          <NavLink to="/register" icon={UserPlus}>
            Register
          </NavLink>
        </>
      )}
    </div>
  );
};

export default DesktopNavigation;
