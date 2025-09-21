import { useEffect, useState } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '../../../../shared/components/ui/drawer';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../../../../shared/components/ui/sheet';
import { cn } from '../../../../shared/lib/utils';

type LeaderboardEntry = {
  id: number;
  score: number;
  moves: number;
  timestamp: number;
};

type SheetLeaderBoardProps = {
  isOpen: boolean;
  onClose: () => void;
};

const getLeaderboardData = (): LeaderboardEntry[] => {
  try {
    const data = localStorage.getItem('memory-game-leaderboard');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const LeaderboardContent = () => {
  const leaderboardData = getLeaderboardData();
  const sortedData = leaderboardData.sort((a, b) => b.score - a.score);

  return (
    <div className="p-6">
      {sortedData.length === 0 ? (
        <div className="py-12 text-center">
          <div className="relative mb-6">
            <span className="material-symbols-outlined block text-8xl text-zinc-400">
              leaderboard
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-50 blur-xl"></div>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-zinc-200">
            Nenhuma pontuação salva ainda
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            Complete uma partida para aparecer aqui!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedData.map((entry, index) => (
            <div
              key={entry.id}
              className={cn(
                'group relative overflow-hidden border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg',
                index === 0
                  ? 'border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 shadow-sm shadow-yellow-500/20'
                  : index === 1
                    ? 'border-zinc-500/30 bg-gradient-to-r from-zinc-500/10 to-slate-500/10 shadow-sm shadow-zinc-500/20'
                    : index === 2
                      ? 'border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-red-500/10 shadow-sm shadow-orange-500/20'
                      : 'border-zinc-600/50 bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 hover:border-zinc-500/50',
              )}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg',
                        index === 0
                          ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                          : index === 1
                            ? 'bg-gradient-to-br from-zinc-500 to-zinc-600'
                            : index === 2
                              ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                              : 'bg-gradient-to-br from-blue-500 to-blue-600',
                      )}
                    >
                      {index === 0 && (
                        <span className="absolute -top-1 -right-1 text-yellow-400">
                          👑
                        </span>
                      )}
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-zinc-100">
                          {entry.score.toLocaleString()}
                        </span>
                        <span className="text-sm text-zinc-400">pontos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span className="material-symbols-outlined text-base">
                          repeat
                        </span>
                        <span>{entry.moves} movimentos</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-zinc-500">
                      {formatTimestamp(entry.timestamp)}
                    </div>
                    {index < 3 && (
                      <div className="mt-1">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                            index === 0
                              ? 'border border-yellow-500/30 bg-yellow-500/20 text-yellow-300'
                              : index === 1
                                ? 'border border-zinc-500/30 bg-zinc-500/20 text-zinc-300'
                                : 'border border-orange-500/30 bg-orange-500/20 text-orange-300',
                          )}
                        >
                          {index === 0
                            ? '🥇 1º Lugar'
                            : index === 1
                              ? '🥈 2º Lugar'
                              : '🥉 3º Lugar'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SheetLeaderBoard = ({
  isOpen,
  onClose,
}: SheetLeaderBoardProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-96 border-zinc-700 bg-zinc-900">
          <SheetHeader className="border-b border-zinc-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
                <span className="material-symbols-outlined text-xl text-white">
                  leaderboard
                </span>
              </div>
              <div>
                <SheetTitle className="text-2xl font-bold text-zinc-100">
                  Placar
                </SheetTitle>
                <p className="text-sm text-zinc-400">Melhores pontuações</p>
              </div>
            </div>
          </SheetHeader>
          <div className="h-full overflow-y-auto">
            <LeaderboardContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh] border-zinc-700 bg-zinc-900">
        <DrawerHeader className="border-b border-zinc-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 p-2">
              <span className="material-symbols-outlined text-xl text-white">
                leaderboard
              </span>
            </div>
            <div>
              <DrawerTitle className="text-2xl font-bold text-zinc-100">
                Placar
              </DrawerTitle>
              <p className="text-sm text-zinc-400">Melhores pontuações</p>
            </div>
          </div>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto">
          <LeaderboardContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
