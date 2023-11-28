
const SUPABASE_API_URL = 'http://localhost:3000';
const SUPABASE_ANON_KEY = 'test_supabase_key';

describe('Supabase Client Initialization', () => {
  beforeAll(() => {
    process.env['VITE_SUPABASE_API_URL'] = SUPABASE_API_URL;
    process.env['VITE_SUPABASE_ANON_KEY'] = SUPABASE_ANON_KEY;
  });

  let supabase;

  beforeEach(async () => {
    jest.resetModules(); // Reset modules to clear cache
    supabase = (await import('./supabase')).supabase;
  });

  describe('Given the environment variables are set for Supabase API URL and ANON KEY', () => {
    const expectedUrl: string = SUPABASE_API_URL;
    const expectedKey: string = SUPABASE_ANON_KEY;

    describe('When the Supabase client is created', () => {
      test('Then it should be initialized with the correct URL and ANON KEY', () => {
        expect(supabase).toHaveProperty('supabaseUrl', expectedUrl);
        expect(supabase).toHaveProperty('supabaseKey', expectedKey);
      });
    });
  });
});
