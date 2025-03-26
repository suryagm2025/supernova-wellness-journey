
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { isMorning } from '@/utils/timeUtils';
import { supabase } from '@/integrations/supabase/client';

interface MorningCheckInPopupProps {
  onClose?: () => void;
}

const MorningCheckInPopup: React.FC<MorningCheckInPopupProps> = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Check if user has already completed a check-in today
  const checkIfAlreadyCheckedIn = async () => {
    if (!user) return false;
    
    try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();
      
      const { data, error } = await supabase
        .from('wellness_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'morning_check_in')
        .gte('created_at', startOfDay)
        .lte('created_at', endOfDay)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking check-in status:', error);
        return false;
      }
      
      return !!data; // Return true if data exists
    } catch (error) {
      console.error('Error in checkIfAlreadyCheckedIn:', error);
      return false;
    }
  };
  
  useEffect(() => {
    const checkAndShowPopup = async () => {
      if (!user) return;
      
      // Check if it's the right time and user hasn't checked in yet
      const alreadyCheckedIn = await checkIfAlreadyCheckedIn();
      
      // Show popup if:
      // 1. It's morning time (or set to morningOverride=true in URL for testing)
      // 2. User hasn't checked in today
      const morningOverride = new URLSearchParams(window.location.search).get('morningOverride') === 'true';
      const currentHour = new Date().getHours();
      
      if ((isMorning() || morningOverride) && !alreadyCheckedIn) {
        // Add a small delay to avoid immediate popup
        setTimeout(() => setOpen(true), 1500);
      }
    };
    
    // Run check when component mounts
    checkAndShowPopup();
    
    // Also check when user logs in
    if (user) {
      checkAndShowPopup();
    }
  }, [user]);
  
  const handleCheckIn = () => {
    setOpen(false);
    navigate('/check-in');
    if (onClose) onClose();
  };
  
  const handleSkip = () => {
    setOpen(false);
    toast.info('You can check in anytime from the dashboard');
    if (onClose) onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Morning Check-In</DialogTitle>
          <DialogDescription className="text-gray-300">
            Start your day with a quick wellness check-in
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-gray-200">
            Taking a moment to check in each morning helps build consistent habits and provides data for personalized insights.
          </p>
          
          <div className="flex flex-col space-y-2">
            <Button variant="default" onClick={handleCheckIn} className="bg-supernova-blue hover:bg-supernova-blue/80">
              Start Morning Check-In
            </Button>
            <Button variant="outline" onClick={handleSkip} className="border-white/10 hover:bg-white/5">
              Remind Me Later
            </Button>
          </div>
          
          <p className="text-xs text-gray-400 text-center pt-2">
            🔐 Your check-in data is private and secure
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MorningCheckInPopup;
