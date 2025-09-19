import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import { LoginForm } from '../login-form.component';

// Mock do store
const mockUseAuthStore = vi.fn();
vi.mock('../../stores/auth.store', () => ({
  useAuthStore: () => mockUseAuthStore(),
}));

describe('LoginForm Component', () => {
  beforeEach(() => {
    mockUseAuthStore.mockReturnValue({
      login: vi.fn(),
      isLoading: false,
      error: null,
      clearError: vi.fn(),
    });
  });

  it('should render login form', () => {
    render(<LoginForm />);

    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should show loading state when isLoading is true', () => {
    mockUseAuthStore.mockReturnValue({
      login: vi.fn(),
      isLoading: true,
      error: null,
      clearError: vi.fn(),
    });

    render(<LoginForm />);

    expect(screen.getByRole('button', { name: 'Entrando...' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrando...' })).toBeDisabled();
  });

  it('should show error message when error exists', () => {
    mockUseAuthStore.mockReturnValue({
      login: vi.fn(),
      isLoading: false,
      error: 'Credenciais inválidas',
      clearError: vi.fn(),
    });

    render(<LoginForm />);

    expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
  });

  it('should render form with correct structure', () => {
    render(<LoginForm />);

    // Check form structure
    expect(screen.getByRole('heading', { name: 'Login to your account' })).toBeInTheDocument();
    expect(screen.getByText('Enter your email below to login to your account')).toBeInTheDocument();

    // Check input fields
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');

    // Check submit button
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should have correct form attributes', () => {
    render(<LoginForm />);

    const form = screen.getByLabelText('Email').closest('form');
    expect(form).toHaveClass('flex', 'flex-col', 'gap-6');
  });

  it('should render email input with correct attributes', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'm@example.com');
    expect(emailInput).toHaveAttribute('id', 'email');
  });

  it('should render password input with correct attributes', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('id', 'password');
  });

  it('should render submit button with correct attributes', () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: 'Login' });
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(submitButton).toHaveClass('w-full');
  });

  it('should render error message with correct styling when error exists', () => {
    mockUseAuthStore.mockReturnValue({
      login: vi.fn(),
      isLoading: false,
      error: 'Test error message',
      clearError: vi.fn(),
    });

    render(<LoginForm />);

    const errorMessage = screen.getByText('Test error message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-destructive');
  });

  it('should not render error message when no error exists', () => {
    mockUseAuthStore.mockReturnValue({
      login: vi.fn(),
      isLoading: false,
      error: null,
      clearError: vi.fn(),
    });

    render(<LoginForm />);

    expect(screen.queryByText('Credenciais inválidas')).not.toBeInTheDocument();
  });

  it('should render loading button with correct text when loading', () => {
    mockUseAuthStore.mockReturnValue({
      login: vi.fn(),
      isLoading: true,
      error: null,
      clearError: vi.fn(),
    });

    render(<LoginForm />);

    const loadingButton = screen.getByRole('button', { name: 'Entrando...' });
    expect(loadingButton).toBeInTheDocument();
    expect(loadingButton).toBeDisabled();
  });

  it('should render normal button when not loading', () => {
    mockUseAuthStore.mockReturnValue({
      login: vi.fn(),
      isLoading: false,
      error: null,
      clearError: vi.fn(),
    });

    render(<LoginForm />);

    const normalButton = screen.getByRole('button', { name: 'Login' });
    expect(normalButton).toBeInTheDocument();
    expect(normalButton).not.toBeDisabled();
  });
});