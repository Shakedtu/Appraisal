import React from 'react';
import { render, screen } from '@testing-library/react';
import CaseMenu from './CaseMenu';

test('renders all menu tabs', () => {
  const { getByText, getByTitle } = render(<CaseMenu />);

  expect(getByTitle('מבוטח ישראלי אלי')).toBeDefined();
  expect(getByText('case.menu.item.contact-info')).toBeDefined();
  expect(getByText('case.menu.item.more-info')).toBeDefined();
  expect(getByText('case.menu.item.bill-info')).toBeDefined();
  expect(getByText('case.menu.item.documents')).toBeDefined();
});
