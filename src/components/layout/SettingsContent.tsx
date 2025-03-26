
import React from 'react';
import { Button } from '@/components/ui/button';

const SettingsContent: React.FC = () => {
  return (
    <div className="space-y-6 p-2">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">App Settings</h3>
        
        <div className="space-y-2">
          <h4 className="font-medium">Theme</h4>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">Light</Button>
            <Button variant="outline" size="sm" className="flex-1">Dark</Button>
            <Button variant="default" size="sm" className="flex-1">System</Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Notifications</h4>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">All</Button>
            <Button variant="default" size="sm" className="flex-1">Important</Button>
            <Button variant="outline" size="sm" className="flex-1">None</Button>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <a href="/settings" className="text-supernova-blue hover:underline">
          Advanced Settings
        </a>
      </div>
    </div>
  );
};

export default SettingsContent;
