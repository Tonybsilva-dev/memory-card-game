import { vi } from 'vitest';

/**
 * Cria mocks para React Router
 */
export const createMockRouter = () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  };

  return {
    navigate: mockNavigate,
    location: mockLocation,
    params: {},
    searchParams: new URLSearchParams(),
  };
};

/**
 * Cria mock para useNavigate
 */
export const createMockUseNavigate = () => {
  return vi.fn();
};

/**
 * Cria mock para useLocation
 */
export const createMockUseLocation = () => {
  return {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default',
  };
};
