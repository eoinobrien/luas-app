import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


test('renders line link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/line/Red);
    expect(linkElement).toBeInTheDocument();
});