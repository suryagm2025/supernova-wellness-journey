
import { Json } from '@/integrations/supabase/types';

export interface MorningCheckInValue {
  wake_up_time?: string;
  water_intake?: string;
  movement?: string;
  date?: string;
}

export interface WellnessEntry {
  id: string;
  user_id: string;
  type: string;
  value: MorningCheckInValue;
  created_at: string;
}

export interface MorningCheckInFormState {
  wakeUpTime: string;
  waterIntake: string;
  movement: string;
}
