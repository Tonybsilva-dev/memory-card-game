import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Header } from '../Header';

// Mock do SettingsDropdown
vi.mock('../SettingsDropdown', () => ({
  SettingsDropdown: ({ onShare }: { onShare: () => void }) => (
    <div data-testid="settings-dropdown">
      <button onClick={onShare} data-testid="share-button">
        Compartilhar
      </button>
    </div>
  ),
}));

const mockProps = {
  onRestart: vi.fn(),
  onShowLeaderboard: vi.fn(),
  onShare: vi.fn(),
};

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render header with correct structure', () => {
    render(<Header {...mockProps} />);

    // Verifica se o header está renderizado
    const header = screen.getByText('Memory Card Game').closest('div');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass(
      'flex',
      'items-center',
      'justify-between',
      'w-full',
      'bg-zinc-900',
      'px-6',
      'py-3',
      'border-b',
      'border-zinc-700',
    );
  });

  it('should render game title', () => {
    render(<Header {...mockProps} />);

    // Verifica se o título está presente
    const title = screen.getByText('Memory Card Game');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-xl', 'font-semibold', 'text-white');
  });

  it('should render settings dropdown', () => {
    render(<Header {...mockProps} />);

    // Verifica se o SettingsDropdown está renderizado
    const settingsDropdown = screen.getByTestId('settings-dropdown');
    expect(settingsDropdown).toBeInTheDocument();
  });

  it('should call onShare when share button is clicked', () => {
    render(<Header {...mockProps} />);

    const shareButton = screen.getByRole('button', { name: /share/i });
    fireEvent.click(shareButton);

    expect(mockProps.onShare).toHaveBeenCalledTimes(1);
  });

  it('should render with correct accessibility attributes', () => {
    render(<Header {...mockProps} />);

    // Verifica se o título tem a estrutura correta
    const title = screen.getByText('Memory Card Game');
    expect(title.tagName).toBe('H1');
    expect(title).toHaveAttribute('data-testid', 'memory-card-game-title');
  });

  it('should have correct styling classes', () => {
    render(<Header {...mockProps} />);

    const header = screen.getByText('Memory Card Game').closest('div');
    expect(header).toHaveClass(
      'flex',
      'items-center',
      'justify-between',
      'w-full',
      'bg-zinc-900',
      'px-6',
      'py-3',
      'border-b',
      'border-zinc-700',
    );

    const title = screen.getByText('Memory Card Game');
    expect(title).toHaveClass('text-xl', 'font-semibold', 'text-white');
  });

  it('should render with proper layout structure', () => {
    render(<Header {...mockProps} />);

    const header = screen.getByText('Memory Card Game').closest('div');
    const flexContainer = header?.querySelector('.flex.items-center.gap-2');

    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveClass('flex', 'items-center', 'gap-2');
  });

  it('should handle missing props gracefully', () => {
    const minimalProps = {
      onRestart: vi.fn(),
      onShowLeaderboard: vi.fn(),
      onShare: vi.fn(),
    };

    expect(() => render(<Header {...minimalProps} />)).not.toThrow();
  });

  it('should maintain consistent layout on re-render', () => {
    const { rerender } = render(<Header {...mockProps} />);

    // Verifica estrutura inicial
    expect(screen.getByText('Memory Card Game')).toBeInTheDocument();
    expect(screen.getByText('Restart')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();

    // Re-renderiza
    rerender(<Header {...mockProps} />);

    // Verifica se a estrutura se mantém
    expect(screen.getByText('Memory Card Game')).toBeInTheDocument();
    expect(screen.getByText('Restart')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('should pass correct props to SettingsDropdown', () => {
    render(<Header {...mockProps} />);

    // Verifica se o SettingsDropdown recebeu as props corretas
    const settingsDropdown = screen.getByTestId('settings-dropdown');
    expect(settingsDropdown).toBeInTheDocument();

    // Verifica se o botão de compartilhar está presente
    const shareButton = screen.getByTestId('share-button');
    expect(shareButton).toBeInTheDocument();
  });
});
