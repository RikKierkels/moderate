import { AppRoute } from './route.interface';
import IdeaOverview from '../ideas/IdeaOverview';

export const routes: AppRoute[] = [
  {
    path: '/ideas',
    component: IdeaOverview,
    routes: []
  }
];
