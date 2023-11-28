import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { login, logout, register, session } from '@utils';
import {
  REDIRECT_AFTER_LOGIN,
  REDIRECT_AFTER_LOGOUT,
  REDIRECT_AFTER_REGISTER,
  authInitialState
} from '@config';
import { AuthContextDispatch, AuthLoginFetchProps, AuthProviderProps } from '@ts';

import { AuthContext } from './AuthContext';


export function AuthProvider({ children }: AuthProviderProps) {
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

  useEffect(() => {
    if (!state?.data?.session?.access_token) {
      session().then((res) => {
        setState({ ...state, ...res });
        navigate(location.pathname);
      });
    }
  }, [state?.data?.session?.access_token]);

  const dispatch: AuthContextDispatch = {
    login: ({ email, password }) => {
      setState({ ...state, loading: true });

      login({ email, password }).then((res) => {
        setState({ ...state, ...res, loading: false });

        if (res?.success) {
          navigate(REDIRECT_AFTER_LOGIN);
        }
      });
    },

    logout: () => {
      logout().then((res) => {
        setState({ ...authInitialState, ...res });
        navigate(REDIRECT_AFTER_LOGOUT, { replace: true });
      });
    },

    register: ({ email, password, confirmPassword }) => {
      setState({ ...state, loading: true });

      register({ email, password, confirmPassword }).then((res) => {
        setState({ ...state, ...res, loading: false });

        if (res?.success) {
          navigate(REDIRECT_AFTER_REGISTER);
        }
      });
    },

    session: () => {
      setState({ ...state, loading: true });

      session().then((res) => {
        setState({ ...state, ...res, loading: false });
      });
    },
  };
console.log({ state });
  return (
    <AuthContext.Provider value={{ dispatch, ...state }}>
      {children}
    </AuthContext.Provider>
  );
}
