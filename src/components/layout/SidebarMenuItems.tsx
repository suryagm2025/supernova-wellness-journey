
import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { UserRound, Settings as SettingsIcon, LogOut, HelpCircle, MoonStar } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import ProfileContent from './ProfileContent';
import SettingsContent from './SettingsContent';

interface SidebarMenuItemsProps {
  handleLogout: () => Promise<void>;
  getUserInitials: () => string;
}

const SidebarMenuItems: React.FC<SidebarMenuItemsProps> = ({ handleLogout, getUserInitials }) => {
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
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
            <ProfileContent user={user} getUserInitials={getUserInitials} />
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
            <SettingsContent />
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
    </>
  );
};

export default SidebarMenuItems;
