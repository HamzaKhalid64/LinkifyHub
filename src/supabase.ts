/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tlakxqwgtifnrwgsszfx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYWt4cXdndGlmbnJ3Z3NzemZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5OTEzMDIsImV4cCI6MjA5MzU2NzMwMn0.2sAH_lOPlsgUCy6KK8iGAjUqxPaHZc6h_JLYYDNrGQ8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
