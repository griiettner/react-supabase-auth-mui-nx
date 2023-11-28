import { env, SUPABASE_API_URL, SUPABASE_ANON_KEY } from './env';

describe('Environment Variables', () => {

  test('SUPABASE_API_URL should be correctly set from process.env', async () => {
    expect(SUPABASE_API_URL).toBe(env.VITE_SUPABASE_API_URL);
  });

  test('SUPABASE_ANON_KEY should be correctly set from process.env', async () => {
    expect(SUPABASE_ANON_KEY).toBe(env.VITE_SUPABASE_ANON_KEY);
  });
});
