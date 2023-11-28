import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider', () => {
  test('renders children correctly', () => {
    const childText = 'Test Child';
    const { getByText } = render(
      <ThemeProvider>
        <div>{childText}</div>
      </ThemeProvider>
    );

    expect(getByText(childText)).toBeInTheDocument();
  });
});
