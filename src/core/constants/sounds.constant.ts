/**
 * Constantes de sons do jogo
 * Centraliza todos os caminhos de arquivos de áudio
 */

export const SOUNDS = {
  // Sons de cartas
  CARD_FLIP: '/src/assets/sounds/hit-sound.mp3',
  CARD_MATCH: '/src/assets/sounds/hit-sound.mp3',
  CARD_MISMATCH: '/src/assets/sounds/mismatch-sound.mp3',

  // Sons de jogo
  GAME_START: '/src/assets/sounds/hit-sound.mp3',
  GAME_COMPLETE: '/src/assets/sounds/winner-sound.mp3',
  GAME_OVER: '/src/assets/sounds/hit-sound.mp3',

  // Sons de interface
  BUTTON_CLICK: '/src/assets/sounds/hit-sound.mp3',
  NOTIFICATION: '/src/assets/sounds/hit-sound.mp3',

  // Sons de conquistas
  ACHIEVEMENT_UNLOCK: '/src/assets/sounds/hit-sound.mp3',
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
