import { memo, useCallback, useEffect } from 'react';

import { useGameConfig } from '../hooks/useGameConfig';
import type { GameBoardProps } from '../types';
import { Card } from './Card';

export const GameBoard = memo<GameBoardProps>(
  ({ gameState, onCardFlip, onGameComplete, getTotalPairs, difficulty }) => {
    const {
      cards,
      flippedCards,
      moves,
      time,
      isGameComplete,
      isLoading,
      streak,
      maxStreak,
      players,
      isTimeUp,
      matchedPairs,
    } = gameState;

    const { shouldShow, getMessage } = useGameConfig();

    // Callback para quando o jogo for completado
    useEffect(() => {
      if (isGameComplete && onGameComplete) {
        onGameComplete(moves, time);
      }
    }, [isGameComplete, moves, time, onGameComplete]);

    // Callback memoizado para flip de carta
    const handleCardFlip = useCallback(
      (cardId: string) => {
        onCardFlip(cardId);
      },
      [onCardFlip],
    );

    // Função para obter classes do grid responsivo baseado na dificuldade
    const getGridClass = useCallback(() => {
      const totalCards = cards.length;

      // Easy: 10 pares = 20 cartas
      if (totalCards <= 20) {
        return 'grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5';
      }

      // Medium: 20 pares = 40 cartas
      if (totalCards <= 40) {
        return 'grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8';
      }

      // Hard: 30 pares = 60 cartas
      return 'grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10';
    }, [cards.length]);

    // Se estiver carregando, mostrar spinner
    if (isLoading) {
      const difficultyLabels = {
        easy: 'Fácil',
        medium: 'Médio',
        hard: 'Difícil',
      };

      const difficultyPairs = {
        easy: '15',
        medium: '25',
        hard: '40',
      };

      // Determinar dificuldade baseada no número de cartas
      const currentDifficulty =
        cards.length <= 30 ? 'easy' : cards.length <= 50 ? 'medium' : 'hard';

      return (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-blue-400"></div>
          <div className="text-lg text-white">
            Carregando modo {difficultyLabels[currentDifficulty]}...
          </div>
          <div className="text-sm text-zinc-400">
            Preparando {difficultyPairs[currentDifficulty]} pares
          </div>
          <div className="text-xs text-zinc-500">
            Aguarde enquanto organizamos o novo grid
          </div>
        </div>
      );
    }

    return (
      <main
        className="flex h-full w-full flex-col items-center space-y-4"
        role="main"
        aria-label="Jogo da Memória"
      >
        {/* Informações do jogo */}
        <section className="w-full max-w-4xl" aria-label="Informações do jogo">
          {/* Placar multiplayer */}
          {shouldShow('showMultiplayerUI') && players && players.length > 0 && (
            <div
              className="mb-4 rounded-lg bg-zinc-800 p-4"
              role="region"
              aria-label="Placar dos jogadores"
            >
              <h2 className="sr-only">Placar dos Jogadores</h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {players.map(player => (
                  <div
                    key={player.id}
                    className={`rounded p-2 text-center ${
                      player.isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-700 text-zinc-300'
                    }`}
                    aria-label={`${player.name}: ${player.matchedPairs} pares, ${player.moves} movimentos`}
                  >
                    <div className="text-sm font-bold">{player.name}</div>
                    <div className="text-xs">
                      {player.matchedPairs} pares • {player.moves} movimentos
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sequência atual */}
          {shouldShow('showStreak') && !isGameComplete && !isTimeUp && (
            <div
              className="mb-4 text-center"
              role="region"
              aria-label="Sequência de acertos"
            >
              <div
                className={`text-lg font-bold ${streak > 0 ? 'text-orange-400' : 'text-zinc-500'}`}
              >
                {streak > 0 ? '🔥' : '❄️'} Sequência: {streak}
              </div>
              <div className="text-sm text-zinc-400">
                Maior sequência: {maxStreak}
              </div>
            </div>
          )}
        </section>

        {/* Mensagem de início */}
        {matchedPairs === 0 && moves === 0 && !isGameComplete && !isTimeUp && (
          <section
            className="mb-4 w-full max-w-4xl text-center text-white"
            role="region"
            aria-label="Instruções do jogo"
          >
            <h2 className="mb-2 text-xl font-bold text-blue-400">
              🎮 {getMessage('initialMessage')}
            </h2>
            <p className="text-sm text-zinc-400">Encontre todos os pares</p>
          </section>
        )}

        {/* Tabuleiro do jogo */}
        <section
          data-testid="game-board"
          className={`grid w-full gap-0.5 p-2 sm:p-4 ${cards.length > 24 ? 'max-w-7xl' : 'max-w-4xl'} justify-center ${getGridClass()}`}
          role="grid"
          aria-label="Tabuleiro do jogo da memória"
          aria-live="polite"
          aria-atomic="true"
        >
          {cards.map(card => (
            <Card
              key={card.id}
              card={card}
              onFlip={() => handleCardFlip(card.id)}
              isDisabled={card.isMatched}
              canFlip={flippedCards.length < 2 && !card.isFlipped}
              difficulty={difficulty}
            />
          ))}
        </section>

        {/* Mensagem de jogo completo ou tempo esgotado */}
        {(isGameComplete || isTimeUp) && (
          <section
            className="w-full max-w-4xl text-center text-white"
            role="region"
            aria-label="Resultado do jogo"
          >
            {shouldShow('showMultiplayerUI') &&
            players &&
            players.length > 0 ? (
              // Mensagem para multiplayer
              <div>
                <h2 className="mb-2 text-2xl font-bold text-green-400">
                  🎉 {getMessage('multiplayerWinMessage')}
                </h2>
                <div className="text-lg">
                  {players.find(p => p.isWinner) ? (
                    <>
                      <span className="text-yellow-400">
                        🏆 {players.find(p => p.isWinner)?.name}
                      </span>{' '}
                      VENCEU!
                    </>
                  ) : (
                    'EMPATE! Todos os jogadores têm a mesma pontuação.'
                  )}
                </div>
              </div>
            ) : (
              // Mensagem para single player
              <div>
                {isTimeUp ? (
                  // Mensagem quando o tempo acabou
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-red-400">
                      ⏰ {getMessage('timeUpMessage')}
                    </h2>
                    <div className="text-lg">
                      Você encontrou {matchedPairs} pares em {moves} movimentos!
                    </div>
                    <div className="text-sm text-zinc-400">
                      Tempo: {formatTime(time)}
                    </div>
                    {shouldShow('showStreak') && streak > 0 && (
                      <div className="text-sm text-orange-400">
                        Maior sequência: {maxStreak}
                      </div>
                    )}
                  </div>
                ) : (
                  // Mensagem de vitória
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-green-400">
                      🎉 {getMessage('gameCompleteMessage')}
                    </h2>
                    <div className="text-lg">
                      Você completou o jogo em {moves} movimentos!
                    </div>
                    <div className="text-sm text-zinc-400">
                      Tempo: {formatTime(time)}
                    </div>
                    {shouldShow('showStreak') && streak > 0 && (
                      <div className="text-sm text-orange-400">
                        Maior sequência: {maxStreak}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Progresso do jogo */}
        <footer
          className="w-full max-w-4xl text-center text-sm text-zinc-400"
          role="contentinfo"
          aria-label="Progresso do jogo"
        >
          {matchedPairs} / {getTotalPairs()} pares encontrados
        </footer>
      </main>
    );
  },
);

GameBoard.displayName = 'GameBoard';

// Função auxiliar para formatar tempo (pode ser movida para utils)
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
