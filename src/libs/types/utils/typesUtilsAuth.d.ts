import { AuthTokenResponse, User, Session } from '@supabase/supabase-js';
import { ERROR, MESSAGE, SUCCESS, DATA, LOADING, AUTH_EMAIL, AUTH_PASSWORD } from '@config';

/**
 * UtilsAuthLogin
 */

/**
 * Interface for authentication properties required for user login.
 *
 * This interface outlines the structure for login authentication properties. It expects two key properties:
 * `AUTH_EMAIL` and `AUTH_PASSWORD`, both of which are of type string. These properties are used to manage
 * the email and password credentials for a user's login process.
 *
 * Properties:
 * @property {string} email - Represents the user's email address.
 * @property {string} password - Represents the user's password.
 *
 * Example Usage:
 * const loginProps: UtilsAuthLoginProps = {
 *   email: 'user@example.com',
 *   password: 'userPassword123'
 * };
 */
export interface UtilsAuthLoginProps {
  [AUTH_EMAIL]: FormDataEntryValue;
  [AUTH_PASSWORD]: FormDataEntryValue;
}


/**
 * Interface for the state of a user login process.
 *
 * This interface extends the `AuthTokenResponse` and includes additional state information
 * regarding the user login process. It comprises optional data about the user and session,
 * error codes, a message, and a success status indicator.
 *
 * Properties:
 * @extends AuthTokenResponse
 *
 * @property {Object} data - Optional container for user and session data.
 *   @property {User|null} data.user - Information about the logged-in user. Can be `null`.
 *   @property {Session|null} data.session - Information about the current session. Can be `null`.
 *
 * @property {number|null} error - Optional error code. `null` if no error.
 *
 * @property {string|null} message - Optional message, typically used for providing information about the login process or errors.
 *
 * @property {boolean} success - Indicates whether the login was successful.
 *
 * Example Usage:
 * const loginState: UtilsAuthLoginState = {
 *   data: {
 *     user: <currentUserObj>,
 *     session: <currentSessionObj>
 *   },
 *   error: null,
 *   message: 'Login successful',
 *   success: true
 * };
 */
export interface UtilsAuthLoginState extends AuthTokenResponse {
  [DATA]?: {
    user?: User | null;
    session?: Session | null;
  };
  [ERROR]?: number | null;
  [MESSAGE]?: string | null;
  [SUCCESS]?: boolean;
  [LOADING]?: boolean;
};

/**
 * Type definition for the return value of an authentication login function.
 *
 * This type specifies that the function will return a `Promise` which, when resolved,
 * yields an instance of `UtilsAuthLoginState`. The `UtilsAuthLoginState` encapsulates
 * the state of the login process, including user and session data, error information,
 * a message, and a success flag. This type is typically used in functions that handle
 * user authentication processes.
 *
 * Type:
 * @typedef {Promise<UtilsAuthLoginState>} UtilsAuthLoginFnReturn
 *
 * Example Usage:
 * async function login(credentials: UtilsAuthLoginProps): UtilsAuthLoginFnReturn {
 *   try {
 *     // logic to handle login
 *     return Promise.resolve(<instance of UtilsAuthLoginState>);
 *   } catch (error) {
 *     return Promise.reject(error);
 *   }
 * }
 */
export type UtilsAuthLoginFnReturn = Promise<UtilsAuthLoginState>;

/**
 * Type definition for a function handling the authentication login process.
 *
 * This type represents a function that takes login credentials as input and returns a promise
 * indicating the outcome of the login process. The function accepts an object containing `email`
 * and `password`, conforming to the `UtilsAuthLoginProps` structure, and returns a `Promise`
 * resolving to `UtilsAuthLoginState`.
 *
 * Parameters:
 * @param {UtilsAuthLoginProps} props - The login credentials.
 *   @param {string} props.email - The user's email address.
 *   @param {string} props.password - The user's password.
 *
 * Return Type:
 * @returns {UtilsAuthLoginFnReturn} A promise that resolves to an instance of `UtilsAuthLoginState`,
 * indicating the state of the login process, including user data, session information, error codes,
 * messages, and a success indicator.
 *
 * Example Usage:
 * const login: UtilsAuthLoginFn = async ({ email, password }) => {
 *   // Implementation for login
 *   // Returns a Promise of UtilsAuthLoginState
 * };
 */
export type UtilsAuthLoginFn = (
  { email, password }: UtilsAuthLoginProps
) => UtilsAuthLoginFnReturn;

declare function login({ email, password }: HooksAuthLoginFetchProps): Promise<
  | {
      success: boolean;
      data: {
        user: User;
        session: Session;
      };
      error: null;
      message: null;
    }
  | {
      success: boolean;
      data: null;
      error: number;
      message: string;
    }
>;
