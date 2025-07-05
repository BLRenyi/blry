import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Contact from '../Contact';

// Mock window.alert
const mockAlert = vi.fn();
global.alert = mockAlert;

describe('Contact Page', () => {
  beforeEach(() => {
    mockAlert.mockClear();
  });

  it('renders the contact form', () => {
    render(<Contact />);

    expect(
      screen.getByRole('heading', { name: /contact us/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('updates form fields when user types', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Hello, this is a test message');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Hello, this is a test message');
  });

  it('shows alert when form is submitted', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');

    await user.click(submitButton);

    expect(mockAlert).toHaveBeenCalledWith(
      'Form submission will be implemented when Django backend is connected!'
    );
  });

  it('renders project information section', () => {
    render(<Contact />);

    expect(screen.getByText(/Project Information/)).toBeInTheDocument();
    expect(screen.getByText(/Development Status/)).toBeInTheDocument();
    expect(screen.getByText(/Future Features/)).toBeInTheDocument();
  });
});
