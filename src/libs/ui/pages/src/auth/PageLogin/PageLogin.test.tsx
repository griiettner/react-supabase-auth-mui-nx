import { render, screen } from '@testing-library/react';
import { PageLogin } from './PageLogin';
import { useTranslation } from 'react-i18next';
import { AUTH_EMAIL, AUTH_PASSWORD } from '@config';
import '@testing-library/jest-dom';

jest.mock('react-i18next');

describe('PageLogin', () => {
  let rendered: any;
  beforeEach(() => {
    (useTranslation as jest.Mock).mockImplementation(() => ({ t: (key: string) => key }));
    rendered = render(<PageLogin />);
  });

  test('renders email input field correctly', () => {
    const emailInput = screen.getByTestId('page-auth-login-input-email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('name', AUTH_EMAIL);
    expect(emailInput).toHaveAttribute('id', AUTH_EMAIL);
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveFocus();

    const emailLabel = screen.getByTestId('page-auth-login-input-email-label');
    expect(emailLabel).toBeInTheDocument();
    expect(emailLabel).toHaveAttribute('for', AUTH_EMAIL);
  });

  test('renders password input field correctly', () => {
    const passwordInput = screen.getByTestId('page-auth-login-input-password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('name', AUTH_PASSWORD);
    expect(passwordInput).toHaveAttribute('id', AUTH_PASSWORD);
    expect(passwordInput).toBeRequired();

    const passwordLabel = screen.getByTestId('page-auth-login-input-password-label');
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordLabel).toHaveAttribute('for', AUTH_PASSWORD);
  });

  test('renders remember me checkbox correctly', () => {
    const rememberCheckbox = screen.getByTestId('page-auth-login-input-remember');
    expect(rememberCheckbox).toBeInTheDocument();
    expect(rememberCheckbox).toHaveAttribute('type', 'checkbox');
  });
});
