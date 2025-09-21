import type { GameSettings, ScoreCalculation } from '../types';

/**
 * Calcula a pontuação baseada em tempo, movimentos, dificuldade e sequências
 */
export const calculateScore = (
  moves: number,
  time: number,
  difficulty: GameSettings['difficulty'],
  _streak: number,
  maxStreak: number,
  gameMode: GameSettings['gameMode'],
): ScoreCalculation => {
  // Pontuação base por par encontrado
  const baseScorePerPair = {
    easy: 50,
    medium: 75,
    hard: 100,
  };

  const totalPairs = {
    easy: 15,
    medium: 25,
    hard: 40,
  };

  const baseScore = totalPairs[difficulty] * baseScorePerPair[difficulty];

  // Bônus por tempo (quanto mais rápido, melhor)
  const timeBonus = Math.max(0, 1000 - time * 2);

  // Bônus por movimentos (quanto menos movimentos, melhor)
  const movesBonus = Math.max(0, 500 - moves * 5);

  // Multiplicador de dificuldade
  const difficultyMultiplier = {
    easy: 1.0,
    medium: 1.5,
    hard: 2.0,
  }[difficulty];

  // Multiplicador de sequência (baseado na maior sequência)
  const streakMultiplier = 1 + maxStreak * 0.1;

  // Multiplicador de modo de jogo
  const gameModeMultiplier = {
    classic: 1.0,
    timer: 1.5, // Modo timer é mais difícil
    zen: 0.8, // Modo zen é mais fácil
    multiplayer: 1.2, // Multiplayer tem bônus
  }[gameMode];

  const finalScore = Math.round(
    (baseScore + timeBonus + movesBonus) *
    difficultyMultiplier *
    streakMultiplier *
    gameModeMultiplier,
  );

  return {
    baseScore,
    timeBonus,
    movesBonus,
    difficultyMultiplier,
    streakMultiplier,
    finalScore,
  };
};

/**
 * Calcula o tempo restante para o modo timer
 */
export const calculateTimeRemaining = (
  timerDuration: number,
  elapsedTime: number,
): number => {
  return Math.max(0, timerDuration - elapsedTime);
};

/**
 * Verifica se o jogo deve terminar por tempo no modo timer
 */
export const isTimeUp = (timeRemaining: number): boolean => {
  return timeRemaining <= 0;
};
