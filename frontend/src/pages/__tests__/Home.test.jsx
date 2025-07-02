import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../Home';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: /welcome to blry/i })
    ).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Home />);

    expect(
      screen.getByText(
        /A modern React application with Django backend integration/
      )
    ).toBeInTheDocument();
  });

  it('renders all feature cards', () => {
    render(<Home />);

    expect(screen.getByText(/React 19/)).toBeInTheDocument();
    expect(
      screen.getByText(/Latest React with modern hooks and features/)
    ).toBeInTheDocument();

    expect(screen.getByText(/Vite/)).toBeInTheDocument();
    expect(
      screen.getByText(/Lightning fast development and build tool/)
    ).toBeInTheDocument();

    expect(screen.getByText(/Django Ready/)).toBeInTheDocument();
    expect(
      screen.getByText(/Prepared for seamless Django backend integration/)
    ).toBeInTheDocument();
  });

  it('has correct structure with hero section', () => {
    render(<Home />);

    const heroSection = screen.getByText(/welcome to blry/i).closest('.hero');
    expect(heroSection).toBeInTheDocument();
  });
});
