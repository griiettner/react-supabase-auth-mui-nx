import { t } from 'i18next';
import { ERROR, ERROR_EMPTY, SUCCESS, MESSAGE } from '@config';
import type {
  UtilsAuthLoginProps,
  UtilsAuthLoginFnReturn,
} from '@ts';

import { supabase } from '../../supabase';
import { updateAuthState } from '../updateAuthState';

/**
 * Asynchronously performs user authentication by logging in with an email and password.
 * Validates the inputs to ensure they are not empty, attempts to log in via Supabase,
 * and manages the authentication state based on the outcome of the login attempt.
 *
 * @param {Object} params - The parameters object.
 *   @param {string} params.email - The user's email address.
 *   @param {string} params.password - The user's password.
 * @returns {Promise<UtilsAuthLoginFnReturn>} - A promise that resolves to the updated authentication state.
 * The specific return type depends on the implementation of `updateAuthState`.
 *
 * @example
 * // Example call to the login function
 * login({ email: "user@example.com", password: "password123" })
 *   .then(authState => console.log("Authentication State:", authState))
 *   .catch(error => console.error("Login Error:", error));
 */
export async function login({ email, password, ...rest }: UtilsAuthLoginProps): UtilsAuthLoginFnReturn {
  console.log({ rest });
  // const email = rest.get('email')
  if (!password || password === '' || !email || email === '') {
    return updateAuthState(ERROR_EMPTY);
  }

  try {
    const data = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data[ERROR]?.[MESSAGE]) {
      return updateAuthState(ERROR, data[ERROR][MESSAGE]);
    }

    return updateAuthState(SUCCESS, data);
  } catch (error) {
    return updateAuthState(ERROR, t('auth.login.error'));
  }
}
