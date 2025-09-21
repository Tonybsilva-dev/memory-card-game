import React, { memo, useCallback, useState } from 'react';

import { GameLayout } from '../../../../core/layouts/GameLayout';
import { AchievementsPanel } from '../components/AchievementsPanel';
import { GameBoard } from '../components/GameBoard';
import { GameSettings } from '../components/GameSettings';
import { useGameTimer } from '../hooks/useGameTimer';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useMemoryCardGame } from '../hooks/useMemoryCardGame';
import { usePlayerTimer } from '../hooks/usePlayerTimer';

export const MemoryCardGameContainer: React.FC = memo(() => {
  // Estado para controlar o painel de conquistas
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  // Hook principal do jogo
  const {
    gameState,
    settings,
    flipCard,
    resetGame,
    formatTime,
    saveScore,
    setDifficulty,
    setTheme,
    setGameMode,
    setTimerDuration,
    setPlayerNames,
    calculateScore,
    getWinner,
    getTotalPairs,
  } = useMemoryCardGame();

  // Hook do leaderboard
  const { isOpen, openLeaderboard, closeLeaderboard } = useLeaderboard();

  // Hook do timer
  useGameTimer();

  // Hook do timer do jogador (multiplayer)
  usePlayerTimer();

  // Callbacks memoizados
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: 'Memory Card Game',
        text: 'Come and play this incredible memory game!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }, []);

  const handleShowAchievements = useCallback(() => {
    setIsAchievementsOpen(true);
  }, []);

  const handleCloseAchievements = useCallback(() => {
    setIsAchievementsOpen(false);
  }, []);

  const handleGameComplete = useCallback(
    (moves: number, time: number) => {
      // Determinar vencedor no multiplayer
      let winnerName = 'Jogador';
      if (settings.gameMode === 'multiplayer' && gameState.players) {
        const winner = getWinner();
        if (winner) {
          winnerName = winner.name;
          console.log(
            `🏆 Vencedor: ${winner.name} com ${winner.matchedPairs} pares!`,
          );
        }
      }

      // Calcular pontuação usando o sistema avançado
      const score = calculateScore();

      // Obter conquistas desbloqueadas
      const unlockedAchievements = gameState.achievements
        .filter(achievement => achievement.unlocked)
        .map(achievement => achievement.id);

      // Salvar pontuação com todos os dados
      (
        saveScore as (
          score: number,
          moves: number,
          time: number,
          achievements: string[],
          difficulty?: string,
          gameMode?: string,
          playerName?: string,
        ) => void
      )(
        score,
        moves,
        time,
        unlockedAchievements,
        settings.difficulty,
        settings.gameMode,
        winnerName,
      );

      console.log(
        `Jogo completado em ${moves} movimentos e ${formatTime(time)} - Pontuação: ${score}`,
      );
      console.log(`Conquistas desbloqueadas: ${unlockedAchievements.length}`);
    },
    [
      calculateScore,
      saveScore,
      formatTime,
      gameState.achievements,
      gameState.players,
      settings.gameMode,
      settings.difficulty,
      getWinner,
    ],
  );

  const handleSettingsChange = useCallback(
    (newSettings: Partial<typeof settings>) => {
      if (
        newSettings.difficulty &&
        newSettings.difficulty !== settings.difficulty
      ) {
        setDifficulty(newSettings.difficulty);
      }
      if (newSettings.theme && newSettings.theme !== settings.theme) {
        setTheme(newSettings.theme);
      }
      if (newSettings.gameMode && newSettings.gameMode !== settings.gameMode) {
        setGameMode(newSettings.gameMode);
      }
      if (
        newSettings.timerDuration &&
        newSettings.timerDuration !== settings.timerDuration
      ) {
        setTimerDuration(newSettings.timerDuration);
      }
      if (
        newSettings.playerNames &&
        newSettings.playerNames !== settings.playerNames
      ) {
        setPlayerNames(newSettings.playerNames);
      }
    },
    [
      settings,
      setDifficulty,
      setTheme,
      setGameMode,
      setTimerDuration,
      setPlayerNames,
    ],
  );

  return (
    <GameLayout
      testId="memory-card-game-view"
      onRestart={resetGame}
      onShowLeaderboard={openLeaderboard}
      onShare={handleShare}
      onShowAchievements={handleShowAchievements}
      isLeaderboardOpen={isOpen}
      onCloseLeaderboard={closeLeaderboard}
      gameSettings={
        <GameSettings
          settings={settings}
          gameState={{
            moves: gameState.moves,
            time: gameState.time,
            matchedPairs: gameState.matchedPairs,
            isPlaying: gameState.isPlaying,
            timeRemaining: gameState.timeRemaining,
          }}
          onSettingsChange={handleSettingsChange}
          getTotalPairs={getTotalPairs}
        />
      }
    >
      <GameBoard
        gameState={gameState}
        onCardFlip={flipCard}
        onGameComplete={handleGameComplete}
        getTotalPairs={getTotalPairs}
        difficulty={settings.difficulty}
      />

      {/* Painel de Conquistas */}
      {isAchievementsOpen && (
        <AchievementsPanel
          achievements={gameState.achievements}
          onClose={handleCloseAchievements}
        />
      )}
    </GameLayout>
  );
});

MemoryCardGameContainer.displayName = 'MemoryCardGameContainer';
