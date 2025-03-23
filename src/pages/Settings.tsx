
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun } from 'lucide-react';

interface SettingsState {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  checkInTime: string;
  theme: string;
  privacy: {
    shareData: boolean;
    allowAnalytics: boolean;
    publicProfile: boolean;
  };
}

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    checkInTime: '08:00',
    theme: 'dark',
    privacy: {
      shareData: false,
      allowAnalytics: true,
      publicProfile: false
    }
  });

  const handleNotificationChange = (type: keyof SettingsState['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (type: keyof SettingsState['privacy']) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: !prev.privacy[type]
      }
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to an API
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="space-y-8">
          {/* Notification Preferences */}
          <section className="glass-panel p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="email-notifications" className="flex flex-col">
                  <span className="font-medium">Email Notifications</span>
                  <span className="text-sm text-gray-400">Receive wellness tips and reminders via email</span>
                </label>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={() => handleNotificationChange('email')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="push-notifications" className="flex flex-col">
                  <span className="font-medium">Push Notifications</span>
                  <span className="text-sm text-gray-400">Receive in-app notifications and alerts</span>
                </label>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={() => handleNotificationChange('push')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="sms-notifications" className="flex flex-col">
                  <span className="font-medium">SMS Notifications</span>
                  <span className="text-sm text-gray-400">Receive text message reminders</span>
                </label>
                <Switch
                  id="sms-notifications"
                  checked={settings.notifications.sms}
                  onCheckedChange={() => handleNotificationChange('sms')}
                />
              </div>
            </div>
          </section>
          
          {/* Daily Check-in Time */}
          <section className="glass-panel p-6">
            <h2 className="text-xl font-semibold mb-4">Daily Check-in Time</h2>
            <div className="max-w-xs">
              <Select
                value={settings.checkInTime}
                onValueChange={(value) => setSettings(prev => ({ ...prev, checkInTime: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select check-in time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="06:00">6:00 AM</SelectItem>
                  <SelectItem value="07:00">7:00 AM</SelectItem>
                  <SelectItem value="08:00">8:00 AM</SelectItem>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400 mt-2">We'll send your morning check-in reminders at this time</p>
            </div>
          </section>
          
          {/* App Theme */}
          <section className="glass-panel p-6">
            <h2 className="text-xl font-semibold mb-4">App Theme</h2>
            <div className="flex items-center space-x-4">
              <Button
                variant={settings.theme === 'light' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
              >
                <Sun size={16} />
                Light
              </Button>
              
              <Button
                variant={settings.theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
              >
                <Moon size={16} />
                Dark
              </Button>
            </div>
          </section>
          
          {/* Privacy Settings */}
          <section className="glass-panel p-6">
            <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="share-data" className="flex flex-col">
                  <span className="font-medium">Share Wellness Data</span>
                  <span className="text-sm text-gray-400">Allow sharing of anonymized wellness data for research</span>
                </label>
                <Switch
                  id="share-data"
                  checked={settings.privacy.shareData}
                  onCheckedChange={() => handlePrivacyChange('shareData')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="allow-analytics" className="flex flex-col">
                  <span className="font-medium">Allow Analytics</span>
                  <span className="text-sm text-gray-400">Help us improve by collecting usage data</span>
                </label>
                <Switch
                  id="allow-analytics"
                  checked={settings.privacy.allowAnalytics}
                  onCheckedChange={() => handlePrivacyChange('allowAnalytics')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="public-profile" className="flex flex-col">
                  <span className="font-medium">Public Profile</span>
                  <span className="text-sm text-gray-400">Make your profile visible to other SupernovaAI users</span>
                </label>
                <Switch
                  id="public-profile"
                  checked={settings.privacy.publicProfile}
                  onCheckedChange={() => handlePrivacyChange('publicProfile')}
                />
              </div>
            </div>
          </section>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} size="lg">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
