
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon: Icon, children, onClick }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => 
        isActive 
          ? "text-white" 
          : "text-gray-400 hover:text-white transition"
      }
      onClick={onClick}
    >
      <div className="flex items-center font-medium">
        <Icon size={16} className="mr-1" />
        {children}
      </div>
    </RouterNavLink>
  );
};

export default NavLink;
