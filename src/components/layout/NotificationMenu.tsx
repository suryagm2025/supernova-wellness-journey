
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const NotificationMenu: React.FC = () => {
  const [hasUnread, setHasUnread] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white">
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-[#1A1A20] border border-[#2A2A30]">
        <div className="p-2 text-xs font-medium text-[#B0B0C3]">
          Notifications
        </div>
        <DropdownMenuItem className="p-3 cursor-pointer hover:bg-white/5 flex flex-col items-start font-normal border-b border-[#2A2A30]" onClick={() => setHasUnread(false)}>
          <div className="flex items-center w-full">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supernova-blue/20 flex items-center justify-center mr-3">
              <span className="text-supernova-blue text-sm">AI</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">AI Suggestion</p>
              <p className="text-[#B0B0C3] text-xs">Take a 5-minute walk</p>
            </div>
            <div className="text-xs text-[#B0B0C3]">now</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 cursor-pointer hover:bg-white/5 flex flex-col items-start font-normal border-b border-[#2A2A30]">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
              <span className="text-yellow-400 text-sm">R</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">Reminder</p>
              <p className="text-[#B0B0C3] text-xs">You haven't logged lunch</p>
            </div>
            <div className="text-xs text-[#B0B0C3]">2h ago</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-3 cursor-pointer hover:bg-white/5 flex flex-col items-start font-normal">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <span className="text-green-400 text-sm">I</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">New Insight</p>
              <p className="text-[#B0B0C3] text-xs">You slept 2hrs better this week</p>
            </div>
            <div className="text-xs text-[#B0B0C3]">1d ago</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
