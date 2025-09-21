import { useMemo } from 'react';

import {
  type GameModeConfig,
  getGameConfig,
  getGameplayConfig,
  getInterfaceConfig,
  getMessageConfig,
} from '../config/game-modes.config';
import { useGameStore } from '../stores/game.store';

// import type { GameMode, Difficulty } from '../types';

export interface UseGameConfigReturn {
  // Configuração completa
  fullConfig: GameModeConfig;

  // Configurações específicas
  interfaceConfig: ReturnType<typeof getInterfaceConfig>;
  gameplayConfig: ReturnType<typeof getGameplayConfig>;
  messageConfig: ReturnType<typeof getMessageConfig>;

  // Helpers para lógica condicional
  shouldShow: (element: keyof ReturnType<typeof getInterfaceConfig>) => boolean;
  canDo: (action: keyof ReturnType<typeof getGameplayConfig>) => boolean;
  getMessage: (type: keyof ReturnType<typeof getMessageConfig>) => string;

  // Validações específicas
  isValidForCurrentMode: (action: string) => boolean;
  getTimerDuration: () => number | null;
  getMaxPlayers: () => number;
  getMinPlayers: () => number;
}

export function useGameConfig(): UseGameConfigReturn {
  const { gameMode, difficulty, timerDuration } = useGameStore();

  const fullConfig = useMemo(
    () => getGameConfig(gameMode, difficulty, timerDuration),
    [gameMode, difficulty, timerDuration],
  );

  const interfaceConfig = useMemo(
    () => getInterfaceConfig(gameMode, difficulty),
    [gameMode, difficulty],
  );

  const gameplayConfig = useMemo(
    () => getGameplayConfig(gameMode, difficulty),
    [gameMode, difficulty],
  );

  const messageConfig = useMemo(() => getMessageConfig(gameMode), [gameMode]);

  const shouldShow = useMemo(
    () => (element: keyof typeof interfaceConfig) => {
      return interfaceConfig[element] === true;
    },
    [interfaceConfig],
  );

  const canDo = useMemo(
    () => (action: keyof typeof gameplayConfig) => {
      return gameplayConfig[action] === true;
    },
    [gameplayConfig],
  );

  const getMessage = useMemo(
    () => (type: keyof typeof messageConfig) => {
      return messageConfig[type];
    },
    [messageConfig],
  );

  const isValidForCurrentMode = useMemo(
    () => (action: string) => {
      // Validações específicas baseadas no modo atual
      switch (action) {
        case 'startGame':
          if (gameplayConfig.isMultiplayer) {
            // Para multiplayer, precisa ter pelo menos 2 jogadores válidos
            return true; // A validação específica será feita no store
          }
          return true;

        case 'pauseGame':
          return gameplayConfig.canPause;

        case 'restartGame':
          return gameplayConfig.canRestart;

        case 'showTimer':
          return gameplayConfig.hasTimer;

        case 'showStreak':
          return interfaceConfig.showStreak;

        case 'showMultiplayerUI':
          return gameplayConfig.isMultiplayer;

        default:
          return true;
      }
    },
    [gameplayConfig, interfaceConfig],
  );

  const getTimerDuration = useMemo(
    () => () => fullConfig.timerDuration,
    [fullConfig.timerDuration],
  );

  const getMaxPlayers = useMemo(
    () => () => fullConfig.maxPlayers,
    [fullConfig.maxPlayers],
  );

  const getMinPlayers = useMemo(
    () => () => fullConfig.minPlayers,
    [fullConfig.minPlayers],
  );

  return {
    fullConfig,
    interfaceConfig,
    gameplayConfig,
    messageConfig,
    shouldShow,
    canDo,
    getMessage,
    isValidForCurrentMode,
    getTimerDuration,
    getMaxPlayers,
    getMinPlayers,
  };
}
