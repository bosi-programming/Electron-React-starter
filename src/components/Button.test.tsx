import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders learn react link', () => {
  render(<Button />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<Button />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});
