import type { Difficulty, GameMode } from '../types';

export interface GameModeConfig {
  // Timer
  hasTimer: boolean;
  timerDuration: number | null; // null = sem limite de tempo
  timerStartsOnFirstMove: boolean;

  // Movimentos
  hasMoveTimer: boolean;
  maxTimerPerMovement: number | null; // null = sem limite por movimento

  // Multiplayer
  isMultiplayer: boolean;
  minPlayers: number;
  maxPlayers: number;
  turnBased: boolean;
  playersCanContinueOnMatch: boolean;

  // Interface
  showStreak: boolean;
  showTimeRemaining: boolean;
  showMoveTimer: boolean;
  showPlayerTurn: boolean;
  showMultiplayerScore: boolean;
  showMultiplayerUI: boolean;
  showEfficiency: boolean; // Novo: Mostrar métricas de eficiência

  // Gameplay
  canPause: boolean;
  canRestart: boolean;
  autoSave: boolean;
  showConfettiOnMatch: boolean;

  // Scoring
  scoringEnabled: boolean;
  achievementsEnabled: boolean;
  leaderboardEnabled: boolean;
  timeBasedScoring: boolean; // Novo: Pontuação baseada no tempo
  efficiencyMultiplier: boolean; // Novo: Multiplicador por eficiência
  speedBonus: boolean; // Novo: Bônus por velocidade

  // Visual Effects
  ambientEffects: boolean; // Novo: Efeitos visuais suaves
  urgencyEffects: boolean; // Novo: Efeitos de urgência
  meditationMode: boolean; // Novo: Modo meditação

  // Social Features
  socialFeatures: boolean; // Novo: Recursos sociais
  teamMode: boolean; // Novo: Modo equipe

  // Messages
  initialMessage: string;
  gameCompleteMessage: string;
  timeUpMessage: string;
  multiplayerWinMessage: string;
}

