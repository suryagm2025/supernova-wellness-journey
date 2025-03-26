
import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import Header from './Header';
import Footer from './Footer';
import { UserRound, Settings as SettingsIcon, LogOut, HelpCircle, MoonStar } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/context/AuthContext';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  
  // State for the panels
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Check if we're on any public page
  const isPublicPage = ['/', '/login', '/signup', '/forgot-password', '/reset-password', '/faq', '/privacy', '/terms', '/cookie-policy', '/streak', '/emotion-check'].includes(location.pathname);

  // Only show sidebar on dashboard pages
  const showSidebar = !isPublicPage;

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

  const profileContent = (
    <div className="space-y-6 p-2">
      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="h-24 w-24 rounded-full bg-supernova-blue/20 flex items-center justify-center text-2xl font-bold text-supernova-blue">
          {getUserInitials()}
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">{user?.user_metadata?.full_name || user?.email}</h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="font-medium">Account Type:</span>
          <span className="px-2 py-1 bg-supernova-blue/10 text-supernova-blue rounded text-xs">Premium</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="font-medium">Member Since:</span>
          <span>{new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="font-medium">Last Login:</span>
          <span>{new Date(user?.last_sign_in_at || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <a href="/account" className="text-supernova-blue hover:underline">
          View Full Profile
        </a>
      </div>
    </div>
  );
  
  const settingsContent = (
    <div className="space-y-6 p-2">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">App Settings</h3>
        
        <div className="space-y-2">
          <h4 className="font-medium">Theme</h4>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">Light</Button>
            <Button variant="outline" size="sm" className="flex-1">Dark</Button>
            <Button variant="default" size="sm" className="flex-1">System</Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Notifications</h4>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">All</Button>
            <Button variant="default" size="sm" className="flex-1">Important</Button>
            <Button variant="outline" size="sm" className="flex-1">None</Button>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <a href="/settings" className="text-supernova-blue hover:underline">
          Advanced Settings
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex w-full">
      {showSidebar && (
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="flex items-center px-4 py-2">
              <Logo size="sm" />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                    <DialogTrigger asChild>
                      <SidebarMenuButton 
                        tooltip="Profile"
                        className="transition-all hover:bg-supernova-blue/10"
                      >
                        <UserRound />
                        <span>Profile</span>
                      </SidebarMenuButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#0E0E12]/90 backdrop-blur-md border border-[#2A2A30]">
                      <DialogHeader>
                        <DialogTitle>Your Profile</DialogTitle>
                        <DialogDescription>
                          View your account information
                        </DialogDescription>
                      </DialogHeader>
                      {profileContent}
                    </DialogContent>
                  </Dialog>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                    <DialogTrigger asChild>
                      <SidebarMenuButton 
                        tooltip="Settings"
                        className="transition-all hover:bg-supernova-blue/10"
                      >
                        <SettingsIcon />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-[#0E0E12]/90 backdrop-blur-md border border-[#2A2A30]">
                      <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription>
                          Customize your experience
                        </DialogDescription>
                      </DialogHeader>
                      {settingsContent}
                    </DialogContent>
                  </Dialog>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Theme"
                    className="transition-all hover:bg-supernova-blue/10"
                  >
                    <MoonStar />
                    <span>Dark Mode</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Help"
                    asChild
                    className="transition-all hover:bg-supernova-blue/10"
                  >
                    <a href="/faq">
                      <HelpCircle />
                      <span>Help</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    tooltip="Logout"
                    onClick={handleLogout}
                    className="transition-all hover:bg-red-500/10 text-red-400"
                  >
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <div className="mt-4 p-4 border-t border-[#2A2A30]">
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-full bg-supernova-blue/20 flex items-center justify-center text-sm font-bold text-supernova-blue">
                      {getUserInitials()}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium truncate">{user?.user_metadata?.full_name || user?.email}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </SidebarMenu>
            </SidebarFooter>
            
            <SidebarRail />
          </Sidebar>
          
          <SidebarInset className="w-full">
            <div className="flex flex-col min-h-screen w-full">
              {showSidebar && (
                <div className="flex items-center md:hidden p-4 z-50 absolute top-0 left-0">
                  <SidebarTrigger />
                </div>
              )}
              <Header />
              <main className="flex-1 container mx-auto px-4 py-8 mt-16">
                {children || <Outlet />}
              </main>
              {!hideFooter && <Footer />}
            </div>
          </SidebarInset>
        </SidebarProvider>
      )}
      
      {!showSidebar && (
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 mt-16">
            {children || <Outlet />}
          </main>
          {!hideFooter && <Footer />}
        </div>
      )}
      
      {/* Mobile Profile Drawer - shown only on mobile */}
      {isMobile && showSidebar && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full fixed bottom-6 right-6 bg-supernova-blue shadow-lg z-50 text-white"
            >
              <UserRound className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-[#0E0E12]/95 backdrop-blur-md border-t border-[#2A2A30]">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Your Profile</DrawerTitle>
                <DrawerDescription>
                  Quick access to your account
                </DrawerDescription>
              </DrawerHeader>
              {profileContent}
              <DrawerFooter className="pt-4 border-t border-[#2A2A30]">
                <Button variant="outline" onClick={handleLogout} className="w-full text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default Layout;
