import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import { AUTH_EMAIL, AUTH_PASSWORD } from '@config';

/**
 * PageLogin is a React component that renders the login interface for the application.
 * It utilizes Material-UI components to create a user-friendly login form.
 *
 * The form includes:
 * - An email input field, which is required and autofocused.
 * - A password input field, which is also required.
 * - A 'remember me' checkbox option.
 *
 * The component makes use of the `useTranslation` hook from `react-i18next` for internationalization,
 * allowing for the dynamic translation of text labels based on the current language settings.
 *
 * The component also uses constants from `@config` for the IDs and names of the email and password fields.
 * These constants ensure consistency and potentially ease the process of updating field identifiers.
 *
 * Usage:
 * ```
 * <PageLogin />
 * ```
 *
 * This component does not take any props.
 */
export function PageLogin() {
  const { t } = useTranslation();
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id={AUTH_EMAIL}
        label={t('auth.login.email')}
        type="email"
        name={AUTH_EMAIL}
        autoComplete="email"
        autoFocus
        inputProps={{ 'data-testid': 'page-auth-login-input-email' } as any}
        InputLabelProps={{ 'data-testid': 'page-auth-login-input-email-label' } as any}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name={AUTH_PASSWORD}
        label={t('auth.login.password')}
        type="password"
        id={AUTH_PASSWORD}
        autoComplete="current-password"
        inputProps={{ 'data-testid': 'page-auth-login-input-password' } as any}
        InputLabelProps={{ 'data-testid': 'page-auth-login-input-password-label' } as any}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" id="remember" inputProps={{ 'data-testid': 'page-auth-login-input-remember' } as any} />}
        label={t('auth.login.rememberMe')}
      />
    </>
  );
}
