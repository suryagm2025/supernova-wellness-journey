
import React from 'react';
import { User } from '@supabase/supabase-js';

interface SidebarUserFooterProps {
  user: User | null;
  getUserInitials: () => string;
}

const SidebarUserFooter: React.FC<SidebarUserFooterProps> = ({ user, getUserInitials }) => {
  return (
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
  );
};

export default SidebarUserFooter;
