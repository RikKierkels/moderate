import { InjectionToken } from '@angular/core';

const UNAUTHORIZED_API_ENDPOINTS: { [key: string]: string[] } = {
  GET: ['/ideas']
};

export const UNAUTHORIZED_ENDPOINTS = new InjectionToken(
  'Unauthorized Endpoints',
  {
    providedIn: 'root',
    factory: () => UNAUTHORIZED_API_ENDPOINTS
  }
);
