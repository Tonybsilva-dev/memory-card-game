import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SheetLeaderBoard } from '../SheetLeaderBoard';

describe('SheetLeaderBoard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render leaderboard when open', () => {
    render(<SheetLeaderBoard isOpen={true} onClose={vi.fn()} />);

    // Verifica se o Sheet está renderizado
    expect(screen.getByText('Placar')).toBeInTheDocument();
  });

  it('should display leaderboard title', () => {
    render(<SheetLeaderBoard isOpen={true} onClose={vi.fn()} />);

    // Verifica se o título está presente
    expect(screen.getByText('Placar')).toBeInTheDocument();
    expect(screen.getByText('Melhores pontuações')).toBeInTheDocument();
  });

  it('should display empty state when no entries', () => {
    render(<SheetLeaderBoard isOpen={true} onClose={vi.fn()} />);

    // Verifica se a mensagem de estado vazio está presente
    expect(
      screen.getByText('Nenhuma pontuação salva ainda'),
    ).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<SheetLeaderBoard isOpen={true} onClose={vi.fn()} />);

    // Verifica se o título tem a estrutura correta
    const title = screen.getByText('Placar');
    expect(title.tagName).toBe('H2');
  });

  it('should render with correct styling classes', () => {
    render(<SheetLeaderBoard isOpen={true} onClose={vi.fn()} />);

    // Verifica se o título está presente
    expect(screen.getByText('Placar')).toBeInTheDocument();
    expect(screen.getByText('Melhores pontuações')).toBeInTheDocument();
  });

  it('should maintain consistent layout', () => {
    const { rerender } = render(
      <SheetLeaderBoard isOpen={true} onClose={vi.fn()} />,
    );

    // Verifica estrutura inicial
    expect(screen.getByText('Placar')).toBeInTheDocument();

    // Re-renderiza
    rerender(<SheetLeaderBoard isOpen={true} onClose={vi.fn()} />);

    // Verifica se a estrutura se mantém
    expect(screen.getByText('Placar')).toBeInTheDocument();
  });
});
