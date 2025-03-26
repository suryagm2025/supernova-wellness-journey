
import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import AppSidebar from './AppSidebar';
import MobileProfileDrawer from './MobileProfileDrawer';

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    
    const email = user.email || '';
    if (user.user_metadata && user.user_metadata.full_name) {
      const names = user.user_metadata.full_name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    
    return email.substring(0, 2).toUpperCase();
  };
  
  // Handle logout
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <AppSidebar 
          handleLogout={handleLogout} 
          getUserInitials={getUserInitials} 
        />
        
        <SidebarInset className="w-full">
          <div className="flex flex-col min-h-screen w-full">
            <div className="flex items-center md:hidden p-4 z-50 absolute top-0 left-0">
              <SidebarTrigger />
            </div>
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 mt-16">
              {children || <Outlet />}
            </main>
            {!hideFooter && <Footer />}
          </div>
        </SidebarInset>
      </div>
      
      {/* Mobile Profile Drawer - shown only on mobile */}
      <MobileProfileDrawer 
        showDrawer={isMobile} 
        handleLogout={handleLogout} 
        getUserInitials={getUserInitials} 
      />
    </SidebarProvider>
  );
};

export default Layout;
