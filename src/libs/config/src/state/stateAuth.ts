import { ERROR, SUCCESS, MESSAGE, LOADING } from '../consts';
import type { UtilsAuthLoginState } from '@ts';

const authInitialState: UtilsAuthLoginState = {
  data: {
    user: null,
    session: null,
  },
  [ERROR]: null,
  [MESSAGE]: null,
  [SUCCESS]: false,
  [LOADING]: false,
};

Object.freeze(authInitialState);

export { authInitialState };
