import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuthLogin } from './useAuthLogin';
import { MemoryRouter } from 'react-router-dom';
import { MOCK_AUTH_ACCESS_TOKEN } from '@config';

jest.mock('@utils', () => {
  return jest.requireActual('../../../../__mocks__/@utils/auth/login');
});

jest.mock('@supabase/supabase-js');

const wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

describe('useAuthLogin', () => {

  describe('Given the useAuthLogin hook', () => {
    describe('When the hook is used', () => {
      test('Then it should initialize with the default state', () => {
        const { result } = renderHook(() => useAuthLogin(), { wrapper });

        expect(result.current.success).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.message).toBeNull();
        expect(result.current.data.user).toBeNull();
        expect(result.current.data.session).toBeNull();
      });
    });

    describe('When loginFetch is called with valid credentials', () => {
      test('Then it should update the state based on the login response', async () => {
        jest.clearAllMocks();
        const { result } = renderHook(() => useAuthLogin(), { wrapper });

        result.current.loginFetch({ email: 'valid@example.com', password: 'correctpassword' });
        await waitFor(() => {
          expect(result.current.success).toBe(true);
          expect(result.current.data.user.id).toEqual('123');
          expect(result.current.data.session.access_token).toEqual(`Bearer ${MOCK_AUTH_ACCESS_TOKEN}`);
          expect(result.current.loading).toBe(false);
        });
      });
    });

    describe('When loginFetch is called with invalid credentials', () => {
      test('Then it should update the state based on the login response', async () => {
        const { result } = renderHook(() => useAuthLogin(), { wrapper });

        result.current.loginFetch({ email: 'any@any.com', password: 'any' });

        await waitFor(() => {
          expect(result.current.success).toBe(false);
          expect(result.current.error).toEqual(401);
          expect(result.current.message).toEqual('Invalid credentials');
          expect(result.current.data).toBeNull();
        });
      });
    });

    describe('When loginFetch is called with empty credentials', () => {
      test('Then it should not update the state for success', async () => {
        const { result } = renderHook(() => useAuthLogin(), { wrapper });

        result.current.loginFetch({ email: '', password: '' });

        await waitFor(() => {
          expect(result.current.success).toBe(false);
        });
      });
    });
  });
});
