import { PWAInstallButton } from '../../../../core/components/PWAInstallButton';
import { Button } from '../../../../shared/components/ui/button';
import { SettingsDropdown } from './SettingsDropdown';

type HeaderProps = {
  onRestart: () => void;
  onShowLeaderboard: () => void;
  onShare: () => void;
  onShowAchievements?: () => void;
};

export const Header = ({
  onRestart,
  onShowLeaderboard,
  onShare,
  onShowAchievements,
}: HeaderProps) => {
  return (
    <header
      className="flex w-full items-center justify-between border-b border-zinc-700 bg-zinc-900 px-6 py-3"
      role="banner"
      aria-label="Cabeçalho do jogo"
    >
      <h1
        className="flex items-center gap-2 text-xl font-semibold text-white"
        data-testid="memory-card-game-title"
      >
        <img src="/logo.png" alt="Memory Card Game" className="h-10 w-10" />
        Memory Card Game
      </h1>

      <nav
        className="flex items-center gap-2 p-1"
        role="toolbar"
        aria-label="Ações do jogo"
      >
        <Button
          onClick={onRestart}
          variant="outline"
          size="sm"
          className="rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
          aria-label="Reiniciar jogo"
        >
          <span className="material-symbols-outlined mr-1 text-base">
            refresh
          </span>
          Reiniciar jogo
        </Button>

        <Button
          onClick={onShare}
          variant="outline"
          size="sm"
          className="rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
          aria-label="Compartilhar resultado"
        >
          <span className="material-symbols-outlined text-base">share</span>
        </Button>

        <PWAInstallButton />

        <SettingsDropdown
          onShowAchievements={onShowAchievements}
          onShowLeaderboard={onShowLeaderboard}
        />
      </nav>
    </header>
  );
};
