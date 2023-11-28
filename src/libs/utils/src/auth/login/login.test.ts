import { login } from './login';
import type { UtilsAuthLoginState } from '@ts';

jest.mock('./login', () => {
  return jest.requireActual('../../../../__mocks__/@utils/auth/login');
});

describe('login function', () => {
  let response: UtilsAuthLoginState;

  describe('Given valid credentials', () => {
    const mockEmail = 'valid@example.com';
    const mockPassword = 'correctpassword';

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await login({ email: mockEmail, password: mockPassword });
    });

    describe('When login is called', () => {
      test('Then it should successfully authenticate', () => {
        expect(response.success).toBe(true);
        expect(response.error).toBeNull();
        expect(response.message).toBeNull();
      });

      test('Then it should call the login function once with correct arguments', () => {
        expect(login).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledWith({ email: mockEmail, password: mockPassword });
      });

      test('Then it should return valid user and session data', () => {
        expect(response.data).not.toBeNull();
        expect(response.data).toHaveProperty('user');
        expect(response.data).toHaveProperty('session');

        expect(response.data?.user).not.toBeNull();
        expect(response.data?.session).not.toBeNull();
      });

      test('Then it should include detailed properties for user and session', () => {
        const { user, session } = response.data!;
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('app_metadata');
        expect(user).toHaveProperty('user_metadata');
        expect(user).toHaveProperty('aud');
        expect(user).toHaveProperty('created_at');

        expect(session).toHaveProperty('access_token');
        expect(session).toHaveProperty('refresh_token');
        expect(session).toHaveProperty('expires_in');
        expect(session).toHaveProperty('token_type');
        expect(session).toHaveProperty('user');
      });
    });
  });

  describe('Given invalid credentials', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      response = await login({ email: 'any@any.com', password: 'wrongpassword' });
    });

    describe('When login is called', () => {
      test('Then it should fail to authenticate', () => {
        expect(response.success).toBe(false);
        expect(response.data).toBeNull();
      });

      test('Then it should call the login function once', () => {
        expect(login).toHaveBeenCalledTimes(1);
      });

      test('Then it should return an appropriate error message and code', () => {
        expect(response.error).not.toBeNull();
        expect(response.error).toBe(401);
        expect(response.message).toBe('Invalid credentials');
      });
    });
  });

  describe('Given empty credentials', () => {
    beforeEach(async () => {
      jest.clearAllMocks();
      response = await login({ email: '', password: '' });
    });

    describe('When login is called', () => {
      test('Then it should fail to authenticate', () => {
        expect(response.success).toBe(false);
        expect(response.data).toBeNull();
      });

      test('Then it should call the login function once', () => {
        expect(login).toHaveBeenCalledTimes(1);
      });

      test('Then it should return an appropriate error message and code for empty credentials', () => {
        expect(response.error).not.toBeNull();
        expect(response.error).toBe(401);
        expect(response.message).toBe('auth.login.errorEmpty');
      });
    });
  });
});
