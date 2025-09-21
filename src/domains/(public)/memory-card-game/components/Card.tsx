import { memo, useState } from 'react';

import { GlowingEffect } from '../../../../components/ui/glowing-effect';
import { cn } from '../../../../shared/lib/utils';
import type { CardProps } from '../types';

const CARD_STYLES = {
  base: 'absolute flex h-full w-full items-center justify-center border-2 backface-hidden',
  front: 'border-white/20 bg-transparent border',
  back: 'rotate-y-180 border-black bg-white',
  matched: 'border-green-500 bg-green-500',
  icon: 'material-symbols-outlined text-base text-blue-500',
  iconFlipped: 'material-symbols-outlined text-base text-white',
  iconMatched: 'material-symbols-outlined text-base text-white',
};

export const Card = memo<CardProps>(
  ({
    card,
    onFlip,
    isDisabled = false,
    canFlip = true,
    theme = 'avataaars',
    difficulty = 'easy',
    isShowingMatch = false,
  }) => {
    const [imageError, setImageError] = useState(false);

    const handleFlip = () => {
      if (!isDisabled && !card.isMatched && canFlip) {
        onFlip();
      }
    };

    const isFlipped = card.isFlipped || card.isMatched;
    const isMatched = card.isMatched;

    // Tamanho do card baseado na dificuldade
    const getCardSize = () => {
      switch (difficulty) {
        case 'easy':
          return 'h-20 w-20 sm:h-24 sm:w-24 p-2 sm:p-3'; // Cards maiores para fácil
        case 'medium':
          return 'h-16 w-16 sm:h-20 sm:w-20 p-1 sm:p-2'; // Cards médios para médio
        case 'hard':
          return 'h-14 w-14 sm:h-16 sm:w-16 p-1 sm:p-2'; // Cards menores para difícil
        default:
          return 'h-16 w-16 sm:h-20 sm:w-20 p-1 sm:p-2';
      }
    };

    return (
      <div className={`relative ${getCardSize()}`}>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={50}
          inactiveZone={0.0}
        />
        <button
          className={cn(
            `relative rounded-xl border-2 border-transparent transition-all duration-200 ${difficulty === 'easy' ? 'h-16 w-16 sm:h-20 sm:w-20' : difficulty === 'medium' ? 'h-12 w-12 sm:h-16 sm:w-16' : 'h-10 w-10 sm:h-12 sm:w-12'}`,
            isDisabled && 'cursor-not-allowed opacity-50',
            !isDisabled && !card.isMatched && 'cursor-pointer',
            isMatched && 'scale-95',
            // Animação de match
            isShowingMatch &&
              'scale-110 animate-pulse border-green-400 bg-green-500/20 shadow-lg shadow-green-400/50',
          )}
          onClick={handleFlip}
          disabled={isDisabled || card.isMatched || !canFlip}
          aria-label={`Carta do jogo da memória ${isFlipped ? 'virada' : 'não virada'}${isMatched ? ' e encaixada' : ''}`}
          aria-pressed={isFlipped}
          role="button"
          tabIndex={0}
        >
          {/** DIV DO 3D  */}
          <div
            className={cn(
              `preserve-3d h-full w-full transition-transform duration-300`,
              isFlipped && 'rotate-y-180',
            )}
            aria-hidden="true"
          >
            {/** DIV DO FRONT DO CARTÃO (imagem/emoji) */}
            <div
              className={cn(
                CARD_STYLES.base,
                CARD_STYLES.back,
                isMatched && CARD_STYLES.matched,
                // Efeito especial para match
                isShowingMatch && 'border-green-400 bg-green-500/30',
              )}
              aria-hidden="true"
            >
              {theme === 'numbers' ? (
                <span
                  className={cn(
                    isMatched ? CARD_STYLES.iconMatched : CARD_STYLES.icon,
                  )}
                  aria-hidden="true"
                >
                  {card.emoji}
                </span>
              ) : imageError ? (
                <span
                  className={cn(
                    isMatched ? CARD_STYLES.iconMatched : CARD_STYLES.icon,
                    'flex h-full w-full items-center justify-center',
                  )}
                  aria-hidden="true"
                >
                  ?
                </span>
              ) : (
                <img
                  src={card.emoji}
                  alt="Card content"
                  className="h-full w-full rounded object-contain"
                  onError={() => setImageError(true)}
                />
              )}
            </div>

            {/** DIV DO BACK DO CARTÃO (interrogação) */}
            <div
              className={cn(CARD_STYLES.base, CARD_STYLES.front)}
              aria-hidden="true"
            >
              <span className={cn(CARD_STYLES.iconFlipped)} aria-hidden="true">
                question_mark
              </span>
            </div>
          </div>
        </button>
      </div>
    );
  },
);

Card.displayName = 'Card';
