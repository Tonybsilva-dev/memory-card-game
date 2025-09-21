import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ScoreBoard } from '../ScoreBoard';

const mockProps = {
  moves: 10,
  time: '02:00',
  moveTimer: 30,
};

describe('ScoreBoard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render score board with all statistics', () => {
    render(<ScoreBoard {...mockProps} />);

    // Verifica se o container principal está renderizado
    const scoreBoard = screen
      .getByText('Moves:')
      .closest('div')
      ?.closest('div')
      ?.closest('div')
      ?.closest('div')
      ?.closest('div');
    expect(scoreBoard).toBeInTheDocument();
    expect(scoreBoard).toHaveClass('flex', 'items-center', 'gap-1');
  });

  it('should display moves correctly', () => {
    render(<ScoreBoard {...mockProps} />);

    // Verifica se os movimentos estão sendo exibidos
    expect(screen.getByText('Moves:')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should display time correctly', () => {
    render(<ScoreBoard {...mockProps} />);

    // Verifica se o tempo está sendo exibido
    expect(screen.getByText('Time:')).toBeInTheDocument();
    expect(screen.getByText('02:00')).toBeInTheDocument();
  });

  it('should display move timer when provided', () => {
    render(<ScoreBoard {...mockProps} />);

    // Verifica se o timer de movimento está sendo exibido
    expect(screen.getByText('Move Timer:')).toBeInTheDocument();
    expect(screen.getByText('30s')).toBeInTheDocument();
  });

  it('should handle zero values correctly', () => {
    const zeroProps = {
      moves: 0,
      time: '00:00',
      moveTimer: 0,
    };

    render(<ScoreBoard {...zeroProps} />);

    // Verifica se os valores zero estão sendo exibidos
    expect(screen.getByText('0')).toBeInTheDocument(); // moves
    expect(screen.getByText('00:00')).toBeInTheDocument();
    expect(screen.getByText('0s')).toBeInTheDocument();
  });

  it('should render with correct accessibility attributes', () => {
    render(<ScoreBoard {...mockProps} />);

    // Verifica se os elementos têm labels apropriados
    expect(screen.getByText('Moves:')).toBeInTheDocument();
    expect(screen.getByText('Time:')).toBeInTheDocument();
    expect(screen.getByText('Move Timer:')).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    render(<ScoreBoard {...mockProps} />);

    const scoreBoard = screen
      .getByText('Moves:')
      .closest('div')
      ?.closest('div')
      ?.closest('div')
      ?.closest('div')
      ?.closest('div');
    expect(scoreBoard).toHaveClass('flex', 'items-center', 'gap-1');

    // Verifica se os itens de estatística têm as classes corretas
    const statItems = screen.getAllByText(/Moves:|Time:|Move Timer:/);
    statItems.forEach(item => {
      expect(item).toHaveClass('text-sm', 'text-zinc-300');
    });
  });

  it('should handle large numbers correctly', () => {
    const largeProps = {
      moves: 9999,
      time: '1666:39',
      moveTimer: 999,
    };

    render(<ScoreBoard {...largeProps} />);

    // Verifica se números grandes são exibidos corretamente
    expect(screen.getByText('9999')).toBeInTheDocument();
    expect(screen.getByText('1666:39')).toBeInTheDocument();
    expect(screen.getByText('999s')).toBeInTheDocument();
  });

  it('should render all stat items with correct structure', () => {
    render(<ScoreBoard {...mockProps} />);

    // Verifica se todos os itens de estatística estão presentes
    const statItems = screen.getAllByText(/Moves:|Time:|Move Timer:/);
    expect(statItems).toHaveLength(3);

    // Verifica se cada item tem a estrutura correta
    statItems.forEach(item => {
      expect(item).toHaveClass('text-sm', 'text-zinc-300');
    });
  });

  it('should maintain consistent layout', () => {
    const { rerender } = render(<ScoreBoard {...mockProps} />);

    // Verifica estrutura inicial
    expect(screen.getByText('Moves:')).toBeInTheDocument();

    // Re-renderiza com props diferentes
    rerender(<ScoreBoard {...{ ...mockProps, moves: 20 }} />);

    // Verifica se a estrutura se mantém
    expect(screen.getByText('Moves:')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });
});
