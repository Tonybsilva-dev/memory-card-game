import { createBrowserRouter } from 'react-router';

import { HomeContainer } from '../../domains/(public)/Home/container/Home.container';
import { ROUTES } from '../constants/routes.constant';

export const router = createBrowserRouter([
  {
    index: true,
    path: ROUTES.PUBLIC.HOME,
    element: <HomeContainer />,
  },
]);
