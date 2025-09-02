import {createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://kbfubmrbvvxjbywutwpy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiZnVibXJidnZ4amJ5d3V0d3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMTQxMjksImV4cCI6MjA2OTc5MDEyOX0.VK_BixjAc3XBjPa1YbN0h_xXLMnSd1WYY6Fu4zzLg0A';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;