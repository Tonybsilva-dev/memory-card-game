import { vi } from 'vitest';

/**
 * Cria um mock de store do Zustand
 */
export const createMockStore = <T>(initialState: T) => {
  const store = {
    ...initialState,
    setState: vi.fn(),
    getState: vi.fn(() => store),
    subscribe: vi.fn(),
    destroy: vi.fn(),
  };

  return store;
};

/**
 * Cria um mock de hook do Zustand
 */
export const createMockHook = <T>(returnValue: T) => {
  return vi.fn(() => returnValue);
};
