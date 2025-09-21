import { createBrowserRouter } from 'react-router';

import { MemoryCardGameContainer } from '../../domains/(public)/memory-card-game/container/memory-card-game.container';
import { ROUTES } from '../constants/routes.constant';

export const router = createBrowserRouter([
  {
    index: true,
    path: ROUTES.PUBLIC.HOME,
    element: <MemoryCardGameContainer />,
  },
]);
