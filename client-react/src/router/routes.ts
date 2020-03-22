import { AppRoute } from './route.interface';
import IdeaGrid from '../idea/containers/IdeaGrid';

export const routes: AppRoute[] = [
  {
    path: '/ideas',
    component: IdeaGrid,
    routes: [{ path: '/:id', component: null }]
  }
];
