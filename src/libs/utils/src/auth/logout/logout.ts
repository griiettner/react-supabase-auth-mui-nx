import { t } from 'i18next';
import { supabase } from '@utils';
import { ERROR, SUCCESS, MESSAGE, authInitialState } from '@config';
import { updateAuthState } from '../updateAuthState';

/**
 * Asynchronously logs out the current user from the authentication service.
 *
 * This function attempts to sign the user out using the Supabase authentication service.
 * If the logout is successful, it updates the authentication state to reflect the logout.
 * In case of an error during the logout process, the authentication state is updated
 * with an error message. The function uses the `updateAuthState` helper to manage these updates.
 *
 * @returns A promise that resolves to the result of the `updateAuthState` call,
 *                            which updates the global authentication state.
 *
 * Usage example:
 *
 * ```javascript
 * // Assuming this function is called within a context where a user is logged in
 * logout().then(result => {
 *   // Handle the result of the logout operation
 *   console.log(result);
 * }).catch(error => {
 *   // Handle any error that might occur during logout
 *   console.error(error);
 * });
 * ```
 */
export async function logout() {

  try {
    const data = await supabase.auth.signOut();

    if (data[ERROR]?.[MESSAGE]) {
      return updateAuthState(ERROR, data[ERROR][MESSAGE]);
    }

    return updateAuthState(SUCCESS, authInitialState);
  } catch (error) {
    return updateAuthState(ERROR, t('Not able to sign out'));
  }
}
