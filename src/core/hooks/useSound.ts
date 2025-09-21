/**
 * Hook para controlar sons
 * Fornece interface React para o SoundController
 */
import { useCallback, useEffect, useState } from 'react';

import { SOUND_CONFIG, type SoundType } from '../constants/sounds.constant';
import { soundController } from '../controllers/sound.controller';

export interface UseSoundReturn {
  // Estado
  isEnabled: boolean;
  volume: number;

  // Ações
  play: (soundType: SoundType) => void;
  stop: (soundType: SoundType) => void;
  stopAll: () => void;
  setVolume: (volume: number) => void;
  setEnabled: (enabled: boolean) => void;
  playWithFadeIn: (soundType: SoundType, duration?: number) => void;
}

export const useSound = (): UseSoundReturn => {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    // Carrega do localStorage se disponível
    const saved = localStorage.getItem('sound-enabled');
    return saved ? JSON.parse(saved) : SOUND_CONFIG.DEFAULT_ENABLED;
  });

  const [volume, setVolumeState] = useState<number>(() => {
    // Carrega do localStorage se disponível
    const saved = localStorage.getItem('sound-volume');
    return saved ? parseFloat(saved) : SOUND_CONFIG.DEFAULT_VOLUME;
  });

  // Sincroniza com o controller
  useEffect(() => {
    soundController.setEnabled(isEnabled);
  }, [isEnabled]);

  useEffect(() => {
    soundController.setVolume(volume);
  }, [volume]);

  // Salva no localStorage quando muda
  useEffect(() => {
    localStorage.setItem('sound-enabled', JSON.stringify(isEnabled));
  }, [isEnabled]);

  useEffect(() => {
    localStorage.setItem('sound-volume', volume.toString());
  }, [volume]);

  const play = useCallback((soundType: SoundType) => {
    soundController.play(soundType);
  }, []);

  const stop = useCallback((soundType: SoundType) => {
    soundController.stop(soundType);
  }, []);

  const stopAll = useCallback(() => {
    soundController.stopAll();
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
  }, []);

  const setEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled);
  }, []);

  const playWithFadeIn = useCallback(
    (soundType: SoundType, duration?: number) => {
      soundController.playWithFadeIn(soundType, duration);
    },
    [],
  );

  return {
    isEnabled,
    volume,
    play,
    stop,
    stopAll,
    setVolume,
    setEnabled,
    playWithFadeIn,
  };
};
