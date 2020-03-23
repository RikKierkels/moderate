import { AppRoute } from './route.interface';
import IdeaOverview from '../idea/containers/IdeaOverview';

export const routes: AppRoute[] = [
  {
    path: '/ideas',
    component: IdeaOverview,
    routes: [{ path: '/:id', component: null }]
  }
];
