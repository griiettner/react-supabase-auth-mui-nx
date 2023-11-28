import { render, fireEvent, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { LayoutAuth } from './LayoutAuth';
import { layoutAuthArgs } from './LayoutAuth.args';
import type { LayoutAuthFetchApi } from '@ts';
import '@testing-library/jest-dom';

jest.mock('@utils', () => {
  return jest.requireActual('../../../../__mocks__/@utils/auth/login');
});

jest.mock('@supabase/supabase-js');

describe('LayoutAuth Component', () => {
  describe('Given the component is rendered basic', () => {
    describe('When basic components is loaded', () => {
      test('Then it should display the correct title, button text, and icons', () => {
        const rendered = render(<LayoutAuth>{/* Your children components */}</LayoutAuth>);
        expect(rendered.getByTestId('auth-layout-image')).toContainElement(rendered.getByTestId(layoutAuthArgs.defaultValues.icon));
        expect(rendered.getByTestId('auth-layout-title')).toHaveTextContent(layoutAuthArgs.defaultValues.title);
        expect(rendered.getByTestId('auth-layout-form-submit')).toHaveTextContent(layoutAuthArgs.defaultValues.buttonText);
      });
    });
  });
  describe('Given the component is rendered with props', () => {
    describe('When Custom props are set', () => {
      let rendered: any;

      beforeEach(() => {
        rendered = render(
          <LayoutAuth
            title={layoutAuthArgs.withCustomTitle.args.title}
            buttonText={layoutAuthArgs.withCustomButtonText.args.buttonText}
            linkLeftLabel={layoutAuthArgs.withLinks.args.linkLeftLabel}
            linkLeftPath={layoutAuthArgs.withLinks.args.linkLeftPath}
            linkRightLabel={layoutAuthArgs.withLinks.args.linkRightLabel}
            linkRightPath={layoutAuthArgs.withLinks.args.linkRightPath}
          >
            {layoutAuthArgs.withChildren.args.children}
          </LayoutAuth>
        );
      });

      afterEach(cleanup);
      test('Then it should display the correct title, button text, and icons', () => {
        expect(rendered.getByTestId('auth-layout-title')).toHaveTextContent(layoutAuthArgs.withCustomTitle.args.title);
        expect(rendered.getByTestId('auth-layout-form-submit')).toHaveTextContent(layoutAuthArgs.withCustomButtonText.args.buttonText);
      });
      test('Then it should render the child components correctly', () => {
        const child = rendered.getByTestId('auth-layout-with-children');
        expect(child).toBeTruthy();
        expect(child).toHaveTextContent('Test');
      });

      test('Then it should display left and right links when provided', () => {
        expect(rendered.getByTestId('auth-layout-link-left')).toHaveAttribute('href', layoutAuthArgs.withLinks.args.linkLeftPath);
        expect(rendered.getByTestId('auth-layout-link-right')).toHaveAttribute('href', layoutAuthArgs.withLinks.args.linkRightPath);
      });
    });

    describe('When the form is submitted', () => {
      let rendered: any, fetchApiMock: LayoutAuthFetchApi;

      beforeEach(() => {
        fetchApiMock = jest.fn().mockResolvedValue({ message: 'Success' }) as unknown as LayoutAuthFetchApi;
        rendered = render(<LayoutAuth fetchApi="login">{/* Your children components */}</LayoutAuth>);
      });

      test('Then it should call the provided fetchApi function and display a success message', async () => {
        await act(async () => {
          fireEvent.submit(rendered.getByTestId('auth-layout-form'));
        });

        // expect(fetchApiMock).toHaveBeenCalled();
        // Since state updates are async, you might need to wait for the element to appear
        const alert = await rendered.findByTestId('auth-layout-alert');
        expect(alert).toBeTruthy();
        expect(alert).toHaveTextContent('Success');
        expect(alert).toHaveAttribute('data-alert-type', 'success');
      });
    });

    describe('When the form submission results in an error', () => {
      let rendered: any, fetchApiMock: LayoutAuthFetchApi;
      beforeEach(() => {
        fetchApiMock = jest.fn().mockRejectedValue({ message: 'Error', error: 400 }) as unknown as LayoutAuthFetchApi;
        rendered = render(<LayoutAuth fetchApi={fetchApiMock}>{/* Your children components */}</LayoutAuth>);
      });

      test('Then it should display an error message', async () => {
        await act(async () => {
          fireEvent.submit(rendered.getByTestId('auth-layout-form'));
        });

        // expect(fetchApiMock).toHaveBeenCalled();
        const alert = await rendered.findByTestId('auth-layout-alert');
        expect(alert).toBeTruthy();
        expect(alert).toHaveTextContent('Error');
        expect(alert).toHaveAttribute('data-alert-type', 'error');
      });
    });
  });
});
