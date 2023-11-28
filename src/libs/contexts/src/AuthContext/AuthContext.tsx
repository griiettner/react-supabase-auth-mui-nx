import { createContext } from 'react';
import { AuthContextProps } from '@ts';

const props: AuthContextProps = {
  data: {
    user: null,
    session: null,
  },
  error: null,
  message: '',
  success: false,
  loading: false,
  dispatch: {
    login: () => {},
    logout: () => { },
    register: () => { },
    session: () => {},
  },
};

export const AuthContext = createContext(props);
