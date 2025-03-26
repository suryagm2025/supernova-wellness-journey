
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useAuth } from '@/context/AuthContext';
import MorningFlow from './flows/MorningFlow';
import MiddayFlow from './flows/MiddayFlow';
import EveningFlow from './flows/EveningFlow';

type FlowType = 'morning' | 'midday' | 'evening' | null;

// Time ranges for different flows (in 24-hour format)
const TIME_RANGES = {
  morning: { start: 5, end: 10 }, // 5AM to 10AM
  midday: { start: 12, end: 14 }, // 12PM to 2PM
  evening: { start: 19, end: 23 }, // 7PM to 11PM
};

const TimeBasedFlow: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<FlowType>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Only show flows for logged in users
    if (!user) {
      setCurrentFlow(null);
      return;
    }

    // Check the current time and set the appropriate flow
    const checkTimeForFlow = () => {
      const now = new Date();
      const currentHour = now.getHours();

      // Morning flow (5AM - 10AM)
      if (currentHour >= TIME_RANGES.morning.start && currentHour < TIME_RANGES.morning.end) {
        setCurrentFlow('morning');
      }
      // Midday flow (12PM - 2PM)
      else if (currentHour >= TIME_RANGES.midday.start && currentHour < TIME_RANGES.midday.end) {
        setCurrentFlow('midday');
      }
      // Evening flow (7PM - 11PM)
      else if (currentHour >= TIME_RANGES.evening.start && currentHour < TIME_RANGES.evening.end) {
        setCurrentFlow('evening');
      }
      else {
        setCurrentFlow(null);
      }
    };

    checkTimeForFlow();
    
    // Check for demonstration purposes in development
    const flowFromUrl = new URLSearchParams(window.location.search).get('flow');
    if (flowFromUrl === 'morning' || flowFromUrl === 'midday' || flowFromUrl === 'evening') {
      setCurrentFlow(flowFromUrl);
    }

    // Show flow dialog if we have an active flow
    if (currentFlow) {
      // Wait a moment before showing the flow to ensure the page has loaded
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentFlow, user]);

  const handleFlowAction = (route: string) => {
    setIsOpen(false);
    navigate(route);
  };

  // Don't render anything if no flow is active
  if (!currentFlow) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        {currentFlow === 'morning' && (
          <MorningFlow onAction={() => handleFlowAction('/checkin')} onClose={() => setIsOpen(false)} />
        )}
        {currentFlow === 'midday' && (
          <MiddayFlow 
            onAction={(route) => handleFlowAction(route)} 
            onClose={() => setIsOpen(false)} 
          />
        )}
        {currentFlow === 'evening' && (
          <EveningFlow onAction={() => handleFlowAction('/evening')} onClose={() => setIsOpen(false)} />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default TimeBasedFlow;
