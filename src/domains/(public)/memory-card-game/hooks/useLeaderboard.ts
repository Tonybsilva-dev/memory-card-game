import { useCallback, useState } from 'react';

import type { LeaderboardEntry } from '../types';

const STORAGE_KEY = 'memory-game-leaderboard';

export const useLeaderboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openLeaderboard = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeLeaderboard = useCallback(() => {
    setIsOpen(false);
  }, []);

  const saveScore = useCallback(
    (
      score: number,
      moves: number,
      time: number,
      achievements: string[],
      difficulty?: string,
      gameMode?: string,
      playerName?: string,
    ) => {
      try {
        const existingData = localStorage.getItem(STORAGE_KEY);
        const leaderboard: LeaderboardEntry[] = existingData
          ? JSON.parse(existingData)
          : [];

        const newEntry: LeaderboardEntry = {
          id: Date.now(),
          score,
          moves,
          time,
          difficulty: difficulty || 'easy',
          gameMode: gameMode || 'classic',
          playerName: playerName || 'Jogador',
          achievements,
          timestamp: Date.now(),
        };

        leaderboard.push(newEntry);

        // Manter apenas os 10 melhores scores
        const sortedData = leaderboard
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(sortedData));
      } catch (error) {
        console.error('Erro ao salvar pontuação:', error);
      }
    },
    [],
  );

  return {
    isOpen,
    openLeaderboard,
    closeLeaderboard,
    saveScore,
  };
};
