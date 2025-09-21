import { StrictMode } from 'react';

import { Analytics } from '@vercel/analytics/next';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import './index.css';
import { router } from './shared/routes/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <RouterProvider router={router} />
      <Analytics />
    </div>
  </StrictMode>,
);
