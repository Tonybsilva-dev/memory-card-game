import React, { memo } from 'react';

import { useGameConfig } from '../hooks/useGameConfig';
import { useGameStore } from '../stores/game.store';
import type { Card as CardType } from '../types';
import { Card } from './Card';

interface GameBoardRefactoredProps {
  onCardFlip: (cardId: string) => void;
}

export const GameBoardRefactored = memo<GameBoardRefactoredProps>(
  ({ onCardFlip }) => {
    const {
      cards,
      flippedCards,
      matchedPairs,
      totalPairs,
      isGameComplete,
      isTimeUp,
      players,
      currentPlayer,
    } = useGameStore();
    const { shouldShow, getMessage, isValidForCurrentMode } = useGameConfig();

    const canFlip = (card: CardType) => {
      // Lógica baseada na configuração do modo
      if (!isValidForCurrentMode('startGame')) return false;
      if (card.isFlipped || card.isMatched) return false;
      if (isGameComplete || isTimeUp) return false;

      // Para multiplayer, máximo 2 cartas viradas por vez
      if (shouldShow('showMultiplayerUI')) {
        return flippedCards.length < 2;
      }

      return true;
    };

    const getInitialMessage = () => {
      if (isGameComplete || isTimeUp) return '';
      return getMessage('initialMessage');
    };

    const getGameEndMessage = () => {
      if (isTimeUp) {
        return getMessage('timeUpMessage');
      }

      if (isGameComplete) {
        if (shouldShow('showMultiplayerUI')) {
          const winner = players?.find(p => p.isWinner);
          return winner
            ? `${getMessage('multiplayerWinMessage')}\n${winner.name} VENCEU!`
            : getMessage('multiplayerWinMessage');
        }

        return getMessage('gameCompleteMessage');
      }

      return '';
    };

    const renderMultiplayerInfo = () => {
      if (
        !shouldShow('showMultiplayerUI') ||
        !players ||
        currentPlayer === undefined
      )
        return null;

      const currentPlayerData = players[currentPlayer];
      return (
        <div className="mb-4 rounded-lg bg-zinc-800 p-3">
          <h3 className="mb-2 text-lg font-semibold text-white">
            {currentPlayerData.name} - É sua vez!
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {players.map((player, index) => (
              <div
                key={index}
                className={`rounded p-2 ${index === currentPlayer ? 'bg-blue-600' : 'bg-zinc-700'}`}
              >
                <div className="font-medium">{player.name}</div>
                <div>Pares: {player.matchedPairs}</div>
                <div>Movimentos: {player.moves}</div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const renderStreakInfo = () => {
      if (!shouldShow('showStreak')) return null;

      return (
        <div className="mb-4 text-center">
          <div className="text-lg font-semibold text-white">
            Sequência: {streak} | Maior: {maxStreak}
          </div>
        </div>
      );
    };

    const renderTimeInfo = () => {
      if (!shouldShow('showTimeRemaining') || !timeRemaining) return null;

      return (
        <div className="mb-4 text-center">
          <div className="text-lg font-semibold text-white">
            Tempo restante: {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
        </div>
      );
    };

    return (
      <div className="flex flex-col items-center">
        {/* Informações do jogo baseadas na configuração */}
        {renderMultiplayerInfo()}
        {renderStreakInfo()}
        {renderTimeInfo()}

        {/* Grid de cartas */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {cards.map(card => (
            <Card
              key={card.id}
              card={card}
              onFlip={onCardFlip}
              canFlip={canFlip(card)}
            />
          ))}
        </div>

        {/* Mensagens baseadas na configuração */}
        {getInitialMessage() && (
          <div className="mb-4 text-center text-lg text-zinc-300">
            {getInitialMessage()}
          </div>
        )}

        {getGameEndMessage() && (
          <div className="mb-4 rounded-lg bg-zinc-800 p-4 text-center text-lg font-semibold text-white">
            {getGameEndMessage()}
          </div>
        )}

        {/* Progresso do jogo */}
        <div className="text-center text-sm text-zinc-400">
          {matchedPairs} / {totalPairs} pares encontrados
        </div>
      </div>
    );
  },
);

GameBoardRefactored.displayName = 'GameBoardRefactored';
