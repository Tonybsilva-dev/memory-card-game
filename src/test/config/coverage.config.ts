/**
 * Configurações específicas para coverage de testes
 */
export const COVERAGE_CONFIG = {
  // Diretórios a serem incluídos na análise de coverage
  include: ['src/**/*.{ts,tsx}'],

  // Diretórios a serem excluídos da análise de coverage
  exclude: [
    'src/**/*.d.ts',
    'src/**/*.config.{ts,js}',
    'src/**/*.test.{ts,tsx}',
    'src/**/*.spec.{ts,tsx}',
    'src/test/**',
    'src/**/__tests__/**',
    'src/**/__mocks__/**',
    'src/vite-env.d.ts',
    'src/main.tsx',
    'src/App.tsx',
    'src/**/*.stories.{ts,tsx}',
    'src/**/index.ts', // Arquivos de barrel exports
  ],

  // Tipos de relatórios a serem gerados
  reporters: [
    'text', // Console output
    'json', // JSON para CI/CD
    'html', // Relatório HTML interativo
    'lcov', // LCOV para integração com ferramentas
    'text-summary', // Resumo no console
  ],

  // Diretório onde os relatórios serão salvos
  reportsDirectory: './coverage',

  // Thresholds mínimos de coverage
  thresholds: {
    global: {
      branches: 80, // 80% de cobertura de branches
      functions: 80, // 80% de cobertura de funções
      lines: 80, // 80% de cobertura de linhas
      statements: 80, // 80% de cobertura de statements
    },
    // Thresholds específicos por arquivo
    perFile: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Configurações de água (watermarks)
  watermarks: {
    statements: [50, 80],
    functions: [50, 80],
    branches: [50, 80],
    lines: [50, 80],
  },
} as const;
