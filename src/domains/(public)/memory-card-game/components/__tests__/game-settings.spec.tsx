import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GameSettings } from '../GameSettings';

// Mock do useGameConfig
vi.mock('../../hooks/useGameConfig', () => ({
  useGameConfig: () => ({
    shouldShow: vi.fn((key: string) => {
      const showMap: Record<string, boolean> = {
        showMultiplayerUI: false,
        showStreak: true,
        showTimeRemaining: true,
        showMoveTimer: false,
        showPlayerTurn: false,
        showMultiplayerScore: false,
        showConfettiOnMatch: false,
        showEfficiency: true,
      };
      return showMap[key] || false;
    }),
    getMessage: vi.fn((key: string) => {
      const messageMap: Record<string, string> = {
        initialMessage: 'Clique em uma carta para começar!',
        gameCompleteMessage: 'Parabéns! Você completou o jogo!',
        timeUpMessage: 'Tempo esgotado!',
        multiplayerWinMessage: 'JOGO FINALIZADO',
      };
      return messageMap[key] || '';
    }),
  }),
}));

// Mock do usePlayerTimer
vi.mock('../../hooks/usePlayerTimer', () => ({
  usePlayerTimer: () => ({
    playerTimeRemaining: undefined,
    playerTimerActive: false,
  }),
}));

const mockProps = {
  settings: {
    difficulty: 'easy' as const,
    theme: 'avataaars',
    gameMode: 'classic' as const,
    timerDuration: 180,
    playerNames: ['Player 1', 'Player 2'],
    currentPlayer: 0,
    arePlayerNamesValid: true,
  },
  gameState: {
    moves: 5,
    time: 120,
    matchedPairs: 3,
    isPlaying: true,
    timeRemaining: 60,
  },
  onSettingsChange: vi.fn(),
  getTotalPairs: vi.fn(() => 10),
};

