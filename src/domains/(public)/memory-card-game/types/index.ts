// Card related types
export interface Card {
  id: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Game state types
export interface GameState {
  cards: Card[];
  flippedCards: string[];
  matchedPairs: number;
  moves: number;
  time: number;
  isGameComplete: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  streak: number; // sequência de acertos
  maxStreak: number; // maior sequência de acertos
  achievements: Achievement[];
  players?: Player[]; // para modo multiplayer
  timeRemaining?: number; // para modo timer
  isTimeUp?: boolean; // se o tempo acabou no modo timer
  playerTimeRemaining?: number; // tempo restante do jogador atual no multiplayer
  playerTimerActive?: boolean; // se o timer do jogador está ativo
  showingMatch?: boolean; // se está mostrando animação de match
}

// Game settings types
export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  theme: string;
  gameMode: 'classic' | 'timer' | 'zen' | 'multiplayer';
  timerDuration?: number; // em segundos para modo timer
  playerNames?: string[]; // para modo multiplayer
  currentPlayer?: number; // índice do jogador atual
  arePlayerNamesValid?: boolean; // se os nomes dos jogadores são válidos
}

// Game mode and difficulty types
export type GameMode = 'classic' | 'timer' | 'zen' | 'multiplayer';
export type Difficulty = 'easy' | 'medium' | 'hard';

// Difficulty configuration
export interface DifficultyConfig {
  pairs: number;
  gridCols: number;
  gridRows: number;
}

// Leaderboard types
export interface LeaderboardEntry {
  id: number;
  score: number;
  moves: number;
  time: number;
  difficulty: string;
  gameMode: string;
  playerName?: string;
  achievements: string[];
  timestamp: number;
}

// Achievement types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

// Scoring types
export interface ScoreCalculation {
  baseScore: number;
  timeBonus: number;
  movesBonus: number;
  difficultyMultiplier: number;
  streakMultiplier: number;
  finalScore: number;
}

// Player types (para multiplayer)
export interface Player {
  id: number;
  name: string;
  matchedPairs: number; // Pares encontrados por este jogador
  moves: number; // Movimentos feitos por este jogador
  isActive: boolean;
  isWinner?: boolean; // Se este jogador é o vencedor
}

// Hook return types
export interface UseMemoryCardGameReturn {
  // Game state
  gameState: GameState;

  // Game settings
  settings: GameSettings;

  // Actions
  flipCard: (cardId: string) => void;
  resetGame: () => void;
  startGame: () => void;
  pauseGame: () => void;

  // Settings actions
  setDifficulty: (difficulty: GameSettings['difficulty']) => void;
  setTheme: (theme: string) => void;
  setGameMode: (gameMode: GameSettings['gameMode']) => void;
  setTimerDuration: (duration: number) => void;
  setPlayerNames: (names: string[]) => void;

  // Utilities
  formatTime: (seconds: number) => string;
  getTotalPairs: () => number;

  // Leaderboard
  saveScore: (
    score: number,
    moves: number,
    time: number,
    achievements: string[],
  ) => void;

  // Achievements
  checkAchievements: () => void;
  unlockAchievement: (achievementId: string) => void;

  // Multiplayer
  nextPlayer: () => void;
  getCurrentPlayer: () => Player | null;
  getWinner: () => Player | null;
  isMultiplayerTurnComplete: () => boolean;

  // Timer mode
  getTimeRemaining: () => number;

  // Additional actions
  calculateScore: () => number;
  canStartGame: () => boolean;
  validatePlayerNames: () => { isValid: boolean; errors: string[] };
}

