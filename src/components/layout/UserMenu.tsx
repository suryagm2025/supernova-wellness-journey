import React from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';

interface UserMenuProps {
  user: any;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { signOut } = useAuth();
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

  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border border-[#2A2A30] text-white">
          <span className="sr-only">User account</span>
          <span className="text-sm font-medium">{getUserInitials()}</span>
        </Button>
      </DrawerTrigger>
      {/* Content is now handled by Layout.tsx */}
    </Drawer>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border border-[#2A2A30] text-white">
          <span className="sr-only">User account</span>
          <span className="text-sm font-medium">{getUserInitials()}</span>
        </Button>
      </DialogTrigger>
      {/* Content is now handled by Layout.tsx */}
    </Dialog>
  );
};

export default UserMenu;
