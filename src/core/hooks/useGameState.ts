import { useCallback, useState } from 'react';

export interface GameState {
  difficulty: string;
  theme: string;
  time: string;
  moves: number;
  moveTimer: number;
  isPlaying: boolean;
  isPaused: boolean;
}

export interface UseGameStateReturn {
  gameState: GameState;
  setDifficulty: (difficulty: string) => void;
  setTheme: (theme: string) => void;
  setTime: (time: string) => void;
  setMoves: (moves: number) => void;
  setMoveTimer: (timer: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsPaused: (paused: boolean) => void;
  resetGame: () => void;
  incrementMoves: () => void;
}

const DEFAULT_GAME_STATE: GameState = {
  difficulty: 'medium',
  theme: 'animals',
  time: '00:00',
  moves: 0,
  moveTimer: 10,
  isPlaying: false,
  isPaused: false,
};

export const useGameState = (
  initialState?: Partial<GameState>,
): UseGameStateReturn => {
  const [gameState, setGameState] = useState<GameState>({
    ...DEFAULT_GAME_STATE,
    ...initialState,
  });

  const setDifficulty = useCallback((difficulty: string) => {
    setGameState(prev => ({ ...prev, difficulty }));
  }, []);

  const setTheme = useCallback((theme: string) => {
    setGameState(prev => ({ ...prev, theme }));
  }, []);

  const setTime = useCallback((time: string) => {
    setGameState(prev => ({ ...prev, time }));
  }, []);

  const setMoves = useCallback((moves: number) => {
    setGameState(prev => ({ ...prev, moves }));
  }, []);

  const setMoveTimer = useCallback((moveTimer: number) => {
    setGameState(prev => ({ ...prev, moveTimer }));
  }, []);

  const setIsPlaying = useCallback((isPlaying: boolean) => {
    setGameState(prev => ({ ...prev, isPlaying }));
  }, []);

  const setIsPaused = useCallback((isPaused: boolean) => {
    setGameState(prev => ({ ...prev, isPaused }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      time: '00:00',
      moves: 0,
      isPlaying: false,
      isPaused: false,
    }));
  }, []);

  const incrementMoves = useCallback(() => {
    setGameState(prev => ({ ...prev, moves: prev.moves + 1 }));
  }, []);

  return {
    gameState,
    setDifficulty,
    setTheme,
    setTime,
    setMoves,
    setMoveTimer,
    setIsPlaying,
    setIsPaused,
    resetGame,
    incrementMoves,
  };
};
