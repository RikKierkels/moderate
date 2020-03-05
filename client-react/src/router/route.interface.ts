export interface AppRoute {
  path: string;
  component: any;
  routes?: AppRoute[];
}
