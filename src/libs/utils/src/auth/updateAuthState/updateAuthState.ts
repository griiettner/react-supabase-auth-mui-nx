import { t } from 'i18next';
import { ERROR, ERROR_EMPTY, ERROR_INCORRECT, SUCCESS, MESSAGE, RESET, authInitialState } from '@config';
import type { UtilsAuthLoginState } from '@ts';

/**
 * Updates the authentication state based on the specified action type and payload.
 *
 * This function takes an action type and an optional payload to update the authentication state.
 * It uses a switch statement to handle different cases like resetting the state, handling various
 * types of errors, or setting a successful state. The function returns an updated instance of
 * `UtilsAuthLoginState`.
 *
 * Parameters:
 * @param type - The type of action to handle. Determines the state update to be performed.
 * @param payload - Optional data associated with the action. Its structure depends on the action type.
 *
 * Return Type:
 * @returns The updated authentication state.
 *
 * Supported Action Types:
 * - `RESET`: Resets the authentication state to its initial state.
 * - `ERROR`, `ERROR_EMPTY`, `ERROR_INCORRECT`: Handles different error scenarios, setting the error message and code.
 * - `SUCCESS`: Updates the state to reflect a successful authentication, including user data.
 *
 * Default Case:
 * - If the action type is not recognized, the state is reset to its initial state.
 *
 * Example Usage:
 * const updatedState = updateAuthState(SUCCESS, { data: userData });
 */
export function updateAuthState(type: string, payload?: any): UtilsAuthLoginState {
  switch (type) {
    case RESET: {
      return { ...authInitialState };
    }

    case ERROR:
    case ERROR_EMPTY:
    case ERROR_INCORRECT: {
      return {
        ...authInitialState,
        [ERROR]: 400,
        [MESSAGE]: payload || t(`auth.login.${type}`),
      };
    }

    case SUCCESS: {
      const user = payload.data.session.user;
      delete payload.data.session.user;
      return {
        ...authInitialState,
        data: {
          user,
          session: payload.data.session,
        },
        [SUCCESS]: true,
      };
    }

    default: {
      return { ...authInitialState };
    }
  }
}
