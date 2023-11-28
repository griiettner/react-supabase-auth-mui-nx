import { User, Session, AuthError as supabaseError } from '@supabase/supabase-js';
import { LOGIN, LOGOUT } from '@config';

export type LOGIN = typeof LOGIN;
export type LOGOUT = typeof LOGOUT;

export interface AuthLoginFetchProps {
  [k: string]: FormDataEntryValue;
}

export interface AuthRegisterFetchProps extends AuthLoginFetchProps {}

export type AuthAuth = boolean | null;
export type AuthUser = User | null;
export type AuthSession = Session | null;
export type AuthError = supabaseError | number | null;

export interface AuthSessionType {
  session?: AuthSession;
  user?: AuthUser;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextDispatch {
  login: (data: AuthLoginFetchProps) => void;
  logout: () => void;
  register: (data: AuthRegisterFetchProps) => void;
  session: () => void;
}

export interface AuthContextProps {
  data?: AuthSessionType;
  error?: AuthError;
  message?: string | null;
  success?: boolean;
  loading?: boolean;
  dispatch: AuthContextDispatch;
}