describe('GameSettings Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render game settings with all sections', () => {
    render(<GameSettings {...mockProps} />);

    // Verifica se todas as seções estão presentes
    expect(screen.getByText('Modo de Jogo')).toBeInTheDocument();
    expect(screen.getByText('Dificuldade')).toBeInTheDocument();
    expect(screen.getByText('Tema')).toBeInTheDocument();
    expect(screen.getByText('Game Stats')).toBeInTheDocument();
  });

  it('should render game mode section', () => {
    render(<GameSettings {...mockProps} />);

    // Verifica se a seção de modo de jogo está presente
    expect(screen.getByText('Modo de Jogo')).toBeInTheDocument();

    // Verifica se o select de modo de jogo está presente
    const gameModeSelects = screen.getAllByRole('combobox');
    expect(gameModeSelects[0]).toBeInTheDocument();
  });

  it('should render difficulty section', () => {
    render(<GameSettings {...mockProps} />);

    // Verifica se a seção de dificuldade está presente
    expect(screen.getByText('Dificuldade')).toBeInTheDocument();

    // Verifica se os botões de dificuldade estão presentes
    expect(screen.getByText('Fácil')).toBeInTheDocument();
    expect(screen.getByText('Médio')).toBeInTheDocument();
    expect(screen.getByText('Difícil')).toBeInTheDocument();
  });

  it('should render theme section', () => {
    render(<GameSettings {...mockProps} />);

    // Verifica se a seção de tema está presente
    expect(screen.getByText('Tema')).toBeInTheDocument();

    // Verifica se o select de tema está presente
    const themeSelects = screen.getAllByRole('combobox');
    expect(themeSelects[1]).toBeInTheDocument();
  });

  it('should render game progress section', () => {
    render(<GameSettings {...mockProps} />);

    // Verifica se a seção de progresso está presente
    expect(screen.getByText('Game Stats')).toBeInTheDocument();

    // Verifica se as estatísticas estão presentes
    expect(screen.getByText('Moves:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Time:')).toBeInTheDocument();
    expect(screen.getByText('02:00')).toBeInTheDocument();
    expect(screen.getByText('Pares Encontrados:')).toBeInTheDocument();
    expect(screen.getByText('3/10')).toBeInTheDocument();
  });

  it('should call onSettingsChange when difficulty is changed', () => {
    render(<GameSettings {...mockProps} />);

    const mediumButton = screen.getByText('Médio');
    fireEvent.click(mediumButton);

    expect(mockProps.onSettingsChange).toHaveBeenCalledWith({
      difficulty: 'medium',
    });
  });

  it('should call onSettingsChange when theme is changed', () => {
    render(<GameSettings {...mockProps} />);

    // O tema é selecionado via Select, não botão
    const themeSelects = screen.getAllByRole('combobox');
    const themeSelect = themeSelects[1]; // Segundo combobox é o tema
    fireEvent.click(themeSelect);

    // Aguarda o dropdown aparecer e clica na opção
    const numbersOption = screen.getByText('Números');
    fireEvent.click(numbersOption);

    expect(mockProps.onSettingsChange).toHaveBeenCalledWith({
      theme: 'numbers',
    });
  });

  it('should display correct difficulty button as active', () => {
    render(<GameSettings {...mockProps} />);

    const easyButton = screen.getByText('Fácil');
    expect(easyButton).toHaveClass('bg-blue-600', 'text-white');
  });

  it('should display correct theme button as active', () => {
    render(<GameSettings {...mockProps} />);

    // O tema é selecionado via Select, não botão
    const themeSelects = screen.getAllByRole('combobox');
    const themeSelect = themeSelects[1]; // Segundo combobox é o tema
    expect(themeSelect).toBeInTheDocument();
    // Verifica se o valor selecionado está correto
    expect(screen.getByText('Avataaars')).toBeInTheDocument();
  });

  it('should render with correct accessibility attributes', () => {
    render(<GameSettings {...mockProps} />);

    // Verifica se os botões têm roles corretos
    const difficultyButtons = screen.getAllByRole('button');
    expect(difficultyButtons.length).toBeGreaterThan(0);

    // Verifica se os selects têm roles corretos
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThan(0);
  });

  it('should display timer section when in timer mode', () => {
    const timerProps = {
      ...mockProps,
      settings: {
        ...mockProps.settings,
        gameMode: 'timer' as const,
      },
      gameState: {
        ...mockProps.gameState,
        isPlaying: false,
        timeRemaining: undefined,
      },
    };

    render(<GameSettings {...timerProps} />);

    // Verifica se a seção de timer está presente
    expect(screen.getByText('Duração do Timer')).toBeInTheDocument();
  });

  it('should display time remaining when game is playing', () => {
    render(<GameSettings {...mockProps} />);

    // Verifica se o tempo restante está sendo exibido
    expect(screen.getByText('Tempo restante')).toBeInTheDocument();
    expect(screen.getByText('⏰ 01:00')).toBeInTheDocument();
  });

  it('should render with correct grid layout', () => {
    render(<GameSettings {...mockProps} />);

    // Verifica se o componente está renderizado
    expect(screen.getByText('Modo de Jogo')).toBeInTheDocument();
    expect(screen.getByText('Dificuldade')).toBeInTheDocument();
    expect(screen.getByText('Tema')).toBeInTheDocument();
  });

  it('should handle missing props gracefully', () => {
    const minimalProps = {
      settings: {
        difficulty: 'easy' as const,
        theme: 'avataaars',
        gameMode: 'classic' as const,
        timerDuration: 180,
        playerNames: [],
        currentPlayer: 0,
        arePlayerNamesValid: false,
      },
      gameState: {
        moves: 0,
        time: 0,
        matchedPairs: 0,
        isPlaying: false,
        timeRemaining: undefined,
      },
      onSettingsChange: vi.fn(),
      getTotalPairs: vi.fn(() => 10),
    };

    expect(() => render(<GameSettings {...minimalProps} />)).not.toThrow();
  });
});
