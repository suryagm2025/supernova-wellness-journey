import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Menu, X, Moon, Sun, User, Settings, Bell } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
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

  const notifications = [
    {
      id: 1,
      type: 'suggestion',
      title: 'AI Suggestion',
      message: 'Take a 5-minute walk',
      isRead: false
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Reminder',
      message: 'You haven\'t logged lunch',
      isRead: false
    },
    {
      id: 3,
      type: 'insight',
      title: 'New Insight',
      message: 'You slept 2hrs better this week',
      isRead: true
    }
  ];

  const markAsRead = () => {
    setHasUnread(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/40 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Logo size="md" />
            </div>
          </div>

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
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors relative">
                  <Bell size={20} />
                  {hasUnread && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80" onClick={markAsRead}>
                <div className="py-2 px-4 border-b border-border">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-3 cursor-default flex flex-col items-start">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">{notification.title}</span>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{notification.message}</span>
                  </DropdownMenuItem>
                ))}
                <div className="py-2 px-4 border-t border-border">
                  <Link to="/notifications" className="text-sm text-center block w-full text-supernova-blue">
                    View all notifications
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/settings" className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <Settings size={20} />
            </Link>
            
            <Link to="/account" className="flex items-center space-x-2 px-4 py-2 bg-supernova-blue/20 hover:bg-supernova-blue/30 border border-supernova-blue/30 rounded-full text-supernova-blue transition-colors duration-300">
              <User size={16} />
              <span className="text-sm font-medium">Account</span>
            </Link>
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
                <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors relative">
                  <Bell size={20} />
                  {hasUnread && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                <Link to="/settings" className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Settings size={20} />
                </Link>
                <Link to="/account" className="flex items-center space-x-2 px-4 py-2 bg-supernova-blue/20 hover:bg-supernova-blue/30 border border-supernova-blue/30 rounded-full text-supernova-blue transition-colors duration-300">
                  <User size={16} />
                  <span className="text-sm font-medium">Account</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
