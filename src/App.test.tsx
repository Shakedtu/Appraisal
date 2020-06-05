import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders button', () => {
  const { getByText } = render(<App />);
  const ButtonElement = getByText(/Button/i);
  expect(ButtonElement).toBeInTheDocument();
});
