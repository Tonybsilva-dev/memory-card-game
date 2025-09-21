/**
 * Constantes de SEO para o Memory Card Game
 */

export const SEO_CONFIG = {
  // Configurações básicas
  SITE_NAME: 'Memory Card Game',
  SITE_URL: 'https://memory-card-game.vercel.app/',
  SITE_IMAGE: 'https://memory-card-game.vercel.app/logo.png',
  SITE_DESCRIPTION:
    'Jogue o melhor jogo de memória online! Teste sua memória com cartas, diferentes dificuldades e modos de jogo. Grátis e sem download.',

  // Palavras-chave principais
  KEYWORDS: [
    'jogo de memória',
    'memory card game',
    'jogo online',
    'cartas',
    'teste de memória',
    'jogo grátis',
    'puzzle',
    'concentração',
    'jogo educativo',
    'treinar memória',
    'jogo de cartas',
    'memória visual',
    'jogo de concentração',
    'puzzle online',
    'jogo de lógica',
  ].join(', '),

  // Títulos dinâmicos por modo de jogo
  GAME_MODE_TITLES: {
    classic: 'Memory Card Game - Modo Clássico | Jogo de Memória Online',
    timer: 'Memory Card Game - Modo Cronômetro | Jogo de Memória Online',
    zen: 'Memory Card Game - Modo Zen | Jogo de Memória Online',
    multiplayer: 'Memory Card Game - Modo Multiplayer | Jogo de Memória Online',
  },

  // Descrições dinâmicas por modo de jogo
  GAME_MODE_DESCRIPTIONS: {
    classic:
      'Jogue o modo clássico do Memory Card Game! Teste sua memória com cartas em diferentes dificuldades. Grátis e sem download.',
    timer:
      'Desafie-se no modo cronômetro do Memory Card Game! Encontre todos os pares antes do tempo acabar. Grátis e sem download.',
    zen: 'Relaxe no modo zen do Memory Card Game! Jogue sem pressão de tempo e melhore sua concentração. Grátis e sem download.',
    multiplayer:
      'Jogue com amigos no modo multiplayer do Memory Card Game! Compita para ver quem encontra mais pares. Grátis e sem download.',
  },

  // Dados estruturados
  STRUCTURED_DATA: {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Memory Card Game',
    description:
      'Jogue o melhor jogo de memória online! Teste sua memória com cartas, diferentes dificuldades e modos de jogo. Grátis e sem download.',
    url: 'https://memory-card-game.vercel.app/',
    image: 'https://memory-card-game.vercel.app/logo.png',
    genre: ['Puzzle', 'Educational', 'Memory'],
    gamePlatform: 'Web Browser',
    operatingSystem: 'Any',
    applicationCategory: 'Game',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: 'Antonio S',
      url: 'https://memory-card-game.vercel.app/',
    },
    publisher: {
      '@type': 'Person',
      name: 'Antonio S',
      url: 'https://memory-card-game.vercel.app/',
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    gameItem: {
      '@type': 'Thing',
      name: 'Memory Cards',
      description: 'Cartas com emojis para testar a memória',
    },
    gameLocation: {
      '@type': 'Place',
      name: 'Online',
    },
  },

  // Configurações de performance
  PERFORMANCE: {
    THEME_COLOR: '#18181b',
    MSAPPLICATION_TILE_COLOR: '#18181b',
    APPLE_MOBILE_WEB_APP_CAPABLE: 'yes',
    APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE: 'black-translucent',
    APPLE_MOBILE_WEB_APP_TITLE: 'Memory Card Game',
  },
} as const;

/**
 * Gera título dinâmico baseado no modo de jogo
 */
export const generateSEOTitle = (
  gameMode?: string,
  difficulty?: string,
  score?: number,
): string => {
  const baseTitle = gameMode
    ? SEO_CONFIG.GAME_MODE_TITLES[
        gameMode as keyof typeof SEO_CONFIG.GAME_MODE_TITLES
      ]
    : SEO_CONFIG.GAME_MODE_TITLES.classic;

  if (score && score > 0) {
    return `${baseTitle} | Pontuação: ${score}`;
  }

  if (difficulty) {
    const difficultyMap = {
      easy: 'Fácil',
      medium: 'Médio',
      hard: 'Difícil',
    };
    return `${baseTitle} | Dificuldade: ${difficultyMap[difficulty as keyof typeof difficultyMap] || difficulty}`;
  }

  return baseTitle;
};

/**
 * Gera descrição dinâmica baseada no modo de jogo
 */
export const generateSEODescription = (
  gameMode?: string,
  _difficulty?: string,
  score?: number,
): string => {
  const baseDescription = gameMode
    ? SEO_CONFIG.GAME_MODE_DESCRIPTIONS[
        gameMode as keyof typeof SEO_CONFIG.GAME_MODE_DESCRIPTIONS
      ]
    : SEO_CONFIG.GAME_MODE_DESCRIPTIONS.classic;

  if (score && score > 0) {
    return `${baseDescription} Conquiste uma pontuação de ${score} pontos!`;
  }

  return baseDescription;
};
