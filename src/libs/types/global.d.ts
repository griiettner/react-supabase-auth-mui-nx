interface ImportMetaEnv {
  VITE_SUPABASE_API_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export type ProcessEnv = {
  VITE_SUPABASE_API_URL: string,
  VITE_SUPABASE_ANON_KEY: string
};
