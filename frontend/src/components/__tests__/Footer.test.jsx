import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';

describe('Footer Component', () => {
  it('renders copyright text', () => {
    render(<Footer />);

    expect(
      screen.getByText(/© 2025 BLRY. All rights reserved./)
    ).toBeInTheDocument();
  });

  it('renders technology stack information', () => {
    render(<Footer />);

    expect(screen.getByText(/Built with React and Vite/)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('footer');
  });
});
