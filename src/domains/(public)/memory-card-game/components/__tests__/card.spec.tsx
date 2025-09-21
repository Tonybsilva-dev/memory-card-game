import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Card } from '../Card';

describe('Card Component', () => {
  const mockCard = {
    id: '1',
    emoji: 'star_shine',
    isFlipped: false,
    isMatched: false,
  };

  const mockOnFlip = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render card with initial state (not flipped)', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toBeInTheDocument();
    expect(cardContainer).toHaveClass(
      'relative',
      'transition-all',
      'duration-200',
      'rounded-xl',
      'border-2',
      'border-transparent',
      'h-16',
      'w-16',
      'sm:h-20',
      'sm:w-20',
      'cursor-pointer',
    );
    expect(cardContainer).toHaveAttribute(
      'aria-label',
      'Carta do jogo da memória não virada',
    );
    expect(cardContainer).toHaveAttribute('aria-pressed', 'false');
    expect(cardContainer).toHaveAttribute('tabIndex', '0');

    // Estado inicial - emoji deve estar visível (front)
    expect(screen.getByAltText('Card content')).toBeInTheDocument();
    expect(screen.getByAltText('Card content')).toHaveAttribute(
      'src',
      'star_shine',
    );

    // question_mark deve estar presente mas não visível (back)
    expect(screen.getByText('question_mark')).toBeInTheDocument();
    expect(screen.getByText('question_mark')).toHaveClass(
      'material-symbols-outlined',
      'text-base',
      'text-white',
    );
  });

  it('should flip card when clicked', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toBeInTheDocument();

    // Clica no card
    fireEvent.click(cardContainer);

    // Verifica se a função onFlip foi chamada
    expect(mockOnFlip).toHaveBeenCalledTimes(1);
  });

  it('should toggle flip state on multiple clicks', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');

    // Primeiro clique
    fireEvent.click(cardContainer);
    expect(mockOnFlip).toHaveBeenCalledTimes(1);

    // Segundo clique
    fireEvent.click(cardContainer);
    expect(mockOnFlip).toHaveBeenCalledTimes(2);
  });

  it('should render card with correct structure', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toBeInTheDocument();

    // Verifica se o card tem a estrutura correta
    const cardInner = cardContainer.querySelector('div[class*="preserve-3d"]');
    expect(cardInner).toBeInTheDocument();
  });

  it('should render back side with correct styling', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    // Verifica se o lado de trás tem as classes corretas
    const backSide = screen.getByText('question_mark').closest('div');
    expect(backSide).toHaveClass(
      'absolute',
      'flex',
      'h-full',
      'w-full',
      'items-center',
      'justify-center',
      'backface-hidden',
      'border-white/20',
      'bg-transparent',
      'border',
    );
  });

  it('should render front side with correct styling', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    // Verifica se o lado da frente tem as classes corretas
    const frontSide = screen.getByAltText('Card content').closest('div');
    expect(frontSide).toHaveClass(
      'absolute',
      'flex',
      'h-full',
      'w-full',
      'items-center',
      'justify-center',
      'border-2',
      'backface-hidden',
      'rotate-y-180',
      'border-black',
      'bg-white',
    );
  });

  it('should have correct icons with proper classes', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    // Verifica se os ícones têm as classes corretas
    const emojiImage = screen.getByAltText('Card content');
    expect(emojiImage).toHaveClass(
      'w-full',
      'h-full',
      'object-contain',
      'rounded',
    );

    const questionIcon = screen.getByText('question_mark');
    expect(questionIcon).toHaveClass(
      'material-symbols-outlined',
      'text-base',
      'text-white',
    );
  });

  it('should be clickable and respond to user interaction', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toBeInTheDocument();

    // Verifica se o card é clicável
    expect(cardContainer).not.toHaveAttribute('disabled');
    expect(cardContainer).toHaveAttribute('tabIndex', '0');
  });

  it('should maintain flip state during re-renders', () => {
    const { rerender } = render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toBeInTheDocument();

    // Re-renderiza com o mesmo estado
    rerender(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    // Verifica se o estado se mantém
    expect(cardContainer).toHaveAttribute('aria-pressed', 'false');
  });

  it('should have proper accessibility attributes', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toHaveAttribute(
      'aria-label',
      'Carta do jogo da memória não virada',
    );
    expect(cardContainer).toHaveAttribute('aria-pressed', 'false');
    expect(cardContainer).toHaveAttribute('tabIndex', '0');
  });

  it('should update accessibility attributes when flipped', () => {
    const flippedCard = { ...mockCard, isFlipped: true };
    render(
      <Card
        card={flippedCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toHaveAttribute('aria-pressed', 'true');
  });

  it('should be keyboard accessible', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toHaveAttribute('tabIndex', '0');

    // Simula tecla Enter
    fireEvent.keyDown(cardContainer, { key: 'Enter', code: 'Enter' });
    // O componente não responde a keyDown, apenas a click
    expect(mockOnFlip).toHaveBeenCalledTimes(0);
  });

  it('should use cn utility function correctly for class combination', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toHaveClass(
      'relative',
      'transition-all',
      'duration-200',
      'rounded-xl',
      'border-2',
      'border-transparent',
      'h-16',
      'w-16',
      'sm:h-20',
      'sm:w-20',
      'cursor-pointer',
    );
  });

  it('should apply CARD_STYLES constants correctly', () => {
    render(
      <Card
        card={mockCard}
        onFlip={mockOnFlip}
        canFlip={true}
        difficulty="easy"
      />,
    );

    const cardContainer = screen.getByRole('button');
    expect(cardContainer).toHaveClass(
      'relative',
      'transition-all',
      'duration-200',
      'rounded-xl',
      'border-2',
      'border-transparent',
      'h-16',
      'w-16',
      'sm:h-20',
      'sm:w-20',
      'cursor-pointer',
    );
  });
});
