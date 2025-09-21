import { memo, useCallback, useState } from 'react';

import { Button } from '../../../../shared/components/ui/button';
import { Input } from '../../../../shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../shared/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../shared/components/ui/tooltip';
import { useGameConfig } from '../hooks/useGameConfig';
import { usePlayerTimer } from '../hooks/usePlayerTimer';
import type { GameSettingsProps } from '../types';
import {
  DIFFICULTY_OPTIONS,
  GAME_MODE_OPTIONS,
  THEME_OPTIONS,
  TIMER_DURATION_OPTIONS,
} from '../types';

const StatItem = memo<{
  icon: string;
  label: string;
  value: string | number;
  color: string;
}>(({ icon, label, value, color }) => {
  return (
    <div className="flex w-full items-center justify-between border border-zinc-700 bg-zinc-800 px-3 py-2">
      <div className="flex items-center gap-2">
        <span
          className={`material-symbols-outlined text-${color}-400 text-base`}
        >
          {icon}
        </span>
        <span className="text-sm text-zinc-300">{label}:</span>
      </div>
      <span className={`font-semibold text-${color}-300 text-sm`}>{value}</span>
    </div>
  );
});

StatItem.displayName = 'StatItem';

const LabelWithTooltip = memo<{
  icon: string;
  label: string;
  tooltip: string;
}>(({ icon, label, tooltip }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-base text-white">
          {icon}
        </span>
        <span className="text-sm font-semibold text-white">{label}</span>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-gray-600 transition-colors hover:text-gray-500">
              <span className="material-symbols-outlined text-xs">help</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
});

LabelWithTooltip.displayName = 'LabelWithTooltip';

