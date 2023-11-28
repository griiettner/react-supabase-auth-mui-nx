import { t } from 'i18next';
import { supabase } from '../../supabase';
import type { UtilsAuthLoginFnReturn, AuthRegisterFetchProps } from '@ts';
import { ERROR, ERROR_EMPTY, SUCCESS, MESSAGE } from '@config';
import { updateAuthState } from '../updateAuthState';

export async function register({ email, password, confirmPassword }: AuthRegisterFetchProps): UtilsAuthLoginFnReturn {
  if (!password || password === '' || !email || email === '') {
    return updateAuthState(ERROR_EMPTY);
  }

  if (password !== confirmPassword) {
    return updateAuthState(ERROR, t('auth.register.errorMatch'));
  }

  try {
    const data = await supabase.auth.signUp({ email, password } as { email: string; password: string });

    if (data?.error) {
      return updateAuthState(ERROR, data[ERROR][MESSAGE]);
    }

    return updateAuthState(SUCCESS, data);
  } catch (error) {
    return updateAuthState(ERROR, t('auth.register.errorIncorrect'));
  }
}
