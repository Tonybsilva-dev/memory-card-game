import { useEffect, useRef } from 'react';

import { useGameStore } from '../stores/game.store';

export const useGameTimer = () => {
  const { isPlaying, isGameComplete, gameMode, updateTime, clearTimer } =
    useGameStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Limpar timer anterior se existir
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Não rodar timer global no modo multiplayer (usa timer do jogador)
    if (isPlaying && !isGameComplete && gameMode !== 'multiplayer') {
      timerRef.current = setInterval(() => {
        updateTime();
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, isGameComplete, gameMode, updateTime]);

  // Cleanup quando o componente for desmontado
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);
};
