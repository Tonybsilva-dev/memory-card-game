import { vi } from 'vitest';

/**
 * Cria um mock de API response
 */
export const createMockApiResponse = <T>(data: T, status = 200) => {
  return {
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {},
  };
};

/**
 * Cria um mock de API error
 */
export const createMockApiError = (message: string, status = 400) => {
  const error = new Error(message);
  (error as any).response = {
    data: { message },
    status,
    statusText: 'Bad Request',
    headers: {},
    config: {},
  };
  return error;
};

/**
 * Cria um mock de fetch
 */
export const createMockFetch = (response: any) => {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue(response),
    text: vi.fn().mockResolvedValue(JSON.stringify(response)),
  });
};
