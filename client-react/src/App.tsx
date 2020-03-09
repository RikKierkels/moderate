import React from 'react';
import './App.css';
import { Switch } from 'react-router';
import { routes } from './router/routes';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';

function App() {
  return (
    <Switch>
      {routes.map(route => (
        <RouteWithSubRoutes
          path={route.path}
          component={route.component}
          routes={route.routes}
        />
      ))}
    </Switch>
  );
}

export default App;
