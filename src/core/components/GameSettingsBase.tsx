import type { GameStats } from '../layouts';

export interface GameSettingsBaseProps {
  gameStats: GameStats;
  children: React.ReactNode;
}

export const GameSettingsBase = ({
  gameStats,
  children,
}: GameSettingsBaseProps) => {
  return (
    <div className="h-full p-12">
      {/* Estatísticas do jogo */}
      <div className="mb-8">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
          <span className="material-symbols-outlined text-base">analytics</span>
          Game Stats
        </h3>
        <div className="space-y-2 text-white">
          <div className="flex w-full items-center justify-between border border-zinc-700 bg-zinc-800 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-blue-400">
                mouse
              </span>
              <span className="text-sm text-zinc-300">Moves:</span>
            </div>
            <span className="text-sm font-semibold text-blue-300">
              {gameStats.moves}
            </span>
          </div>
          <div className="flex w-full items-center justify-between border border-zinc-700 bg-zinc-800 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-purple-400">
                schedule
              </span>
              <span className="text-sm text-zinc-300">Time:</span>
            </div>
            <span className="text-sm font-semibold text-purple-300">
              {gameStats.time}
            </span>
          </div>
          <div className="flex w-full items-center justify-between border border-zinc-700 bg-zinc-800 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-orange-400">
                warning
              </span>
              <span className="text-sm text-zinc-300">Move Timer:</span>
            </div>
            <span className="text-sm font-semibold text-orange-300">
              {gameStats.moveTimer}s
            </span>
          </div>
        </div>
      </div>

      {/* Configurações específicas do jogo */}
      {children}
    </div>
  );
};
