import React from 'react';
import './App.css';
import { Switch } from 'react-router';
import { routes } from './router/routes';
import { RouteWithSubRoutes } from './router/RouteWithSubRoutes';

function App() {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </Switch>
  );
}

export default App;
