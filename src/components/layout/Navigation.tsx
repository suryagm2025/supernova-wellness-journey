import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  ListChecks, 
  Flame, 
  Settings, 
  Menu, 
  X,
  Calendar, 
} from 'lucide-react';

interface NavigationProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMobileMenuOpen, setMobileMenuOpen }) => {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <nav className="bg-background/90 backdrop-blur-md fixed top-0 left-0 w-full z-50 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-semibold text-white">
          Supernova
        </NavLink>
        
        <button
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="hidden md:flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive 
                ? "text-white" 
                : "text-gray-400 hover:text-white transition"
            }
          >
            <div className="flex items-center font-medium">
              <Home size={16} className="mr-1" />
              Home
            </div>
          </NavLink>
          
          <NavLink
            to="/dashboard"
            className={({ isActive }) => 
              isActive 
                ? "text-white" 
                : "text-gray-400 hover:text-white transition"
            }
          >
            <div className="flex items-center font-medium">
              <LayoutDashboard size={16} className="mr-1" />
              Dashboard
            </div>
          </NavLink>
          
          <NavLink
            to="/check-in"
            className={({ isActive }) => 
              isActive 
                ? "text-white" 
                : "text-gray-400 hover:text-white transition"
            }
          >
            <div className="flex items-center font-medium">
              <ListChecks size={16} className="mr-1" />
              Check-in
            </div>
          </NavLink>
          
          <NavLink
            to="/suggestions"
            className={({ isActive }) => 
              isActive 
                ? "text-white" 
                : "text-gray-400 hover:text-white transition"
            }
          >
            <div className="flex items-center font-medium">
              <Flame size={16} className="mr-1" />
              Suggestions
            </div>
          </NavLink>
          
          <NavLink
            to="/health-timeline"
            className={({ isActive }) => 
              isActive 
                ? "text-white" 
                : "text-gray-400 hover:text-white transition"
            }
          >
            <div className="flex items-center font-medium">
              <Calendar size={16} className="mr-1" />
              Health Timeline
            </div>
          </NavLink>
          
          {isLoggedIn ? (
            <button onClick={logout} className="text-gray-400 hover:text-white transition">
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="text-gray-400 hover:text-white transition">
                Login
              </NavLink>
              <NavLink to="/register" className="text-gray-400 hover:text-white transition">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
      
      <div className={`fixed top-16 right-0 w-64 bg-background border-l border-border h-full transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-50 p-4`}>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
        
        <NavLink 
          to="/"
          className={`block py-2 text-gray-400 hover:text-white transition ${location.pathname === '/' ? 'text-white' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        
        <NavLink 
          to="/dashboard"
          className={`block py-2 text-gray-400 hover:text-white transition ${location.pathname === '/dashboard' ? 'text-white' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/check-in"
          className={`block py-2 text-gray-400 hover:text-white transition ${location.pathname === '/check-in' ? 'text-white' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <ListChecks size={20} />
          <span>Check-in</span>
        </NavLink>
        
        <NavLink 
          to="/suggestions"
          className={`block py-2 text-gray-400 hover:text-white transition ${location.pathname === '/suggestions' ? 'text-white' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Flame size={20} />
          <span>Suggestions</span>
        </NavLink>
        
        <NavLink 
          to="/health-timeline"
          className={`block py-2 text-gray-400 hover:text-white transition ${location.pathname === '/health-timeline' ? 'text-white' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Calendar size={20} />
          <span>Health Timeline</span>
        </NavLink>
        
        {isLoggedIn ? (
          <button onClick={logout} className="block py-2 text-gray-400 hover:text-white transition">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className="block py-2 text-gray-400 hover:text-white transition" onClick={() => setMobileMenuOpen(false)}>
              Login
            </NavLink>
            <NavLink to="/register" className="block py-2 text-gray-400 hover:text-white transition" onClick={() => setMobileMenuOpen(false)}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
