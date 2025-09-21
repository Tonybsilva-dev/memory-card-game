import { memo } from 'react';

import { useGameConfig } from '../hooks/useGameConfig';
import { useGameStore } from '../stores/game.store';
import {
  DIFFICULTY_OPTIONS,
  GAME_MODE_OPTIONS,
  TIMER_DURATION_OPTIONS,
} from '../types';

interface GameSettingsRefactoredProps {
  onSettingsChange: (
    settings: Partial<{
      gameMode?: string;
      difficulty?: string;
      timerDuration?: number;
      playerNames?: string[];
    }>,
  ) => void;
}

export const GameSettingsRefactored = memo<GameSettingsRefactoredProps>(
  ({ onSettingsChange }) => {
    const {
      gameMode,
      difficulty,
      timerDuration,
      playerNames,
      arePlayerNamesValid,
    } = useGameStore();
    const { shouldShow, getMaxPlayers, getMinPlayers } = useGameConfig();

    const handleGameModeChange = (newMode: string) => {
      onSettingsChange({ gameMode: newMode });
    };

    const handleDifficultyChange = (newDifficulty: string) => {
      onSettingsChange({ difficulty: newDifficulty });
    };

    const handleTimerDurationChange = (duration: number) => {
      onSettingsChange({ timerDuration: duration });
    };

    const handlePlayerNameChange = (index: number, name: string) => {
      const newNames = [...(playerNames || [])];
      newNames[index] = name;
      onSettingsChange({ playerNames: newNames });
    };

    const addPlayer = () => {
      const currentNames = playerNames || [];
      if (currentNames.length < getMaxPlayers()) {
        const newNames = [...currentNames, `Player ${currentNames.length + 1}`];
        onSettingsChange({ playerNames: newNames });
      }
    };

    const removePlayer = (index: number) => {
      const currentNames = playerNames || [];
      if (currentNames.length > getMinPlayers()) {
        const newNames = currentNames.filter((_, i) => i !== index);
        onSettingsChange({ playerNames: newNames });
      }
    };

    return (
      <div className="space-y-6 rounded-lg bg-zinc-800 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          Configurações do Jogo
        </h2>

        {/* Modo de Jogo */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Modo de Jogo
          </label>
          <select
            value={gameMode}
            onChange={e => handleGameModeChange(e.target.value)}
            className="w-full rounded border border-zinc-600 bg-zinc-700 p-2 text-white"
          >
            {GAME_MODE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Duração do Timer - só aparece se o modo tiver timer */}
        {shouldShow('showTimeRemaining') && (
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Duração do Timer
            </label>
            <select
              value={timerDuration || 60}
              onChange={e => handleTimerDurationChange(Number(e.target.value))}
              className="w-full rounded border border-zinc-600 bg-zinc-700 p-2 text-white"
            >
              {TIMER_DURATION_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Configurações de Multiplayer - só aparece se for multiplayer */}
        {shouldShow('showMultiplayerUI') && (
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Jogadores ({playerNames?.length || 0}/{getMaxPlayers()})
            </label>
            <div className="space-y-2">
              {(playerNames || []).map((name, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={e =>
                      handlePlayerNameChange(index, e.target.value)
                    }
                    className={`flex-1 rounded border bg-zinc-700 p-2 text-white ${arePlayerNamesValid === false
                        ? 'border-red-500'
                        : 'border-zinc-600'
                      }`}
                    placeholder={`Player ${index + 1}`}
                  />
                  {(playerNames?.length || 0) > getMinPlayers() && (
                    <button
                      onClick={() => removePlayer(index)}
                      className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              {(playerNames?.length || 0) < getMaxPlayers() && (
                <button
                  onClick={addPlayer}
                  className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
                >
                  Adicionar Jogador
                </button>
              )}
            </div>
            {arePlayerNamesValid === false && (
              <p className="mt-1 text-sm text-red-400">
                Nomes dos jogadores são obrigatórios e devem ser únicos
              </p>
            )}
          </div>
        )}

        {/* Dificuldade */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Dificuldade
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTY_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => handleDifficultyChange(option.value)}
                className={`rounded p-2 text-sm font-medium ${difficulty === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                  }`}
              >
                <div className="flex items-center gap-1">
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </div>
                <div className="text-xs text-zinc-400">
                  {option.pairs} pares
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Informações de progresso - só aparecem se configurado */}
        {shouldShow('showStreak') && (
          <div className="rounded bg-zinc-700 p-4">
            <h3 className="mb-2 text-sm font-medium text-zinc-300">
              Progresso
            </h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Movimentos:</span>
                <span className="text-white">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Tempo:</span>
                <span className="text-white">00:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Pares:</span>
                <span className="text-white">0/0</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

GameSettingsRefactored.displayName = 'GameSettingsRefactored';
