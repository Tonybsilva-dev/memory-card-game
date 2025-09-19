/**
 * Configurações específicas para Vitest UI
 */
export const VITEST_UI_CONFIG = {
  // Configurações do servidor UI
  server: {
    port: 51204,
    host: 'localhost',
  },
  
  // Configurações de visualização
  ui: {
    // Tema (light/dark/auto)
    theme: 'auto',
    
    // Configurações de layout
    layout: {
      // Posição do painel de detalhes
      detailsPosition: 'right',
      
      // Tamanho dos painéis
      panelSizes: {
        details: 400,
        tests: 300,
      },
    },
    
    // Configurações de filtros
    filters: {
      // Mostrar apenas testes que falharam
      showFailedOnly: false,
      
      // Mostrar apenas testes que passaram
      showPassedOnly: false,
      
      // Mostrar apenas testes pendentes
      showPendingOnly: false,
    },
  },
  
  // Configurações de performance
  performance: {
    // Atualização automática dos testes
    autoUpdate: true,
    
    // Intervalo de atualização (ms)
    updateInterval: 1000,
  },
} as const;
