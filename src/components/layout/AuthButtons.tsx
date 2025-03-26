
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AuthButtonsProps {
  isPublicPage: boolean;
  isOnDashboard: boolean;
  currentPath: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isPublicPage, isOnDashboard, currentPath }) => {
  const { user, signOut } = useAuth();

  // Handle logout
  const handleLogout = async () => {
    await signOut();
  };

  if (user && isOnDashboard) {
    return null; // User menu will handle this in the main header
  }

  if (isPublicPage) {
    return (
      <>
        {currentPath !== '/login' && (
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:text-white">Log In</Button>
          </Link>
        )}
        {currentPath !== '/signup' && (
          <Link to="/signup">
            <Button className="bg-[#6C63FF] hover:bg-[#2CD4D9] text-white font-bold min-h-[44px]">Sign Up</Button>
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      {user ? (
        <Button 
          variant="ghost" 
          className="text-white hover:text-white flex items-center"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
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
    </>
  );
};

export default AuthButtons;
