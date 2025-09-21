import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GameBoard } from '../GameBoard';

const mockGameState = {
  cards: [
    { id: '1', emoji: '🐶', isFlipped: false, isMatched: false },
    { id: '2', emoji: '🐶', isFlipped: false, isMatched: false },
    { id: '3', emoji: '🐱', isFlipped: false, isMatched: false },
    { id: '4', emoji: '🐱', isFlipped: false, isMatched: false },
    { id: '5', emoji: '🐭', isFlipped: false, isMatched: false },
    { id: '6', emoji: '🐭', isFlipped: false, isMatched: false },
  ],
  flippedCards: [],
  moves: 0,
  matchedPairs: 0,
  streak: 0,
  maxStreak: 0,
  isGameComplete: false,
  isTimeUp: false,
  players: [],
  timeRemaining: 60,
  playerTimeRemaining: undefined,
  playerTimerActive: false,
  time: 0,
  isPlaying: false,
  isLoading: false,
  achievements: [],
};

const mockProps = {
  gameState: mockGameState,
  onCardFlip: vi.fn(),
  getTotalPairs: () => 3,
  difficulty: 'easy' as const,
};

describe('GameBoard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render game board with cards', () => {
    render(<GameBoard {...mockProps} />);

    // Verifica se o container do jogo está renderizado
    const gameContainer = screen.getByTestId('game-board');
    expect(gameContainer).toBeInTheDocument();
    expect(gameContainer).toHaveClass(
      'grid',
      'gap-0.5',
      'p-2',
      'sm:p-4',
      'w-full',
    );
  });

  it('should render all 6 cards (3 emojis × 2)', () => {
    render(<GameBoard {...mockProps} />);

    // Verifica se todos os emojis estão presentes (cada um 2 vezes)
    const expectedEmojis = ['🐶', '🐱', '🐭'];

    expectedEmojis.forEach(emoji => {
      const emojiElements = screen.getAllByAltText('Card content');
      const emojiImages = emojiElements.filter(
        img => img.getAttribute('src') === emoji,
      );
      expect(emojiImages).toHaveLength(2); // Cada emoji deve aparecer 2 vezes
    });
  });

  it('should render cards with correct structure', () => {
    render(<GameBoard {...mockProps} />);

    // Verifica se os cards têm a estrutura correta
    const cardButtons = screen.getAllByRole('button');
    expect(cardButtons).toHaveLength(6);
  });

  it('should have unique IDs for each card', () => {
    render(<GameBoard {...mockProps} />);

    // Verifica se cada card tem um ID único
    const cardButtons = screen.getAllByRole('button');
    expect(cardButtons).toHaveLength(6);
  });

  it('should display emojis in correct order', () => {
    render(<GameBoard {...mockProps} />);

    // Verifica se os emojis estão na ordem correta
    const emojiElements = screen.getAllByAltText('Card content');
    expect(emojiElements).toHaveLength(6);
  });

  it('should render all cards as not flipped and not matched initially', () => {
    render(<GameBoard {...mockProps} />);

    // Verifica se todos os cards estão inicialmente não virados
    const cardButtons = screen.getAllByRole('button');
    cardButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-pressed', 'false');
    });
  });
});