export const GAME_MODE_CONFIGS: Record<GameMode, GameModeConfig> = {
  classic: {
    // Timer
    hasTimer: false,
    timerDuration: null,
    timerStartsOnFirstMove: false,

    // Movimentos
    hasMoveTimer: false,
    maxTimerPerMovement: null,

    // Multiplayer
    isMultiplayer: false,
    minPlayers: 1,
    maxPlayers: 1,
    turnBased: false,
    playersCanContinueOnMatch: false,

    // Interface
    showStreak: true,
    showTimeRemaining: false,
    showMoveTimer: false,
    showPlayerTurn: false,
    showMultiplayerScore: false,
    showMultiplayerUI: false,
    showEfficiency: true, // Classic mostra eficiência

    // Gameplay
    canPause: true,
    canRestart: true,
    autoSave: true,
    showConfettiOnMatch: true,

    // Scoring
    scoringEnabled: true,
    achievementsEnabled: true,
    leaderboardEnabled: true,
    timeBasedScoring: true, // Classic: Pontuação baseada no tempo
    efficiencyMultiplier: true, // Classic: Multiplicador por eficiência
    speedBonus: false, // Classic: Sem bônus de velocidade

    // Visual Effects
    ambientEffects: false,
    urgencyEffects: false,
    meditationMode: false,

    // Social Features
    socialFeatures: false,
    teamMode: false,

    // Messages
    initialMessage: 'Clique em uma carta para começar!',
    gameCompleteMessage: 'Parabéns! Você completou o jogo!',
    timeUpMessage: 'Tempo esgotado! Tente novamente.',
    multiplayerWinMessage: 'JOGO FINALIZADO',
  },

  timer: {
    // Timer
    hasTimer: true,
    timerDuration: 60, // será sobrescrito pela configuração do usuário
    timerStartsOnFirstMove: true,

    // Movimentos
    hasMoveTimer: false,
    maxTimerPerMovement: null,

    // Multiplayer
    isMultiplayer: false,
    minPlayers: 1,
    maxPlayers: 1,
    turnBased: false,
    playersCanContinueOnMatch: false,

    // Interface
    showStreak: true,
    showTimeRemaining: true,
    showMoveTimer: false,
    showPlayerTurn: false,
    showMultiplayerScore: false,
    showMultiplayerUI: false,
    showEfficiency: true, // Timer mostra eficiência

    // Gameplay
    canPause: false,
    canRestart: true,
    autoSave: true,
    showConfettiOnMatch: true,

    // Scoring
    scoringEnabled: true,
    achievementsEnabled: true,
    leaderboardEnabled: true,
    timeBasedScoring: true, // Timer: Pontuação baseada no tempo
    efficiencyMultiplier: true, // Timer: Multiplicador por eficiência
    speedBonus: true, // Timer: Bônus por velocidade

    // Visual Effects
    ambientEffects: false,
    urgencyEffects: true, // Timer: Efeitos de urgência
    meditationMode: false,

    // Social Features
    socialFeatures: false,
    teamMode: false,

    // Messages
    initialMessage: '⏰ Rápido! Encontre os pares antes do tempo acabar!',
    gameCompleteMessage: '🏆 Incrível! Você completou no tempo!',
    timeUpMessage: '⏰ Tempo esgotado! Tente ser mais rápido!',
    multiplayerWinMessage: 'JOGO FINALIZADO',
  },

  zen: {
    // Timer
    hasTimer: false,
    timerDuration: null,
    timerStartsOnFirstMove: false,

    // Movimentos
    hasMoveTimer: false,
    maxTimerPerMovement: null,

    // Multiplayer
    isMultiplayer: false,
    minPlayers: 1,
    maxPlayers: 1,
    turnBased: false,
    playersCanContinueOnMatch: false,

    // Interface
    showStreak: false, // Zen não mostra sequência para reduzir pressão
    showTimeRemaining: false,
    showMoveTimer: false,
    showPlayerTurn: false,
    showMultiplayerScore: false,
    showMultiplayerUI: false,
    showEfficiency: false, // Zen não mostra eficiência

    // Gameplay
    canPause: true,
    canRestart: true,
    autoSave: false, // Zen não salva automaticamente (experiência momentânea)
    showConfettiOnMatch: true,

    // Scoring
    scoringEnabled: false, // Zen foca na experiência, não na pontuação
    achievementsEnabled: false, // Sem conquistas para manter relaxante
    leaderboardEnabled: false, // Sem leaderboard para evitar competição
    timeBasedScoring: false, // Zen não usa pontuação baseada no tempo
    efficiencyMultiplier: false, // Zen não usa multiplicador de eficiência
    speedBonus: false, // Zen não usa bônus de velocidade

    // Visual Effects
    ambientEffects: true, // Zen: Efeitos visuais suaves
    urgencyEffects: false,
    meditationMode: true, // Zen: Modo meditação

    // Social Features
    socialFeatures: false,
    teamMode: false,

    // Messages
    initialMessage: '🧘 Respire fundo e encontre os pares no seu ritmo...',
    gameCompleteMessage: '🌸 Que momento de paz! Você completou o jogo zen.',
    timeUpMessage: 'Tempo esgotado! Tente novamente.',
    multiplayerWinMessage: 'JOGO FINALIZADO',
  },

  multiplayer: {
    // Timer
    hasTimer: false,
    timerDuration: null,
    timerStartsOnFirstMove: false,

    // Movimentos
    hasMoveTimer: false,
    maxTimerPerMovement: null,

    // Multiplayer
    isMultiplayer: true,
    minPlayers: 2,
    maxPlayers: 4,
    turnBased: true,
    playersCanContinueOnMatch: true,

    // Interface
    showStreak: false,
    showTimeRemaining: false,
    showMoveTimer: false,
    showPlayerTurn: true,
    showMultiplayerScore: true,
    showMultiplayerUI: true,
    showEfficiency: false, // Multiplayer foca nos jogadores

    // Gameplay
    canPause: false,
    canRestart: true,
    autoSave: true,
    showConfettiOnMatch: true,

    // Scoring
    scoringEnabled: true,
    achievementsEnabled: true,
    leaderboardEnabled: true,
    timeBasedScoring: false, // Multiplayer não usa pontuação baseada no tempo
    efficiencyMultiplier: false, // Multiplayer não usa multiplicador de eficiência
    speedBonus: false, // Multiplayer não usa bônus de velocidade

    // Visual Effects
    ambientEffects: false,
    urgencyEffects: false,
    meditationMode: false,

    // Social Features
    socialFeatures: true, // Multiplayer: Recursos sociais
    teamMode: false, // Multiplayer: Modo individual por enquanto

    // Messages
    initialMessage: '👥 Escolham seus nomes e comecem a jogar!',
    gameCompleteMessage: 'JOGO FINALIZADO',
    timeUpMessage: 'Tempo esgotado! Tente novamente.',
    multiplayerWinMessage: 'JOGO FINALIZADO',
  },
};

