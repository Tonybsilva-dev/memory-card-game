import type { ReactElement } from 'react';

import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';

// Função customizada de render que inclui providers necessários
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>; // Simplificado sem router
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Re-exporta apenas o que é necessário para evitar problemas com React Refresh
export {
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
export { customRender as render };
