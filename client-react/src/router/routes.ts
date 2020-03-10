import { AppRoute } from './route.interface';
import IdeaGrid from '../idea/IdeaGrid';

export const routes: AppRoute[] = [
  {
    path: '/ideas',
    component: IdeaGrid,
    routes: []
  }
];