// Component props types
export interface GameBoardProps {
  gameState: GameState;
  onCardFlip: (cardId: string) => void;
  onGameComplete?: (moves: number, time: number) => void;
  getTotalPairs: () => number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CardProps {
  card: Card;
  onFlip: () => void;
  isDisabled?: boolean;
  canFlip?: boolean;
  theme?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  isShowingMatch?: boolean;
}

export interface GameSettingsProps {
  settings: GameSettings;
  gameState: Pick<
    GameState,
    'moves' | 'time' | 'matchedPairs' | 'timeRemaining' | 'isPlaying'
  >;
  onSettingsChange: (settings: Partial<GameSettings>) => void;
  getTotalPairs: () => number;
}

// Constants
export const DIFFICULTY_LEVELS: Record<
  GameSettings['difficulty'],
  DifficultyConfig
> = {
  easy: { pairs: 10, gridCols: 5, gridRows: 4 },
  medium: { pairs: 20, gridCols: 8, gridRows: 5 },
  hard: { pairs: 30, gridCols: 10, gridRows: 6 },
} as const;

export const THEME_OPTIONS = [
  { value: 'numbers', label: 'Números', icon: '🔢' },
  { value: 'avataaars', label: 'Avataaars', icon: '👤' },
  { value: 'avataaars-neutral', label: 'Avataaars Neutral', icon: '😐' },
  { value: 'adventurer', label: 'Adventurer', icon: '🧙' },
  { value: 'adventurer-neutral', label: 'Adventurer Neutral', icon: '🧙‍♂️' },
  { value: 'big-ears', label: 'Big Ears', icon: '👂' },
  { value: 'big-ears-neutral', label: 'Big Ears Neutral', icon: '👂' },
  { value: 'big-smile', label: 'Big Smile', icon: '😁' },
  { value: 'bottts', label: 'Bottts', icon: '🤖' },
  { value: 'bottts-neutral', label: 'Bottts Neutral', icon: '🤖' },
  { value: 'croodles', label: 'Croodles', icon: '👻' },
  { value: 'croodles-neutral', label: 'Croodles Neutral', icon: '👻' },
  { value: 'dylan', label: 'Dylan', icon: '😊' },
  { value: 'fun-emoji', label: 'Fun Emoji', icon: '😜' },
  { value: 'glass', label: 'Glass', icon: '🔷' },
  { value: 'icons', label: 'Icons', icon: '📦' },
  { value: 'identicon', label: 'Identicon', icon: '🔷' },
  { value: 'jd-initials', label: 'JD Initials', icon: '🔤' },
  { value: 'lorelei', label: 'Lorelei', icon: '🧝' },
  { value: 'lorelei-neutral', label: 'Lorelei Neutral', icon: '🧝‍♀️' },
  { value: 'micah', label: 'Micah', icon: '👨' },
  { value: 'miniavs', label: 'Miniavs', icon: '👤' },
  { value: 'notionists', label: 'Notionists', icon: '👨‍💼' },
  { value: 'notionists-neutral', label: 'Notionists Neutral', icon: '👩‍💼' },
  { value: 'open-peeps', label: 'Open Peeps', icon: '👥' },
  { value: 'personas', label: 'Personas', icon: '👤' },
  { value: 'pixel-art', label: 'Pixel Art', icon: '🎮' },
  { value: 'pixel-art-neutral', label: 'Pixel Art Neutral', icon: '🎮' },
  { value: 'rings', label: 'Rings', icon: '💍' },
  { value: 'shapes', label: 'Shapes', icon: '🔺' },
  { value: 'thumbs', label: 'Thumbs', icon: '👍' },
] as const;

export const DIFFICULTY_OPTIONS = [
  { value: 'easy' as const, label: 'Fácil', icon: '🟢', pairs: 10 },
  { value: 'medium' as const, label: 'Médio', icon: '🟡', pairs: 20 },
  { value: 'hard' as const, label: 'Difícil', icon: '🔴', pairs: 30 },
] as const;

export const GAME_MODE_OPTIONS = [
  {
    value: 'classic' as const,
    label: 'Clássico',
    icon: '🎯',
    description: 'Modo tradicional com cronômetro',
  },
  {
    value: 'timer' as const,
    label: 'Cronômetro',
    icon: '⏰',
    description: 'Encontre pares em tempo limitado',
  },
  {
    value: 'zen' as const,
    label: 'Zen',
    icon: '🧘',
    description: 'Sem pressão de tempo',
  },
  {
    value: 'multiplayer' as const,
    label: 'Multiplayer',
    icon: '👥',
    description: 'Jogue com amigos por turnos',
  },
] as const;

export const TIMER_DURATION_OPTIONS = [
  { value: 60, label: '1 minuto' },
  { value: 120, label: '2 minutos' },
  { value: 180, label: '3 minutos' },
  { value: 300, label: '5 minutos' },
] as const;

// Conquistas disponíveis
export const ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'first_match',
    name: 'Primeiro Par',
    description: 'Encontre seu primeiro par',
    icon: '🎯',
  },
  {
    id: 'streak_5',
    name: 'Sequência de 5',
    description: 'Acertar 5 pares consecutivos',
    icon: '🔥',
  },
  {
    id: 'streak_10',
    name: 'Sequência de 10',
    description: 'Acertar 10 pares consecutivos',
    icon: '⚡',
  },
  {
    id: 'speed_demon',
    name: 'Demônio da Velocidade',
    description: 'Completar jogo em menos de 2 minutos',
    icon: '💨',
  },
  {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Completar jogo sem erros',
    icon: '✨',
  },
  {
    id: 'zen_master',
    name: 'Mestre Zen',
    description: 'Completar 10 jogos no modo Zen',
    icon: '🧘',
  },
  {
    id: 'multiplayer_winner',
    name: 'Campeão Multiplayer',
    description: 'Ganhar 5 partidas multiplayer',
    icon: '👑',
  },
  {
    id: 'timer_master',
    name: 'Mestre do Tempo',
    description: 'Completar 5 jogos no modo Cronômetro',
    icon: '⏰',
  },
] as const;
