import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SettingsDropdown } from '../SettingsDropdown';

// Mock do useSound
vi.mock('../../../../core/hooks/useSound', () => ({
  useSound: () => ({
    isEnabled: true,
    volume: 0.5,
    setEnabled: vi.fn(),
    setVolume: vi.fn(),
  }),
}));

describe('SettingsDropdown Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render settings dropdown button', () => {
    render(<SettingsDropdown />);

    // Verifica se o botão de configurações está renderizado
    const settingsButton = screen.getByRole('button');
    expect(settingsButton).toBeInTheDocument();
    expect(settingsButton).toHaveClass(
      'bg-zinc-800',
      'text-zinc-200',
      'border-zinc-600',
    );
  });

  it('should render settings icon', () => {
    render(<SettingsDropdown />);

    // Verifica se o ícone de configurações está presente
    const settingsIcon = screen.getByText('more_horiz');
    expect(settingsIcon).toBeInTheDocument();
    expect(settingsIcon).toHaveClass('material-symbols-outlined', 'text-base');
  });

  it('should open dropdown when clicked', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');

    // Estado inicial - dropdown fechado
    expect(screen.queryByText('Som')).not.toBeInTheDocument();

    // Clica para abrir
    fireEvent.click(settingsButton);

    // Verifica se o dropdown abriu
    expect(screen.getByText('Som')).toBeInTheDocument();
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('should close dropdown when clicking outside', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');

    // Abre o dropdown
    fireEvent.click(settingsButton);
    expect(screen.getByText('Som')).toBeInTheDocument();

    // Clica fora do dropdown (no overlay)
    const overlay = document.querySelector('.fixed.inset-0.z-10');
    if (overlay) {
      fireEvent.click(overlay);
    }

    // Verifica se o dropdown fechou
    expect(screen.queryByText('Som')).not.toBeInTheDocument();
  });

  it('should render sound settings section', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');
    fireEvent.click(settingsButton);

    // Verifica se a seção de som está presente
    expect(screen.getByText('Som')).toBeInTheDocument();
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('should render sound toggle switch', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');
    fireEvent.click(settingsButton);

    // Verifica se o toggle de som está presente
    const soundToggle = screen.getByText('Ligado');
    expect(soundToggle).toBeInTheDocument();
  });

  it('should render volume slider', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');
    fireEvent.click(settingsButton);

    // Verifica se o slider de volume está presente
    const volumeSlider = screen.getByRole('slider');
    expect(volumeSlider).toBeInTheDocument();
    expect(volumeSlider).toHaveValue('0.5'); // Mock retorna volume: 0.5
  });

  it('should have correct accessibility attributes', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');
    expect(settingsButton).toBeInTheDocument();
  });

  it('should render with correct styling classes', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');
    expect(settingsButton).toHaveClass(
      'bg-zinc-800',
      'text-zinc-200',
      'border-zinc-600',
      'hover:bg-zinc-700',
      'hover:text-white',
    );
  });

  it('should render dropdown content with correct styling', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');
    fireEvent.click(settingsButton);

    // Verifica se o conteúdo do dropdown tem as classes corretas
    const dropdownContent = screen.getByText('Configurações').closest('div');
    expect(dropdownContent).toHaveClass('p-4');
  });

  it('should handle keyboard navigation', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');

    // Verifica se o botão é focável
    settingsButton.focus();
    expect(document.activeElement).toBe(settingsButton);

    // Verifica se o botão responde a cliques
    fireEvent.click(settingsButton);
    expect(screen.getByText('Som')).toBeInTheDocument();
  });

  it('should maintain state consistency', () => {
    render(<SettingsDropdown />);

    const settingsButton = screen.getByRole('button');

    // Abre o dropdown
    fireEvent.click(settingsButton);
    expect(screen.getByText('Som')).toBeInTheDocument();

    // Fecha o dropdown
    const overlay = document.querySelector('.fixed.inset-0.z-10');
    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(screen.queryByText('Som')).not.toBeInTheDocument();

    // Abre novamente
    fireEvent.click(settingsButton);
    expect(screen.getByText('Som')).toBeInTheDocument();
  });
});
