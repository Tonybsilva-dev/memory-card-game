import { faker } from '@faker-js/faker';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const createLoginCredentials = (overrides?: Partial<LoginCredentials>): LoginCredentials => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 8 }),
  ...overrides,
});

export const createAuthState = (overrides?: Partial<AuthState>): AuthState => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  ...overrides,
});

export const createAuthenticatedUser = () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
});
