
export interface TimelineDataPoint {
  date: string;
  hydration: number | null; // in liters
  sleep: number | null; // in hours
  mood: number | null; // 1-10 scale
  movement: number | null; // in minutes
}
