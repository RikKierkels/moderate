import { AppRoute } from './route.interface';
import { ComponentClass } from 'react';

export const routes: AppRoute[] = [
  {
    path: '/ideas',
    component: null as unknown as ComponentClass
  },
  {
    path: '/',
    component: null as unknown as ComponentClass,
    routes: [
      {
        path: '/',
        component: null as unknown as ComponentClass
      },
      {
        path: '/',
        component: null as unknown as ComponentClass
      }
    ]
  }
];
