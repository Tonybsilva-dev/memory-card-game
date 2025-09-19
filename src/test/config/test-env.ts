/**
 * Configurações específicas para ambiente de teste
 */
export const TEST_CONFIG = {
  // URLs de teste
  API_BASE_URL: 'http://localhost:3000/api',

  // Timeouts
  DEFAULT_TIMEOUT: 5000,
  LONG_TIMEOUT: 10000,

  // Configurações de mock
  MOCK_DELAY: 100,

  // Configurações de dados de teste
  DEFAULT_PAGE_SIZE: 10,
  MAX_TEST_ITEMS: 100,
} as const;

/**
 * Configurações de ambiente para diferentes tipos de teste
 */
export const TEST_ENVIRONMENTS = {
  unit: {
    timeout: 1000,
    mockDelay: 0,
  },
  integration: {
    timeout: 5000,
    mockDelay: 100,
  },
  e2e: {
    timeout: 30000,
    mockDelay: 0,
  },
} as const;
