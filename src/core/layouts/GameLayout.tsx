import { Header } from '../../domains/(public)/memory-card-game/components/Header';
import { SheetLeaderBoard } from '../../domains/(public)/memory-card-game/components/SheetLeaderBoard';

export interface GameLayoutProps {
  children: React.ReactNode;
  gameSettings: React.ReactNode; // Painel de configurações específico do jogo

  onRestart: () => void;
  onShowLeaderboard: () => void;
  onShare: () => void;
  onShowAchievements?: () => void;

  isLeaderboardOpen: boolean;
  onCloseLeaderboard: () => void;

  testId?: string;
}

export const GameLayout = ({
  children,
  gameSettings,
  onRestart,
  onShowLeaderboard,
  onShare,
  onShowAchievements,
  isLeaderboardOpen,
  onCloseLeaderboard,
  testId = 'game-layout',
}: GameLayoutProps) => {
  return (
    <div className="min-h-screen bg-zinc-900" data-testid={testId}>
      {/* Header fixo */}
      <Header
        onRestart={onRestart}
        onShowLeaderboard={onShowLeaderboard}
        onShare={onShare}
        onShowAchievements={onShowAchievements}
      />

      {/* Layout principal: Content + Settings */}
      <div className="flex h-[calc(100vh-73px)] bg-zinc-800">
        {/* Área do jogo (content) */}
        <div className="flex flex-1 flex-col items-center justify-center bg-zinc-900 p-2 sm:p-4">
          <div className="h-full w-full border border-zinc-600 bg-zinc-800 p-2 sm:p-6">
            <div className="flex h-full flex-col items-center justify-center p-2 sm:p-6">
              {children}
            </div>
          </div>
        </div>

        {/* Painel de configurações específico do jogo */}
        <div className="h-full w-80 bg-zinc-900">{gameSettings}</div>
      </div>

      {/* Leaderboard */}
      <SheetLeaderBoard
        isOpen={isLeaderboardOpen}
        onClose={onCloseLeaderboard}
      />
    </div>
  );
};
