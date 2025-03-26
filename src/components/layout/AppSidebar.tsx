
import React from 'react';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarFooter,
  SidebarRail
} from "@/components/ui/sidebar";
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/context/AuthContext';
import SidebarMenuItems from './SidebarMenuItems';
import SidebarUserFooter from './SidebarUserFooter';

interface AppSidebarProps {
  handleLogout: () => Promise<void>;
  getUserInitials: () => string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ handleLogout, getUserInitials }) => {
  const { user } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <Logo size="sm" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItems 
            handleLogout={handleLogout} 
            getUserInitials={getUserInitials} 
          />
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarUserFooter user={user} getUserInitials={getUserInitials} />
        </SidebarMenu>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
