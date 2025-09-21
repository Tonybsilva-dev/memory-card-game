import { memo } from 'react';

import type { Achievement } from '../types';
import { getAchievementStats } from '../utils/achievements';

interface AchievementsPanelProps {
  achievements: Achievement[];
  onClose: () => void;
}

export const AchievementsPanel = memo<AchievementsPanelProps>(
  ({ achievements, onClose }) => {
    const stats = getAchievementStats(achievements);

    return (
      <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="mx-4 flex max-h-[80vh] w-full max-w-2xl flex-col rounded-lg bg-zinc-800">
          {/* Header fixo */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-zinc-700 p-6">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <span className="material-symbols-outlined text-yellow-400">
                emoji_events
              </span>
              Conquistas
            </h2>
            <button
              onClick={onClose}
              className="text-2xl text-zinc-400 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Conteúdo rolável */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Estatísticas */}
            <div className="mb-6 rounded-lg bg-zinc-700 p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {stats.unlocked}
                  </div>
                  <div className="text-sm text-zinc-300">Desbloqueadas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-400">
                    {stats.locked}
                  </div>
                  <div className="text-sm text-zinc-300">Bloqueadas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {stats.percentage}%
                  </div>
                  <div className="text-sm text-zinc-300">Progresso</div>
                </div>
              </div>
            </div>

            {/* Lista de conquistas */}
            <div className="space-y-3">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`rounded-lg border-2 p-4 transition-all ${
                    achievement.unlocked
                      ? 'border-green-500 bg-green-900 text-green-100'
                      : 'border-zinc-600 bg-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-3xl ${achievement.unlocked ? '' : 'opacity-50 grayscale'}`}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">
                          {achievement.name}
                        </h3>
                        {achievement.unlocked && (
                          <span className="text-sm text-green-400">✓</span>
                        )}
                      </div>
                      <p className="text-sm opacity-80">
                        {achievement.description}
                      </p>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className="mt-1 text-xs opacity-60">
                          Desbloqueada em{' '}
                          {new Date(achievement.unlockedAt).toLocaleDateString(
                            'pt-BR',
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={onClose}
                className="w-full rounded-none border border-zinc-600 bg-zinc-800 px-4 py-2 text-zinc-200 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

AchievementsPanel.displayName = 'AchievementsPanel';
