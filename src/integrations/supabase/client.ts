// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ejepafeakrietmdctblp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqZXBhZmVha3JpZXRtZGN0YmxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDY3NDEsImV4cCI6MjA1ODM4Mjc0MX0.RXmwVy7W_gil5MXDU4VidtKhg3Dj4L3AprSTqMXDpzo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);