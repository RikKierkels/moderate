import React from 'react';
import { Route } from 'react-router';
import { AppRoute } from './route.interface';

export function RouteWithSubRoutes(route: AppRoute) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        // eslint-disable-next-line react/jsx-props-no-spreading
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
