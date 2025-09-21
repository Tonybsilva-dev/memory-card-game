import { useState } from 'react';

import { useSound } from '../../../../core/hooks/useSound';
import { Button } from '../../../../shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../shared/components/ui/tooltip';

type SettingsDropdownProps = {
  onShowAchievements?: () => void;
  onShowLeaderboard?: () => void;
};

export const SettingsDropdown = ({
  onShowAchievements,
  onShowLeaderboard,
}: SettingsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isEnabled: soundEnabled,
    volume,
    setEnabled: setSoundEnabled,
    setVolume,
  } = useSound();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleDropdown}
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
            >
              <span className="material-symbols-outlined text-base">
                more_horiz
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Configurações</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isOpen && (
        <>
          {/* Overlay para fechar o dropdown */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 z-20 mt-2 w-64 rounded-none border border-zinc-600 bg-zinc-800 shadow-lg">
            <div className="p-4">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <span className="material-symbols-outlined text-base">
                  settings
                </span>
                Configurações
              </h3>

              {/* Configurações de Som */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-zinc-400">
                      volume_up
                    </span>
                    <span className="text-sm text-zinc-300">Som</span>
                  </div>
                  <Button
                    onClick={handleSoundToggle}
                    variant="outline"
                    size="sm"
                    className={`${
                      soundEnabled
                        ? 'border-green-500 bg-green-600 text-white hover:bg-green-700'
                        : 'border-zinc-600 bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                    } rounded-none text-xs`}
                  >
                    {soundEnabled ? 'Ligado' : 'Desligado'}
                  </Button>
                </div>

                {/* Controle de Volume */}
                {soundEnabled && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">Volume</span>
                      <span className="text-xs text-zinc-400">
                        {Math.round(volume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="slider h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="space-y-2 border-t border-zinc-700 pt-4">
                {onShowLeaderboard && (
                  <Button
                    onClick={() => {
                      onShowLeaderboard();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="flex w-full items-center gap-2 rounded-none border-zinc-600 bg-zinc-700 text-zinc-200 hover:bg-zinc-600 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-base">
                      leaderboard
                    </span>
                    Placar
                  </Button>
                )}

                {onShowAchievements && (
                  <Button
                    onClick={() => {
                      onShowAchievements();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="flex w-full items-center gap-2 rounded-none border-zinc-600 bg-zinc-700 text-zinc-200 hover:bg-zinc-600 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-base">
                      crown
                    </span>
                    Minhas conquistas
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
