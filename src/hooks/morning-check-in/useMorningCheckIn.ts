
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useExistingCheckIn } from './useExistingCheckIn';
import { useCheckInSubmission } from './useCheckInSubmission';
import { MorningCheckInFormState } from './types';

export const useMorningCheckIn = () => {
  const [formState, setFormState] = useState<MorningCheckInFormState>({
    wakeUpTime: '',
    waterIntake: '',
    movement: ''
  });
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  const { user } = useAuth();

  // Update form state helpers
  const setWakeUpTime = (value: string) => setFormState(prev => ({ ...prev, wakeUpTime: value }));
  const setWaterIntake = (value: string) => setFormState(prev => ({ ...prev, waterIntake: value }));
  const setMovement = (value: string) => setFormState(prev => ({ ...prev, movement: value }));

  // Custom hooks for handling existing check-in data and submission
  const { hasSavedData, setHasSavedData } = useExistingCheckIn(user, setFormState);
  const { isSubmitting, handleSubmit } = useCheckInSubmission(user, formState, hasSavedData, setHasSavedData);

  const handleVoiceInput = (transcript: string) => {
    if (activeVoiceField === 'wakeUpTime') {
      setWakeUpTime(transcript);
    } else if (activeVoiceField === 'waterIntake') {
      setWaterIntake(transcript);
    } else if (activeVoiceField === 'movement') {
      setMovement(transcript);
    }
    
    // Reset after receiving input
    setActiveVoiceField(null);
  };

  return {
    wakeUpTime: formState.wakeUpTime,
    setWakeUpTime,
    waterIntake: formState.waterIntake,
    setWaterIntake,
    movement: formState.movement,
    setMovement,
    activeVoiceField,
    setActiveVoiceField,
    isSubmitting,
    handleSubmit,
    handleVoiceInput
  };
};
