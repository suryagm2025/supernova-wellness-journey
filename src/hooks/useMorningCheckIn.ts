import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface FormData {
  sleepQuality: string;
  energyLevels: string;
  mood: string;
  exercise: string;
  waterIntake: string;
  breakfast: string;
  dailyGoals: string;
  wins: string;
  improvements: string;
}

const initialFormData: FormData = {
  sleepQuality: '',
  energyLevels: '',
  mood: '',
  exercise: '',
  waterIntake: '',
  breakfast: '',
  dailyGoals: '',
  wins: '',
  improvements: ''
};

const useMorningCheckIn = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const { user } = useAuth();
	const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has already checked in today
    if (user) {
      checkIfUserHasCheckedInToday(user.id);
    }
  }, [user]);

  const checkIfUserHasCheckedInToday = async (userId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    try {
      const { data, error } = await supabase
        .from('wellness_entries')
        .select('*')
        .eq('user_id', userId)
        .eq('type', 'morning_checkin')
        .gte('created_at', today.toISOString());

      if (error) {
        console.error("Error checking today's check-in:", error);
        return;
      }

      setHasCheckedInToday(data && data.length > 0);
    } catch (error) {
      console.error("Error checking today's check-in:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to submit a check-in.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      // Structure the data for the wellness_entries table
      const wellnessEntry = {
        user_id: user.id,
        type: 'morning_checkin',
        value: formData,
      };

      // Insert the wellness entry into the database
      const { data: newEntry, error } = await supabase
        .from('wellness_entries')
        .insert([wellnessEntry])
        .select(); // Select the newly inserted row

      if (error) {
        console.error('Error submitting morning check-in:', error);
        setSubmissionResult(`Failed to submit check-in: ${error.message}`);
				toast.error(`Failed to submit check-in: ${error.message}`);
        return;
      }

      // Reset the form and set success message
      setFormData(initialFormData);
      setSubmissionResult('Check-in submitted successfully!');
			toast.success('Check-in submitted successfully!');
      setHasCheckedInToday(true);

      // Update streak
      await updateStreak(user.id);

			// Redirect to dashboard after successful submission
			navigate('/dashboard');
    } catch (error: any) {
      console.error('Error submitting morning check-in:', error);
      setSubmissionResult(`Failed to submit check-in: ${error.message}`);
			toast.error(`Failed to submit check-in: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateStreak = async (userId: string) => {
    try {
      // Get today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      // Fetch the streak data for the user
      let { data: streakData, error: streakError } = await supabase
        .from('streak_tracking')
        .select('*')
        .eq('user_id', userId)
        .single();
  
      if (streakError) {
        console.error('Error fetching streak data:', streakError);
        throw streakError;
      }
  
      if (!streakData) {
        // If no streak data exists, create a new entry
        const { error: insertError } = await supabase
          .from('streak_tracking')
          .insert([
            {
              user_id: userId,
              current_streak: 1,
              longest_streak: 1,
              last_check_in: today.toISOString(),
              updated_at: today.toISOString(),
            },
          ]);
  
        if (insertError) {
          console.error('Error creating streak data:', insertError);
          throw insertError;
        }
  
        console.log('New streak data created.');
        return;
      }
  
      // Check if the last check-in was yesterday
      const lastCheckIn = new Date(streakData.last_check_in || streakData.created_at);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
  
      const isYesterday =
        lastCheckIn.getDate() === yesterday.getDate() &&
        lastCheckIn.getMonth() === yesterday.getMonth() &&
        lastCheckIn.getFullYear() === yesterday.getFullYear();
  
      if (isYesterday) {
        // If the last check-in was yesterday, increment the streak
        const newStreak = streakData.current_streak + 1;
        const newLongestStreak = Math.max(newStreak, streakData.longest_streak);
  
        const { error: updateError } = await supabase
          .from('streak_tracking')
          .update({
            current_streak: newStreak,
            longest_streak: newLongestStreak,
            last_check_in: today.toISOString(),
            updated_at: today.toISOString(),
          })
          .eq('user_id', userId);
  
        if (updateError) {
          console.error('Error updating streak data:', updateError);
          throw updateError;
        }
  
        console.log('Streak incremented.');
      } else if (
        lastCheckIn.getDate() === today.getDate() &&
        lastCheckIn.getMonth() === today.getMonth() &&
        lastCheckIn.getFullYear() === today.getFullYear()
      ) {
        // If already checked in today, do nothing
        console.log('Already checked in today.');
        return;
      } else {
        // If the last check-in was not yesterday, reset the streak
        const { error: resetError } = await supabase
          .from('streak_tracking')
          .update({
            current_streak: 1,
            last_check_in: today.toISOString(),
            updated_at: today.toISOString(),
          })
          .eq('user_id', userId);
  
        if (resetError) {
          console.error('Error resetting streak data:', resetError);
          throw resetError;
        }
  
        console.log('Streak reset.');
      }
    } catch (error: any) {
      console.error('Error updating streak:', error.message);
			toast.error(`Failed to update streak: ${error.message}`);
    }
  };

  interface WellnessEntryValue {
    [key: string]: string | number | boolean;
  }

  return {
    formData,
    isSubmitting,
    submissionResult,
    hasCheckedInToday,
    handleInputChange,
    handleSubmit,
  };
};

export default useMorningCheckIn;
