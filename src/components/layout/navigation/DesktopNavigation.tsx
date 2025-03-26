
import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import { 
  Home, 
  LayoutDashboard, 
  ListChecks, 
  Droplet,
  Brain,
  Moon,
  Activity,
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
      
      {user ? (
        <>
          <NavLink to="/dashboard" icon={LayoutDashboard}>
            Dashboard
          </NavLink>
          
          <NavLink to="/emotion-check" icon={Brain}>
            Emotion Check
          </NavLink>
          
          <NavLink to="/water" icon={Droplet}>
            Water Intake
          </NavLink>
          
          <NavLink to="/evening-check" icon={Moon}>
            Evening Check
          </NavLink>
          
          <NavLink to="/activity" icon={Activity}>
            Activity
          </NavLink>
          
          <NavLink to="/health-timeline" icon={Calendar}>
            Health Timeline
          </NavLink>
          
          <NavLink to="/voice-companion" icon={Mic}>
            Voice Assistant
          </NavLink>
          
          <button onClick={signOut} className="text-gray-400 hover:text-white transition">
            Logout
          </button>
        </>
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
