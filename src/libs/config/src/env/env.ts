import type { ProcessEnv } from '@ts';

export const env = process.env as unknown as ProcessEnv;

export const SUPABASE_API_URL = env.VITE_SUPABASE_API_URL;
export const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;
