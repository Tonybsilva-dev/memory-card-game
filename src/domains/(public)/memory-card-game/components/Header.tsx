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
    <div className="flex w-full items-center justify-between border-b border-zinc-700 bg-zinc-900 px-6 py-3">
      <h1
        className="text-xl font-semibold text-white"
        data-testid="memory-card-game-title"
      >
        Memory Card Game
      </h1>

      <div className="flex items-center gap-2 p-1">
        <Button
          onClick={onRestart}
          variant="outline"
          size="sm"
          className="rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
        >
          Restart
        </Button>

        <Button
          onClick={onShowLeaderboard}
          variant="outline"
          size="sm"
          className="rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
        >
          Leaderboard
        </Button>

        <Button
          onClick={onShare}
          variant="outline"
          size="sm"
          className="rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white"
        >
          <span className="material-symbols-outlined text-base">share</span>
        </Button>

        <SettingsDropdown onShowAchievements={onShowAchievements} />
      </div>
    </div>
  );
};
