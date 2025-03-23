
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toggle } from '@/components/ui/toggle';

const Settings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
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

  const handleToggle = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof typeof prev[typeof category]]
      }
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleThemeChange = (theme: string) => {
    setSettings(prev => ({
      ...prev,
      theme
    }));
  };

  const handleSave = () => {
    // In a real app, you would save the settings to your backend here
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.notifications.email}
                      onCheckedChange={() => handleToggle('notifications', 'email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={settings.notifications.push}
                      onCheckedChange={() => handleToggle('notifications', 'push')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive text message notifications</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={settings.notifications.sms}
                      onCheckedChange={() => handleToggle('notifications', 'sms')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Preferences</CardTitle>
                <CardDescription>
                  Customize your daily check-in schedule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="checkin-time">Daily Check-in Time</Label>
                  <Select 
                    value={settings.checkInTime} 
                    onValueChange={(value) => handleSelectChange('checkInTime', value)}
                  >
                    <SelectTrigger id="checkin-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>App Theme</CardTitle>
                <CardDescription>
                  Choose your preferred app theme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center space-x-4">
                  <Toggle
                    pressed={settings.theme === 'light'}
                    onPressedChange={() => handleThemeChange('light')}
                    className="data-[state=on]:bg-white data-[state=on]:text-black h-12 w-12 rounded-full p-0"
                  >
                    <Sun />
                    <span className="sr-only">Light mode</span>
                  </Toggle>
                  
                  <Toggle
                    pressed={settings.theme === 'dark'}
                    onPressedChange={() => handleThemeChange('dark')}
                    className="data-[state=on]:bg-supernova-dark h-12 w-12 rounded-full p-0"
                  >
                    <Moon />
                    <span className="sr-only">Dark mode</span>
                  </Toggle>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your data privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="share-data">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">Allow us to share anonymous data to improve our services</p>
                    </div>
                    <Switch
                      id="share-data"
                      checked={settings.privacy.shareData}
                      onCheckedChange={() => handleToggle('privacy', 'shareData')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-analytics">Analytics</Label>
                      <p className="text-sm text-muted-foreground">Allow usage tracking to help us improve</p>
                    </div>
                    <Switch
                      id="allow-analytics"
                      checked={settings.privacy.allowAnalytics}
                      onCheckedChange={() => handleToggle('privacy', 'allowAnalytics')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="public-profile">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                    </div>
                    <Switch
                      id="public-profile"
                      checked={settings.privacy.publicProfile}
                      onCheckedChange={() => handleToggle('privacy', 'publicProfile')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
