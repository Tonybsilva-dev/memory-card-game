import { useState } from 'react';

import { GameLayout, useGameState } from '../../../../core';
import { Button } from '../../../../shared/components/ui/button';
import { PuzzleGameSettings } from '../components/PuzzleGameSettings';
import { useLeaderboard } from '../hooks/useLeaderboard';

export const PuzzleGameView: React.FC = () => {
  const { isOpen, openLeaderboard, closeLeaderboard } = useLeaderboard();
  const { gameState, setDifficulty, setTheme, resetGame, incrementMoves } =
    useGameState({
      difficulty: 'easy',
      theme: 'puzzle',
    });

  // Estado específico do puzzle
  const [score, setScore] = useState(0);
  const [level] = useState(1);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Puzzle Game',
        text: 'Teste sua lógica com este incrível jogo de quebra-cabeça!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleMove = () => {
    incrementMoves();
    setScore(prev => prev + 10);
  };

  const handleShuffle = () => {
    // Lógica para embaralhar peças
    console.log('Embaralhando peças...');
  };

  const handleShowSolution = () => {
    // Lógica para mostrar solução
    console.log('Mostrando solução...');
  };

  return (
    <GameLayout
      testId="puzzle-game-view"
      onRestart={resetGame}
      onShowLeaderboard={openLeaderboard}
      onShare={handleShare}
      isLeaderboardOpen={isOpen}
      onCloseLeaderboard={closeLeaderboard}
      gameSettings={
        <PuzzleGameSettings
          difficulty={gameState.difficulty}
          theme={gameState.theme}
          score={score}
          level={level}
          onDifficultyChange={setDifficulty}
          onThemeChange={setTheme}
          onShuffle={handleShuffle}
          onShowSolution={handleShowSolution}
        />
      }
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Jogo de Quebra-cabeça
        </h2>
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-zinc-700 p-4">
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              className="flex h-16 w-16 cursor-pointer items-center justify-center rounded bg-blue-500 font-bold text-white transition-colors hover:bg-blue-600"
              onClick={handleMove}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <Button onClick={handleMove} className="mt-4">
          Fazer Movimento
        </Button>
      </div>
    </GameLayout>
  );
};