export interface DifficultyConfig {
  pairs: number;
  showPairsInUI: boolean;
  timeMultiplier: number; // multiplicador para tempo limite (se aplicável)
  scoreMultiplier: number; // multiplicador para pontuação
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    pairs: 6,
    showPairsInUI: true,
    timeMultiplier: 1.5,
    scoreMultiplier: 1.0,
  },
  medium: {
    pairs: 12,
    showPairsInUI: true,
    timeMultiplier: 1.0,
    scoreMultiplier: 1.5,
  },
  hard: {
    pairs: 20,
    showPairsInUI: true,
    timeMultiplier: 0.8,
    scoreMultiplier: 2.0,
  },
};

/**
 * Obtém a configuração completa do jogo baseada no modo e dificuldade
 */
export function getGameConfig(
  gameMode: GameMode,
  difficulty: Difficulty,
  userTimerDuration?: number,
): GameModeConfig {
  const modeConfig = { ...GAME_MODE_CONFIGS[gameMode] };

  // Aplica configurações específicas do usuário
  if (userTimerDuration && modeConfig.hasTimer) {
    modeConfig.timerDuration = userTimerDuration;
  }

  // Aplica multiplicadores de dificuldade
  if (modeConfig.timerDuration) {
    const difficultyConfig = DIFFICULTY_CONFIGS[difficulty];
    modeConfig.timerDuration = Math.floor(
      modeConfig.timerDuration * difficultyConfig.timeMultiplier,
    );
  }

  return modeConfig;
}

/**
 * Obtém apenas as configurações de interface para renderização
 */
export function getInterfaceConfig(
  gameMode: GameMode,
  difficulty: Difficulty,
): Pick<
  GameModeConfig,
  | 'showStreak'
  | 'showTimeRemaining'
  | 'showMoveTimer'
  | 'showPlayerTurn'
  | 'showMultiplayerScore'
  | 'showMultiplayerUI'
  | 'showConfettiOnMatch'
> {
  const config = getGameConfig(gameMode, difficulty);
  return {
    showStreak: config.showStreak,
    showTimeRemaining: config.showTimeRemaining,
    showMoveTimer: config.showMoveTimer,
    showPlayerTurn: config.showPlayerTurn,
    showMultiplayerScore: config.showMultiplayerScore,
    showMultiplayerUI: config.showMultiplayerUI,
    showConfettiOnMatch: config.showConfettiOnMatch,
  };
}

/**
 * Obtém apenas as configurações de gameplay para lógica do jogo
 */
export function getGameplayConfig(
  gameMode: GameMode,
  difficulty: Difficulty,
): Pick<
  GameModeConfig,
  | 'hasTimer'
  | 'timerDuration'
  | 'timerStartsOnFirstMove'
  | 'hasMoveTimer'
  | 'maxTimerPerMovement'
  | 'isMultiplayer'
  | 'minPlayers'
  | 'maxPlayers'
  | 'turnBased'
  | 'playersCanContinueOnMatch'
  | 'canPause'
  | 'canRestart'
  | 'autoSave'
> {
  const config = getGameConfig(gameMode, difficulty);
  return {
    hasTimer: config.hasTimer,
    timerDuration: config.timerDuration,
    timerStartsOnFirstMove: config.timerStartsOnFirstMove,
    hasMoveTimer: config.hasMoveTimer,
    maxTimerPerMovement: config.maxTimerPerMovement,
    isMultiplayer: config.isMultiplayer,
    minPlayers: config.minPlayers,
    maxPlayers: config.maxPlayers,
    turnBased: config.turnBased,
    playersCanContinueOnMatch: config.playersCanContinueOnMatch,
    canPause: config.canPause,
    canRestart: config.canRestart,
    autoSave: config.autoSave,
  };
}

/**
 * Obtém apenas as configurações de mensagens
 */
export function getMessageConfig(
  gameMode: GameMode,
): Pick<
  GameModeConfig,
  | 'initialMessage'
  | 'gameCompleteMessage'
  | 'timeUpMessage'
  | 'multiplayerWinMessage'
> {
  const config = GAME_MODE_CONFIGS[gameMode];
  return {
    initialMessage: config.initialMessage,
    gameCompleteMessage: config.gameCompleteMessage,
    timeUpMessage: config.timeUpMessage,
    multiplayerWinMessage: config.multiplayerWinMessage,
  };
}
