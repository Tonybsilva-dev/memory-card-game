/**
 * Controller global de som
 * Gerencia reprodução, volume e estado dos sons
 */
import {
  SOUND_CONFIG,
  SOUNDS,
  type SoundType,
} from '../constants/sounds.constant';

class SoundController {
  // private audioContext: AudioContext | null = null;
  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private isEnabled: boolean = SOUND_CONFIG.DEFAULT_ENABLED;
  private volume: number = SOUND_CONFIG.DEFAULT_VOLUME;

  constructor() {
    this.preloadSounds();
  }

  /**
   * Pré-carrega todos os sons
   */
  private preloadSounds(): void {
    Object.entries(SOUNDS).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audio.volume = this.volume;
      this.sounds.set(key as SoundType, audio);
    });
  }

  /**
   * Reproduz um som
   */
  play(soundType: SoundType): void {
    if (!this.isEnabled) return;

    const audio = this.sounds.get(soundType);
    if (!audio) {
      console.warn(`Som não encontrado: ${soundType}`);
      return;
    }

    try {
      // Reinicia o áudio se já estiver tocando
      audio.currentTime = 0;
      audio.volume = this.volume;
      audio.play().catch(error => {
        console.warn(`Erro ao reproduzir som ${soundType}:`, error);
      });
    } catch (error) {
      console.warn(`Erro ao reproduzir som ${soundType}:`, error);
    }
  }

  /**
   * Para um som
   */
  stop(soundType: SoundType): void {
    const audio = this.sounds.get(soundType);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  /**
   * Para todos os sons
   */
  stopAll(): void {
    this.sounds.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  /**
   * Define o volume (0.0 a 1.0)
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(audio => {
      audio.volume = this.volume;
    });
  }

  /**
   * Obtém o volume atual
   */
  getVolume(): number {
    return this.volume;
  }

  /**
   * Habilita/desabilita sons
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stopAll();
    }
  }

  /**
   * Verifica se os sons estão habilitados
   */
  isSoundEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Toca um som com fade in
   */
  playWithFadeIn(
    soundType: SoundType,
    duration: number = SOUND_CONFIG.FADE_DURATION,
  ): void {
    if (!this.isEnabled) return;

    const audio = this.sounds.get(soundType);
    if (!audio) return;

    audio.volume = 0;
    audio.currentTime = 0;

    audio
      .play()
      .then(() => {
        this.fadeIn(audio, duration);
      })
      .catch(error => {
        console.warn(`Erro ao reproduzir som com fade in ${soundType}:`, error);
      });
  }

  /**
   * Fade in do volume
   */
  private fadeIn(audio: HTMLAudioElement, duration: number): void {
    const startTime = Date.now();
    const startVolume = 0;
    const endVolume = this.volume;

    const fade = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      audio.volume = startVolume + (endVolume - startVolume) * progress;

      if (progress < 1) {
        requestAnimationFrame(fade);
      }
    };

    fade();
  }

  // /**
  //  * Fade out do volume
  //  */
  // private fadeOut(audio: HTMLAudioElement, duration: number): void {
  //   const startTime = Date.now();
  //   const startVolume = audio.volume;
  //   const endVolume = 0;

  //   const fade = () => {
  //     const elapsed = Date.now() - startTime;
  //     const progress = Math.min(elapsed / duration, 1);

  //     audio.volume = startVolume + (endVolume - startVolume) * progress;

  //     if (progress < 1) {
  //       requestAnimationFrame(fade);
  //     } else {
  //       audio.pause();
  //       audio.currentTime = 0;
  //     }
  //   };

  //   fade();
  // }
}

// Instância singleton do controller
export const soundController = new SoundController();
