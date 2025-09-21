import { useGameStore } from '../stores/game.store';

export const usePlayerTimer = () => {
  const { playerTimerActive, playerTimeRemaining } = useGameStore();

  return {
    playerTimeRemaining,
    playerTimerActive,
  };
};
