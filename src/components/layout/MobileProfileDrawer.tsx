
import React from 'react';
import { UserRound, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import ProfileContent from './ProfileContent';
import { useAuth } from '@/context/AuthContext';

interface MobileProfileDrawerProps {
  showDrawer: boolean;
  handleLogout: () => Promise<void>;
  getUserInitials: () => string;
}

const MobileProfileDrawer: React.FC<MobileProfileDrawerProps> = ({ showDrawer, handleLogout, getUserInitials }) => {
  const { user } = useAuth();
  
  if (!showDrawer) return null;
  
  return (
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
          <ProfileContent user={user} getUserInitials={getUserInitials} />
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
  );
};

export default MobileProfileDrawer;
