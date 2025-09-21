import { Button } from '../../../../shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../shared/components/ui/select';

type PuzzleGameSettingsProps = {
  difficulty: string;
  theme: string;
  score: number;
  level: number;
  onDifficultyChange: (difficulty: string) => void;
  onThemeChange: (theme: string) => void;
  onShuffle: () => void;
  onShowSolution: () => void;
};

const StatItem = ({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string | number;
  color: string;
}) => {
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
};

export const PuzzleGameSettings = ({
  difficulty,
  theme,
  score,
  level,
  onDifficultyChange,
  onThemeChange,
  onShuffle,
  onShowSolution,
}: PuzzleGameSettingsProps) => {
  return (
    <div className="h-full p-12">
      {/* Estatísticas específicas do Puzzle */}
      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <span className="material-symbols-outlined text-base">analytics</span>
          Puzzle Stats
        </h3>
        <div className="space-y-2 text-white">
          <StatItem icon="star" label="Score" value={score} color="yellow" />
          <StatItem
            icon="trending_up"
            label="Level"
            value={level}
            color="green"
          />
        </div>
      </div>

      {/* Dificuldade */}
      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <span className="material-symbols-outlined text-base">tune</span>
          Dificuldade
        </h3>
        <div className="flex items-center justify-around space-x-1">
          {[
            { value: 'easy', label: 'Fácil', icon: '🧩' },
            { value: 'medium', label: 'Médio', icon: '🧩🧩' },
            { value: 'hard', label: 'Difícil', icon: '🧩🧩🧩' },
          ].map(option => (
            <Button
              key={option.value}
              onClick={() => onDifficultyChange(option.value)}
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

      {/* Tema */}
      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <span className="material-symbols-outlined text-base">palette</span>
          Tema
        </h3>
        <Select value={theme} onValueChange={onThemeChange}>
          <SelectTrigger className="w-full rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700">
            <SelectValue placeholder="Selecione um tema" />
          </SelectTrigger>
          <SelectContent className="rounded-none border-zinc-600 bg-zinc-800">
            {[
              { value: 'puzzle', label: 'Quebra-cabeça', icon: '🧩' },
              { value: 'numbers', label: 'Números', icon: '🔢' },
              { value: 'letters', label: 'Letras', icon: '🔤' },
            ].map(option => (
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

      {/* Configurações específicas do Puzzle */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <span className="material-symbols-outlined text-base">settings</span>
          Ações do Puzzle
        </h3>
        <div className="space-y-3">
          <Button
            onClick={onShuffle}
            className="w-full rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
          >
            Embaralhar Peças
          </Button>
          <Button
            onClick={onShowSolution}
            className="w-full rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
          >
            Mostrar Solução
          </Button>
        </div>
      </div>
    </div>
  );
};
