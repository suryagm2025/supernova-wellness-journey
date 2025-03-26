
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flame, SmilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from '../ui/Logo';

const MobileNavigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  // Check if a nav link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-white" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#0E0E12]/95 backdrop-blur-md border-r border-[#2A2A30] w-[80%] p-0">
        <SheetHeader className="border-b border-[#2A2A30] p-4">
          <SheetTitle>
            <Logo size="md" withText={true} />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col py-6">
          <Link 
            to="/" 
            className={`py-3 px-6 text-lg font-medium ${isActive('/') ? 'text-supernova-blue' : 'text-gray-300'}`}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`py-3 px-6 text-lg font-medium ${isActive('/dashboard') ? 'text-supernova-blue' : 'text-gray-300'}`}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/programs" 
            className={`py-3 px-6 text-lg font-medium ${isActive('/programs') ? 'text-supernova-blue' : 'text-gray-300'}`}
            onClick={() => setOpen(false)}
          >
            Programs
          </Link>
          <Link 
            to="/streak" 
            className={`py-3 px-6 text-lg font-medium flex items-center ${isActive('/streak') ? 'text-supernova-blue' : 'text-gray-300'}`}
            onClick={() => setOpen(false)}
          >
            Streak <Flame size={16} className="ml-1 text-supernova-blue" />
          </Link>
          <Link 
            to="/emotion-check" 
            className={`py-3 px-6 text-lg font-medium flex items-center ${isActive('/emotion-check') ? 'text-supernova-blue' : 'text-gray-300'}`}
            onClick={() => setOpen(false)}
          >
            Mood <SmilePlus size={16} className="ml-1 text-supernova-pink" />
          </Link>
          <Link 
            to="/blog" 
            className={`py-3 px-6 text-lg font-medium ${isActive('/blog') ? 'text-supernova-blue' : 'text-gray-300'}`}
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>
          <Link 
            to="/faq" 
            className={`py-3 px-6 text-lg font-medium ${isActive('/faq') ? 'text-supernova-blue' : 'text-gray-300'}`}
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
