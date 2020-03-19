import React from 'react';
import './App.scss';
import { Redirect, Switch } from 'react-router';
import { routes } from './router/routes';
import RouteWithSubRoutes from './router/RouteWithSubRoutes';

function App() {
  return (
    <main className="app">
      <Switch>
        <Redirect exact from="/" to="/ideas" />
        {routes.map((route, i) => (
          <RouteWithSubRoutes
            key={i}
            path={route.path}
            component={route.component}
            routes={route.routes}
          />
        ))}
      </Switch>
    </main>
  );
}

export default App;
