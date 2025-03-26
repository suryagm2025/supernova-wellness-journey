
import { Json } from '@/integrations/supabase/types';

export interface MorningCheckInFormState {
  wakeUpTime: string;
  waterIntake: string;
  movement: string;
}

export interface MorningCheckInValue {
  wake_up_time: string;
  water_intake: string;
  movement: string;
}

// Make sure MorningCheckInValue is compatible with Json type
export type WellnessEntryValue = MorningCheckInValue & { [key: string]: Json };

export interface WellnessEntry {
  id: string;
  created_at: string;
  type: string;
  user_id: string;
  value: WellnessEntryValue;
}
