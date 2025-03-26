
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { getTimeBasedGreeting, formatDate } from '@/utils/timeUtils';

const WelcomeHeader: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const greeting = getTimeBasedGreeting();
  const today = formatDate(new Date());
  
  return (
    <div className="mb-12">
      <h1 className="text-3xl font-display font-semibold mb-2 animate-fade-in">
        {greeting}, {userName}!
      </h1>
      <p className="text-gray-400 animate-fade-in">
        {today} • Let's check in on your wellness journey today.
      </p>
    </div>
  );
};

export default WelcomeHeader;
