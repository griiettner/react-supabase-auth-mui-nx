import type { Meta, StoryObj } from '@storybook/react';
import { PageLogin } from './PageLogin';
import { LayoutAuth } from '@layouts';
import { JSX } from 'react/jsx-runtime';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { AUTH_EMAIL, AUTH_PASSWORD } from '@config';


const meta: Meta<typeof PageLogin> = {
  title: 'UI/Pages/PageLogin',
  component: PageLogin,
};
export default meta;
type Story = StoryObj<typeof PageLogin>;

const Template = (args: JSX.IntrinsicAttributes) => <PageLogin {...args} />;

const TemplateFull = (args: JSX.IntrinsicAttributes) => (
  <LayoutAuth>
    <PageLogin {...args} />
  </LayoutAuth>
);

export const Base: Story = Template.bind({});

Base.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Renders email input field correctly
  const emailInput = canvas.getByTestId('page-auth-login-input-email');
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute('type', 'email');
  expect(emailInput).toHaveAttribute('name', AUTH_EMAIL);
  expect(emailInput).toHaveAttribute('id', AUTH_EMAIL);
  expect(emailInput).toBeRequired();
  expect(emailInput).toHaveFocus();

  // Renders email label correctly
  const emailLabel = canvas.getByTestId('page-auth-login-input-email-label');
  expect(emailLabel).toBeInTheDocument();
  expect(emailLabel).toHaveAttribute('for', AUTH_EMAIL);

  // Renders password input field correctly
  const passwordInput = canvas.getByTestId('page-auth-login-input-password');
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(passwordInput).toHaveAttribute('name', AUTH_PASSWORD);
  expect(passwordInput).toHaveAttribute('id', AUTH_PASSWORD);
  expect(passwordInput).toBeRequired();

  // Renders password label correctly
  const passwordLabel = canvas.getByTestId('page-auth-login-input-password-label');
  expect(passwordLabel).toBeInTheDocument();
  expect(passwordLabel).toHaveAttribute('for', AUTH_PASSWORD);

  // Renders remember me checkbox correctly
  const rememberCheckbox = canvas.getByTestId('page-auth-login-input-remember');
  expect(rememberCheckbox).toBeInTheDocument();
  expect(rememberCheckbox).toHaveAttribute('type', 'checkbox');
};

export const Full: Story = TemplateFull.bind({});

