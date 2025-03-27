
import { useState, useEffect } from 'react';

export function useSeniorMode() {
  const [isSeniorMode, setIsSeniorMode] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if senior mode is enabled in localStorage
    const seniorModeEnabled = localStorage.getItem('useSeniorMode') === 'true';
    
    // Update state
    setIsSeniorMode(seniorModeEnabled);
    
    // Add class to document if enabled
    if (seniorModeEnabled) {
      document.documentElement.classList.add('senior-mode');
    } else {
      document.documentElement.classList.remove('senior-mode');
    }
  }, []);
  
  const toggleSeniorMode = () => {
    const newSeniorMode = !isSeniorMode;
    setIsSeniorMode(newSeniorMode);
    localStorage.setItem('useSeniorMode', String(newSeniorMode));
    
    if (newSeniorMode) {
      document.documentElement.classList.add('senior-mode');
    } else {
      document.documentElement.classList.remove('senior-mode');
    }
  };
  
  return { isSeniorMode, toggleSeniorMode };
}
