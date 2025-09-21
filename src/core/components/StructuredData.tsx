import { useEffect } from 'react';

interface StructuredDataProps {
  gameMode?: string;
  difficulty?: string;
  score?: number;
  moves?: number;
  time?: number;
}

export const StructuredData = ({
  gameMode = 'classic',
  difficulty = 'medium',
  score = 0,
  moves = 0,
  time = 0,
}: StructuredDataProps) => {
  useEffect(() => {
    const structuredData = {
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
        url: 'https://www.linkedin.com/in/tony-silva/',
      },
      publisher: {
        '@type': 'Person',
        name: 'Antonio S',
        url: 'https://www.linkedin.com/in/tony-silva/',
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
      // Dados dinâmicos do jogo atual
      ...(score > 0 && {
        gamePlayMode: gameMode,
        difficulty: difficulty,
        score: score,
        moves: moves,
        timePlayed: time,
      }),
    };

    // Remove script anterior se existir
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Cria novo script com dados estruturados
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [gameMode, difficulty, score, moves, time]);

  return null;
};
