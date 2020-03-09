import { AppRoute } from './route.interface';
import IdeaOverview from '../idea/IdeaOverview';

export const routes: AppRoute[] = [
  {
    path: '/ideas',
    component: IdeaOverview,
    routes: []
  }
];
