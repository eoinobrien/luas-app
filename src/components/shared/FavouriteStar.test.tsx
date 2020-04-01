import React from 'react';
import { render } from '@testing-library/react';
import StationListRow from './FavouriteStar';

test('renders learn react link', () => {
  const { getByText } = render(<StationListRow />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
