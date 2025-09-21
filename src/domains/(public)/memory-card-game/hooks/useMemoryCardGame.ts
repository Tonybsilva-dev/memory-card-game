import { useCallback, useEffect, useMemo } from 'react';

import { useGameStore } from '../stores/game.store';
import type { UseMemoryCardGameReturn } from '../types';
import { useLeaderboard } from './useLeaderboard';

export const useMemoryCardGame = (): UseMemoryCardGameReturn => {
  // Zustand store
  const {
    // Game state
    cards,
    flippedCards,
    matchedPairs,
    moves,
    time,
    isGameComplete,
    isPlaying,
    isLoading,
    streak,
    maxStreak,
    achievements,
    players,
    timeRemaining,
    isTimeUp,

    // Settings
    difficulty,
    theme,
    gameMode,
    timerDuration,
    playerNames,
    currentPlayer,
    arePlayerNamesValid,

    // Actions
    flipCard,
    resetGame,
    startGame,
    pauseGame,
    setDifficulty,
    setTheme,
    setGameMode,
    setTimerDuration,
    setPlayerNames,
    nextPlayer,
    getCurrentPlayer,
    getWinner,
    isMultiplayerTurnComplete,
    checkAchievements,
    unlockAchievement,
    calculateScore,
    canStartGame,
    validatePlayerNames,
  } = useGameStore();

  // Leaderboard hook
  const { saveScore } = useLeaderboard();

  // Memoized game state
  const gameState = useMemo(
    () => ({
      cards,
      flippedCards,
      matchedPairs,
      moves,
      time,
      isGameComplete,
      isPlaying,
      isLoading,
      streak,
      maxStreak,
      achievements,
      players,
      timeRemaining,
      isTimeUp,
    }),
    [
      cards,
      flippedCards,
      matchedPairs,
      moves,
      time,
      isGameComplete,
      isPlaying,
      isLoading,
      streak,
      maxStreak,
      achievements,
      players,
      timeRemaining,
      isTimeUp,
    ],
  );

  // Memoized settings
  const settings = useMemo(
    () => ({
      difficulty,
      theme,
      gameMode,
      timerDuration,
      playerNames,
      currentPlayer,
    }),
    [difficulty, theme, gameMode, timerDuration, playerNames, currentPlayer],
  );

  // Memoized total pairs calculation
  const getTotalPairs = useCallback(() => {
    const difficultyPairs = {
      easy: 10,
      medium: 20,
      hard: 30,
    };
    return difficultyPairs[difficulty] || 10;
  }, [difficulty]);

  // Memoized time formatter
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Memoized save score with achievements
  const handleSaveScore = useCallback(
    (
      score: number,
      moves: number,
      time: number,
      achievements: string[],
      difficulty?: string,
      gameMode?: string,
      playerName?: string,
    ) => {
      saveScore(
        score,
        moves,
        time,
        achievements,
        difficulty,
        gameMode,
        playerName,
      );
    },
    [saveScore],
  );

  // Memoized get time remaining
  const getTimeRemaining = useCallback(() => {
    return timeRemaining || 0;
  }, [timeRemaining]);

  // Inicializar modo multiplayer se necessário
  useEffect(() => {
    if (
      gameMode === 'multiplayer' &&
      playerNames &&
      playerNames.length > 0 &&
      !arePlayerNamesValid
    ) {
      // Se estamos no modo multiplayer e temos nomes mas não são válidos, validar
      const validation = validatePlayerNames();
      if (validation.isValid) {
        // Se a validação passou, atualizar o estado
        setPlayerNames(playerNames);
      }
    }
  }, [
    gameMode,
    playerNames,
    arePlayerNamesValid,
    validatePlayerNames,
    setPlayerNames,
  ]);

  return {
    // Game state
    gameState,

    // Settings
    settings,

    // Actions
    flipCard,
    resetGame,
    startGame,
    pauseGame,

    // Settings actions
    setDifficulty,
    setTheme,

    // Utilities
    formatTime,
    getTotalPairs,

    // Leaderboard
    saveScore: handleSaveScore,

    // Achievements
    checkAchievements,
    unlockAchievement,

    // Multiplayer
    nextPlayer,
    getCurrentPlayer,
    getWinner,
    isMultiplayerTurnComplete,

    // Timer mode
    getTimeRemaining,

    // Additional actions
    setGameMode,
    setTimerDuration,
    setPlayerNames,
    calculateScore,
    canStartGame,
    validatePlayerNames,
  };
};
