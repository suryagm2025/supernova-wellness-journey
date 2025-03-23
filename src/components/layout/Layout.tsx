
import React from 'react';
import { useLocation } from 'react-router-dom';
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
import { LayoutDashboard, BookText, UserRound, Settings as SettingsIcon, LogOut, LineChart } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <Logo size="sm" />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/dashboard')}
                  tooltip="Dashboard"
                  asChild
                >
                  <a href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/programs')}
                  tooltip="Programs"
                  asChild
                >
                  <a href="/programs">
                    <LineChart />
                    <span>Programs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/blog')}
                  tooltip="Blog"
                  asChild
                >
                  <a href="/blog">
                    <BookText />
                    <span>Blog</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/account')}
                  tooltip="Account"
                  asChild
                >
                  <a href="/account">
                    <UserRound />
                    <span>Account</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/settings')}
                  tooltip="Settings"
                  asChild
                >
                  <a href="/settings">
                    <SettingsIcon />
                    <span>Settings</span>
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
                  asChild
                >
                  <a href="/">
                    <LogOut />
                    <span>Logout</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>
        
        <SidebarInset>
          <div className="flex flex-col min-h-screen w-full">
            <div className="flex items-center md:hidden p-4 z-50 absolute top-0 left-0">
              <SidebarTrigger />
            </div>
            <Header />
            <div className="flex-1 container mx-auto px-4 py-8 mt-16">
              {children}
            </div>
            <Footer />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
