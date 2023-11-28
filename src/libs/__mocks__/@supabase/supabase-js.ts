import { MOCK_AUTH_ACCESS_TOKEN, MOCK_AUTH_API_KEY } from "@config";

const originalModule = jest.requireActual('@supabase/supabase-js');

export default {
  ...originalModule,
  createClient: jest.fn().mockReturnValue({
    supabaseUrl: 'http://localhost:8000',
    supabaseKey: 'public-anon-key',
    realtimeUrl: 'wss://localhost:8000/realtime/v1',
    authUrl: 'https://localhost:8000/auth/v1',
    storageUrl: 'https://localhost:8000/storage/v1',
    functionsUrl: 'https://localhost:8000/functions/v1',
    storageKey: 'sb-localhost-auth-token',
    headers: {
      'X-Client-Info': 'supabase-js-web/2.38.4',
    },
    auth: {
      memoryStorage: null,
      stateChangeEmitters: {},
      autoRefreshTicker: 3,
      refreshingDeferred: null,
      initializePromise: {},
      detectSessionInUrl: true,
      lockAcquired: false,
      pendingInLock: [],
      broadcastChannel: {},
      instanceID: 0,
      logDebugMessages: false,
      persistSession: true,
      storageKey: 'sb-localhost-auth-token',
      autoRefreshToken: true,
      admin: {
        url: 'https://localhost:8000/auth/v1',
        headers: {
          Authorization: `Bearer ${MOCK_AUTH_API_KEY}`,
          apikey: MOCK_AUTH_API_KEY,
          'X-Client-Info': 'supabase-js-web/2.38.4',
        },
        mfa: {},
      },
      url: 'https://localhost:8000/auth/v1',
      headers: {
        Authorization: `Bearer ${MOCK_AUTH_API_KEY}`,
        apikey: MOCK_AUTH_API_KEY,
        'X-Client-Info': 'supabase-js-web/2.38.4',
      },
      flowType: 'implicit',
      mfa: {},
      storage: {},
    },
    realtime: {
      accessToken: MOCK_AUTH_ACCESS_TOKEN,
      channels: [],
      endPoint: 'wss://localhost:8000/realtime/v1/websocket',
      headers: {
        'X-Client-Info': 'supabase-js-web/2.38.4',
      },
      params: {
        apikey: MOCK_AUTH_API_KEY,
      },
      timeout: 10000,
      heartbeatIntervalMs: 30000,
      pendingHeartbeatRef: null,
      ref: 0,
      conn: null,
      sendBuffer: [],
      serializer: {
        HEADER_LENGTH: 1,
      },
      stateChangeCallbacks: {
        open: [],
        close: [],
        error: [],
        message: [],
      },
      reconnectTimer: {
        tries: 0,
      },
    },
    rest: {
      url: 'https://localhost:8000/rest/v1',
      headers: {
        'X-Client-Info': 'supabase-js-web/2.38.4',
      },
      schemaName: 'public',
    },
    changedAccessToken: MOCK_AUTH_ACCESS_TOKEN,
  }),
};
