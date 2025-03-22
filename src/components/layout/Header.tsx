
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Menu, X, Moon, Sun, User, Settings, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/40 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${isLinkActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/dashboard" className={`nav-link ${isLinkActive('/dashboard') ? 'active' : ''}`}>
              Dashboard
            </Link>
            <Link to="/checkin" className={`nav-link ${isLinkActive('/checkin') ? 'active' : ''}`}>
              Check-in
            </Link>
            <Link to="/suggestions" className={`nav-link ${isLinkActive('/suggestions') ? 'active' : ''}`}>
              Insights
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <Settings size={20} />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-supernova-blue/20 hover:bg-supernova-blue/30 border border-supernova-blue/30 rounded-full text-supernova-blue transition-colors duration-300">
              <User size={16} />
              <span className="text-sm font-medium">Account</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-supernova-dark/95 backdrop-blur-lg border-t border-white/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`nav-link text-lg ${isLinkActive('/') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={`nav-link text-lg ${isLinkActive('/dashboard') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/checkin" 
                className={`nav-link text-lg ${isLinkActive('/checkin') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Check-in
              </Link>
              <Link 
                to="/suggestions" 
                className={`nav-link text-lg ${isLinkActive('/suggestions') ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Bell size={20} />
                </button>
                <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Settings size={20} />
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-supernova-blue/20 hover:bg-supernova-blue/30 border border-supernova-blue/30 rounded-full text-supernova-blue transition-colors duration-300">
                  <User size={16} />
                  <span className="text-sm font-medium">Account</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
