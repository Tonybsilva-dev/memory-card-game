import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'game';
  gameMode?: string;
  difficulty?: string;
  score?: number;
}

export const SEOHead = ({
  title = 'Memory Card Game - Antonio S',
  description = 'Jogue o melhor jogo de memória online! Teste sua memória com cartas, diferentes dificuldades e modos de jogo. Grátis e sem download.',
  keywords = 'jogo de memória, memory card game, jogo online, cartas, teste de memória, jogo grátis, puzzle, concentração',
  image = 'https://memory-card-game.vercel.app/logo.png',
  url = 'https://memory-card-game.vercel.app/',
  type = 'website',
  gameMode,
  difficulty,
  score,
}: SEOHeadProps) => {
  useEffect(() => {
    // Atualiza título da página
    document.title = title;

    // Função para atualizar ou criar meta tag
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Meta tags básicas
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Memory Card Game');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'Portuguese');
    updateMetaTag('revisit-after', '7 days');

    // Open Graph
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', 'Memory Card Game', true);
    updateMetaTag('og:locale', 'pt_BR', true);

    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);

    // Meta tags específicas do jogo
    if (gameMode) {
      updateMetaTag('game:mode', gameMode, true);
    }
    if (difficulty) {
      updateMetaTag('game:difficulty', difficulty, true);
    }
    if (score !== undefined) {
      updateMetaTag('game:score', score.toString(), true);
    }

    // Meta tags de performance
    updateMetaTag('theme-color', '#18181b');
    updateMetaTag('msapplication-TileColor', '#18181b');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    updateMetaTag('apple-mobile-web-app-title', 'Memory Card Game');
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    gameMode,
    difficulty,
    score,
  ]);

  return null;
};
