import { MOCK_AUTH_ACCESS_TOKEN, MOCK_AUTH_API_KEY } from '@config';

const mockUser = {
  id: '123',
  app_metadata: {},
  user_metadata: {},
  aud: 'some-aud-value',
  created_at: '2023-01-01T00:00:00Z',
};

export const login = jest.fn(({ email, password }) => {
  // Define the credentials for a successful login
  const validCredentials = {
    email: 'valid@example.com',
    password: 'correctpassword',
  };

  // Check if the provided credentials match the valid ones
  if (email === validCredentials.email && password === validCredentials.password) {
    // Success response
    return Promise.resolve({
      success: true,
      data: {
        user: mockUser,
        session: {
          access_token: `Bearer ${MOCK_AUTH_ACCESS_TOKEN}`,
          refresh_token: MOCK_AUTH_API_KEY,
          expires_in: 3600,
          token_type: 'Bearer',
          user: mockUser,
        },
      },
      error: null,
      message: null,
    });
  }

  const message = email === '' || password === '' ? 'auth.login.errorEmpty' : 'Invalid credentials';

  return Promise.resolve({
    success: false,
    data: null,
    error: 401, // or any appropriate error code
    message,
  });
});
