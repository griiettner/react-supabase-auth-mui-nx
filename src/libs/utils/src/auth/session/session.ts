import { t } from 'i18next';
import { supabase } from '@utils';
import { ERROR, SUCCESS, MESSAGE } from '@config';
import { updateAuthState } from '../updateAuthState';

export async function session() {

  try {
    const data = await supabase.auth.getSession();

    if (data[ERROR]?.[MESSAGE]) {
      return updateAuthState(ERROR, data[ERROR][MESSAGE]);
    }

    return updateAuthState(SUCCESS, data);
  } catch (error) {
    return updateAuthState(ERROR, t('No session found'));
  }
}
