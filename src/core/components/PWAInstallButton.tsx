import { Button } from '../../shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../shared/components/ui/tooltip';
import { usePWA } from '../hooks/usePWA';

interface PWAInstallButtonProps {
  className?: string;
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const PWAInstallButton = ({
  className = '',
  variant = 'outline',
  size = 'sm',
}: PWAInstallButtonProps) => {
  const { isInstallable, isInstalled, installApp } = usePWA();

  if (isInstalled) {
    return (
      <Button
        variant={variant}
        size={size}
        className={`rounded-none border-green-500 bg-green-600 text-white hover:bg-green-700 ${className}`}
        disabled
      >
        <span className="material-symbols-outlined mr-1 text-base">
          check_circle
        </span>
        Instalado
      </Button>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={installApp}
            variant={variant}
            size={size}
            className={`rounded-none border-zinc-600 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white ${className}`}
          >
            <span className="material-symbols-outlined text-base">
              download
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Instalar aplicativo no dispositivo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
