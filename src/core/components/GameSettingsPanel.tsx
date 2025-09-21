import type { ReactNode } from 'react';

import { Button } from '../../shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../shared/components/ui/select';

export interface DifficultyOption {
  value: string;
  label: string;
  icon: string;
}

export interface ThemeOption {
  value: string;
  label: string;
  icon: string;
}

export interface GameSettingsPanelProps {
  difficulty?: string;
  theme?: string;
  onDifficultyChange?: (difficulty: string) => void;
  onThemeChange?: (theme: string) => void;
  difficultyOptions?: DifficultyOption[];
  themeOptions?: ThemeOption[];
  customSettings?: ReactNode;
}

const DEFAULT_DIFFICULTY_OPTIONS: DifficultyOption[] = [
  { value: 'easy', label: 'Fácil', icon: '🟢' },
  { value: 'medium', label: 'Médio', icon: '🟡' },
  { value: 'hard', label: 'Difícil', icon: '🔴' },
];

const DEFAULT_THEME_OPTIONS: ThemeOption[] = [
  { value: 'animals', label: 'Animais', icon: '🐶' },
  { value: 'food', label: 'Comida', icon: '🍕' },
  { value: 'sports', label: 'Esportes', icon: '⚽' },
  { value: 'nature', label: 'Natureza', icon: '🌿' },
];

export const GameSettingsPanel = ({
  difficulty,
  theme,
  onDifficultyChange,
  onThemeChange,
  difficultyOptions = DEFAULT_DIFFICULTY_OPTIONS,
  themeOptions = DEFAULT_THEME_OPTIONS,
  customSettings,
}: GameSettingsPanelProps) => {
  return (
    <div className="space-y-8">
      {/* Configurações de dificuldade */}
      {difficulty && onDifficultyChange && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <span className="material-symbols-outlined text-base">tune</span>
            Mode
          </h3>
          <div className="flex items-center justify-around space-x-1">
            {difficultyOptions.map(option => (
              <Button
                key={option.value}
                onClick={() => onDifficultyChange(option.value)}
                variant="outline"
                size="sm"
                className={`${difficulty === option.value
                    ? 'border-blue-500 bg-blue-600 text-white'
                    : 'border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white'
                  } rounded-none`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Configurações de tema */}
      {theme && onThemeChange && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <span className="material-symbols-outlined text-base">palette</span>
            Theme
          </h3>
          <Select value={theme} onValueChange={onThemeChange}>
            <SelectTrigger className="w-full rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
              <SelectValue placeholder="Selecione um tema" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-zinc-600 bg-zinc-800">
              {themeOptions.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-zinc-200 hover:bg-zinc-700 focus:bg-zinc-700"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{option.icon}</span>
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Configurações customizadas */}
      {customSettings}
    </div>
  );
};