export const GameSettings = memo<GameSettingsProps>(
  ({ settings, gameState, onSettingsChange, getTotalPairs }) => {
    const {
      difficulty,
      theme,
      gameMode,
      timerDuration,
      playerNames,
      arePlayerNamesValid,
    } = settings;
    const { moves, time, matchedPairs, timeRemaining, isPlaying } = gameState;

    const { shouldShow, getMaxPlayers } = useGameConfig();
    const { playerTimeRemaining, playerTimerActive } = usePlayerTimer();

    // Estado local para nomes dos jogadores
    const [localPlayerNames, setLocalPlayerNames] = useState<string[]>(
      playerNames && playerNames.length > 0
        ? playerNames
        : ['Jogador 1', 'Jogador 2'],
    );

    // Formatar tempo
    const formatTime = useCallback((seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Handlers memoizados
    const handleDifficultyChange = useCallback(
      (newDifficulty: string) => {
        onSettingsChange({ difficulty: newDifficulty as typeof difficulty });
      },
      [onSettingsChange],
    );

    const handleThemeChange = useCallback(
      (newTheme: string) => {
        onSettingsChange({ theme: newTheme });
      },
      [onSettingsChange],
    );

    const handleGameModeChange = useCallback(
      (newGameMode: string) => {
        onSettingsChange({ gameMode: newGameMode as typeof gameMode });
      },
      [onSettingsChange],
    );

    const handleTimerDurationChange = useCallback(
      (duration: string) => {
        onSettingsChange({ timerDuration: parseInt(duration) });
      },
      [onSettingsChange],
    );

    const handlePlayerNameChange = useCallback(
      (index: number, name: string) => {
        const newNames = [...localPlayerNames];
        newNames[index] = name;
        setLocalPlayerNames(newNames);
        onSettingsChange({ playerNames: newNames });
      },
      [localPlayerNames, onSettingsChange],
    );

    const addPlayer = useCallback(() => {
      if (localPlayerNames.length >= 4) {
        return; // Limite máximo de 4 jogadores
      }
      const newNames = [
        ...localPlayerNames,
        `Player ${localPlayerNames.length + 1}`,
      ];
      setLocalPlayerNames(newNames);
      onSettingsChange({ playerNames: newNames });
    }, [localPlayerNames, onSettingsChange]);

    const removePlayer = useCallback(
      (index: number) => {
        if (localPlayerNames.length > 2) {
          const newNames = localPlayerNames.filter((_, i) => i !== index);
          setLocalPlayerNames(newNames);
          onSettingsChange({ playerNames: newNames });
        }
      },
      [localPlayerNames, onSettingsChange],
    );

    const formattedTime = formatTime(time);

    return (
      <div className="h-full w-80 overflow-y-auto bg-zinc-900 p-6">
        {/* Modo de Jogo */}
        <div className="mb-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <span className="material-symbols-outlined text-base">
              sports_esports
            </span>
            Modo de Jogo
          </h3>
          <Select value={gameMode} onValueChange={handleGameModeChange}>
            <SelectTrigger className="mb-2 w-full rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
              <SelectValue placeholder="Selecione um modo" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-zinc-600 bg-zinc-800">
              {GAME_MODE_OPTIONS.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer text-zinc-200 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white data-[highlighted]:bg-blue-600 data-[highlighted]:text-white data-[state=checked]:bg-blue-700 data-[state=checked]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{option.icon}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-zinc-400">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Configurações do Timer (apenas para modo timer) */}
        {shouldShow('showTimeRemaining') && (
          <div className="mb-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <span className="material-symbols-outlined text-base">timer</span>
              {isPlaying && timeRemaining !== undefined
                ? 'Tempo restante'
                : 'Duração do Timer'}
            </h3>

            {isPlaying && timeRemaining !== undefined ? (
              // Mostrar tempo restante quando o jogo estiver rodando
              <div className="w-full rounded-none border border-zinc-600 bg-zinc-800 p-4 text-center">
                <div
                  className={`text-3xl font-bold ${timeRemaining <= 30 ? 'text-red-400' : 'text-yellow-400'}`}
                >
                  ⏰ {formatTime(timeRemaining)}
                </div>
                <div className="mt-1 text-sm text-zinc-400">
                  {timeRemaining <= 30 ? 'Tempo crítico!' : 'Continue jogando!'}
                </div>
              </div>
            ) : (
              // Mostrar seletor de duração quando não estiver jogando
              <Select
                value={timerDuration?.toString() || '180'}
                onValueChange={handleTimerDurationChange}
              >
                <SelectTrigger className="w-full rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-zinc-600 bg-zinc-800">
                  {TIMER_DURATION_OPTIONS.map(option => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                      className="cursor-pointer text-zinc-200 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white data-[highlighted]:bg-zinc-700 data-[highlighted]:text-white data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}

        {/* Configurações Multiplayer */}
        {shouldShow('showMultiplayerUI') && (
          <div className="mb-6">
            <div className="mb-4">
              <LabelWithTooltip
                icon="group"
                label="Jogadores"
                tooltip="Personalize os nomes dos jogadores. Os nomes devem ser únicos e personalizados para começar o jogo."
              />
            </div>

            <div className="space-y-3">
              {localPlayerNames.map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={name}
                    onChange={e =>
                      handlePlayerNameChange(index, e.target.value)
                    }
                    className={`flex-1 rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 ${
                      !arePlayerNamesValid ? 'border-yellow-500' : ''
                    }`}
                    placeholder={`Jogador ${index + 1}`}
                  />
                  {localPlayerNames.length > 2 && (
                    <Button
                      onClick={() => removePlayer(index)}
                      variant="outline"
                      size="sm"
                      className="rounded-none border-red-500 bg-red-600 text-white hover:bg-red-700"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button
                onClick={addPlayer}
                variant="outline"
                size="sm"
                disabled={localPlayerNames.length >= getMaxPlayers()}
                className="w-full rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                + Adicionar Jogador
              </Button>
            </div>
          </div>
        )}

        {/* Timer do Jogador (Multiplayer) */}
        {shouldShow('showMultiplayerUI') && (
          <div className="mb-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <span className="material-symbols-outlined text-base">
                person
              </span>
              Tempo do Jogador
            </h3>
            <div className="w-full rounded-none border border-zinc-600 bg-zinc-800 p-4 text-center">
              {playerTimerActive && playerTimeRemaining !== undefined ? (
                <>
                  <div
                    className={`text-3xl font-bold ${playerTimeRemaining <= 3 ? 'text-red-400' : playerTimeRemaining <= 5 ? 'text-yellow-400' : 'text-green-400'}`}
                  >
                    ⏱️ {playerTimeRemaining}s
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">
                    {playerTimeRemaining <= 3
                      ? 'Tempo crítico!'
                      : playerTimeRemaining <= 5
                        ? 'Apressa-se!'
                        : 'Continue jogando!'}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-zinc-500">⏱️ --</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Aguardando turno...
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Tema */}
        <div className="mb-6">
          <div className="mb-4">
            <LabelWithTooltip
              icon="palette"
              label="Tema"
              tooltip="Escolha o tema visual das cartas. Cada tema gera avatares únicos usando a API DiceBear."
            />
          </div>
          <Select value={theme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-full rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
              <SelectValue placeholder="Selecione um tema" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-zinc-600 bg-zinc-800">
              {THEME_OPTIONS.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer text-zinc-200 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white data-[highlighted]:bg-zinc-700 data-[highlighted]:text-white data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{option.icon}</span>
                    <span className="text-sm">{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dificuldade */}
        <div className="mb-6">
          <div className="mb-4">
            <LabelWithTooltip
              icon="tune"
              label="Dificuldade"
              tooltip="Escolha o nível de dificuldade. Fácil: 6 pares, Médio: 12 pares, Difícil: 20 pares."
            />
          </div>
          <div className="flex items-center justify-around space-x-1">
            {DIFFICULTY_OPTIONS.map(option => (
              <Button
                key={option.value}
                onClick={() => handleDifficultyChange(option.value)}
                variant="outline"
                size="sm"
                className={`${
                  difficulty === option.value
                    ? 'border-blue-500 bg-blue-600 text-white'
                    : 'border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white'
                } rounded-none`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Game Stats */}
        {shouldShow('showStreak') && (
          <div className="mb-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <span className="material-symbols-outlined text-base">
                analytics
              </span>
              Game Stats
            </h3>
            <div className="space-y-2 text-white">
              <StatItem icon="mouse" label="Moves" value={moves} color="blue" />
              <StatItem
                icon="schedule"
                label="Time"
                value={formattedTime}
                color="purple"
              />
              <StatItem
                icon="star"
                label="Pares Encontrados"
                value={`${matchedPairs}/${getTotalPairs()}`}
                color="green"
              />
            </div>
          </div>
        )}
      </div>
    );
  },
);

GameSettings.displayName = 'GameSettings';
