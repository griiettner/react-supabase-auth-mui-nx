import { paths } from '../routes';

export const REDIRECT_LOGIN = paths.auth.login;
export const REDIRECT_AFTER_LOGIN = paths.home;
export const REDIRECT_AFTER_LOGOUT = paths.home;
export const REDIRECT_AFTER_REGISTER = paths.home;

export const AUTH_EMAIL = 'email';
export const AUTH_PASSWORD = 'password';
export const AUTH_CONFIRM_PASSWORD = 'confirmPassword';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
