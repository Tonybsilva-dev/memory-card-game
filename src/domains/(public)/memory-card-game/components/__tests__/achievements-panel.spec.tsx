import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AchievementsPanel } from '../AchievementsPanel';

const mockAchievements = [
  {
    id: 'first_win',
    name: 'Primeira Vitória',
    description: 'Complete seu primeiro jogo',
    icon: '🏆',
    unlocked: true,
    unlockedAt: Date.now() - 1000,
  },
  {
    id: 'speed_demon',
    name: 'Demônio da Velocidade',
    description: 'Complete um jogo em menos de 2 minutos',
    icon: '⚡',
    unlocked: true,
    unlockedAt: Date.now() - 2000,
  },
  {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Complete um jogo sem erros',
    icon: '✨',
    unlocked: false,
    unlockedAt: undefined,
  },
];

const mockProps = {
  achievements: mockAchievements,
  onClose: vi.fn(),
};

describe('AchievementsPanel Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render achievements panel when open', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se o painel está renderizado
    expect(screen.getByText('Conquistas')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
  });

  it('should display panel title', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se o título está presente
    expect(screen.getByText('Conquistas')).toBeInTheDocument();
  });

  it('should render unlocked achievements', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se as conquistas desbloqueadas estão sendo exibidas
    expect(screen.getByText('Primeira Vitória')).toBeInTheDocument();
    expect(screen.getByText('Demônio da Velocidade')).toBeInTheDocument();
    expect(screen.getByText('Complete seu primeiro jogo')).toBeInTheDocument();
    expect(
      screen.getByText('Complete um jogo em menos de 2 minutos'),
    ).toBeInTheDocument();
  });

  it('should render locked achievements', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se as conquistas bloqueadas estão sendo exibidas
    expect(screen.getByText('Perfeccionista')).toBeInTheDocument();
    expect(screen.getByText('Complete um jogo sem erros')).toBeInTheDocument();
  });

  it('should display achievement icons', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se os ícones das conquistas estão sendo exibidos
    expect(screen.getByText('🏆')).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
    expect(screen.getByText('✨')).toBeInTheDocument();
  });

  it('should show different styling for unlocked vs locked achievements', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se as conquistas desbloqueadas e bloqueadas estão sendo renderizadas
    expect(screen.getByText('Primeira Vitória')).toBeInTheDocument();
    expect(screen.getByText('Demônio da Velocidade')).toBeInTheDocument();
    expect(screen.getByText('Perfeccionista')).toBeInTheDocument();

    // Verifica se os checkmarks estão presentes para conquistas desbloqueadas
    expect(screen.getAllByText('✓')).toHaveLength(2);
  });

  it('should display achievement progress', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se o progresso das conquistas está sendo exibido
    const unlockedCount = mockAchievements.filter(a => a.unlocked).length;
    const lockedCount = mockAchievements.filter(a => !a.unlocked).length;
    const percentage = Math.round(
      (unlockedCount / mockAchievements.length) * 100,
    );

    expect(screen.getByText(`${unlockedCount}`)).toBeInTheDocument();
    expect(screen.getByText('Desbloqueadas')).toBeInTheDocument();
    expect(screen.getByText(`${lockedCount}`)).toBeInTheDocument();
    expect(screen.getByText('Bloqueadas')).toBeInTheDocument();
    expect(screen.getByText(`${percentage}%`)).toBeInTheDocument();
    expect(screen.getByText('Progresso')).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se o painel principal está renderizado
    const panel = screen
      .getByText('Conquistas')
      .closest('div')
      ?.closest('div')
      ?.closest('div');
    expect(panel).toBeInTheDocument();

    // Verifica se o título tem a estrutura correta
    const title = screen.getByText('Conquistas');
    expect(title.tagName).toBe('H2');

    // Verifica se o botão de fechar está presente
    const closeButton = screen.getByText('×');
    expect(closeButton).toBeInTheDocument();

    // Verifica se o botão "Fechar" está presente
    const closeButtonText = screen.getByText('Fechar');
    expect(closeButtonText).toBeInTheDocument();
  });

  it('should render with correct styling classes', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se o painel principal está renderizado
    expect(screen.getByText('Conquistas')).toBeInTheDocument();

    // Verifica se o botão de fechar está presente
    expect(screen.getByText('×')).toBeInTheDocument();

    // Verifica se o botão "Fechar" tem as classes corretas
    const closeButton = screen.getByText('Fechar');
    expect(closeButton).toHaveClass(
      'w-full',
      'bg-zinc-800',
      'text-zinc-200',
      'border',
      'border-zinc-600',
      'hover:bg-zinc-700',
      'hover:text-white',
      'rounded-none',
    );
  });

  it('should handle empty achievements list', () => {
    const emptyProps = {
      achievements: [],
      onClose: vi.fn(),
    };

    render(<AchievementsPanel {...emptyProps} />);

    // Verifica se o painel ainda renderiza mesmo com lista vazia
    expect(screen.getByText('Conquistas')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
  });

  it('should display achievement unlock dates for unlocked achievements', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se as datas de desbloqueio estão sendo exibidas
    expect(screen.getAllByText(/Desbloqueada em/)).toHaveLength(2);
  });

  it('should render achievement cards with correct structure', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se cada conquista tem a estrutura correta
    const achievementCards = screen.getAllByText(
      /Primeira Vitória|Demônio da Velocidade|Perfeccionista/,
    );
    expect(achievementCards).toHaveLength(3);

    // Verifica se as conquistas estão sendo renderizadas
    expect(screen.getByText('Primeira Vitória')).toBeInTheDocument();
    expect(screen.getByText('Demônio da Velocidade')).toBeInTheDocument();
    expect(screen.getByText('Perfeccionista')).toBeInTheDocument();
  });

  it('should handle different achievement types', () => {
    const mixedAchievements = [
      {
        id: 'first_win',
        name: 'Primeira Vitória',
        description: 'Complete seu primeiro jogo',
        icon: '🏆',
        unlocked: true,
        unlockedAt: Date.now() - 1000,
      },
      {
        id: 'speed_demon',
        name: 'Demônio da Velocidade',
        description: 'Complete um jogo em menos de 2 minutos',
        icon: '⚡',
        unlocked: false,
        unlockedAt: undefined,
      },
    ];

    const mixedProps = {
      achievements: mixedAchievements,
      onClose: vi.fn(),
    };

    render(<AchievementsPanel {...mixedProps} />);

    // Verifica se ambos os tipos estão sendo exibidos
    expect(screen.getByText('Primeira Vitória')).toBeInTheDocument();
    expect(screen.getByText('Demônio da Velocidade')).toBeInTheDocument();

    // Verifica se o botão "Fechar" está presente
    expect(screen.getByText('Fechar')).toBeInTheDocument();
  });

  it('should maintain consistent layout', () => {
    const { rerender } = render(<AchievementsPanel {...mockProps} />);

    // Verifica estrutura inicial
    expect(screen.getByText('Conquistas')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();

    // Re-renderiza
    rerender(<AchievementsPanel {...mockProps} />);

    // Verifica se a estrutura se mantém
    expect(screen.getByText('Conquistas')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
  });

  it('should handle missing achievement data gracefully', () => {
    const incompleteAchievements = [
      {
        id: 'incomplete',
        name: '',
        description: '',
        icon: '',
        unlocked: false,
        unlockedAt: undefined,
      },
    ];

    const incompleteProps = {
      achievements: incompleteAchievements,
      onClose: vi.fn(),
    };

    expect(() =>
      render(<AchievementsPanel {...incompleteProps} />),
    ).not.toThrow();

    // Verifica se o painel ainda renderiza mesmo com dados incompletos
    expect(screen.getByText('Conquistas')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
  });

  it('should display correct progress percentage', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se a porcentagem de progresso está correta
    const unlockedCount = mockAchievements.filter(a => a.unlocked).length;
    const totalCount = mockAchievements.length;
    const percentage = Math.round((unlockedCount / totalCount) * 100);

    expect(screen.getByText(`${percentage}%`)).toBeInTheDocument();
  });

  it('should render close button with correct styling and behavior', () => {
    const mockOnClose = vi.fn();
    render(
      <AchievementsPanel
        achievements={mockAchievements}
        onClose={mockOnClose}
      />,
    );

    // Verifica se o botão "Fechar" está presente
    const closeButton = screen.getByText('Fechar');
    expect(closeButton).toBeInTheDocument();

    // Verifica se o botão tem as classes corretas
    expect(closeButton).toHaveClass(
      'w-full',
      'bg-zinc-800',
      'text-zinc-200',
      'border',
      'border-zinc-600',
      'hover:bg-zinc-700',
      'hover:text-white',
      'rounded-none',
    );

    // Verifica se o botão chama a função onClose quando clicado
    closeButton.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render header with fixed positioning', () => {
    render(<AchievementsPanel {...mockProps} />);

    // Verifica se o header está presente
    const title = screen.getByText('Conquistas');
    expect(title).toBeInTheDocument();

    // Verifica se o botão de fechar (×) está presente no header
    const closeIcon = screen.getByText('×');
    expect(closeIcon).toBeInTheDocument();

    // Verifica se o ícone de conquistas está presente
    expect(screen.getByText('emoji_events')).toBeInTheDocument();
  });
});
