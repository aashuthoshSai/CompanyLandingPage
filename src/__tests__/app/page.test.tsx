import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../../app/page';

test('renders page component', () => {
    render(<Page />);
    const linkElement = screen.getByText(/page content/i);
    expect(linkElement).toBeInTheDocument();
});