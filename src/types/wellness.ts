
// Types for wellness entries and related data

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
