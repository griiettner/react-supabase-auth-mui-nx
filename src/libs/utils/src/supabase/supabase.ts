import { createClient } from '@supabase/supabase-js';
import { SUPABASE_API_URL, SUPABASE_ANON_KEY } from '@config';

export const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);
