import type { Meta, StoryObj } from '@storybook/react';
import { LayoutAuth } from './LayoutAuth';

import { within, userEvent } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import { layoutAuthArgs, argTypes } from './LayoutAuth.args';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { LayoutAuthProps } from '@ts';

const meta: Meta<typeof LayoutAuth> = {
  title: 'UI/Layouts/LayoutAuth',
  component: LayoutAuth,
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
      handles: ['mouseover', 'onSubmit'],
    },
  },
  argTypes,
};
export default meta;
type Story = StoryObj<typeof LayoutAuth>;

const Template = (args: EmotionJSX.IntrinsicAttributes & LayoutAuthProps) => (
  <LayoutAuth {...args}>
    {args?.children || ''}
  </LayoutAuth>
);

export const Base: Story = Template.bind({});
Base.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const { title, buttonText } = layoutAuthArgs.defaultValues;

  expect(canvas.getByTestId('auth-layout-image')).toContainElement(canvas.getByTestId('LockOutlinedIcon'));
  expect(canvas.getByTestId('auth-layout-title')).toHaveTextContent(title);
  expect(canvas.getByTestId('auth-layout-form-submit')).toHaveTextContent(buttonText);
  expect(canvas.getByTestId('auth-layout-form-body')).toBeEmptyDOMElement();
};

export const WithChildren: Story = Template.bind({});
WithChildren.args = {
  ...layoutAuthArgs.withChildren.args,
};
WithChildren.play = async ({ canvasElement, allArgs }) => {
  const canvas = within(canvasElement);
  const child = canvas.getByTestId('auth-layout-with-children');

  expect(child).toBeTruthy();
  expect(child).toHaveTextContent(allArgs.children.props.children);
};

export const WithLinks: Story = Template.bind({});
WithLinks.args = {
  ...layoutAuthArgs.withLinks.args,
};

WithLinks.play = async ({ canvasElement, allArgs }) => {
  const canvas = within(canvasElement);
  const childLeft = canvas.getByTestId('auth-layout-link-left');
  const childRight = canvas.getByTestId('auth-layout-link-right');
  const { linkLeftLabel, linkLeftPath, linkRightLabel, linkRightPath } = layoutAuthArgs.withLinks.args;

  expect(childLeft).toBeTruthy();
  expect(childLeft).toHaveAttribute('href', linkLeftPath);
  expect(childLeft).toHaveTextContent(linkLeftLabel);

  expect(childRight).toBeTruthy();
  expect(childRight).toHaveAttribute('href', linkRightPath);
  expect(childRight).toHaveTextContent(linkRightLabel);
};

export const WithCustomTitle: Story = Template.bind({});
WithCustomTitle.args = {
  ...layoutAuthArgs.withCustomTitle.args,
};
WithCustomTitle.play = async ({ canvasElement, allArgs }) => {
  const canvas = within(canvasElement);
  const titleEl = canvas.getByTestId('auth-layout-title');
  const { title } = layoutAuthArgs.withCustomTitle.args;

  expect(titleEl).toHaveTextContent(title);
};

export const WithCustomButtonText: Story = Template.bind({});
WithCustomButtonText.args = {
  ...layoutAuthArgs.withCustomButtonText.args,
};
WithCustomButtonText.play = async ({ canvasElement, allArgs }) => {
  const canvas = within(canvasElement);
  const buttonEl = canvas.getByTestId('auth-layout-form-submit');
  const { buttonText } = layoutAuthArgs.withCustomButtonText.args;

  expect(buttonEl).toHaveAttribute('type', 'submit');
  expect(buttonEl).toHaveTextContent(buttonText);
};

const handleOnSubmitMock = jest.fn();

export const WithFetchApi: Story = Template.bind({});
WithFetchApi.args = {
  ...layoutAuthArgs.withFetchApi.args,
};
WithFetchApi.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByTestId('auth-layout-form-submit');
  const form = canvas.getByTestId('auth-layout-form');
  form.onsubmit = handleOnSubmitMock;

  expect(canvas.queryByTestId('auth-layout-alert')).toBeNull();
  await userEvent.click(button);

  expect(handleOnSubmitMock).toHaveBeenCalled();
  expect(form).toHaveFormValues({});

  const alert = await canvas.findByTestId('auth-layout-alert');
  expect(alert).toBeTruthy();
  expect(alert).toHaveTextContent('Success');
  expect(alert).toHaveAttribute('data-alert-type', 'success');
};

export const WithFetchApiError: Story = Template.bind({});
WithFetchApiError.args = {
  ...layoutAuthArgs.withFetchApiError.args,
};
WithFetchApiError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByTestId('auth-layout-form-submit');

  expect(canvas.queryByTestId('auth-layout-alert')).toBeNull();

  await userEvent.click(button);
  const alert = await canvas.findByTestId('auth-layout-alert');
  expect(alert).toBeTruthy();
  expect(alert).toHaveTextContent('Error');
  expect(alert).toHaveAttribute('data-alert-type', 'error');
};
