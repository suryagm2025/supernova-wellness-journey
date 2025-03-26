import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, wellnessData } = await req.json();
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client with service role key to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return new Response(JSON.stringify({ error: 'Error fetching user profile' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let wellnessEntries;
    
    // If wellnessData is provided, use it (for smart suggestions)
    if (wellnessData) {
      wellnessEntries = wellnessData;
    } else {
      // Otherwise, get recent wellness entries (for regular suggestions)
      const { data: entries, error: entriesError } = await supabase
        .from('wellness_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (entriesError) {
        console.error('Error fetching entries:', entriesError);
        return new Response(JSON.stringify({ error: 'Error fetching wellness entries' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      wellnessEntries = entries;
    }

    // Apply basic rules-based logic first
    const basicSuggestions = generateBasicSuggestions(wellnessEntries);
    
    // Check if we're generating smart suggestions
    let smartSuggestions = null;
    if (wellnessData) {
      smartSuggestions = await generateSmartSuggestions(profile, wellnessData);
    }
    
    // Use OpenAI to refine and personalize the suggestions
    const aiSuggestions = await generateAISuggestions(profile, wellnessEntries, basicSuggestions);
    
    return new Response(JSON.stringify({ 
      suggestions: aiSuggestions,
      basicSuggestions: basicSuggestions,
      smartSuggestions: smartSuggestions
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Generate smart suggestions based on user wellness data
async function generateSmartSuggestions(profile, wellnessData) {
  try {
    // Extract relevant data for analysis
    const waterData = wellnessData.water || [];
    const sleepData = wellnessData.sleep || [];
    const moodData = wellnessData.mood || [];
    
    // Default suggestions if we can't generate personalized ones
    let mealSuggestion = "A balanced meal with protein, whole grains, and vegetables";
    let breathworkSuggestion = "5 minutes of deep breathing - inhale for 4, hold for 4, exhale for 6";
    let movementSuggestion = "A 15-minute walk outdoors for fresh air and gentle movement";
    let hydrationTip = null;
    
    // Analyze water intake
    const hasGoodHydration = waterData.length > 0 && 
      waterData.reduce((sum, entry) => sum + entry.amount_ml, 0) > 1500;
    
    if (hasGoodHydration) {
      hydrationTip = "You've been hydrating well – consider adding lemon or mint to keep it fun!";
    }
    
    // Generate personalized suggestions based on OpenAI
    if (openAIApiKey) {
      const userData = {
        profile: {
          age: profile.age,
          gender: profile.gender,
          preferences: profile.preferences
        },
        water: waterData,
        sleep: sleepData,
        mood: moodData
      };
      
      const userDataString = JSON.stringify(userData, null, 2);
      
      const prompt = `
You are a nutrition and wellness AI assistant. Based on the following user wellness data:

${userDataString}

Generate personalized wellness suggestions in these three areas:

1. A meal suggestion based on their energy needs and activity level
2. A specific breathwork exercise based on their stress/mood level
3. A movement/exercise suggestion based on their sleep/recovery data

Keep each suggestion concise (20-25 words max) but specific.
Format your response as a valid JSON with these exact keys:
{
  "meal": "your meal suggestion",
  "breathwork": "your breathwork suggestion",
  "movement": "your movement suggestion"
}

Only include the JSON in your response, no other text.
`;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a wellness coach assistant that provides evidence-based health recommendations.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        try {
          const aiContent = data.choices[0].message.content;
          const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
          const jsonString = jsonMatch ? jsonMatch[0] : aiContent;
          const parsedSuggestions = JSON.parse(jsonString);
          
          // Override our default suggestions with AI ones
          mealSuggestion = parsedSuggestions.meal || mealSuggestion;
          breathworkSuggestion = parsedSuggestions.breathwork || breathworkSuggestion;
          movementSuggestion = parsedSuggestions.movement || movementSuggestion;
        } catch (error) {
          console.error('Error parsing AI response:', error);
        }
      }
    }
    
    return {
      meal: mealSuggestion,
      breathwork: breathworkSuggestion,
      movement: movementSuggestion,
      hydrationTip: hydrationTip
    };
  } catch (error) {
    console.error('Error generating smart suggestions:', error);
    return null;
  }
}

// Generate basic rule-based suggestions
function generateBasicSuggestions(entries) {
  const suggestions = [];
  
  // Group entries by type
  const waterEntries = entries.filter(entry => entry.type === 'water');
  const sleepEntries = entries.filter(entry => entry.type === 'sleep');
  const activityEntries = entries.filter(entry => entry.type === 'activity');
  const mealEntries = entries.filter(entry => entry.type === 'meal');
  const moodEntries = entries.filter(entry => entry.type === 'mood');
  
  // Check hydration levels
  if (waterEntries.length > 0) {
    const latestWater = waterEntries[0];
    const waterAmount = latestWater.value.amount || 0;
    
    if (waterAmount < 4) {
      suggestions.push({
        type: 'hydration',
        title: 'Drink more water',
        description: 'Try to drink at least 8 glasses of water today to stay properly hydrated.',
        priority: 'high'
      });
    }
  } else {
    suggestions.push({
      type: 'hydration',
      title: 'Track your water intake',
      description: 'Start tracking your daily water intake to maintain proper hydration.',
      priority: 'medium'
    });
  }
  
  // Check sleep patterns
  if (sleepEntries.length > 0) {
    const latestSleep = sleepEntries[0];
    const sleepHours = latestSleep.value.hours || 0;
    
    if (sleepHours < 7) {
      suggestions.push({
        type: 'sleep',
        title: 'Improve sleep duration',
        description: 'Aim for 7-8 hours of sleep per night for optimal health.',
        priority: 'high'
      });
    }
  }
  
  // Check activity levels
  if (activityEntries.length === 0 || activityEntries.length < 3) {
    suggestions.push({
      type: 'activity',
      title: 'Increase physical activity',
      description: 'Try to incorporate at least 30 minutes of moderate exercise into your daily routine.',
      priority: 'medium'
    });
  }
  
  return suggestions;
}

// Generate AI-powered personalized suggestions
async function generateAISuggestions(profile, entries, basicSuggestions) {
  try {
    // Prepare data for OpenAI
    const userData = {
      profile: {
        age: profile.age,
        gender: profile.gender,
        preferences: profile.preferences
      },
      recentEntries: entries.map(entry => ({
        type: entry.type,
        value: entry.value,
        timestamp: entry.created_at
      })),
      basicSuggestions: basicSuggestions
    };
    
    // Convert data to a string format suitable for the prompt
    const userDataString = JSON.stringify(userData, null, 2);
    
    // Create the OpenAI prompt
    const prompt = `
You are a wellness coach AI that provides personalized health and wellness recommendations. 
Based on the following user data:

${userDataString}

Generate 3-5 personalized wellness suggestions for this user. Each suggestion should include:
1. A category (hydration, nutrition, activity, sleep, mindfulness)
2. A specific, actionable recommendation title
3. A short description explaining the benefits and how to implement it
4. A priority level (high, medium, low)

Format your response as a valid JSON array of suggestion objects with the following structure:
[
  {
    "type": "category",
    "title": "recommendation title",
    "description": "explanation",
    "priority": "priority level"
  }
]

Make your suggestions specific, evidence-based, and tailored to the user's recent activities and preferences.
Your suggestions should be motivational and positive in tone, encouraging healthy habits.
`;
    
    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a wellness coach assistant that provides evidence-based health recommendations.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });
    
    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      console.error('Unexpected OpenAI response:', data);
      return basicSuggestions; // Fallback to basic suggestions
    }
    
    // Parse the AI response
    try {
      const aiContent = data.choices[0].message.content;
      // Try to extract JSON from the response
      const jsonMatch = aiContent.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : aiContent;
      const parsedSuggestions = JSON.parse(jsonString);
      
      // Validate and return the suggestions
      if (Array.isArray(parsedSuggestions) && parsedSuggestions.length > 0) {
        return parsedSuggestions;
      } else {
        return basicSuggestions; // Fallback to basic suggestions
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      return basicSuggestions; // Fallback to basic suggestions
    }
  } catch (error) {
    console.error('Error in AI suggestions:', error);
    return basicSuggestions; // Fallback to basic suggestions
  }
}
