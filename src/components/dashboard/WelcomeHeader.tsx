
import React from 'react';

const WelcomeHeader: React.FC = () => {
  return (
    <div className="mb-12">
      <h1 className="text-3xl font-display font-semibold mb-2 animate-fade-in">Welcome Back, User!</h1>
      <p className="text-gray-400 animate-fade-in">Let's check in on your wellness journey today.</p>
    </div>
  );
};

export default WelcomeHeader;
