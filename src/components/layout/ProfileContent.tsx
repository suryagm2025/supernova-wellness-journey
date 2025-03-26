
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

interface ProfileContentProps {
  user: User | null;
  getUserInitials: () => string;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user, getUserInitials }) => {
  return (
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
};

export default ProfileContent;
