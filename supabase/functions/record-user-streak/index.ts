// This will be deployed as a Supabase Edge Function
// It handles recording and updating user streaks

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.1';
import { format, isYesterday, isToday } from 'https://esm.sh/date-fns@3.6.0';

// Create a Supabase client
const supabaseClient = createClient(
  // Supabase API URL - env var exported by default when deployed on Supabase
  Deno.env.get('SUPABASE_URL') ?? '',
  // Supabase API ANON KEY - env var exported by default when deployed on Supabase
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

serve(async (req) => {
  try {
    // Get user ID from request body
    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get streak data for the user
    const { data: streakData, error: streakError } = await supabaseClient
      .from('streak_tracking')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (streakError && streakError.code !== 'PGRST116') {
      throw streakError;
    }

    const today = new Date();
    const formattedToday = format(today, 'yyyy-MM-dd');

    // If no streak data exists, create a new record
    if (!streakData) {
      const { data: newStreak, error: insertError } = await supabaseClient
        .from('streak_tracking')
        .insert({
          user_id: user_id,
          current_streak: 1,
          longest_streak: 1,
          last_check_in: formattedToday
        })
        .select()
        .single();

      if (insertError) throw insertError;

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'First streak recorded!', 
          data: newStreak 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Otherwise, update the existing streak
    let newStreak = 1; // Default to 1 for first check-in or reset
    let statusMessage = '';

    // If already checked in today, no changes needed
    if (streakData.last_check_in && isToday(new Date(streakData.last_check_in))) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Already checked in today', 
          data: streakData 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if this is a streak continuation
    if (streakData.last_check_in) {
      const lastCheckInDate = new Date(streakData.last_check_in);
      
      if (isYesterday(lastCheckInDate)) {
        // Consecutive day, increment streak
        newStreak = streakData.current_streak + 1;
        
        // Check for milestone messages
        if (newStreak === 3) {
          statusMessage = '🔥 3-day streak! You\'re creating momentum!';
        } else if (newStreak === 7) {
          statusMessage = '🎉 One full week! Impressive dedication!';
        } else if (newStreak % 10 === 0) {
          statusMessage = `Amazing! ${newStreak} days of consistent wellness!`;
        } else {
          statusMessage = `Streak continued: ${newStreak} days!`;
        }
      } else if (!isToday(lastCheckInDate)) {
        // Streak broken, but that's okay - start fresh
        newStreak = 1;
        statusMessage = 'Starting a fresh streak today!';
      }
    } else {
      // First check-in ever
      statusMessage = 'Congratulations on your first check-in!';
    }

    // Update the streak in the database
    const { data, error } = await supabaseClient
      .from('streak_tracking')
      .update({
        current_streak: newStreak,
        longest_streak: Math.max(newStreak, streakData.longest_streak),
        last_check_in: formattedToday,
        updated_at: new Date().toISOString()
      })
      .eq('id', streakData.id)
      .select()
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: statusMessage, 
        data 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error recording streak:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to record streak'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
