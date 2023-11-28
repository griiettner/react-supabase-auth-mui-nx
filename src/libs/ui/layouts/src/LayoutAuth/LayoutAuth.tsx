import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { LayoutAuthProps } from '@ts';
import { useAuth } from '@hooks';

/**
 * Renders an authentication layout with support for custom child components, title, button text, API fetching, and optional links.
 *
 * This component is designed to provide a standardized layout for authentication-related pages such as login or registration. It includes
 * a form submission handler, dynamic titling, and optional left and right links for additional navigational options.
 *
 * @param props.children - `React.ReactNode` The child components to be rendered inside the layout.
 * @param props.title - `string` The title displayed at the top of the layout. If not provided, a default title is used.
 * @param props.buttonText - `string` The text for the submission button. If not provided, a default text is used.
 * @param props.fetchApi - `login | logout | register | session | recover` The API function name to be called on form submission.
 * @param props.linkLeftLabel - `string` The label for the left link. If not provided, a default label is used.
 * @param props.linkLeftPath - `string` The URL path for the left link.
 * @param props.linkRightLabel - `string` The label for the right link. If not provided, a default label is used.
 * @param props.linkRightPath - `string` The URL path for the right link.
 * @returns `EmotionJSX.Element` The rendered authentication layout component.
 *
 * @example
 * <LayoutAuth
 *   title="Sign In"
 *   buttonText="Login"
 *   fetchApi="login"
 *   linkLeftLabel="Forgot password?"
 *   linkLeftPath="/forgot-password"
 *   linkRightLabel="Register"
 *   linkRightPath="/register"
 * >
 *   <TextInput label="Username" />
 *   <TextInput label="Password" type="password" />
 * </LayoutAuth>
 */
export function LayoutAuth({
  children,
  title,
  buttonText,
  fetchApi,
  linkLeftLabel,
  linkLeftPath,
  linkRightLabel,
  linkRightPath
}: LayoutAuthProps) {
  const { t } = useTranslation();
  const { dispatch, loading, error, message } = useAuth();

  const isAnyLink = linkLeftLabel || linkLeftPath || linkRightLabel || linkRightPath;
  const isAllLinks = linkLeftLabel && linkLeftPath && linkRightLabel && linkRightPath;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (fetchApi) {
      dispatch[fetchApi](Object.fromEntries(data.entries()));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} data-testid="auth-layout-image">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" data-testid="auth-layout-title">
          {t(title || 'auth.login.title')}
        </Typography>
        {message && (
          <Alert
            severity={error ? 'error' : 'success'}
            data-testid="auth-layout-alert"
            data-alert-type={error ? 'error' : 'success'}
          >
            {message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} data-testid="auth-layout-form">
          <Box component="div" data-testid="auth-layout-form-body">
            {children}
          </Box>
          <Button
            fullWidth
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-testid="auth-layout-form-submit"
          >
            {t(buttonText || 'auth.login.submit')}
          </Button>
          {isAnyLink && (
            <Grid container justifyContent={isAllLinks ? 'flex-start' : 'flex-end'}>
              {linkLeftLabel && linkLeftPath && (
                <Grid item xs>
                  <Link href={linkLeftPath} variant="body2" sx={{ mr: '8px' }} data-testid="auth-layout-link-left">
                    {t(linkLeftLabel)}
                  </Link>
                </Grid>
              )}
              {linkRightLabel && linkRightPath && (
                <Grid item>
                  <Link href={linkRightPath} variant="body2" sx={{ ml: '8px' }} data-testid="auth-layout-link-right">
                    {t(linkRightLabel)}
                  </Link>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
}
