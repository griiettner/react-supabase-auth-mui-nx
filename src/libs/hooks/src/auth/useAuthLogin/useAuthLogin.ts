import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login, logout } from '@utils';
import { REDIRECT_AFTER_LOGIN, authInitialState } from '@config';
import { HooksAuthLoginFetchProps } from '@ts';

/**
 * Custom React hook `useAuthLogin` for handling authentication login functionality.
 *
 * This hook integrates multiple React utilities and external functions to manage the login process.
 * It uses React Router's `useNavigate` and `useLocation` to handle redirection and location state,
 * `useState` and `useEffect` from React for state management, and `useTranslation` for internationalization.
 *
 * The `login` function from an external utility is used for the authentication process.
 *
 * The `logout` function from an external utility is used for the logout process.
 *
 * @returns  An object containing the `loginFetch` function and the current state.
 *
 * @example
 * const { loginFetch, logoutFetch, ...state } = useAuthLogin();
 *
 * // To perform a login operation
 * loginFetch({ email: 'user@example.com', password: 'password' });
 *
 * // Accessing the current state
 * console.log(state.message); // Outputs the current message state
 *
 * // To perform a logout operation
 * logoutFetch();
 */
export function useAuthLogin() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [state, setState] = useState({ ...authInitialState });

  useEffect(() => {
    if (location?.state?.message) {
      setState({ ...state, message: t(location.state.message) });
      delete location.state.message;
    }

    return () => {
      setState({ ...authInitialState });
    };
  }, []); // eslint-disable-line

  function loginFetch({ email, password }: HooksAuthLoginFetchProps) {
    setState({ ...state, loading: true });

    login({ email, password }).then((res) => {
      setState({ ...state, ...res, loading: false });

      if (res?.success) {
        navigate(REDIRECT_AFTER_LOGIN);
      }
    });
  }

  function logoutFetch() {
    logout().then((res) => {
      setState({ ...authInitialState, ...res });
      navigate('/404', { replace: true });
    });
  }

  return { loginFetch, logoutFetch, ...state };
}
