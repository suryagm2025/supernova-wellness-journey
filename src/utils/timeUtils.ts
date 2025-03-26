
/**
 * Utility functions for time-based features
 */

// Get the current hour (0-23)
export const getCurrentHour = (): number => {
  return new Date().getHours();
};

// Check if the current time is morning (5AM-11:59AM)
export const isMorning = (): boolean => {
  const hour = getCurrentHour();
  return hour >= 5 && hour < 12;
};

// Check if the current time is afternoon (12PM-5:59PM)
export const isAfternoon = (): boolean => {
  const hour = getCurrentHour();
  return hour >= 12 && hour < 18;
};

// Check if the current time is evening (6PM-10:59PM)
export const isEvening = (): boolean => {
  const hour = getCurrentHour();
  return hour >= 18 && hour < 23;
};

// Check if the current time is night (11PM-4:59AM)
export const isNight = (): boolean => {
  const hour = getCurrentHour();
  return hour >= 23 || hour < 5;
};

// Format a date as a readable string
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

// Get a greeting based on the time of day
export const getTimeBasedGreeting = (): string => {
  if (isMorning()) {
    return 'Good morning';
  } else if (isAfternoon()) {
    return 'Good afternoon';
  } else if (isEvening()) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
};
