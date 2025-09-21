/**
 * Constantes de sons do jogo
 * Centraliza todos os caminhos de arquivos de áudio
 */

export const SOUNDS = {
  // Sons de cartas
  CARD_FLIP: '/sounds/hit-sound.mp3',
  CARD_MATCH: '/sounds/hit-sound.mp3',
  CARD_MISMATCH: '/sounds/mismatch-sound.mp3',

  // Sons de jogo
  GAME_START: '/sounds/hit-sound.mp3',
  GAME_COMPLETE: '/sounds/winner-sound.mp3',
  GAME_OVER: '/sounds/hit-sound.mp3',

  // Sons de interface
  BUTTON_CLICK: '/sounds/hit-sound.mp3',
  NOTIFICATION: '/sounds/hit-sound.mp3',

  // Sons de conquistas
  ACHIEVEMENT_UNLOCK: '/sounds/hit-sound.mp3',
} as const;

/**
 * Configurações padrão de som
 */
export const SOUND_CONFIG = {
  DEFAULT_VOLUME: 0.5,
  DEFAULT_ENABLED: true,
  FADE_DURATION: 200, // ms
} as const;

/**
 * Tipos de som disponíveis
 */
export type SoundType = keyof typeof SOUNDS;
